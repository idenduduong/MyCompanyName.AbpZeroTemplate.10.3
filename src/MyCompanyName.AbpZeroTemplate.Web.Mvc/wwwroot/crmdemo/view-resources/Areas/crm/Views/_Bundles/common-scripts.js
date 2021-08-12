var app = app || {};
(function ($) {

    app.modals = app.modals || {};

    app.ModalManager = (function () {

        var _normalizeOptions = function (options) {
            if (!options.modalId) {
                options.modalId = 'Modal_' + (Math.floor((Math.random() * 1000000))) + new Date().getTime();
            }
        }

        function _removeContainer(modalId) {
            var _containerId = modalId + 'Container';
            var _containerSelector = '#' + _containerId;

            var $container = $(_containerSelector);
            if ($container.length) {
                $container.remove();
            }
        };

        function _createContainer(modalId, options) {
            _removeContainer(modalId);

            var _containerId = modalId + 'Container';
            return $('<div id="' + _containerId + '"></div>')
                .append(
                    '<div id="' + modalId + '" class="modal fade" role="modal" aria-hidden="true">' +
                    '  <div class="modal-dialog modal-lg"' + (options.width ? 'style="width:' + options.width + ' !important; max-width:' + options.width + '"' : '') + '>' +
                    '    <div class="modal-content"></div>' +
                    '  </div>' +
                    '</div>'
                ).appendTo('body');
        }

        return function (options) {

            _normalizeOptions(options);

            var _options = options;
            var _$modal = null;
            var _modalId = options.modalId;
            var _modalSelector = '#' + _modalId;
            var _modalObject = null;

            var _publicApi = null;
            var _args = null;
            var _getResultCallback = null;

            var _onCloseCallbacks = [];

            function _saveModal() {
                if (_modalObject && _modalObject.save) {
                    _modalObject.save();
                }
            }
            function _saveAndCloseModal() {
                if (_modalObject && _modalObject.save && _modalObject.close) {
                    _modalObject.saveAndClose();
                }
            }
            function _saveWithOtherAction() {
                if (_modalObject && _modalObject.saveWithOtherAction) {
                    _modalObject.saveWithOtherAction();
                }
            }

            function _shown(modal) {
                if (_modalObject && _modalObject.shown) {
                    _modalObject.shown(modal);
                }
            }


            function _initAndShowModal() {
                _$modal = $(_modalSelector);

                _$modal.modal({
                    backdrop: 'static',
                });

                _$modal.on('hidden.bs.modal', function () {
                    _removeContainer(_modalId);

                    for (var i = 0; i < _onCloseCallbacks.length; i++) {
                        _onCloseCallbacks[i]();
                    }
                });

                _$modal.on('shown.bs.modal', function () {
                    _$modal.find('input:not([type=hidden]):first').focus();
                    _shown(_$modal);
                });

                var modalClass = app.modals[options.modalClass];
                if (modalClass) {

                    _modalObject = new modalClass();
                    if (_modalObject.init) {
                        _modalObject.init(_publicApi, _args);
                    }
                }

                _$modal.find('.save-button').click(function () {
                    _saveModal();
                });

                _$modal.find('.save-and-close-button').click(function () {
                    _saveAndCloseModal();
                });
                _$modal.find('.save-with-other-action-button').click(function () {
                    _saveWithOtherAction();
                });

                //_$modal.find('.modal-body').keydown(function (e) {
                //    if (e.which === 13) {
                //        if (e.target.tagName.toLocaleLowerCase() === "textarea") {
                //            e.stopPropagation();
                //        } else {
                //            e.preventDefault();
                //            _saveModal();
                //        }

                //    }
                //});

                _$modal.modal('show');
            };

            var _open = function (args, getResultCallback) {

                _args = args || {};
                _getResultCallback = getResultCallback;

                _createContainer(_modalId, options)
                    .find('.modal-content')
                    .load(options.viewUrl, _args, function (response, status, xhr) {
                        if (status == "error") {
                            abp.message.warn(abp.localization.abpWeb('InternalServerError'));
                            return;
                        };

                        if (options.scriptUrl) {
                            app.ResourceLoader.loadScript(options.scriptUrl, function () {
                                _initAndShowModal();
                            });
                        } else {
                            _initAndShowModal();
                        }
                    });
            };

            var _close = function () {
                if (!_$modal) {
                    return;
                }
                _$modal.modal('hide');
            };

            var _onClose = function (onCloseCallback) {
                _onCloseCallbacks.push(onCloseCallback);
            }

            function _setBusy(isBusy) {
                if (!_$modal) {
                    return;
                }

                _$modal.find('.modal-footer button').buttonBusy(isBusy);
            }

            _publicApi = {

                open: _open,

                reopen: function () {
                    _open(_args);
                },

                close: _close,

                getModalId: function () {
                    return _modalId;
                },

                getModal: function () {
                    return _$modal;
                },

                getArgs: function () {
                    return _args;
                },

                getOptions: function () {
                    return _options;
                },

                setBusy: _setBusy,

                setResult: function () {
                    _getResultCallback && _getResultCallback.apply(_publicApi, arguments);
                },

                onClose: _onClose
            }

            return _publicApi;

        };
    })();

})(jQuery);
/**
 * app.ResourceLoader can be used to load scripts when needed.
 * It ensures that every script is only loaded once.
 */
var app = app || {};
(function ($) {

    /* UrlStates enum */
    var UrlStates = {
        LOADING: 'LOADING',
        LOADED: 'LOADED',
        FAILED: 'FAILED'
    };

    /* UrlInfo class */
    function UrlInfo() {
        this.state = UrlStates.LOADING;
        this.loadCallbacks = [];
        this.failCallbacks = [];
    }

    UrlInfo.prototype.succeed = function () {
        this.state = UrlStates.LOADED;
        for (var i = 0; i < this.loadCallbacks.length; i++) {
            this.loadCallbacks[i]();
        }
    };

    UrlInfo.prototype.failed = function () {
        this.state = UrlStates.FAILED;
        for (var i = 0; i < this.failCallbacks.length; i++) {
            this.failCallbacks[i]();
        }
    };

    UrlInfo.prototype.handleCallbacks = function (loadCallback, failCallback) {
        switch (this.state) {
            case UrlStates.LOADED:
                loadCallback && loadCallback();
                break;
            case UrlStates.FAILED:
                failCallback && failCallback();
                break;
            case UrlStates.LOADING:
                this.addCallbacks(loadCallback, failCallback);
                break;
        }
    };

    UrlInfo.prototype.addCallbacks = function (loadCallback, failCallback) {
        loadCallback && this.loadCallbacks.push(loadCallback);
        failCallback && this.failCallbacks.push(failCallback);
    };

    /* ResourceLoader API */

    app.ResourceLoader = (function () {

        var _urlInfos = {};

        var _loadScript = function (url, loadCallback, failCallback) {

            var urlInfo = _urlInfos[url];

            if (urlInfo) {
                urlInfo.handleCallbacks(loadCallback, failCallback);
                return;
            }

            _urlInfos[url] = urlInfo = new UrlInfo();
            urlInfo.addCallbacks(loadCallback, failCallback);

            $.getScript(url)
                .done(function (script, textStatus) {
                    urlInfo.succeed();
                })
                .fail(function (jqxhr, settings, exception) {
                    urlInfo.failed();
                });
        };

        return {
            loadScript: _loadScript
        }
    })();

})(jQuery);
/* An empty javascript file.
 * Used in ScriptPaths.JQuery_Validation_Localization.*/
