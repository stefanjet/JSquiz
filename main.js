/* Собираем в переменные варианты ответа */
const option1 = document.querySelector('.option1'),
  option2 = document.querySelector('.option2'),
  option3 = document.querySelector('.option3'),
  option4 = document.querySelector('.option4');

/* Переменная для всех ответов */
const optionElements = document.querySelectorAll('.option');

/* Переменная для вопроса */
const question = document.getElementById('question');

/* Переменная для номера вопроса и номер всех вопросов */
const numberOfQuestion = document.getElementById('number-of-question'); // Номер вопроса
const numberOfAllQuestion = document.getElementById('number-of-all-questions'); // Количество всех вопросов

let indexOfQuestion, // Индекс текущего вопроса
  indexOfPage = 0; // Индекс страницы

const answersTracker = document.getElementById('answers-tracker'); // Обертка для трекера
const btnNext = document.getElementById('btn-next'); // Кнопка далее

let score = 0; // Итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer'), // Количество правильных ответов
      numberOfAllQuestion2 = document.getElementById('number-of-all-questions-2'), // Количество всех вопросов в модальном окне
      btnTryAgain = document.getElementById('btn-try-again');
      
// Кнопка повторить в модальном окне
const questions = [
    {
        question: 'Как звали свинью которую выиграла Мейбл в Гравити Фолз?',
        options: [
            'Толстяк',
            'Пухля',
            'Живоглот',
            'Пончик',
        ],
        rightAnswer: 1
    },
    {
        question: 'Сколько было лет Дипперу и Мейбл в первом сезоне?',
        options: [
            '11',
            '12',
            '13',
            '14',
        ],
        rightAnswer: 1

    },
    {
        question: 'Кто такие Кэнди и Гренда?',
        options: [
            'Полицейские - напарники',
            'Возлюбленные Гидеона',
            'Подруги Мэйбл',
            'Подруги Венди',
        ],
        rightAnswer: 2
    }
];

numberOfAllQuestion.innerHTML = questions.length;

const load = () => {
  question.innerHTML = questions[indexOfQuestion].question; // Сам вопрос

  // Мапим ответы
  option1.innerHTML = questions[indexOfQuestion].options[0];
  option2.innerHTML = questions[indexOfQuestion].options[1];
  option3.innerHTML = questions[indexOfQuestion].options[2];
  option4.innerHTML = questions[indexOfQuestion].options[3];

  numberOfQuestion.innerHTML = indexOfPage + 1; // Установка номера текущей страницы
  indexOfPage++; // Увеличение индекса страницы
};

const completedAnswers = []; // Массив для уже заданных вопросов

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDublicate = false;

    if(indexOfPage == questions.length) {
        quizOver()
    } else{
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;  
                }
            });
            if(hitDublicate) {
                randomQuestion();
            }else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
   if ( el.target.dataset.id == questions[indexOfQuestion].rightAnswer ) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
};

for(option of optionElements) {
    option.addEventListener('click' , e => checkAnswer(e));
}
const disabledOptions = () => {
    optionElements.forEach(item => {
      item.classList.add('disabled');
      if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
        item.classList.add('correct');
      }
    })
  };

const enabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    });
};

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    });
};

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = () => {
    if ( !optionElements[0].classList.contains('disabled') ) {
        alert('А ну ка не халтурь! Выбери один из вариантов ответа!');
    } else {
        randomQuestion();
        enabledOptions();
    }
};

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestion2.innerHTML =questions.length;
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
});

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
})