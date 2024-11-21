import * as model from './model/model.js';
import * as view from './view/view.js';

const startEventListeners = function () {
  // Прослушивание событий фильтра, запускаем функцию  фильтра
  view.elements.filter.addEventListener('keyup', view.doFilter);

  // Отмена стандарт. поведение формы - по нажатию на submit страница не будет обновляться
  view.elements.addForm.addEventListener('submit', function(e) {
     e.preventDefault();
    
    // Проверили список задач. По результату сменили заголовок списка
    view.changeTitle();

    const isValid = view.validateInput();

    let userText = view.elements.newTaskInput.value.trim(); // Получим текст задачи
    let id = model.Task.getID();
    
    // Создадим объект задачи (startNumber)
    let taskData = model.createTaskData(id, userText); 
    
    isValid ? view.addTask(taskData, ['delete', 'edit']) : console.log('error');
   
  });

  // Добавляем прослушивание контейнеру с задачами, запускаем функцию обработки задач
  view.elements.mainContainer.addEventListener('click', taskHandling);
}

// ::: Обработка задач :::
const taskHandling = function (e) {
  // Если клик по кнопке 'delete' - удаляем задачу
  if (e.target.getAttribute("data-action") && e.target.getAttribute("data-action") === 'delete') {
    let removedTask = view.removeTask(e); // удаляем задачу со страницы
    model.removeTaskData(removedTask); // удаляем данные задачи из объекта
  }

  // Если клик по кнопке 'edit' - редактируем задачу
  if (e.target.getAttribute("data-action") && e.target.getAttribute("data-action") === 'edit') {
    const taskId =  e.target.closest('li').dataset.id;

    // Замени кнопки в данных задачи и запишем в переменную
    let buttonTypes = model.findTask(taskId).buttonTypes = ['cancel', 'save'];

    // Запустим функцию рендера и передадим кнопки
    view.editTask(taskId, buttonTypes);
  }

  // Прослушивание события инпута для ввода новой задачи. Если после уведомления он снова в фокусе - скрыть уведомление
  view.elements.newTaskInput.onfocus = function() {
    // Скрыть уведомление об ошибке
    if (view.elements.addForm.nextElementSibling.classList.contains('alert-danger')) {
      // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
      view.elements.addForm.nextElementSibling.remove();
    }

    // Скрыть уведомление об успехе
    if (view.elements.addForm.nextElementSibling.classList.contains('alert-success')) {
      // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
      view.elements.addForm.nextElementSibling.remove();
    }
  };

  // Проверяем список и обновляем заголовок
  view.changeTitle ();
};

view.changeTitle (); // При загрузке страницы изменяем заголовок, если список задач пуст

startEventListeners();