var app = app || {};
(function ($) {

    app.UserNotificationHelper = (function () {

        return function () {

            /* Message Extracting based on Notification Data Type ********/

            //add your custom notification data types here...

            /* Example:
            abp.notifications.messageFormatters['crmdemo.MyNotificationDataType'] = function(userNotification) {
                return ...; //format and return message here
            };
            */

            var _notificationService = abp.services.app.notification;

            /* Converter functions ***************************************/

            function getUrl(userNotification) {
                switch (userNotification.notification.notificationName) {
                    case 'App.NewUserRegistered':
                        return '/crm/users?filterText=' + userNotification.notification.data.properties.emailAddress;
                    case 'App.NewTenantRegistered':
                        return '/crm/tenants?filterText=' + userNotification.notification.data.properties.tenancyName;
                        //Add your custom notification names to navigate to a URL when user clicks to a notification.
                }

                //No url for this notification
                return '#';
            };

            /* PUBLIC functions ******************************************/

            var format = function (userNotification, truncateText) {
                var formatted = {
                    userNotificationId: userNotification.id,
                    text: abp.notifications.getFormattedMessageFromUserNotification(userNotification),
                    time: moment(userNotification.notification.creationTime).format("YYYY-MM-DD HH:mm:ss"),
                    icon: app.notification.getUiIconBySeverity(userNotification.notification.severity),
                    state: abp.notifications.getUserNotificationStateAsString(userNotification.state),
                    data: userNotification.notification.data,
                    url: getUrl(userNotification),
                    isUnread: userNotification.state === abp.notifications.userNotificationState.UNREAD,
                    timeAgo: moment(userNotification.notification.creationTime).fromNow()
                };

                if (truncateText || truncateText === undefined) {
                    formatted.text = abp.utils.truncateStringWithPostfix(formatted.text, 100);
                }
                
                return formatted;
            };

            var show = function (userNotification) {
                //Application notification
                abp.notifications.showUiNotifyForUserNotification(userNotification, {
                    'onclick': function () {
                        //Take action when user clicks to live toastr notification
                        var url = getUrl(userNotification);
                        if (url) {
                            location.href = url;
                        }
                    }
                });

                //Desktop notification
                Push.create("crmdemo", {
                    body: format(userNotification).text,
                    icon: abp.appPath + 'Common/Images/app-logo-small.png',
                    timeout: 6000,
                    onClick: function () {
                        window.focus();
                        this.close();
                    }
                });
            };

            var setAllAsRead = function (callback) {
                _notificationService.setAllNotificationsAsRead().done(function () {
                    abp.event.trigger('app.notifications.refresh');
                    callback && callback();
                });
            };

            var setAsRead = function (userNotificationId, callback) {
                _notificationService.setNotificationAsRead({
                    id: userNotificationId
                }).done(function () {
                    abp.event.trigger('app.notifications.read', userNotificationId);
                    callback && callback(userNotificationId);
                });
            };

            var openSettingsModal = function () {
                new app.ModalManager({
                    viewUrl: abp.appPath + 'crm/Notifications/SettingsModal',
                    scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/Notifications/_SettingsModal.js',
                    modalClass: 'NotificationSettingsModal'
                }).open();
            };

            /* Expose public API *****************************************/

            return {
                format: format,
                show: show,
                setAllAsRead: setAllAsRead,
                setAsRead: setAsRead,
                openSettingsModal: openSettingsModal
            };

        };

    })();

})(jQuery);
var app = app || {};
(function () {

    $.extend(app, {
        consts: {
            maxProfilPictureBytesUserFriendlyValue: 5,
            grid: {
                defaultPageSize: 10,
                defaultPageSizes: [10, 20, 50, 100]
            },
            userManagement: {
                defaultAdminUserName: 'admin'
            },
            contentTypes: {
                formUrlencoded: 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            friendshipState: {
                accepted: 1,
                blocked: 2
            }
        }
    });

})();
var app = app || {};
(function () {

    var appLocalizationSource = abp.localization.getSource('crmdemo');
    app.localize = function () {
        return appLocalizationSource.apply(this, arguments);
    };

    app.downloadTempFile = function (file) {
        location.href = abp.appPath + 'File/DownloadTempFile?fileType=' + file.fileType + '&fileToken=' + file.fileToken + '&fileName=' + file.fileName;
    };

    app.createDateRangePickerOptions = function (extraOptions) {
        extraOptions = extraOptions ||
            {
                allowFutureDate: false
            };

        var options = {
            locale: {
                format: 'L',
                applyLabel: app.localize('Apply'),
                cancelLabel: app.localize('Cancel'),
                customRangeLabel: app.localize('CustomRange')
            },
            min: moment('2015-05-01'),
            minDate: moment('2015-05-01'),
            opens: 'left',
            ranges: {}
        };

        if (!extraOptions.allowFutureDate) {
            options.max = moment();
            options.maxDate = moment();
        }

        options.ranges[app.localize('Today')] = [moment().startOf('day'), moment().endOf('day')];
        options.ranges[app.localize('Yesterday')] = [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')];
        options.ranges[app.localize('Last7Days')] = [moment().subtract(6, 'days').startOf('day'), moment().endOf('day')];
        options.ranges[app.localize('Last30Days')] = [moment().subtract(29, 'days').startOf('day'), moment().endOf('day')];
        options.ranges[app.localize('ThisMonth')] = [moment().startOf('month'), moment().endOf('month')];
        options.ranges[app.localize('LastMonth')] = [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')];

        return options;
    };

    app.getUserProfilePicturePath = function (profilePictureId) {
        return profilePictureId ?
            (abp.appPath + 'Profile/GetProfilePictureById?id=' + profilePictureId) :
            (abp.appPath + 'Common/Images/default-profile-picture.png');
    }
    app.getUserProfilePicturePath = function () {
        return abp.appPath + 'Profile/GetProfilePicture?v=' + new Date().valueOf();
    }

    app.getShownLinkedUserName = function (linkedUser) {
        if (!abp.multiTenancy.isEnabled) {
            return linkedUser.username;
        } else {
            if (linkedUser.tenancyName) {
                return linkedUser.tenancyName + '\\' + linkedUser.username;
            } else {
                return '.\\' + linkedUser.username;
            }
        }
    }

    app.notification = app.notification || {};

    app.notification.getUiIconBySeverity = function (severity) {
        switch (severity) {
            case abp.notifications.severity.SUCCESS:
                return 'fa fa-check';
            case abp.notifications.severity.WARN:
                return 'fa fa-warning';
            case abp.notifications.severity.ERROR:
                return 'fa fa-bolt';
            case abp.notifications.severity.FATAL:
                return 'fa fa-bomb';
            case abp.notifications.severity.INFO:
            default:
                return 'fa fa-info';
        }
    };

    app.changeNotifyPosition = function (positionClass) {
        if (!toastr) {
            return;
        }

        toastr.clear();
        toastr.options.positionClass = positionClass;
    };

    app.waitUntilElementIsReady = function (selector, callback, checkPeriod) {
        if (!$) {
            return;
        }

        var elementCount = selector.split(',').length;

        if (!checkPeriod) {
            checkPeriod = 100;
        }

        var checkExist = setInterval(function () {
            if ($(selector).length >= elementCount) {
                clearInterval(checkExist);
                callback();
            }
        }, checkPeriod);
    };

    app.calculateTimeDifference = function (fromTime, toTime, period) {
        if (!moment) {
            return null;
        }

        var from = moment(fromTime);
        var to = moment(toTime);
        return to.diff(from, period);
    };

    app.htmlUtils = {
        htmlEncodeText: function (value) {
            return $("<div/>").text(value).html();
        },

        htmlDecodeText: function (value) {
            return $("<div/>").html(value).text();
        },

        htmlEncodeJson: function (jsonObject) {
            return JSON.parse(app.htmlUtils.htmlEncodeText(JSON.stringify(jsonObject)));
        },

        htmlDecodeJson: function (jsonObject) {
            return JSON.parse(app.htmlUtils.htmlDecodeText(JSON.stringify(jsonObject)));
        }
    };
})();
/* Here, there are some custom plug-ins.
 * Developed for ASP.NET Iteration Zero (http://aspnetzero.com). */
(function ($) {
    if (!$) {
        return;
    }

    /* A simple jQuery plug-in to make a button busy. */
    $.fn.buttonBusy = function (isBusy) {
        return $(this).each(function () {
            var $button = $(this);
            var $icon = $button.find('i');
            var $buttonInnerSpan = $button.find('span');

            if (isBusy) {
                if ($button.hasClass('button-busy')) {
                    return;
                }

                $button.attr('disabled', 'disabled');

                //change icon
                if ($icon.length) {
                    $button.data('iconOriginalClasses', $icon.attr('class'));
                    $icon.removeClass();
                    $icon.addClass('fa fa-spin fa-spinner');
                }

                //change text
                if ($buttonInnerSpan.length && $button.attr('busy-text')) {
                    $button.data('buttonOriginalText', $buttonInnerSpan.html());
                    $buttonInnerSpan.html($button.attr('busy-text'));
                }

                $button.addClass('button-busy');
            } else {
                if (!$button.hasClass('button-busy')) {
                    return;
                }
                
                //enable button
                $button.removeAttr('disabled');

                //restore icon
                if ($icon.length && $button.data('iconOriginalClasses')) {
                    $icon.removeClass();
                    $icon.addClass($button.data('iconOriginalClasses'));
                }

                //restore text
                if ($buttonInnerSpan.length && $button.data('buttonOriginalText')) {
                    $buttonInnerSpan.html($button.data('buttonOriginalText'));
                }

                $button.removeClass('button-busy');
            }
        });
    };

    $.fn.serializeFormToObject = function() {
        var $form = $(this);
        var fields = $form.find('[disabled]');
        fields.prop('disabled', false);
        var json = $form.serializeJSON();
        //$form.find('.numeric').each(function () {
        //    
        //    json[this.name] = Globalize(abp.localization.currentCulture.name).parseFloat($(this).val())
        //});
        fields.prop('disabled', true);
        return json;
    };

})(jQuery);
(function ($) {
    $.validator.setDefaults({
        errorElement: 'div',
        errorClass: 'form-control-feedback',
        focusInvalid: false,
        submitOnKeyPress: true,
        ignore:':hidden',
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-danger');
        },

        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-danger');
        },

        errorPlacement: function (error, element) {
            if (element.closest('.input-icon').length === 1) {
                error.insertAfter(element.closest('.input-icon'));
            } else {
                error.insertAfter(element);
            }
        },

        success: function (label) {
            label.closest('.form-group').removeClass('has-danger');
            label.remove();
        },

        submitHandler: function (form) {
            $(form).find('.alert-danger').hide();
        }
    });
})(jQuery);
(function () {

    //Set Moment Timezone
    if (abp.clock.provider.supportsMultipleTimezone && window.moment) {
        moment.tz.setDefault(abp.timing.timeZoneInfo.iana.timeZoneId);
    }

    //Localize Sweet Alert
    if (abp.libs.sweetAlert) {
        abp.libs.sweetAlert.config.info.buttons = [app.localize("Ok")];
        abp.libs.sweetAlert.config.success.buttons = [app.localize("Ok")];
        abp.libs.sweetAlert.config.warn.buttons = [app.localize("Ok")];
        abp.libs.sweetAlert.config.error.buttons = [app.localize("Ok")];

        abp.libs.sweetAlert.config.confirm.buttons = [app.localize("Cancel"), app.localize("Yes")];
    }

})();
(function () {
    app.PasswordComplexityHelper = function () {

        function reviver(key, val) {
            if (key && key.charAt(0) !== key.charAt(0).toLowerCase())
                this[key.charAt(0).toLowerCase() + key.slice(1)] = val;
            else
                return val;
        };

        var _buildPasswordComplexityErrorMessage = function (setting) {
            var message = "<ul style='display: inline-block;'>";

            if (setting.requireDigit) {
                message += "<li>" + app.localize("PasswordComplexity_RequireDigit_Hint") + "</li>";
            }

            if (setting.requireLowercase) {
                message += "<li>" + app.localize("PasswordComplexity_RequireLowercase_Hint") + "</li>";
            }

            if (setting.requireNonAlphanumeric) {
                message += "<li>" + app.localize("PasswordComplexity_RequireNonAlphanumeric_Hint") + "</li>";
            }

            if (setting.useLowerCaseLetters) {
                message += "<li>" + app.localize("PasswordComplexity_UseLowerCaseLetters_Hint") + "</li>";
            }

            if (setting.requireUppercase) {
                message += "<li>" + app.localize("PasswordComplexity_RequireUppercase_Hint") + "</li>";
            }

            if (setting.requiredLength > 0) {
                message += "<li>" + abp.utils.formatString(app.localize("PasswordComplexity_RequiredLength_Hint"), setting.requiredLength) + "</li>";
            }

            return message + "</ul>";
        }

        var _setPasswordComplexityRules = function ($elements, setting) {
            if (!$elements) {
                return;
            }

            setting = JSON.parse(JSON.stringify(setting), reviver);

            if (setting) {
                var message = _buildPasswordComplexityErrorMessage(setting);

                jQuery.validator.addMethod("passwordComplexity", function (value, element) {
                    if (!element.hasAttribute("required") && value === "") {
                        return true;
                    }

                    if (setting.requireDigit && !/[0-9]/.test(value)) {
                        return false;
                    }

                    if (setting.requireLowercase && !/[a-z]/.test(value)) {
                        return false;
                    }

                    if (setting.requireUppercase && !/[A-Z]/.test(value)) {
                        return false;
                    }

                    if (setting.requiredLength && value.length < setting.requiredLength) {
                        return false;
                    }

                    if (setting.requireNonAlphanumeric && /^[0-9a-zA-Z]+$/.test(value)) {
                        return false;
                    }

                    return true;
                }, message);

                for (var i = 0; i < $elements.length; i++) {
                    var $element = $($elements[i]);
                    $element.rules("add", "passwordComplexity");
                }

            }
        };

        return {
            setPasswordComplexityRules: _setPasswordComplexityRules
        };
    };
})();
var app = app || {};
(function () {
    app.utils = app.utils || {};

    app.utils.string = {
        truncate: function (str, maxLength, postfix) {
            if (!str || !maxLength || str.length <= maxLength) {
                return str;
            }

            if (postfix === false) {
                return str.substr(0, maxLength);
            }

            return str.substr(0, maxLength - 1) + '&#133;';
        }
    }

    app.utils.date = {
        containsTime: function (date) {
            if (!date) {
                return false;
            }

            return date.indexOf(":") !== -1;
        },

        getEndOfDay: function (date) {
            if (!date || !moment) {
                return null;
            }

            return moment(date).endOf('day');
        },

        getEndOfDayIfTimeNotExists: function (date) {
            if (this.containsTime(date)) {
                return date;
            }

            return this.getEndOfDay(date);
        },

        formatAsLongDateTime: function (date) {
            return moment(date).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

        }
    }


})();
var app = app || {};
(function () {

    app.chat = app.chat || {};
    app.chat.side = {
        sender: 1,
        receiver: 2
    };

    app.chat.readState = {
        unread: 1,
        read: 2
    };

    app.chat.sendMessage = function () {
        console.log(arguments);
    };

})();

var app = app || {};
(function ($) {

    //Check if SignalR is defined
    if (!$ || !$.connection) {
        return;
    }

    //Create namespaces
    app.signalr = app.signalr || {};
    app.signalr.hubs = app.signalr.hubs || {};

    //Get the chat hub
    app.signalr.hubs.chat = app.signalr.hubs.chat || $.connection.chatHub;

    var chatHub = app.signalr.hubs.chat;
    if (!chatHub) {
        return;
    }

    $.connection.hub.stateChanged(function (data) {
        if (data.newState === $.connection.connectionState.connected) {
            abp.event.trigger('app.chat.connected');
        }
    });

    chatHub.client.getChatMessage = function (message) {
        abp.event.trigger('app.chat.messageReceived', message);
    };

    chatHub.client.getAllFriends = function (friends) {
        abp.event.trigger('abp.chat.friendListChanged', friends);
    };

    chatHub.client.getFriendshipRequest = function (friendData, isOwnRequest) {
        abp.event.trigger('app.chat.friendshipRequestReceived', friendData, isOwnRequest);
    };

    chatHub.client.getUserConnectNotification = function (friend, isConnected) {
        abp.event.trigger('app.chat.userConnectionStateChanged',
            {
                friend: friend,
                isConnected: isConnected
            });
    };

    chatHub.client.getUserStateChange = function (friend, state) {
        abp.event.trigger('app.chat.userStateChanged',
            {
                friend: friend,
                state: state
            });
    };

    chatHub.client.getallUnreadMessagesOfUserRead = function (friend) {
        abp.event.trigger('app.chat.allUnreadMessagesOfUserRead',
            {
                friend: friend
            });
    };

    chatHub.client.getReadStateChange = function (friend) {
        abp.event.trigger('app.chat.readStateChange',
            {
                friend: friend
            });
    };

    app.chat.sendMessage = function (messageData, callback) {
        if ($.connection.hub.state !== $.signalR.connectionState.connected) {
            callback && callback();
            abp.notify.warn(app.localize('ChatIsNotConnectedWarning'));
            return;
        }

        chatHub.server.sendMessage(messageData).done(function (result) {
            if (result) {
                abp.notify.warn(result);
            }

        }).always(function () {
            callback && callback();
        });
    };

})(jQuery);
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

/************************************************************************
* Ajax extension for datatables                                         *
*************************************************************************/
(function ($) {

    if (!$.fn.dataTableExt) {
        return;
    }

    var doAjax = function (listAction, requestData, callbackFunction, settings) {
        var inputFilter = {};

        //set table defined filters
        if (listAction.inputFilter) {
            inputFilter = $.extend(inputFilter, listAction.inputFilter());
        }

        //set paging filters
        if (settings.oInit.paging) {
            inputFilter = $.extend(inputFilter, {
                maxResultCount: requestData.length,
                skipCount: requestData.start
            });
        }

        //set sorting filter
        if (requestData.order && requestData.order.length > 0) {
            var orderingField = requestData.order[0];
            if (requestData.columns[orderingField.column].data) {
                inputFilter.sorting = requestData.columns[orderingField.column].data + " " + orderingField.dir;
            }
        }

        //execute ajax function with filter
        if (listAction.ajaxFunction) {
            listAction.ajaxFunction(inputFilter)
                .done(function (result) {
                    //store raw server response for custom rendering.
                    settings.rawServerResponse = result;

                    //html encoding can be disabled by adding "disableResponseHtmlEncoding: true" to "listAction" field
                    var dataItems;
                    if (listAction.disableResponseHtmlEncoding) {
                        dataItems = result.items;
                    } else {
                        //HTML encodes the response items for XSS protection.
                        dataItems = app.htmlUtils.htmlEncodeJson(result.items);
                    }

                    //invoke callback
                    callbackFunction({
                        recordsTotal: result.totalCount,
                        recordsFiltered: result.totalCount,
                        data: dataItems
                    });
                });
        }
    }

    if (!$.fn.dataTable) {
        return;
    }

    $.extend(true, $.fn.dataTable.defaults, {
        ajax: function (requestData, callbackFunction, settings) {
            if (!settings) {
                return;
            }

            if (!settings.oInit) {
                return;
            }

            if (!settings.oInit.listAction) {
                return;
            }

            doAjax(settings.oInit.listAction, requestData, callbackFunction, settings);
        }
    });

    $.fn.dataTable.Api.register('ajax.reloadPage()', function () {
        // user paging is not reset on reload. https://datatables.net/reference/api/ajax.reload()
        this.ajax.reload(null, false);
    });

})(jQuery);

/************************************************************************
* Overrides default settings for datatables                             *
*************************************************************************/
(function ($) {
    if (!$.fn.dataTable) {
        return;
    }
    $.fn.dataTable.Responsive.defaults.details.renderer = function (api, rowIdx, columns) {
        var data = $.map(columns, function (col, i) {
            return col.hidden ?
                '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
                '<td width="30%">' + col.title + ':' + '</td> ' +
                '<td width="70%">' + col.data + '</td>' +
                '</tr>' :
                '';
        }).join('');

        return data ?
            $('<table/>').addClass('datatable-child-table').append(data) :
            false;
    };
    $.fn.dataTable.Responsive.defaults.details.target = ".expand";
    $.fn.dataTable.Responsive.defaults.details.type = "column";
    $.fn.dataTable.defaults.bFilter = false;
})(jQuery);
/************************************************************************
* Overrides default settings for datatables                             *
*************************************************************************/
(function ($) {
    if (!$.fn.dataTable) {
        return;
    }

    var translationsUrl = abp.appPath + 'Common/Scripts/Datatables/Translations/' +
        abp.localization.currentCulture.displayNameEnglish +
        '.json';

    $.ajax(translationsUrl)
        .fail(function () {
            translationsUrl = abp.appPath + 'Common/Scripts/Datatables/Translations/English.json';
            console.log('Language is set to English for datatables, because ' + abp.localization.currentCulture.displayNameEnglish + ' is not found!');
        }).always(function () {
            $.extend(true, $.fn.dataTable.defaults, {
                language: {
                    url: translationsUrl
                },
                lengthMenu: [5, 10, 25, 50, 100, 250, 500],
                pageLength: 10,
                responsive: true,
                searching: false,
                pagingType: "bootstrap_full_number",
                //dom: 'rt<"bottom"ilp><"clear">',
                order: []
            });
        });

    /* Set the defaults for DataTables initialisation */
    $.extend(true, $.fn.dataTable.defaults, {
        //"dom": "<'row'<'col-md-6 col-sm-6'l><'col-md-6 col-sm-6'f>r><'table-scrollable't><'row'<'col-md-7 il col-sm-7'p>>", // default layout with horizobtal scrollable datatable
        //"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // datatable layout without  horizobtal scroll(used when bootstrap dropdowns used in the datatable cells)
        "dom": 'rt<"bottom"<"info" i><"pagination" p><"length" l>><"clear">',
        "language": {
            "lengthMenu": " _MENU_ records ",
            "paginate": {
                "previous": 'Prev',
                "next": 'Next',
                "page": "Page",
                "pageOf": "of"
            }
        },
        "info": true,
        "lengthChange": true,
        "pagingType": "bootstrap_number"
    });

    /* Default class modification */
    $.extend($.fn.dataTableExt.oStdClasses, {
        "sWrapper": "dataTables_wrapper",
        "sFilterInput": "form-control m-input form-control-sm",
        "sLengthSelect": "form-control m-input form-control-sm"
    });

    // In 1.10 we use the pagination renderers to draw the Bootstrap paging,
    // rather than  custom plug-in
    $.fn.dataTable.defaults.renderer = 'bootstrap';
    $.fn.dataTable.ext.renderer.pageButton.bootstrap = function (settings, host, idx, buttons, page, pages) {
        var api = new $.fn.dataTable.Api(settings);
        var classes = settings.oClasses;
        var lang = settings.oLanguage.oPaginate;
        var btnDisplay, btnClass;

        var attach = function (container, buttons) {
            var i, ien, node, button;
            var clickHandler = function (e) {
                e.preventDefault();
                if (e.data.action !== 'ellipsis') {
                    api.page(e.data.action).draw(false);
                }
            };

            for (i = 0, ien = buttons.length; i < ien; i++) {
                button = buttons[i];

                if ($.isArray(button)) {
                    attach(container, button);
                } else {
                    btnDisplay = '';
                    btnClass = '';

                    switch (button) {
                        case 'ellipsis':
                            btnDisplay = '&hellip;';
                            btnClass = 'disabled';
                            break;

                        case 'first':
                            btnDisplay = lang.sFirst;
                            btnClass = button + (page > 0 ?
                                '' : ' disabled');
                            break;

                        case 'previous':
                            btnDisplay = lang.sPrevious;
                            btnClass = button + (page > 0 ?
                                '' : ' disabled');
                            break;

                        case 'next':
                            btnDisplay = lang.sNext;
                            btnClass = button + (page < pages - 1 ?
                                '' : ' disabled');
                            break;

                        case 'last':
                            btnDisplay = lang.sLast;
                            btnClass = button + (page < pages - 1 ?
                                '' : ' disabled');
                            break;

                        default:
                            btnDisplay = button + 1;
                            btnClass = page === button ?
                                'active' : '';
                            break;
                    }

                    if (btnDisplay) {
                        node = $('<li>', {
                            'class': classes.sPageButton + ' ' + btnClass,
                            'aria-controls': settings.sTableId,
                            'tabindex': settings.iTabIndex,
                            'id': idx === 0 && typeof button === 'string' ?
                                settings.sTableId + '_' + button : null
                        })
                            .append($('<a>', {
                                'href': '#'
                            })
                                .html(btnDisplay)
                            )
                            .appendTo(container);

                        settings.oApi._fnBindAction(
                            node, {
                                action: button
                            }, clickHandler
                        );
                    }
                }
            }
        };

        attach(
            $(host).empty().html('<ul class="pagination"/>').children('ul'),
            buttons
        );
    }

    /***
    Custom Pagination
    ***/

    /* API method to get paging information */
    $.fn.dataTableExt.oApi.fnPagingInfo = function (oSettings) {
        if (oSettings == null || oSettings == undefined) {
            return {
                "iStart": 0,
                "iEnd": 0,
                "iLength": 0,
                "iTotal": 0,
                "iFilteredTotal": 0,
                "iPage":0,
                "iTotalPages": 0
            }; 
        }
        return {
            "iStart": oSettings._iDisplayStart,
            "iEnd": oSettings.fnDisplayEnd(),
            "iLength": oSettings._iDisplayLength,
            "iTotal": oSettings.fnRecordsTotal(),
            "iFilteredTotal": oSettings.fnRecordsDisplay(),
            "iPage": oSettings._iDisplayLength === -1 ?
                0 : Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength),
            "iTotalPages": oSettings._iDisplayLength === -1 ?
                0 : Math.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength)
        };
    };

    /* Bootstrap style full number pagination control */
    $.extend($.fn.dataTableExt.oPagination, {
        "bootstrap_full_number": {
            "fnInit": function (oSettings, nPaging, fnDraw) {
                var oLang = oSettings.oLanguage.oPaginate;
                var fnClickHandler = function (e) {
                    e.preventDefault();
                    if (oSettings.oApi._fnPageChange(oSettings, e.data.action)) {
                        fnDraw(oSettings);
                    }
                };

                $(nPaging).append(
                    '<ul class="pagination">' +
                    '<li class="prev disabled"><a href="#" title="' + oLang.sFirst + '"><i class="fa fa-angle-double-left"></i></a></li>' +
                    '<li class="prev disabled"><a href="#" title="' + oLang.sPrevious + '"><i class="fa fa-angle-left"></i></a></li>' +
                    '<li class="next disabled"><a href="#" title="' + oLang.sNext + '"><i class="fa fa-angle-right"></i></a></li>' +
                    '<li class="next disabled"><a href="#" title="' + oLang.sLast + '"><i class="fa fa-angle-double-right"></i></a></li>' +
                    '</ul>'
                );
                var els = $('a', nPaging);
                $(els[0]).bind('click.DT', {
                    action: "first"
                }, fnClickHandler);
                $(els[1]).bind('click.DT', {
                    action: "previous"
                }, fnClickHandler);
                $(els[2]).bind('click.DT', {
                    action: "next"
                }, fnClickHandler);
                $(els[3]).bind('click.DT', {
                    action: "last"
                }, fnClickHandler);
            },

            "fnUpdate": function (oSettings, fnDraw) {
                var iListLength = 5;
                
                var oPaging = oSettings.oInstance.fnPagingInfo();
                var an = oSettings.aanFeatures.p;
                var i, j, sClass, iStart, iEnd, iHalf = Math.floor(iListLength / 2);

                if (oPaging.iTotalPages < iListLength) {
                    iStart = 1;
                    iEnd = oPaging.iTotalPages;
                } else if (oPaging.iPage <= iHalf) {
                    iStart = 1;
                    iEnd = iListLength;
                } else if (oPaging.iPage >= (oPaging.iTotalPages - iHalf)) {
                    iStart = oPaging.iTotalPages - iListLength + 1;
                    iEnd = oPaging.iTotalPages;
                } else {
                    iStart = oPaging.iPage - iHalf + 1;
                    iEnd = iStart + iListLength - 1;
                }

                for (i = 0, iLen = an.length; i < iLen; i++) {
                    if (oPaging.iTotalPages <= 0) {
                        $('.pagination', an[i]).css('visibility', 'hidden');
                    } else {
                        $('.pagination', an[i]).css('visibility', 'visible');
                    }

                    // Remove the middle elements
                    $('li:gt(1)', an[i]).filter(':not(.next)').remove();

                    // Add the new list items and their event handlers
                    for (j = iStart; j <= iEnd; j++) {
                        sClass = (j == oPaging.iPage + 1) ? 'class="active"' : '';
                        $('<li ' + sClass + '><a href="#">' + j + '</a></li>')
                            .insertBefore($('li.next:first', an[i])[0])
                            .bind('click', function (e) {
                                e.preventDefault();
                                oSettings._iDisplayStart = (parseInt($('a', this).text(), 10) - 1) * oPaging.iLength;
                                fnDraw(oSettings);
                            });
                    }

                    // Add / remove disabled classes from the static elements
                    if (oPaging.iPage === 0) {
                        $('li.prev', an[i]).addClass('disabled');
                    } else {
                        $('li.prev', an[i]).removeClass('disabled');
                    }

                    if (oPaging.iPage === oPaging.iTotalPages - 1 || oPaging.iTotalPages === 0) {
                        $('li.next', an[i]).addClass('disabled');
                    } else {
                        $('li.next', an[i]).removeClass('disabled');
                    }
                }
            }
        }
    });

    $.extend($.fn.dataTableExt.oPagination, {
        "bootstrap_number": {
            "fnInit": function (oSettings, nPaging, fnDraw) {
                var oLang = oSettings.oLanguage.oPaginate;
                var fnClickHandler = function (e) {
                    e.preventDefault();
                    if (oSettings.oApi._fnPageChange(oSettings, e.data.action)) {
                        fnDraw(oSettings);
                    }
                };

                $(nPaging).append(
                    '<ul class="pagination">' +
                    '<li class="prev disabled"><a href="#" title="' + oLang.sPrevious + '"><i class="fa fa-angle-left"></i></a></li>' +
                    '<li class="next disabled"><a href="#" title="' + oLang.sNext + '"><i class="fa fa-angle-right"></i></a></li>' +
                    '</ul>'
                );
                var els = $('a', nPaging);
                $(els[0]).bind('click.DT', {
                    action: "previous"
                }, fnClickHandler);
                $(els[1]).bind('click.DT', {
                    action: "next"
                }, fnClickHandler);
            },

            "fnUpdate": function (oSettings, fnDraw) {
                var iListLength = 5;
                var oPaging = oSettings.oInstance.fnPagingInfo();
                var an = oSettings.aanFeatures.p;
                var i, j, sClass, iStart, iEnd, iHalf = Math.floor(iListLength / 2);

                if (oPaging.iTotalPages < iListLength) {
                    iStart = 1;
                    iEnd = oPaging.iTotalPages;
                } else if (oPaging.iPage <= iHalf) {
                    iStart = 1;
                    iEnd = iListLength;
                } else if (oPaging.iPage >= (oPaging.iTotalPages - iHalf)) {
                    iStart = oPaging.iTotalPages - iListLength + 1;
                    iEnd = oPaging.iTotalPages;
                } else {
                    iStart = oPaging.iPage - iHalf + 1;
                    iEnd = iStart + iListLength - 1;
                }

                for (i = 0, iLen = an.length; i < iLen; i++) {
                    if (oPaging.iTotalPages <= 0) {
                        $('.pagination', an[i]).css('visibility', 'hidden');
                    } else {
                        $('.pagination', an[i]).css('visibility', 'visible');
                    }

                    // Remove the middle elements
                    $('li:gt(0)', an[i]).filter(':not(.next)').remove();

                    // Add the new list items and their event handlers
                    for (j = iStart; j <= iEnd; j++) {
                        sClass = (j == oPaging.iPage + 1) ? 'class="active"' : '';
                        $('<li ' + sClass + '><a href="#">' + j + '</a></li>')
                            .insertBefore($('li.next:first', an[i])[0])
                            .bind('click', function (e) {
                                e.preventDefault();
                                oSettings._iDisplayStart = (parseInt($('a', this).text(), 10) - 1) * oPaging.iLength;
                                fnDraw(oSettings);
                            });
                    }

                    // Add / remove disabled classes from the static elements
                    if (oPaging.iPage === 0) {
                        $('li.prev', an[i]).addClass('disabled');
                    } else {
                        $('li.prev', an[i]).removeClass('disabled');
                    }

                    if (oPaging.iPage === oPaging.iTotalPages - 1 || oPaging.iTotalPages === 0) {
                        $('li.next', an[i]).addClass('disabled');
                    } else {
                        $('li.next', an[i]).removeClass('disabled');
                    }
                }
            }
        }
    });


    /* Bootstrap style full number pagination control */
    $.extend($.fn.dataTableExt.oPagination, {
        "bootstrap_extended": {
            "fnInit": function (oSettings, nPaging, fnDraw) {
                var oLang = oSettings.oLanguage.oPaginate;
                var oPaging = oSettings.oInstance.fnPagingInfo();

                var fnClickHandler = function (e) {
                    e.preventDefault();
                    if (oSettings.oApi._fnPageChange(oSettings, e.data.action)) {
                        fnDraw(oSettings);
                    }
                };

                $(nPaging).append(
                    '<div class="pagination-panel"> ' + (oLang.page ? oLang.page : '') + ' ' +
                    '<a href="#" class="btn btn-sm default prev disabled"><i class="fa fa-angle-left"></i></a>' +
                    '<input type="text" class="pagination-panel-input form-control input-sm input-inline input-mini" maxlenght="5" style="text-align:center; margin: 0 5px;">' +
                    '<a href="#" class="btn btn-sm default next disabled"><i class="fa fa-angle-right"></i></a> ' +
                    (oLang.pageOf ? oLang.pageOf + ' <span class="pagination-panel-total"></span>' : '') +
                    '</div>'
                );

                var els = $('a', nPaging);

                $(els[0]).bind('click.DT', {
                    action: "previous"
                }, fnClickHandler);
                $(els[1]).bind('click.DT', {
                    action: "next"
                }, fnClickHandler);

                $('.pagination-panel-input', nPaging).bind('change.DT', function (e) {
                    var oPaging = oSettings.oInstance.fnPagingInfo();
                    e.preventDefault();
                    var page = parseInt($(this).val());
                    if (page > 0 && page <= oPaging.iTotalPages) {
                        if (oSettings.oApi._fnPageChange(oSettings, page - 1)) {
                            fnDraw(oSettings);
                        }
                    } else {
                        $(this).val(oPaging.iPage + 1);
                    }
                });

                $('.pagination-panel-input', nPaging).bind('keypress.DT', function (e) {
                    var oPaging = oSettings.oInstance.fnPagingInfo();
                    if (e.which == 13) {
                        var page = parseInt($(this).val());
                        if (page > 0 && page <= oSettings.oInstance.fnPagingInfo().iTotalPages) {
                            if (oSettings.oApi._fnPageChange(oSettings, page - 1)) {
                                fnDraw(oSettings);
                            }
                        } else {
                            $(this).val(oPaging.iPage + 1);
                        }
                        e.preventDefault();
                    }
                });
            },

            "fnUpdate": function (oSettings, fnDraw) {
                var iListLength = 5;
                var oPaging = oSettings.oInstance.fnPagingInfo();
                var an = oSettings.aanFeatures.p;
                var i, j, sClass, iStart, iEnd, iHalf = Math.floor(iListLength / 2);

                if (oPaging.iTotalPages < iListLength) {
                    iStart = 1;
                    iEnd = oPaging.iTotalPages;
                } else if (oPaging.iPage <= iHalf) {
                    iStart = 1;
                    iEnd = iListLength;
                } else if (oPaging.iPage >= (oPaging.iTotalPages - iHalf)) {
                    iStart = oPaging.iTotalPages - iListLength + 1;
                    iEnd = oPaging.iTotalPages;
                } else {
                    iStart = oPaging.iPage - iHalf + 1;
                    iEnd = iStart + iListLength - 1;
                }

                for (i = 0, iLen = an.length; i < iLen; i++) {
                    var wrapper = $(an[i]).parents(".dataTables_wrapper");

                    if (oPaging.iTotal <= 0) {
                        $('.dataTables_paginate, .dataTables_length', wrapper).hide();
                    } else {
                        $('.dataTables_paginate, .dataTables_length', wrapper).show();
                    }

                    if (oPaging.iTotalPages <= 0) {
                        $('.dataTables_paginate, .dataTables_length .seperator', wrapper).hide();
                    } else {
                        $('.dataTables_paginate, .dataTables_length .seperator', wrapper).show();
                    }

                    $('.pagination-panel-total', an[i]).html(oPaging.iTotalPages);
                    $('.pagination-panel-input', an[i]).val(oPaging.iPage + 1);

                    // Remove the middle elements
                    $('li:gt(1)', an[i]).filter(':not(.next)').remove();

                    // Add the new list items and their event handlers
                    for (j = iStart; j <= iEnd; j++) {
                        sClass = (j == oPaging.iPage + 1) ? 'class="active"' : '';
                        $('<li ' + sClass + '><a href="#">' + j + '</a></li>')
                            .insertBefore($('li.next:first', an[i])[0])
                            .bind('click', function (e) {
                                e.preventDefault();
                                oSettings._iDisplayStart = (parseInt($('a', this).text(), 10) - 1) * oPaging.iLength;
                                fnDraw(oSettings);
                            });
                    }

                    // Add / remove disabled classes from the static elements
                    if (oPaging.iPage === 0) {
                        $('a.prev', an[i]).addClass('disabled');
                    } else {
                        $('a.prev', an[i]).removeClass('disabled');
                    }

                    if (oPaging.iPage === oPaging.iTotalPages - 1 || oPaging.iTotalPages === 0) {
                        $('a.next', an[i]).addClass('disabled');
                    } else {
                        $('a.next', an[i]).removeClass('disabled');
                    }
                }
            }
        }
    });

})(jQuery);
/************************************************************************
* RECORD-ACTIONS extension for datatables                               *
*************************************************************************/
(function ($) {

    if (!$.fn.dataTableExt) {
        return;
    }

    var _createDropdownItem = function (record, fieldItem) {
        var $li = $('<li/>');
        var $a = $('<a/>');

        if (fieldItem.text) {
            $a.html(fieldItem.text);
        }

        if (fieldItem.action) {
            $a.click(function (e) {
                e.preventDefault();

                if (!$(this).closest('li').hasClass('disabled')) {
                    fieldItem.action({
                        record: record
                    });
                }
            });
        }

        $a.appendTo($li);
        return $li;
    }

    var _createButtonDropdown = function (record, field) {
        var $container = $('<div/>')
            .addClass('dropdown')
            .addClass('action-button');

        var $dropdownButton = $('<button/>')
            .html(field.text)
            .addClass('btn btn-brand btn-sm dropdown-toggle')
            .attr('data-toggle', 'dropdown')
            .attr('aria-haspopup', 'true')
            .attr('aria-expanded', 'false');

        if (field.cssClass) {
            $dropdownButton.addClass(field.cssClass);
        }

        var $dropdownItemsContainer = $('<ul/>').addClass('dropdown-menu');

        for (var i = 0; i < field.items.length; i++) {
            var fieldItem = field.items[i];

            if (fieldItem.visible && !fieldItem.visible({ record: record })) {
                continue;
            }

            var $dropdownItem = _createDropdownItem(record, fieldItem);

            if (fieldItem.enabled && !fieldItem.enabled({ record: record })) {
                $dropdownItem.addClass('disabled');
            }

            $dropdownItem.appendTo($dropdownItemsContainer);
        }

        if ($dropdownItemsContainer.find('li').length > 0) {
            $dropdownItemsContainer.appendTo($container);
            $dropdownButton.appendTo($container);
        }

        if ($dropdownItemsContainer.children().length === 0) {
            return "";
        }

        return $container;
    };

    var _createSingleButton = function (record, field) {
        $(field.element).data(record);

        if (field.visible === undefined) {
            return field.element;
        }

        var isVisibilityFunction = typeof field.visible === "function";
        if (isVisibilityFunction) {
            if (field.visible()) {
                return field.element;
            }
        } else {
            if (field.visible) {
                return field.element;
            }
        }

        return "";
    };

    var _createRowAction = function (record, field, tableInstance) {
        if (field.items && field.items.length > 1) {
            return _createButtonDropdown(record, field, tableInstance);
        } else if (field.length>0) {
            
            var $buttonsContainer = $('<span>');
            for (var i = 0; i < field.length; i++) {
                var $singleActionButton = _createSingleButton(record, field[i]);
                if ($singleActionButton != "") {
                    $singleActionButton.clone(true).appendTo($buttonsContainer);
                }
            }
            return $buttonsContainer;
            
        }

        return "";
    }

    var hideColumnWithoutRedraw = function (tableInstance, colIndex) {
        tableInstance.fnSetColumnVis(colIndex, false, false);
    }

    var hideEmptyColumn = function(cellContent, tableInstance, colIndex) {
        if (cellContent == "") {
            hideColumnWithoutRedraw(tableInstance, colIndex);
        }
    };

    var renderRowActions = function (tableInstance, nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        var columns;
        if (tableInstance.aoColumns) {
            columns = tableInstance.aoColumns;
        } else if (tableInstance.fnSettings()) {
            columns = tableInstance.fnSettings().aoColumns;
        }
        //else {
        //    
        //    //if ($.fn.DataTable.isDataTable($($(tableInstance[0]).id))) {
        //    columns = $("#" + $(tableInstance[0])[0].id).DataTable().columns().settings()[0].aoColumns;
        //}

        if (!columns) {
            return;
        }

        var cells = $(nRow).children("td");

        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var column = columns[colIndex];
            if (column.rowAction) {
                var $actionContainer = _createRowAction(aData, column.rowAction, tableInstance);
                hideEmptyColumn($actionContainer, tableInstance, colIndex);

                var $actionButton = $(cells[colIndex]).find(".action-button");
                if ($actionButton.length === 0) {
                    $(cells[colIndex]).append($actionContainer);
                }
            }
        }
    };

    var _existingApiRenderRowActionsFunction = $.fn.dataTableExt.oApi.renderRowActions;
    $.fn.dataTableExt.oApi.renderRowActions = function (tableInstance, nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        if (_existingApiRenderRowActionsFunction) {
            _existingApiRenderRowActionsFunction(tableInstance, nRow, aData, iDisplayIndex, iDisplayIndexFull);
        }

        renderRowActions(tableInstance, nRow, aData, iDisplayIndex, iDisplayIndexFull);
    };

    if (!$.fn.dataTable) {
        return;
    }

    var _existingDefaultFnRowCallback = $.fn.dataTable.defaults.fnRowCallback;
    
    $.extend(true, $.fn.dataTable.defaults, {
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            if (_existingDefaultFnRowCallback) {
                _existingDefaultFnRowCallback(this, nRow, aData, iDisplayIndex, iDisplayIndexFull);
            }

            renderRowActions(this, nRow, aData, iDisplayIndex, iDisplayIndexFull);
        }
    });

})(jQuery);
/**
 * jQuery number plug-in 2.1.5
 * Copyright 2012, Digital Fusion
 * Licensed under the MIT license.
 * http://opensource.teamdf.com/license/
 *
 * A jQuery plugin which implements a permutation of phpjs.org's number_format to provide
 * simple number formatting, insertion, and as-you-type masking of a number.
 *
 * @author	Sam Sehnert
 * @docs	http://www.teamdf.com/web/jquery-number-format-redux/196/
 */
