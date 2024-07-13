<?php

// Подключение файла с подключением к БД
require "db.php";

// Создание новых записей в БД
$course = R::dispense('courses');               // Создание нового объекта - бина (фасолинки) в таблице courses
$course->title = "Курс по React";               // Заполнение колонки title бина (задание значения для бина)
$course->tuts = 10;                             // Количество уроков в курсе
$course->homeworks = 8;                         // Количество домашних заданий на курсе
$course->level = "Для новичков";                // Уровень курса
$course->price = 100;                           // Цена курса
R::store($course);                              // Сохранение бина в БД
?>