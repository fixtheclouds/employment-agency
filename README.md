# Тестовое задание «Сайт для кадрового агентства»
Вакансия должна иметь:
1. Название
2. Дату добавления
3. Срок действия
4. Зарплату
5. Контактную информацию
6. Несколько умений.

Работник должен иметь:
1. Имя, оно должно содержать 3 слова и только кириллические буквы и пробелы
2. Контактную информацию и она должна содержать номер телефона или адрес эл-почты
3. Статус поиска работы
4. Желаемую зарплату
5. Несколько умений.

Умение: 
Должно иметь уникальное название.

## Интерфейсы
1. Сделать интерфейсы добавления/редактирования/просмотра работников и вакансий.
2. Список умений заполняется на страничке создания/редактирования работника/вакансии, с использованием асинхронной подгрузки данных. Должна быть реализована возможность выбрать существующее умение или добавить новое.

## Поиск вакансий
1. Срок действия вакансий не должен истечь.
2. Вакансии должны быть отсортированы по убыванию заработной платы.
3. Для каждого работника можно получить список всех подходящих вакансий.
4. Вывести вакансии в двух группах, которые полностью подходят по набору умений и частично.

## Поиск работников
1. Работник должен искать работу.
2. Все работники должны быть отсортированы по возрастанию желаемой заработной платы.
3. По каждой вакансии можно получить список всех подходящих работников.
4. Вывести работников в двух группах, которые полностью подходят по набору умений и частично.

Тех. требования: Ruby on Rails, PostgreSQL, RSpec, Git, AngularJS.
## Важное условие
Проект должен запускаться с минимальными усилиями, либо сопровождаться необходимой инструкцией. Обратите на это внимание.
