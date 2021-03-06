(function () {
    "use strict"

    var nickname = document.querySelector('.nickname'); //никнейм
    var form = document.querySelector('.back');
    var btn = document.querySelector('.buttons__menu')
    var player = document.querySelector('.player'); //виселца
    var word = document.querySelector('.word'); //скрытое слово
    var wordLetters = document.querySelectorAll('.word__block'); //буквы скрытого слова
    var usedLetters = document.querySelector('.letters'); //исп буквы
    var stat = document.querySelector('.stat'); //угаданное слово
    var buttons = document.querySelector('.buttons'); //кнопка возврата на гл страницу
    var body = document.querySelector('body');

    var keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    
    var counterGame = 0;
    
    var wordsList = ['body', 'google', 'amazon', 'javascript', 'selector'];
    var currentWord = wordsList[counterGame];

    var counterUsed = 0;
    var counterRight = currentWord.length; //счетчик угаданных букв == длинна слова
    var wordLetters;
    
    
    start();

    function start() {
        currentWord = wordsList[counterGame];
        counterUsed = 0;
        counterRight = currentWord.length;
        addWord(); //создаем места для букв неизвестного слова
        addHangman(); //создраем виселицу
        clearUsedLetters(); //удаляем использованные буквы
    }

    function addWord() {
        word.innerHTML = "";
        for (var i = 0; i < currentWord.length; i++) {
            var newWordElem = document.createElement('div');
            newWordElem.className = 'word__block';
            newWordElem.innerHTML = '&nbsp&nbsp&nbsp'
            word.appendChild(newWordElem);
        }
        wordLetters = document.querySelectorAll('.word__block'); //буквы скрытого слова
    }

    function addHangman() {
        player.innerHTML = "";
        var newHangman = document.createElement('div');
        newHangman.className = 'hangman';
        newHangman.innerHTML = '<img src="../img/hangman_0.png" alt="" class ="hangman__img">'
        player.appendChild(newHangman);
    }
    
    function clearUsedLetters() {
        usedLetters.innerHTML = "";
        //wordLetters[pos].innerHTML = "";
    }
    
    

    //обработчик события нажатия клавиши
    window.addEventListener('keydown', function (event) {
        var pressedKey = keys[event.keyCode - "65"];
        if (pressedKey != undefined) {
            //alert(pressedKey);
            var flag = 0;
            var pos = -1;
            while ((pos = currentWord.indexOf(pressedKey, pos + 1)) != -1) {
                if (wordLetters[pos].innerHTML != pressedKey.toUpperCase()) {
                    //alert(counterRight);
                    addRightLetter(pressedKey, pos); //добавляем буквы, которые есть в слове
                    counterRight--;
                }
                flag = 1;
            }
            if (flag == 0 && usedLettersCheck(pressedKey)) {
                counterUsed++;
                //alert(counterUsed);
                addUsedLetter(pressedKey); //добавляем неверные буквы
            }
            theEndCheck();
        }
    }, false);

    function theEndCheck() {
        if (counterRight == 0) {
            setTimeout(function () {
                alert('Ви виграли!');
                if (confirm('Бажаєте зіграти ще?')) {
//                    window.location.href = "../pages/solo.html";
                    counterGame++;
                    addStatWord();
                    start();
                }
            }, 100);
            //            alert('Вы победили!');
            //            if(confirm('Желаете сыграть еще?')){
            //                window.location.href = "../pages/solo.html";
            //            }
        }
        if (counterUsed == 6) {
            setTimeout(function () {
                if (confirm('Ви програли. Спробуйте ще!')) {
                    start();
                    //window.location.href = "../pages/solo.html";
                }
            }, 100);
            //            alert('Вы победили!');
            //            if(confirm('Желаете сыграть еще?')){
            //                window.location.href = "../pages/solo.html";
            //            }
        }
    }

    function addUsedLetter(pressedKey) {
        var newUsedLetter = document.createElement('div');
        newUsedLetter.className = 'letters__used';
        newUsedLetter.innerHTML = pressedKey;
        usedLetters.appendChild(newUsedLetter);
        changeHangman(); //добавляем +1 к виселице
    }

    function usedLettersCheck(pressedKey) {
        var usedLettersBlock = document.querySelectorAll('.letters__used'); //неверные буквы
        for (var i = 0; i < usedLettersBlock.length; i++) {

            if (usedLettersBlock[i].innerHTML == pressedKey) {
                return false;
            }
        }
        return true;
    }
    
    function changeHangman() {
        var hangman = document.querySelector('.hangman'); //виселца
        hangman.innerHTML = '<img src="../img/hangman_' + counterUsed + '.png" alt="" class = "hangman__img">'
    }

    function addRightLetter(pressedKey, pos) {
        wordLetters = document.querySelectorAll('.word__block'); //буквы скрытого слова
        wordLetters[pos].innerHTML = pressedKey.toUpperCase();
    }

    function addStatWord(){
        var newStatWord = document.createElement('div');
        newStatWord.className = 'stat__word';
        newStatWord.innerHTML = currentWord;
        stat.appendChild(newStatWord);
    }
    
    btn.addEventListener('click', function (event) {
         window.location.href = "../index.html";
    });
    
})();
