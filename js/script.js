(function () {

    var form = document.querySelector('.start');
    var playAlone = form.querySelector('.play__alone-button');
    var playDuo = form.querySelector('.play__duo-button');
    var name1 = form.querySelector('.nickname1');
    var name2 = form.querySelector('.nickname2');

    playAlone.addEventListener('click', function (event) {
        window.location.href = "pages/solo.html";
    });
    
    playDuo.addEventListener('click', function (event) {
        window.location.href = "pages/coop.html";
    });

    //првоерка, пустое ли поле
    var checkFieldsPresence = function () {
        if (!name1.value) {
            var error = generateError('Cant be blank');
            name1.parentElement.insertBefore(error, name1);
            return false;
        }
        if (!name2.value) {
            var error = generateError('Cant be blank');
            name2.parentElement.insertBefore(error, name2);
            return false;
        }
        return true;
    };

    var removeValidation = function () {
        var errors = form.querySelectorAll('.error');
        for (var i = 0; i < errors.length; i++) {
            errors[i].remove();
        }
    };

    var checkSecondPlayer = function () {
        if (name2.value != "none") {
            return true;
        } else {
            return false;
        }
    }

    var generateError = function (text) {
        var error = document.createElement('div');
        error.className = 'error';
        error.style.color = 'red';
        error.innerHTML = text;
        return error;
    };


})();