(function ($) {

    "use strict";

	/**
	 * Method for selecting a range of characters in an input/textarea.
	 *
	 * @param int rangeStart			: Where we want the selection to start.
	 * @param int rangeEnd				: Where we want the selection to end.
	 *
	 * @return void;
	 */
    function setSelectionRange(rangeStart, rangeEnd) {
        // Check which way we need to define the text range.
        if (this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveStart('character', rangeStart);
            range.moveEnd('character', rangeEnd - rangeStart);
            range.select();
        }

        // Alternate setSelectionRange method for supporting browsers.
        else if (this.setSelectionRange) {
            this.focus();
            this.setSelectionRange(rangeStart, rangeEnd);
        }
    }

	/**
	 * Get the selection position for the given part.
	 *
	 * @param string part			: Options, 'Start' or 'End'. The selection position to get.
	 *
	 * @return int : The index position of the selection part.
	 */
    function getSelection(part) {
        var pos = this.value.length;

        // Work out the selection part.
        part = (part.toLowerCase() == 'start' ? 'Start' : 'End');

        if (document.selection) {
            // The current selection
            var range = document.selection.createRange(), stored_range, selectionStart, selectionEnd;
            // We'll use this as a 'dummy'
            stored_range = range.duplicate();
            // Select all text
            //stored_range.moveToElementText( this );
            stored_range.expand('textedit');
            // Now move 'dummy' end point to end point of original range
            stored_range.setEndPoint('EndToEnd', range);
            // Now we can calculate start and end points
            selectionStart = stored_range.text.length - range.text.length;
            selectionEnd = selectionStart + range.text.length;
            return part == 'Start' ? selectionStart : selectionEnd;
        }

        else if (typeof (this['selection' + part]) != "undefined") {
            pos = this['selection' + part];
        }
        return pos;
    }

	/**
	 * Substitutions for keydown keycodes.
	 * Allows conversion from e.which to ascii characters.
	 */
    var _keydown = {
        codes: {
            46: 127,
            188: 44,
            109: 45,
            190: 46,
            191: 47,
            192: 96,
            220: 92,
            222: 39,
            221: 93,
            219: 91,
            173: 45,
            187: 61, //IE Key codes
            186: 59, //IE Key codes
            189: 45, //IE Key codes
            110: 46  //IE Key codes
        },
        shifts: {
            96: "~",
            49: "!",
            50: "@",
            51: "#",
            52: "$",
            53: "%",
            54: "^",
            55: "&",
            56: "*",
            57: "(",
            48: ")",
            45: "_",
            61: "+",
            91: "{",
            93: "}",
            92: "|",
            59: ":",
            39: "\"",
            44: "<",
            46: ">",
            47: "?"
        }
    };

	/**
	 * jQuery number formatter plugin. This will allow you to format numbers on an element.
	 *
	 * @params proxied for format_number method.
	 *
	 * @return : The jQuery collection the method was called with.
	 */
    $.fn.number = function (number, decimals, dec_point, thousands_sep) {

        // Enter the default thousands separator, and the decimal placeholder.
        thousands_sep = (typeof thousands_sep === 'undefined') ? Globalize(abp.localization.currentCulture.name).culture().numberFormat[","] : thousands_sep;
        dec_point = (typeof dec_point === 'undefined') ? Globalize(abp.localization.currentCulture.name).culture().numberFormat["."] : dec_point;
        //thousands_sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep;
        //dec_point = (typeof dec_point === 'undefined') ? '.' : dec_point;
        decimals = (typeof decimals === 'undefined') ? 0 : decimals;

        // Work out the unicode character for the decimal placeholder.
        var u_dec = ('\\u' + ('0000' + (dec_point.charCodeAt(0).toString(16))).slice(-4)),
            regex_dec_num = new RegExp('[^' + u_dec + '0-9]', 'g'),
            regex_dec = new RegExp(u_dec, 'g');

        // If we've specified to take the number from the target element,
        // we loop over the collection, and get the number.
        if (number === true) {
            // If this element is a number, then we add a keyup
            if (this.is('input:text')) {
                // Return the jquery collection.
                return this.on({

					/**
					 * Handles keyup events, re-formatting numbers.
					 *
					 * Uses 'data' object to keep track of important information.
					 *
					 * data.c
					 * This variable keeps track of where the caret *should* be. It works out the position as
					 * the number of characters from the end of the string. E.g., '1^,234.56' where ^ denotes the caret,
					 * would be index -7 (e.g., 7 characters from the end of the string). At the end of both the key down
					 * and key up events, we'll re-position the caret to wherever data.c tells us the cursor should be.
					 * This gives us a mechanism for incrementing the cursor position when we come across decimals, commas
					 * etc. This figure typically doesn't increment for each keypress when to the left of the decimal,
					 * but does when to the right of the decimal.
					 *
					 * @param object e			: the keyup event object.s
					 *
					 * @return void;
					 */
                    'keydown.format': function (e) {

                        // Define variables used in the code below.
                        var $this = $(this),
                            data = $this.data('numFormat'),
                            code = (e.keyCode ? e.keyCode : e.which),
                            chara = '', //unescape(e.originalEvent.keyIdentifier.replace('U+','%u')),
                            start = getSelection.apply(this, ['start']),
                            end = getSelection.apply(this, ['end']),
                            val = '',
                            setPos = false;

                        // Webkit (Chrome & Safari) on windows screws up the keyIdentifier detection
                        // for numpad characters. I've disabled this for now, because while keyCode munging
                        // below is hackish and ugly, it actually works cross browser & platform.

                        //						if( typeof e.originalEvent.keyIdentifier !== 'undefined' )
                        //						{
                        //							chara = unescape(e.originalEvent.keyIdentifier.replace('U+','%u'));
                        //						}
                        //						else
                        //						{
                        if (_keydown.codes.hasOwnProperty(code)) {
                            code = _keydown.codes[code];
                        }
                        if (!e.shiftKey && (code >= 65 && code <= 90)) {
                            code += 32;
                        } else if (!e.shiftKey && (code >= 69 && code <= 105)) {
                            code -= 48;
                        } else if (e.shiftKey && _keydown.shifts.hasOwnProperty(code)) {
                            //get shifted keyCode value
                            chara = _keydown.shifts[code];
                        }

                        if (chara == '') chara = String.fromCharCode(code);
                        //						}




                        // Stop executing if the user didn't type a number key, a decimal character, backspace, or delete.
                        if (code != 8 && code != 45 && code != 127 && chara != dec_point && !chara.match(/[0-9]/)) {
                            // We need the original keycode now...
                            var key = (e.keyCode ? e.keyCode : e.which);
                            if ( // Allow control keys to go through... (delete, backspace, tab, enter, escape etc)
                                key == 46 || key == 8 || key == 127 || key == 9 || key == 27 || key == 13 ||
                                // Allow: Ctrl+A, Ctrl+R, Ctrl+P, Ctrl+S, Ctrl+F, Ctrl+H, Ctrl+B, Ctrl+J, Ctrl+T, Ctrl+Z, Ctrl++, Ctrl+-, Ctrl+0
                                ((key == 65 || key == 82 || key == 80 || key == 83 || key == 70 || key == 72 || key == 66 || key == 74 || key == 84 || key == 90 || key == 61 || key == 173 || key == 48) && (e.ctrlKey || e.metaKey) === true) ||
                                // Allow: Ctrl+V, Ctrl+C, Ctrl+X
                                ((key == 86 || key == 67 || key == 88) && (e.ctrlKey || e.metaKey) === true) ||
                                // Allow: home, end, left, right
                                ((key >= 35 && key <= 39)) ||
                                // Allow: F1-F12
                                ((key >= 112 && key <= 123))
                            ) {
                                return;
                            }
                            // But prevent all other keys.
                            e.preventDefault();
                            return false;
                        }

                        // The whole lot has been selected, or if the field is empty...
                        if (start == 0 && end == this.value.length) //|| $this.val() == 0 )
                        {
                            if (code == 8)		// Backspace
                            {
                                // Blank out the field, but only if the data object has already been instantiated.
                                start = end = 1;
                                this.value = '';

                                // Reset the cursor position.
                                data.init = (decimals > 0 ? -1 : 0);
                                data.c = (decimals > 0 ? -(decimals + 1) : 0);
                                setSelectionRange.apply(this, [0, 0]);
                            }
                            else if (chara == dec_point) {
                                start = end = 1;
                                this.value = '0' + dec_point + (new Array(decimals + 1).join('0'));

                                // Reset the cursor position.
                                data.init = (decimals > 0 ? 1 : 0);
                                data.c = (decimals > 0 ? -(decimals + 1) : 0);
                            }
                            else if (code == 45)	// Negative sign
                            {
                                start = end = 2;
                                this.value = '-0' + dec_point + (new Array(decimals + 1).join('0'));

                                // Reset the cursor position.
                                data.init = (decimals > 0 ? 1 : 0);
                                data.c = (decimals > 0 ? -(decimals + 1) : 0);

                                setSelectionRange.apply(this, [2, 2]);
                            }
                            else {
                                // Reset the cursor position.
                                data.init = (decimals > 0 ? -1 : 0);
                                data.c = (decimals > 0 ? -(decimals) : 0);
                            }
                        }

                        // Otherwise, we need to reset the caret position
                        // based on the users selection.
                        else {
                            data.c = end - this.value.length;
                        }

                        // Track if partial selection was used
                        data.isPartialSelection = start == end ? false : true;

                        // If the start position is before the decimal point,
                        // and the user has typed a decimal point, we need to move the caret
                        // past the decimal place.
                        if (decimals > 0 && chara == dec_point && start == this.value.length - decimals - 1) {
                            data.c++;
                            data.init = Math.max(0, data.init);
                            e.preventDefault();

                            // Set the selection position.
                            setPos = this.value.length + data.c;
                        }

                        // Ignore negative sign unless at beginning of number (and it's not already present)
                        else if (code == 45 && (start != 0 || this.value.indexOf('-') == 0)) {
                            e.preventDefault();
                        }

                        // If the user is just typing the decimal place,
                        // we simply ignore it.
                        else if (chara == dec_point) {
                            data.init = Math.max(0, data.init);
                            e.preventDefault();
                        }

                        // If hitting the delete key, and the cursor is before a decimal place,
                        // we simply move the cursor to the other side of the decimal place.
                        else if (decimals > 0 && code == 127 && start == this.value.length - decimals - 1) {
                            // Just prevent default but don't actually move the caret here because it's done in the keyup event
                            e.preventDefault();
                        }

                        // If hitting the backspace key, and the cursor is behind a decimal place,
                        // we simply move the cursor to the other side of the decimal place.
                        else if (decimals > 0 && code == 8 && start == this.value.length - decimals) {
                            e.preventDefault();
                            data.c--;

                            // Set the selection position.
                            setPos = this.value.length + data.c;
                        }

                        // If hitting the delete key, and the cursor is to the right of the decimal
                        // we replace the character after the caret with a 0.
                        else if (decimals > 0 && code == 127 && start > this.value.length - decimals - 1) {
                            if (this.value === '') return;

                            // If the character following is not already a 0,
                            // replace it with one.
                            if (this.value.slice(start, start + 1) != '0') {
                                val = this.value.slice(0, start) + '0' + this.value.slice(start + 1);
                                // The regex replacement below removes negative sign from numbers...
                                // not sure why they're necessary here when none of the other cases use them
                                //$this.val(val.replace(regex_dec_num,'').replace(regex_dec,dec_point));
                                $this.val(val);
                            }

                            e.preventDefault();

                            // Set the selection position.
                            setPos = this.value.length + data.c;
                        }

                        // If hitting the backspace key, and the cursor is to the right of the decimal
                        // (but not directly to the right) we replace the character preceding the
                        // caret with a 0.
                        else if (decimals > 0 && code == 8 && start > this.value.length - decimals) {
                            if (this.value === '') return;

                            // If the character preceding is not already a 0,
                            // replace it with one.
                            if (this.value.slice(start - 1, start) != '0') {
                                val = this.value.slice(0, start - 1) + '0' + this.value.slice(start);
                                // The regex replacement below removes negative sign from numbers...
                                // not sure why they're necessary here when none of the other cases use them
                                //$this.val(val.replace(regex_dec_num,'').replace(regex_dec,dec_point));
                                $this.val(val);
                            }

                            e.preventDefault();
                            data.c--;

                            // Set the selection position.
                            setPos = this.value.length + data.c;
                        }

                        // If the delete key was pressed, and the character immediately
                        // after the caret is a thousands_separator character, simply
                        // step over it.
                        else if (code == 127 && this.value.slice(start, start + 1) == thousands_sep) {
                            // Just prevent default but don't actually move the caret here because it's done in the keyup event
                            e.preventDefault();
                        }

                        // If the backspace key was pressed, and the character immediately
                        // before the caret is a thousands_separator character, simply
                        // step over it.
                        else if (code == 8 && this.value.slice(start - 1, start) == thousands_sep) {
                            e.preventDefault();
                            data.c--;

                            // Set the selection position.
                            setPos = this.value.length + data.c;
                        }

                        // If the caret is to the right of the decimal place, and the user is entering a
                        // number, remove the following character before putting in the new one.
                        else if (
                            decimals > 0 &&
                            start == end &&
                            this.value.length > decimals + 1 &&
                            start > this.value.length - decimals - 1 && isFinite(+chara) &&
                            !e.metaKey && !e.ctrlKey && !e.altKey && chara.length === 1
                        ) {
                            // If the character preceding is not already a 0,
                            // replace it with one.
                            if (end === this.value.length) {
                                val = this.value.slice(0, start - 1);
                            }
                            else {
                                val = this.value.slice(0, start) + this.value.slice(start + 1);
                            }

                            // Reset the position.
                            this.value = val;
                            setPos = start;
                        }

                        // If we need to re-position the characters.
                        if (setPos !== false) {
                            //console.log('Setpos keydown: ', setPos );
                            setSelectionRange.apply(this, [setPos, setPos]);
                        }

                        // Store the data on the element.
                        $this.data('numFormat', data);

                    },

					/**
					 * Handles keyup events, re-formatting numbers.
					 *
					 * @param object e			: the keyup event object.s
					 *
					 * @return void;
					 */
                    'keyup.format': function (e) {

                        // Store these variables for use below.
                        var $this = $(this),
                            data = $this.data('numFormat'),
                            code = (e.keyCode ? e.keyCode : e.which),
                            start = getSelection.apply(this, ['start']),
                            end = getSelection.apply(this, ['end']),
                            setPos;


                        // Check for negative characters being entered at the start of the string.
                        // If there's any kind of selection, just ignore the input.
                        if (start === 0 && end === 0 && (code === 189 || code === 109)) {
                            $this.val('-' + $this.val());

                            start = 1;
                            data.c = 1 - this.value.length;
                            data.init = 1;

                            $this.data('numFormat', data);

                            setPos = this.value.length + data.c;
                            setSelectionRange.apply(this, [setPos, setPos]);
                        }

                        // Stop executing if the user didn't type a number key, a decimal, or a comma.
                        if (this.value === '' || (code < 48 || code > 57) && (code < 96 || code > 105) && code !== 8 && code !== 46 && code !== 110) return;

                        // Re-format the textarea.
                        $this.val($this.val());

                        if (decimals > 0) {
                            // If we haven't marked this item as 'initialized'
                            // then do so now. It means we should place the caret just
                            // before the decimal. This will never be un-initialized before
                            // the decimal character itself is entered.
                            if (data.init < 1) {
                                start = this.value.length - decimals - (data.init < 0 ? 1 : 0);
                                data.c = start - this.value.length;
                                data.init = 1;

                                $this.data('numFormat', data);
                            }

                            // Increase the cursor position if the caret is to the right
                            // of the decimal place, and the character pressed isn't the backspace key.
                            else if (start > this.value.length - decimals && code != 8) {
                                data.c++;

                                // Store the data, now that it's changed.
                                $this.data('numFormat', data);
                            }
                        }

                        // Move caret to the right after delete key pressed
                        if (code == 46 && !data.isPartialSelection) {
                            data.c++;

                            // Store the data, now that it's changed.
                            $this.data('numFormat', data);
                        }

                        //console.log( 'Setting pos: ', start, decimals, this.value.length + data.c, this.value.length, data.c );

                        // Set the selection position.
                        setPos = this.value.length + data.c;
                        setSelectionRange.apply(this, [setPos, setPos]);
                    },

					/**
					 * Reformat when pasting into the field.
					 *
					 * @param object e 		: jQuery event object.
					 *
					 * @return false : prevent default action.
					 */
                    'paste.format': function (e) {

                        // Defint $this. It's used twice!.
                        var $this = $(this),
                            original = e.originalEvent,
                            val = null;

                        // Get the text content stream.
                        if (window.clipboardData && window.clipboardData.getData) { // IE
                            val = window.clipboardData.getData('Text');
                        } else if (original.clipboardData && original.clipboardData.getData) {
                            val = original.clipboardData.getData('text/plain');
                        }

                        // Do the reformat operation.
                        $this.val(val);

                        // Stop the actual content from being pasted.
                        e.preventDefault();
                        return false;
                    }

                })

                    // Loop each element (which isn't blank) and do the format.
                    .each(function () {

                        var $this = $(this).data('numFormat', {
                            c: -(decimals + 1),
                            decimals: decimals,
                            thousands_sep: thousands_sep,
                            dec_point: dec_point,
                            regex_dec_num: regex_dec_num,
                            regex_dec: regex_dec,
                            init: this.value.indexOf('.') ? true : false
                        });

                        // Return if the element is empty.
                        if (this.value === '') return;

                        // Otherwise... format!!
                        $this.val($this.val());
                    });
            }
            else {
                // return the collection.
                return this.each(function () {
                    var $this = $(this), num = +$this.text().replace(regex_dec_num, '').replace(regex_dec, '.');
                    $this.number(!isFinite(num) ? 0 : +num, decimals, dec_point, thousands_sep);
                });
            }
        }

        // Add this number to the element as text.
        return this.text($.number.apply(window, arguments));
    };

    //
    // Create .val() hooks to get and set formatted numbers in inputs.
    //

    // We check if any hooks already exist, and cache
    // them in case we need to re-use them later on.
    var origHookGet = null, origHookSet = null;

    // Check if a text valHook already exists.
    if ($.isPlainObject($.valHooks.text)) {
        // Preserve the original valhook function
        // we'll call this for values we're not
        // explicitly handling.
        if ($.isFunction($.valHooks.text.get)) origHookGet = $.valHooks.text.get;
        if ($.isFunction($.valHooks.text.set)) origHookSet = $.valHooks.text.set;
    }
    else {
        // Define an object for the new valhook.
        $.valHooks.text = {};
    }

	/**
	* Define the valHook to return normalised field data against an input
	* which has been tagged by the number formatter.
	*
	* @param object el			: The raw DOM element that we're getting the value from.
	*
	* @return mixed : Returns the value that was written to the element as a
	*				  javascript number, or undefined to let jQuery handle it normally.
	*/
    $.valHooks.text.get = function (el) {

        // Get the element, and its data.
        var $this = $(el), num, negative,
            data = $this.data('numFormat');

        // Does this element have our data field?
        if (!data) {
            // Check if the valhook function already existed
            if ($.isFunction(origHookGet)) {
                // There was, so go ahead and call it
                return origHookGet(el);
            }
            else {
                // No previous function, return undefined to have jQuery
                // take care of retrieving the value
                return undefined;
            }
        }
        else {
            // Remove formatting, and return as number.
            if (el.value === '') return '';


            // Convert to a number.
            num = +(el.value
                .replace(data.regex_dec_num, '')
                .replace(data.regex_dec, '.'));

            // If we've got a finite number, return it.
            // Otherwise, simply return 0.
            // Return as a string... thats what we're
            // used to with .val()
            return (el.value.indexOf('-') === 0 ? '-' : '') + (isFinite(num) ? num : 0);
        }
    };

	/**
	* A valhook which formats a number when run against an input
	* which has been tagged by the number formatter.
	*
	* @param object el		: The raw DOM element (input element).
	* @param float			: The number to set into the value field.
	*
	* @return mixed : Returns the value that was written to the element,
	*				  or undefined to let jQuery handle it normally.
	*/
    $.valHooks.text.set = function (el, val) {
        // Get the element, and its data.
        var $this = $(el),
            data = $this.data('numFormat');

        // Does this element have our data field?
        if (!data) {

            // Check if the valhook function already exists
            if ($.isFunction(origHookSet)) {
                // There was, so go ahead and call it
                return origHookSet(el, val);
            }
            else {
                // No previous function, return undefined to have jQuery
                // take care of retrieving the value
                return undefined;
            }
        }
        else {
            var num = $.number(val, data.decimals, data.dec_point, data.thousands_sep);

            // Make sure empties are set with correct signs.
            //			if(val.indexOf('-') === 0 && +num === 0)
            //			{
            //				num = '-'+num;
            //			}

            return $.isFunction(origHookSet) ? origHookSet(el, num) : el.value = num;
        }
    };

	/**
	 * The (modified) excellent number formatting method from PHPJS.org.
	 * http://phpjs.org/functions/number_format/
	 *
	 * @modified by Sam Sehnert (teamdf.com)
	 *	- don't redefine dec_point, thousands_sep... just overwrite with defaults.
	 *	- don't redefine decimals, just overwrite as numeric.
	 *	- Generate regex for normalizing pre-formatted numbers.
	 *
	 * @param float number			: The number you wish to format, or TRUE to use the text contents
	 *								  of the element as the number. Please note that this won't work for
	 *								  elements which have child nodes with text content.
	 * @param int decimals			: The number of decimal places that should be displayed. Defaults to 0.
	 * @param string dec_point		: The character to use as a decimal point. Defaults to '.'.
	 * @param string thousands_sep	: The character to use as a thousands separator. Defaults to ','.
	 *
	 * @return string : The formatted number as a string.
	 */
    $.number = function (number, decimals, dec_point, thousands_sep) {
        // Set the default values here, instead so we can use them in the replace below.
        thousands_sep = (typeof thousands_sep === 'undefined') ? Globalize(abp.localization.currentCulture.name).culture().numberFormat[","] : thousands_sep;
        dec_point = (typeof dec_point === 'undefined') ? Globalize(abp.localization.currentCulture.name).culture().numberFormat["."] : dec_point;
        decimals = !isFinite(+decimals) ? 0 : Math.abs(decimals);

        // Work out the unicode representation for the decimal place and thousand sep.
        var u_dec = ('\\u' + ('0000' + (dec_point.charCodeAt(0).toString(16))).slice(-4));
        var u_sep = ('\\u' + ('0000' + (thousands_sep.charCodeAt(0).toString(16))).slice(-4));

        // Fix the number, so that it's an actual number.
        number = (number + '')
            .replace('\.', dec_point) // because the number if passed in as a float (having . as decimal point per definition) we need to replace this with the passed in decimal point character
            .replace(new RegExp(u_sep, 'g'), '')
            .replace(new RegExp(u_dec, 'g'), '.')
            .replace(new RegExp('[^0-9+\-Ee.]', 'g'), '');

        var n = !isFinite(+number) ? 0 : +number,
            s = '',
            toFixedFix = function (n, decimals) {
                return '' + (+(Math.round(('' + n).indexOf('e') > 0 ? n : n + 'e+' + decimals) + 'e-' + decimals));
            };

        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        s = (decimals ? toFixedFix(n, decimals) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, thousands_sep);
        }
        if ((s[1] || '').length < decimals) {
            s[1] = s[1] || '';
            s[1] += new Array(decimals - s[1].length + 1).join('0');
        }
        return s.join(dec_point);
    }

})(jQuery);

