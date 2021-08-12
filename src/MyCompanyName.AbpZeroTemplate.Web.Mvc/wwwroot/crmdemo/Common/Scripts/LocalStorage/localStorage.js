var app = app || {};
(function () {

    app.localStorage = app.localStorage || {};

    app.localStorage.setItem = function (key, value) {
        if (!localStorage) {
            return;
        }
        
        window.localStorage.setItem(key, JSON.stringify(value));
    };

    app.localStorage.getItem = function (key, callback) {
        if (!localStorage) {
            return null;
        }

        var value = window.localStorage.getItem(key);
        if (callback) {
            callback(value);
        } else {
            return value;
        }
    };

})();
