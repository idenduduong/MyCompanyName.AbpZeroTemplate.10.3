var app = app || {};
(function () {

    app.localStorage = app.localStorage || {};

    app.localStorage.setItem = function (key, value) {
        if (!localforage) {
            return;
        }

        localforage.setItem(key, value);
    };

    app.localStorage.getItem = function (key, callback) {
        if (!localforage) {
            return;
        }
        if (callback) {
            localforage.getItem(key)
                .then(function (value) {
                    callback(value);
            });
        }
        else {
            return localforage.getItem(key);
        }
        
    };

})();