/*! Editable 0.0.1-dev
 * 2018 ABCSOFT - datatables.net/license
 */

/**
 * @summary     Editable
 * @description Editable tables plug-in for DataTables
 * @version     0.0.1-dev
 * @file        dataTables.editable.js
 * @author      ABCSOFT (www.abcsoft.vn)
 * @contact     www.abcsoft.vn/contact
 * @copyright   Copyright 2018 ABCSOFT.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery', 'datatables.net'], function ($) {
			return factory($, window, document);
		});
	}
	else if (typeof exports === 'object') {
		// CommonJS
		module.exports = function (root, $) {
			if (!root) {
				root = window;
			}

			if (!$ || !$.fn.dataTable) {
				$ = require('datatables.net')(root, $).$;
			}

			return factory($, root, root.document);
		};
	}
	else {
		// Browser
		factory(jQuery, window, document);
	}
}(function ($, window, document, undefined) {
	'use strict';
	var DataTable = $.fn.dataTable;


	/**
	 * Editable is a plug-in for the DataTables library that makes use of
	 * DataTables' ability to edit data with localStorage.
	 * The end result is that rows data will be edited with dynamically built form.
	 *
	 *  @class
	 *  @param {object} settings DataTables settings object for the host table
	 *  @param {object} [opts] Configuration options
	 *  @requires jQuery 1.7+
	 *  @requires DataTables 1.10.3+
	 *
	 *  @example
	 *      $('#example').DataTable( {
	 *        responsive: true
	 *      } );
	 *    } );
	 */

	var Editable = function (settings, opts) {
		// Sanity check that we are using DataTables 1.10 or newer
		if (!DataTable.versionCheck || !DataTable.versionCheck('1.10.10')) {
			throw 'DataTables Responsive requires DataTables 1.10.10 or newer';
		}

		this.s = {
			dt: new DataTable.Api(settings),
			columns: [],
			current: []
		};

		// Check if editable has already been initialised on this table
		if (this.s.dt.settings()[0] && this.s.dt.settings()[0]._editable) {
			return;
		}

		// details is an object, but for simplicity the user can give it as a string
		// or a boolean
		if (opts && typeof opts.details === 'string') {
			opts.details = { type: opts.details };
		}
		else if (opts && opts.details === false) {
			opts.details = { type: false };
		}
		else if (opts && opts.details === true) {
			opts.details = { type: 'inline' };
		}
		this.columns = [];
		this.c = $.extend(true, {}, Editable.defaults, DataTable.defaults.editable, opts);
		settings.editable = this;
		this._constructor();
	};


	$.extend(Editable.prototype, {
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Constructor
		 */

		/**
		 * Initialise the Editable instance
		 *
		 * @private
		 */
		_constructor: function () {
			var that = this;
			var dt = this.s.dt;
			var dtPrivateSettings = dt.settings()[0];
			// todo check
			dt.settings()[0]._editable = this;
			// Details handler
			var details = this.c.details;
			that._classLogic(dtPrivateSettings);
			if (details.type !== false) {
				that._editFormInit();
				$(dt.table().node()).addClass('dtr-' + details.type);
			}

			// todo check
			// On Ajax reload we want to reopen any child rows which are displayed
			// by responsive
			// dt.on( 'preXhr.dtr', function () {
			// 	var rowIds = [];
			// 	dt.rows().every( function () {
			// 		if ( this.child.isShown() ) {
			// 			rowIds.push( this.id(true) );
			// 		}
			// 	} );

			// 	dt.one( 'draw.dtr', function () {
			// 		that._resizeAuto();
			// 		that._resize();

			// 		dt.rows( rowIds ).every( function () {
			// 			that._detailsDisplay( this, false );
			// 		} );
			// 	} );
			// });
		},


		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Private methods
		 */

		/**
		 * Create the internal `columns` array with information about the columns
		 * for the table. 
		 *
		 * @private
		 */
		_classLogic: function (settings) {
			var that = this;
			var dt = this.s.dt;
			var aoColumns = settings.aoColumns;
			that.columns = $.map(aoColumns, function (column) {
				if ($.isPlainObject(column)) {
					var fieldConstructor = (column.controlType && Editable.fields[column.controlType]) || Editable.Field;
					column = new fieldConstructor(column);
				}
				return column;
			});
		},

		/**
		 * Show the edit form for the child row
		 *
		 * @param  {DataTables.Api} row    API instance for the row
		 * @param  {boolean}        update Update flag
		 * @private
		 */
		_editFormDisplay: function (row, update) {
			var that = this;
			var dt = this.s.dt;
			var details = this.c.details;

			if (details && details.type !== false) {
				var edi = details.display(row, update, function () {
					// render form from data object
					return details.renderer(
						dt, row[0], that._detailsObj(row[0]), that._renderTemplate, update
					);
				});

				if (edi === true || edi === false) {
					$(dt.table().node()).triggerHandler('edit-form-display.dt', [dt, row, edi, update]);
				}
			}
		},


		/**
		 * Initialisation for the edit form handler
		 *
		 * @private
		 */
		_editFormInit: function () {
			var that = this;
			var dt = this.s.dt;
			var details = this.c.details;

			// The inline type always uses the first child as the target
			// todo check
			if (details.type === 'inline') {
				details.target = 'td:not(first-child), th:first-child';
			}

			// Keyboard accessibility
			// dt.on( 'draw.dtr', function () {
			// 	that._tabIndexes();
			// } );
			// that._tabIndexes(); // Initial draw has already happened

			// $( dt.table().body() ).on( 'keyup.dtr', 'td, th', function (e) {
			// 	if ( e.keyCode === 13 && $(this).data('dtr-keyboard') ) {
			// 		$(this).click();
			// 	}
			// } );

			// type.target can be a string jQuery selector or a column index
			var target = details.target;
			var selector = typeof target === 'string' ? target : 'td, th';
			var createSelector = typeof createTarget=='string' ? createTarget: 'dt-create-btn';
			// Click handler to show / hide the create form when they are available
			$(dt.table().body())
				.on('click', selector, function (e) {
						that._editFormDisplay(row, false);
				});

			// Click handler to show / hide the edit form when they are available
			$(dt.table().body())
				.on('click.dtr mousedown.dtr mouseup.dtr', selector, function (e) {

					// Check that the row is actually a DataTable's controlled node
					if ($.inArray($(this).closest('tr').get(0), dt.rows().nodes().toArray()) === -1) {
						return;
					}

					// For column index, we determine if we should act or not in the
					// handler - otherwise it is already okay
					if (typeof target === 'number') {
						var targetIdx = target < 0 ?
							dt.columns().eq(0).length + target :
							target;

						if (dt.cell(this).index().column !== targetIdx) {
							return;
						}
					}

					// $().closest() includes itself in its check
					var row = dt.row($(this).closest('tr'));

					// Check event type to do an action
					if (e.type === 'click') {
						// The renderer is given as a function so the caller can execute it
						// only when they need (i.e. if hiding there is no point is running
						// the renderer)
						that._editFormDisplay(row, false);
					}
					else if (e.type === 'mousedown') {
						// For mouse users, prevent the focus ring from showing
						$(this).css('outline', 'none');
					}
					else if (e.type === 'mouseup') {
						// And then re-allow at the end of the click
						$(this).blur().css('outline', '');
					}
				});
		},

		// todo check
		/**
		 * Get the details to pass to a renderer for a row
		 * @param  {int} rowIdx Row index
		 * @private
		 */
		_detailsObj: function (rowIdx) {
			var that = this;
			var dt = this.s.dt;
			var data;
			if(rowIdx && dt.row(rowIdx)){
				data = dt.row(rowIdx).data();
			}
			
			
			return $.map(that.columns, function (col) {
				// Never and control columns should not be passed to the renderer
				if (col.controlType == "Control") {
					return;
				}
				
				return $.extend(true, col, {
					title: col.sTitle,
					data: data? data[col.data]:null,
					dataName: col.data,
					backendFieldName: col.backendFieldName,
					backendFieldData: data? data[col.backendFieldName]: null,
					rowIndex: rowIdx})
			});
		},

		_renderTemplate: function (source, context, config) {
			var getOrApply = function (value, context) {
				if ($.isFunction(value)) {
					return value.apply(context, $.makeArray(arguments).slice(2));
				}
				return value;
			};
			var args = [];
			for (var key in config) {
				args.push(config[key]);
			}

			args.unshift(source, context);

			source = getOrApply.apply(null, args);
			return (source === undefined || source === null) ? "" : source;
		},
	});

	/**
	 * Field Type
	 */

	Editable.fields = {};


	/**
	 * Display methods - functions which define how the edit form should be shown
	 * in the table.
	 *
	 * @namespace
	 * @name Editable.defaults
	 * @static
	 */
	Editable.display = {
		childRow: function (row, update, render) {
			if (update) {
				if ($(row.node()).hasClass('parent')) {
					row.child(render(), 'child').show();

					return true;
				}
			}
			else {
				if (!row.child.isShown()) {
					row.child(render(), 'child').show();
					$(row.node()).addClass('parent');

					return true;
				}
				else {
					row.child(false);
					$(row.node()).removeClass('parent');

					return false;
				}
			}
		},
		// todo check
		// childRowImmediate: function ( row, update, render ) {
		// 	if ( (! update && row.child.isShown()) || ! row.responsive.hasHidden() ) {
		// 		// User interaction and the row is show, or nothing to show
		// 		row.child( false );
		// 		$( row.node() ).removeClass( 'parent' );

		// 		return false;
		// 	}
		// 	else {
		// 		// Display
		// 		row.child( render(), 'child' ).show();
		// 		$( row.node() ).addClass( 'parent' );

		// 		return true;
		// 	}
		// },

		// This is a wrapper so the modal options for Bootstrap and jQuery UI can
		// have options passed into them. This specific one doesn't need to be a
		// function but it is for consistency in the `modal` name
		modal: function (options) {
			return function (row, update, render) {
				if (!update) {
					// Show a modal
					var close = function () {
						modal.remove(); // will tidy events for us
						$(document).off('keypress.dtr');
					};

					var modal = $('<div class="dtr-modal"/>')
						.append($('<div class="dtr-modal-display"/>')
							.append($('<div class="dtr-modal-content"/>')
								.append(render())
							)
							.append($('<div class="dtr-modal-close">&times;</div>')
								.click(function () {
									close();
								})
							)
						)
						.append($('<div class="dtr-modal-background"/>')
							.click(function () {
								close();
							})
						)
						.appendTo('body');

					$(document).on('keyup.dtr', function (e) {
						if (e.keyCode === 27) {
							e.stopPropagation();

							close();
						}
					});
				}
				else {
					$('div.dtr-modal-content')
						.empty()
						.append(render());
				}

				if (options && options.header) {
					$('div.dtr-modal-content').prepend(
						'<h2>' + options.header(row) + '</h2>'
					);
				}
			};
		}
	};


	/**
	 * Display methods - functions which define how the hidden data should be shown
	 * in the table.
	 *
	 * @namespace
	 * @name Editable.defaults
	 * @static
	 */
	Editable.renderer = {
		horizontalForm: function () {
			return function (api, rowIdx, controls, templateRenderer, update) {
				var div = $('<div style="border-bottom:1px solid #ccc; border-top:1px solid #ccc; padding-top: 10px" data-dtr-index="' + rowIdx + '" class="dtr-details"></div>');
				var numberOfElementsInARow = 4;
				var totalSize = 12 / numberOfElementsInARow;
				var labelSize;
				var controlSize;
				switch (0) {
					case totalSize % 3:
						labelSize = totalSize / 3;
						break;
					case totalSize % 4:
						labelSize = totalSize / 4;
						break;
					case totalSize % 5:
						labelSize = totalSize * 2 / 5;
						break;
					default:
						labelSize = 1;
						break;
					}
					
					controlSize = totalSize - labelSize;
					var row = $('<div data-dt-row="' + rowIdx + '" class="form-group m-form__group row table-row"></div>');
					var data = $.each(controls, function (i, col) {
						$.extend(true, col, { gridClass: "col-md-" + controlSize } );
						$(
							'<label class="col-md-' + labelSize + ' col-form-label">' + col.title +
							'</label> '
						).appendTo(row);
						$(templateRenderer(update? col.editTemplate: col.insertTemplate, col)).appendTo(row);
						if (i == controls.length - 1 || numberOfElementsInARow == 1 || (i + 1) % numberOfElementsInARow == 0) {
							row.appendTo(div);
							row = $('<div class="form-group m-form__group row"></div>');
						}
					});

				return div;
			};
		},

		tableAll: function (options) {
			options = $.extend({
				tableClass: ''
			}, options);

			return function (api, rowIdx, columns) {
				var data = $.map(columns, function (col) {
					return '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
						'<td>' + col.title + ':' + '</td> ' +
						'<td>' + col.data + '</td>' +
						'</tr>';
				}).join('');

				return $('<table class="' + options.tableClass + ' dtr-details" width="100%"/>').append(data);
			}
		}
	};


	/**
	 * Editable default settings for initialisation
	 *
	 * @namespace
	 * @name Editable.defaults
	 * @static
	 */
	Editable.defaults = {
		/**
		 * Enable / disable auto hiding calculations. It can help to increase
		 * performance slightly if you disable this option, but all columns would
		 * need to have breakpoint classes assigned to them
		 *
		 * @type {Boolean}
		 * @default  `true`
		 */
		auto: true,

		/**
		 * Details control. If given as a string value, the `type` property of the
		 * default object is set to that value, and the defaults used for the rest
		 * of the object - this is for ease of implementation.
		 *
		 * The object consists of the following properties:
		 *
		 * * `display` - A function that is used to show and hide the hidden details
		 * * `renderer` - function that is called for display of the child row data.
		 *   The default function will show the data from the hidden columns
		 * * `target` - Used as the selector for what objects to attach the child
		 *   open / close to
		 * * `type` - `false` to disable the details display, `inline` or `column`
		 *   for the two control types
		 *
		 * @type {Object|string}
		 */
		details: {
			display: Editable.display.childRow,

			renderer: Editable.renderer.horizontalForm(),

			target: 2,

			type: 'inline'
		},

		/**
		 * Orthogonal data request option. This is used to define the data type
		 * requested when Responsive gets the data to show in the child row.
		 *
		 * @type {String}
		 */
		orthogonal: 'display'
	};


	/*
	 * API
	 */
	var Api = $.fn.dataTable.Api;

	// Doesn't do anything - work around for a bug in DT... Not documented
	Api.register('editable()', function () {
		return this;
	});

	Api.register('editable.index()', function (li) {
		li = $(li);

		return {
			column: li.data('dtr-index'),
			row: li.parent().data('dtr-index')
		};
	});

	Api.register('editable.rebuild()', function () {
		return this.iterator('table', function (ctx) {
			if (ctx._editable) {
				ctx._editable._classLogic();
			}
		});
	});




	/**
	 * Version information
	 *
	 * @name Editable.version
	 * @static
	 */
	Editable.version = '0.0.1-dev';

	$.fn.dataTable.Editable = Editable;
	$.fn.DataTable.Editable = Editable;

	// Attach a listener to the document which listens for DataTables initialisation
	// events so we can automatically initialise
	$(document).on('preInit.dt.dtr', function (e, settings, json) {
		if (e.namespace !== 'dt') {
			return;
		}

		if ($(settings.nTable).hasClass('editable') ||
			$(settings.nTable).hasClass('dt-editable') ||
			settings.oInit.editable ||
			DataTable.defaults.editable
		) {
			var init = settings.oInit.editable;

			if (init !== false) {
				new Editable(settings, $.isPlainObject(init) ? init : {});
			}
		}
	});


	return Editable;
}));
(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net')(root, $).$;
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;

function Field(config) {
        $.extend(true, this, this.__proto__, config);
}

Field.prototype = {
        name: "",
        title: null,
        css: "form-control",
        gridClass: "",
        align: "center",
        width: 100,
        visible: true,
        inserting: true,
        editing: true,

        itemTemplate: function(value, item) {
            return value;
        },


        insertTemplate: function() {
            return "";
        },

        editTemplate: function(value, item) {
            this._value = value;
            return this.itemTemplate(value, item);
        },

        insertValue: function() {
            return "";
        },

        editValue: function() {
            return this._value;
        },

        initHandler: function(element, onChangeCallback){
            
        },
    };

    $.fn.dataTable.Editable.Field = Field;

}));
(function($){
    var Field = $.fn.dataTable.Editable.Field;

    function CheckboxField(config) {
        Field.call(this, config);
    }

    CheckboxField.prototype = new Field({

        insertTemplate: function() {
            if(!this.inserting)
                return "";

            return this.insertControl = this._createCheckbox();
        },

        editTemplate: function(value) {
            if(!this.editing)
                return this.itemTemplate.apply(this, arguments);

            var $result = this.editControl = this._createCheckbox();
            $result.prop("checked", value);
            return $result;
        },

        insertValue: function() {
            return this.insertControl.is(":checked");
        },

        editValue: function() {
            return this.editControl.is(":checked");
        },

        _createCheckbox: function() {
            return $("<input>").attr("type", "checkbox").attr("class", this.css + " " + this.gridClass).attr("name", this.dataName);
        }
    });

    $.fn.dataTable.Editable.fields.CheckboxField = $.fn.dataTable.Editable.CheckboxField = CheckboxField;
}
)(jQuery);
(function($){
    var Field = $.fn.dataTable.Editable.Field;

    function TextField(config) {
        Field.call(this, config);
    }

    TextField.prototype = new Field({

		readOnly: false,

        insertTemplate: function() {
            if(!this.inserting)
                return "";

            return this.insertControl = this._createTextBox();
        },

        editTemplate: function(value) {
            if(!this.editing)
                return this.itemTemplate.apply(this, arguments);

            var $result = this.editControl = this._createTextBox();
            $result.val(value);
            return $result;
        },

        insertValue: function() {
            return this.insertControl.val();
        },

        editValue: function() {
            return this.editControl.val();
        },

        _createTextBox: function() {
            return $("<input>").attr("type", "text").attr("class", this.css + " " + this.gridClass).attr("name", this.dataName)
                .prop("readonly", !!this.readOnly);
        }
    });

    $.fn.dataTable.Editable.fields.TextField = $.fn.dataTable.Editable.TextField = TextField;
}
)(jQuery);
(function($){
    var Field = $.fn.dataTable.Editable.Field;

    function Number(config) {
        Field.call(this, config);
    }

    Number.prototype = new Field({
        css: "form-control numeric",
		readOnly: false,

        insertTemplate: function() {
            if(!this.inserting)
                return "";

            return this.insertControl = this._createNumberField();
        },

        editTemplate: function(value) {
            if(!this.editing)
                return this.itemTemplate.apply(this, arguments);

            var $result = this.editControl = this._createNumberField();
            $result.val(value);
            return $result;
        },

        insertValue: function() {
            return this.insertControl.val();
        },

        editValue: function() {
            return this.editControl.val();
        },

        _createNumberField: function() {
            return $("<input>").attr("type", "text").attr("class", this.css + " " + this.gridClass).attr("name", this.dataName)
                .prop("readonly", !!this.readOnly);
        }
    });

    $.fn.dataTable.Editable.fields.Number = $.fn.dataTable.Editable.Number = Number;
}
)(jQuery);
(function($){
    var Field = $.fn.dataTable.Editable.Field;

    function DateTimeField(config) {
        Field.call(this, config);
    }

    DateTimeField.prototype = new Field({

        readOnly: false,
        css: "form-control datepicker",

        insertTemplate: function() {
            if(!this.inserting)
                return "";

            return this.insertControl = this._createDateTimeField();
        },

        editTemplate: function(value) {
            if(!this.editing)
                return this.itemTemplate.apply(this, arguments);

            var $result = this.editControl = this._createDateTimeField();
            $result.val(value);
            return $result;
        },

        insertValue: function() {
            return this.insertControl.val();
        },

        editValue: function() {
            return this.editControl.val();
        },

        _createDateTimeField: function() {
            return $("<input>").attr("type", "text").attr("class", this.css + " " + this.gridClass).attr("name", this.dataName)
                .prop("readonly", !!this.readOnly);
        }
    });

    $.fn.dataTable.Editable.fields.DateTimeField = $.fn.dataTable.Editable.DateTimeField = DateTimeField;
}
)(jQuery);
(function ($) {
    var Field = $.fn.dataTable.Editable.Field;

    function PickupField(config) {
        Field.call(this, config);
    }

    PickupField.prototype = new Field({

        readOnly: false,

        insertTemplate: function () {
            if (!this.inserting)
                return "";

            return this.insertControl = this._createPickup();
        },

        editTemplate: function (value) {
            if (!this.editing)
                return this.itemTemplate.apply(this, arguments);

            var $result = this.editControl = this._createPickup();
            $result.val(value);
            return $result;
        },

        insertValue: function () {
            return this.insertControl.val();
        },

        editValue: function () {
            return this.editControl.val();
        },

        _createPickup: function () {
            var inputGroup = $('<div>').attr("class", "input-group" + " " + this.gridClass);
            var pickDiv = $('<div>').attr("class", "input-group-append");
            var cancelDiv = $('<div>').attr("class", "input-group-prepend");
            var pickupBtn = $('<button>').attr("class", "btn btn-primary blue").attr("id", "Open" + this.dataName + "Button").html("<i class='fa fa-search'></i>" + app.localize('Pick'));
            
            pickDiv.append(pickupBtn);
            var cancelBtn = $('<button>').attr("class", "btn btn-danger").attr("type", "button").attr("id", "Clear" + this.dataName + "Button").html('<i class="la la-eraser"></i>');
            
            cancelDiv.append(cancelBtn);
            var backendField = $("<input>").attr("type", "hidden").attr("name", this.backendFieldName);
            
            $("<input>").attr("type", "text").attr("class", this.css).attr("name", this.dataName)
                .prop("readonly", !!this.readOnly).appendTo(inputGroup);
            pickDiv.appendTo(inputGroup);
            cancelDiv.appendTo(inputGroup);
            inputGroup.append(backendField);
            return inputGroup;
        }
    });

    $.fn.dataTable.Editable.fields.PickupField = $.fn.dataTable.Editable.PickupField = PickupField;
}
)(jQuery);