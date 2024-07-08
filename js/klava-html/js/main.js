const text = `Противоположная точка зрения подразумевает, что элементы политического процесса являются только методом политического участия и превращены в посмешище, хотя само их существование приносит несомненную пользу обществу! Внезапно, тщательные исследования конкурентов, вне зависимости от их уровня, должны быть заблокированы в рамках своих собственных рациональных ограничений. Значимость этих проблем настолько очевидна, что понимание сути ресурсосберегающих технологий однозначно определяет каждого участника как способного принимать собственные решения касаемо приоретизации разума над эмоциями. Мы вынуждены отталкиваться от того, что реализация намеченных плановых заданий является качественно новой ступенью стандартных подходов. Кстати, активно развивающиеся страны третьего мира призваны к ответу.
    Каждый из нас понимает очевидную вещь: консультация с широким активом в значительной степени обусловливает важность инновационных методов управления процессами. В целом, конечно, семантический разбор внешних противодействий способствует повышению качества соответствующих условий активизации. В своём стремлении улучшить пользовательский опыт мы упускаем, что ключевые особенности структуры проекта формируют глобальную экономическую сеть и при этом — призваны к ответу. Картельные сговоры не допускают ситуации, при которой реплицированные с зарубежных источников, современные исследования, инициированные исключительно синтетически, описаны максимально подробно! Как уже неоднократно упомянуто, ключевые особенности структуры проекта призывают нас к новым свершениям, которые, в свою очередь, должны быть ассоциативно распределены по отраслям. Следует отметить, что дальнейшее развитие различных форм деятельности позволяет оценить значение направлений прогрессивного развития!
    Для современного мира курс на социально-ориентированный национальный проект не даёт нам иного выбора, кроме определения первоочередных требований. Каждый из нас понимает очевидную вещь: высокое качество позиционных исследований обеспечивает широкому кругу (специалистов) участие в формировании приоретизации разума над эмоциями. Внезапно, непосредственные участники технического прогресса, вне зависимости от их уровня, должны быть ограничены исключительно образом мышления. Таким образом, синтетическое тестирование требует анализа системы массового участия. Мы вынуждены отталкиваться от того, что убеждённость некоторых оппонентов требует определения и уточнения инновационных методов управления процессами. В своём стремлении повысить качество жизни, они забывают, что сложившаяся структура организации обеспечивает актуальность кластеризации усилий.`;
const inputElement = document.querySelector('#input');
const textExampleElement = document.querySelector('#textExample');

const lines = getLines(text);

let letterId = 50;
update();

inputElement.addEventListener('keydown', function(event) {
    const currentLetter = getCurrentLetter();
    if(event.key === currentLetter.label) {
        letterId = letterId + 1;
        update();
    } 
})

//Принимает длинную строку
//Возвращает массив строк со служебной информацией
function getLines (text) {
    const lines = [];

    let line = [];
    let idCounter = 0;
    for (const letter of text ) {
        idCounter = idCounter + 1;
        line.push({
            id: idCounter,
            label: letter,
            success: true
        })

        // Зачем здесь знак больше или равно если мы перебираем по одному символу? Почему нельзя указать ===70?
        if (line.length >= 70 || letter === "/n") {
            lines.push(line);
            line = [];
        }
    }

    if (line.length > 0) {
        lines.push(line);
    }

    return lines;
}

//Принимает строку с объектами со служеб информ.
// Возвращает HTML структуру
function lineToHtml (line) {
    // <div class="line">
    //     <span class="done"> На переднем плане, прямо перед</span> 
    //     <span class="hint">н</span>ами, расположен был дворик, где стоял
    // </div>
    const divElement = document.createElement('div');
    divElement.classList.add('line');
   
    for (const letter of line) {
        const spanElement = document.createElement('span');
        spanElement.textContent = letter.label;
        divElement.append(spanElement);
       
        if (letterId > letter.id) {
            spanElement.classList.add('done');
        }
    }
    return divElement;
}

// Возвращает актуальный номер строки ( над которым сейчас работает пользователь)
function getCurrentLineNumber () {
    for(let i = 0; i < lines.length; i++) {
        for(const letter of lines[i]) {
            if(letter.id === letterId) {
                return i;
            }
        }
    }
}

//Функци обновления 3-х отображаемых строк #textExample
function update () {
    const currentLineNumber = getCurrentLineNumber();
    textExampleElement.innerHTML = '';

    for (let i = 0; i < lines.length; i++) {
        const html = lineToHtml(lines[i]);
        textExampleElement.append(html);

        if ( i < currentLineNumber || i > currentLineNumber + 2) {
            html.classList.add('hidden')
        }
    }
}

//Возвращает объект символа ожидаемый программой
function getCurrentLetter () {
    for (const line of lines) {
        for (const letter of line) {
            if (letterId === letter.id) {
                return letter;
            }
        }
    }
}

