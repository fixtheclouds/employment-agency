(function() {
    angular.module('agencyApp.employees', [])
        .factory('Employee', function($resource) {
            return $resource('/employees/:id', {}, {
                show: {
                    method: 'GET'
                },
                update: {
                    method: 'PUT',
                    params: {id: '@id'}
                },
                matchVacancies: {
                    url: '/employees/:id/get_matches',
                    method: 'GET'
                },
                delete: {
                    method: 'DELETE',
                    params: {id: '@id'}
                }
            });
        })
        .controller('EmployeesCtrl', function ($scope, $state, $stateParams, $mdDialog, Employee) {
            var originatorEv;

            $scope.employees = {};

            $scope.query = {
                order: 'name',
                dir: 'asc',
                page: 1
            }

            $scope.openMenu = function($mdOpenMenu, ev) {
                originatorEv = ev;
                $mdOpenMenu(ev);
            };

            $scope.setOrder = function () {
                $scope.promise = Employee.query($scope.query, success).$promise;
            };


            function success(items) {
                $scope.employees = items;
            }

            $scope.retrieveList = function() {
                $scope.promise = Employee.query($scope.query, success).$promise;
            }
            // Deletion confirm dialog
            $scope.confirmDeletion = function(ev, data) {
                var EmployeeId = data;
                var confirm = $mdDialog.confirm()
                    .title('Удалить запись?')
                    .textContent('Действие невозможно будет отменить.')
                    .ariaLabel('Delete Employee')
                    .targetEvent(ev)
                    .ok('ОК')
                    .cancel('Отмена');

                $mdDialog.show(confirm).then(function() {
                    $scope.promise = Employee.delete({id: EmployeeId}).$promise;
                    $scope.promise.then(function(response) {
                        if (response.success) {
                            $scope.retrieveList();
                        }
                    });
                });
            };

            $scope.retrieveList();
        })
        .controller('SingleEmployeeCtrl', function ($scope, $state, $stateParams, $http, Employee) {
            var id = $stateParams.id || null;
            $scope.state = $state.current;
            $scope.params = $stateParams;
            $scope.foundSkills = [];
            $scope.employee = {
                skills: []
            };
            $scope.pageTitle = 'Редактировать работника';
            $scope.selectedSkills = [];
            $scope.searchText = null;

            if (id) {
                Employee.show({id: id}).$promise.then(function(response) {
                    $scope.employee = response.data;
                    $scope.employee.skills = response.skills;
                    $scope.selectedSkills = response.data.skills;

                });
            } else {
                $scope.pageTitle = 'Добавить работника';
            }

            /**
             * Save data
             */
            $scope.saveItem = function(data) {
                if (data.id) {
                    Employee.update(data).$promise.then(function(response) {
                        if (response.success) {
                            $state.go('employees');
                        }
                        /* TODO implement errors parsing */
                    });
                } else {
                    Employee.save(data).$promise.then(function(response) {
                        if (response.success) {
                            $state.go('employees');
                        }
                        /* TODO implement errors parsing */
                    });
                }
            }

            /**
             * Search for skills
             */
            $scope.querySearch = function (query) {
                $http({
                    url: '/skills',
                    params: {query: query},
                    method: 'GET'
                }).then(function(response) {
                    $scope.foundSkills = response.data;
                    return response.data;
                });
            }

            $scope.matchVacancies = function(id) {
                Employee.matchVacancies({id: id}).$promise.then(function(response) {
                    console.log(response);
                });
            }


            $scope.transformChip = function(chip) {
                if (angular.isObject(chip)) {
                    return chip;
                }
            }

        })
        .filter('activeOrNot', function() {
            return function(input) {
                return input ? 'Активен' : 'Неактивен'
            }
        });
})();
