import model from "./modules/model.js";
import view from "./view/view.js";

const controller = {
  handlingUserAnswer : function (question) {
    // Запишем ответ пользователя в переменную
    let userAnswer = view.displayChoiceField();
  
    // Запустим функцию проверки ответа , передадим в неё текущий вопрос и запишем в переменную
    let result = new model.Result(question);

    // Записываем значение полученного ответа в перем. 
    let answerStatus = result.checkResult(userAnswer);

    // В зав-ти от знач-я совершаем операции
    switch (answerStatus) {
      case 'cancel_value' : 
        view.MESSAGES.INFO.finish_value(model.score); 

        // Проверим, получено ли достижение. Покажем сообщение
        if (model.ACHIEVE.allCorrect(model.dataQuiz.length, question.correctAnswers) === true) {
          view.MESSAGES.ACHIEVES.excellent();
        }

        result.isCorrect = false; // Сменим флаг верного ответа 
        model.ACHIEVE.resetAchieve(['correctAnswers', 'comboCount']); // Сбрасываем достижения

        return;
      case 'empty_value' : 
        view.MESSAGES.ERROR.empty_value();

        // Сбрасываем достижения
        model.ACHIEVE.resetAchieve(['correctAnswers', 'comboCount']);
        break;
      case 'nan_value' : 
        view.MESSAGES.ERROR.nan_value();
        break;
      case 'infinity_value' : 
        view.MESSAGES.ERROR.infinity_value();
        break;
      case 'no_integer_value' : 
        view.MESSAGES.ERROR.no_integer_value();
        break;
      case true :
        view.MESSAGES.SUCCESS.correсt_answer(); 

        result.isCorrect = true; // Сменим флаг ответа

        // Обновляем счёт
        model.score = result.updateScore(model.score);
        view.MESSAGES.INFO.score_value(model.score); // Показываем текущий результат

        // Увеличиваем достижения
        model.ACHIEVE.increaseAchieve(['correctAnswers', 'comboCount']);
    
        // Проверим, получено ли достижение
        if (model.ACHIEVE.combo(model.comboCount) === true) {
          view.MESSAGES.ACHIEVES.combo(model.comboCount);
        } 

        break;

      case false : 
        view.MESSAGES.INFO.incorrect_answer();
        result.isCorrect = false; // Сменим флаг

        // Обновляем счёт
        model.score = result.updateScore(model.score);
        view.MESSAGES.INFO.score_value(model.score); // Показываем текущий результат

        model.ACHIEVE.resetAchieve(['correctAnswers', 'comboCount']); // Сбрасываем достижения

        model.displayQuestion(question); // Овтет не верный, поэтому покажем вопрос повторно
        controller.handlingUserAnswer(question); // Запускаем обработку ответа

        break;
    }
   
    if (result.isCorrect === false ) return; //  Не показываем след. вопрос

    const nextQuestion = model.randomizeQuestion(model.dataQuiz);
    model.displayQuestion(nextQuestion);
    controller.handlingUserAnswer(nextQuestion);
  }
}
  
// Модуль викторины
const consoleQuiz =  ( function () {
  // Функция начинает викторину
  const startingQuiz = function () {

    //Если была перезагрузка страницы - показываем вопрос
    if (model.watchPageReload()) {
      // Первый вопрос
      let firstQuestion = model.randomizeQuestion(model.dataQuiz);
      model.displayQuestion(firstQuestion);
      controller.handlingUserAnswer(firstQuestion);
    }
  }
  
  // Возврат ф-ций для пользователя
  return {
     start : startingQuiz
  }

}());
 
consoleQuiz.start();