/* Bootstrap Toasts JS v1.1.1 | Author: Jakub Marek | Date: 28.08.2019 22:30 */

$(function(){
    let GLOBAL = {
        'newToastId': 0,
        'toasts': []
    };
    function applyDefaultOptions(options, defaults) {
        let newOptions = options;
        for(let key in defaults) {
            if('object' === typeof(defaults[key]) && undefined !== newOptions[key]) {
                if(undefined !== newOptions[key].length) {
                    for(let i = 0; i < newOptions[key].length; i++) {
                        newOptions[key][i] = applyDefaultOptions(newOptions[key][i], defaults[key][0]);
                    }
                } else {
                    newOptions[key] = applyDefaultOptions(newOptions[key], defaults[key]);
                }
            } else {
                if ('function' === typeof (defaults[key])) {
                    if (undefined === newOptions[key]) {
                        newOptions[key] = defaults[key](options);
                    } else {
                        newOptions[key] = newOptions[key](options);
                    }
                } else if (undefined === newOptions[key]) {
                    newOptions[key] = defaults[key];
                }
            }
        }
        return newOptions;
    }
    function getWordTimeDifference(time, lang) {
        const DICTIONARY = {
            'en':{'after':' ago','before':'','second':'second','seconds':'seconds','minute':'minute','minutes':'minutes','hour':'hour','hours':'hour','day':'day','days':'days'},
            'cz':{'after':'','before':'Před ','second':'sekundou','seconds':'sekundami','minute':'minutou','minutes':'minutami','hour':'hodinou','hours':'hodinami','day':'dnem','days':'dny'}
        };
        if(undefined === DICTIONARY[lang]) {
            throw 'language ' + lang + ' is not supported';
        }
        let difference = Math.floor((new Date().getTime() - time.getTime()) / 1000);
        if(difference < 60) {
            if(difference === 1)
                return DICTIONARY[lang].before + difference + ' ' + DICTIONARY[lang].second + DICTIONARY[lang].after;
            return DICTIONARY[lang].before + difference + ' ' + DICTIONARY[lang].seconds + DICTIONARY[lang].after;
        } else if(difference < 3600) {
            if(Math.floor(difference / 60) === 1)
                return DICTIONARY[lang].before + Math.floor(difference / 60) + ' ' + DICTIONARY[lang].minute + DICTIONARY[lang].after;
            return DICTIONARY[lang].before + Math.floor(difference / 60) + ' ' + DICTIONARY[lang].minutes + DICTIONARY[lang].after;
        } else if(difference < 86400) {
            if(Math.floor(difference / 3600) === 1)
                return DICTIONARY[lang].before + Math.floor(difference / 3600) + ' ' + DICTIONARY[lang].hour + DICTIONARY[lang].after;
            return DICTIONARY[lang].before + Math.floor(difference / 3600) + ' ' + DICTIONARY[lang].hours + DICTIONARY[lang].after;
        } else {
            if(Math.floor(difference / 86400) === 1)
                return DICTIONARY[lang].before + Math.floor(difference / 86400) + ' ' + DICTIONARY[lang].day + DICTIONARY[lang].after;
            return DICTIONARY[lang].before + Math.floor(difference / 86400) + ' ' + DICTIONARY[lang].days + DICTIONARY[lang].after;
        }
    }
    function isEmpty(variable) {
        return undefined === variable || 'undefined' === typeof(variable) || null === variable;
    }
    if('undefined' !== typeof(jQuery)) {
        if('undefined' === typeof(jQuery.fn.addConfirmToast) && 'undefined' === typeof(jQuery.fn.addToast)) {
            jQuery.fn.extend({
                addConfirmToast: function (options) {
                    const DEFAULTS = {
                        'autoDestroy': false,
                        'autoHide': false,
                        'buttons': [
                            {
                                'content': 'Ok',
                                'default': true,
                                'onClick': null,
                                'type': 'success'
                            }
                        ],
                        'buttonsAlign': 'right',
                        'closable': true,
                        'closeAction': 'destroy',
                        'createdTime': new Date(),
                        'displayTime': 2000,
                        'elementId': 'toast-' + GLOBAL.newToastId,
                        'fadeOutAnimation': true,
                        'fadeOutDelay': 500,
                        'headerClasses': function(options){ return (['dark','danger','info','primary','secondary','success','warning'].indexOf(options.type) !== -1 ? ' text-white' : '') + ' bg-' + options.type; },
                        'iconClass': null,
                        'iconImgSrc': null,
                        'iconImgStyles': 'height: 20px; width: 20px;',
                        'lang': 'en',
                        'onAutoClose': null,
                        'onClose': null,
                        'onEnter': null,
                        'onHide': null,
                        'progress': {
                            'animated': false,
                            'bgColor': null,
                            'show': true,
                            'stripped': false,
                            'type': 'primary'
                        },
                        'show': true,
                        'showTimeLabel': true,
                        'timeout': null,
                        'type': 'default'
                    };
                    options = applyDefaultOptions(options, DEFAULTS);
                    GLOBAL.toasts[GLOBAL.newToastId] = options;
                    let htmlButtons = '';
                    for(let i = 0; i < options.buttons.length; i++) {
                        htmlButtons += '<button id="toast-' + GLOBAL.newToastId + '-button-' + i + '" data-id="' + i + '" type="button" class="btn btn-' + options.buttons[i].type + '" style="margin: 0 3px;">' + options.buttons[i].content + '</button>';
                    }
                    $(this).append('<div class="toast" aria-atomic="true" aria-live="assertive" role="alert" data-id="' + GLOBAL.newToastId + '" id="' + options.elementId + '">' +
                        '<div class="toast-header' + ((undefined !== options.headerClasses) ? options.headerClasses : '') + '">' +
                        (!isEmpty(options.iconImgSrc) ? '<img src="' + options.iconImgSrc + '" style="' + options.iconImgStyles + '">&nbsp;' : '') +
                        (!isEmpty(options.iconClass) ? '<span class="' + options.iconClass + '"></span>&nbsp;' : '') +
                        '<strong class="mr-auto">' + options.title + '</strong>' +
                        ((options.showTimeLabel) ? '<small class="btj-text-added-time">' + getWordTimeDifference(new Date(), options.lang) + '</small>' : '') +
                        ((options.closable) ? '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close"><span aria-hidden="true">&times;</span></button>' : '') +
                        '</div>' +
                        ((options.progress.show && (options.autoDestroy || options.autoHide)) ? '<div class="btj-progress bg-' + options.progress.type + ((options.progress.stripped) ? ' progress-bar-striped' : '') + ((options.progress.animated) ? ' progress-bar-animated' : '') + '" style="' + ((!isEmpty(options.progress.bgColor)) ? 'background-color: ' + options.progress.bgColor + '; ' : '') + 'height: 5px; width: 100%;"></div>' : '') +
                        '<div class="toast-body">' + options.content + '</div>' +
                        '<hr style="margin: 0;">' +
                        '<div class="toast-body" style="text-align: ' + options.buttonsAlign + ';">' + htmlButtons + '</div>' +
                        '</div>');
                    let newToastEl = $(this).find(options.elementId);
                    newToastEl.toast({'animation': options.fadeOutAnimation, 'autohide': false, 'delay': options.fadeOutDelay});
                    newToastEl.toast((options.show) ? 'show' : 'hide');
                    for(let i = 0; i < options.buttons.length; i++) {
                        $('#toast-' + GLOBAL.newToastId + '-button-' + i).on('click', function(e) {
                            let toastEl = $(e.target).closest('.toast');
                            let options = GLOBAL.toasts[toastEl.data('id')];
                            if(!isEmpty(options.timeout)) {
                                clearTimeout(options.timeout);
                            }
                            if(!isEmpty(options.buttons[$(e.target).data('id')].onClick)) {
                                options.buttons[$(e.target).data('id')].onClick(options);
                            }
                            if(!isEmpty(options.onEnter)) {
                                options.onEnter(options);
                            }
                            toastEl.on('hidden.bs.toast', function(e) {
                                $(e.target).remove();
                            });
                            toastEl.toast('hide');
                            GLOBAL.toasts[toastEl.data('id')] = null;
                        });
                    }
                    if(options.autoDestroy || options.autoHide) {
                        GLOBAL.toasts[GLOBAL.newToastId].timeout = setTimeout(function() {
                            newToastEl.toast('hide');
                            let options = GLOBAL.toasts[newToastEl.data('id')];
                            if(!isEmpty(options.onAutoClose)){
                                options.onAutoClose(options);
                            }
                            for(let i = 0; i < options.buttons.length; i++) {
                                if(options.buttons[i]['default'] && !isEmpty(options.buttons[i].onClick)) {
                                    options.buttons[i].onClick(options);
                                }
                            }
                            if(options.autoDestroy) {
                                newToastEl.remove();
                                GLOBAL.toasts[newToastEl.data('id')] = null;
                            }
                        }, options.displayTime);
                    }
                    if(options.closable) {
                        newToastEl.find('button[data-dismiss="toast"]').on('click', function(e) {
                            let toastEl = $(e.target).closest('.toast');
                            let options = GLOBAL.toasts[toastEl.data('id')];
                            if(!isEmpty(options.timeout)) {
                                clearTimeout(options.timeout);
                            }
                            if(!isEmpty(options.onClose)) {
                                options.onClose(options);
                            } else {
                                for(let i = 0; i < options.buttons.length; i++) {
                                    if(options.buttons[i]['default'] && !isEmpty(options.buttons[i].onClick)) {
                                        options.buttons[i].onClick(options);
                                    }
                                }
                            }
                            if(!isEmpty(options.onHide)) {
                                options.onHide(options);
                            }
                            if('destroy' === GLOBAL.toasts[toastEl.data('id')].closeAction) {
                                GLOBAL.toasts[toastEl.data('id')] = null;
                                toastEl.on('hidden.bs.toast', function(e) {
                                    $(e.target).remove();
                                });
                            }
                            toastEl.toast('hide');
                        });
                    }
                    GLOBAL.newToastId++;
                    return newToastEl;
                },
                addToast: function (options) {
                    const DEFAULTS = {
                        'autoDestroy': false,
                        'autoHide': false,
                        'closable': true,
                        'closeAction': 'destroy',
                        'createdTime': new Date(),
                        'displayTime': 2000,
                        'elementId': 'toast-' + GLOBAL.newToastId,
                        'fadeOutAnimation': true,
                        'fadeOutDelay': 500,
                        'headerClasses': function(options){ return ((['dark','danger','info','primary','secondary','success','warning'].indexOf(options.type) !== -1) ? ' text-white' : '') +  ' bg-' + options.type; },
                        'iconClass': null,
                        'iconImgSrc': null,
                        'iconImgStyles': 'height: 20px; width: 20px;',
                        'lang': 'en',
                        'onAutoClose': null,
                        'onClose': null,
                        'onHide': null,
                        'progress': {
                            'animated': false,
                            'bgColor': null,
                            'show': true,
                            'stripped': false,
                            'type': 'primary'
                        },
                        'show': true,
                        'showTimeLabel': true,
                        'timeout': null,
                        'type': 'default'
                    };
                    options = applyDefaultOptions(options, DEFAULTS);
                    GLOBAL.toasts[GLOBAL.newToastId] = options;
                    $(this).append('<div class="toast" aria-atomic="true" aria-live="assertive" role="alert" data-id="' + GLOBAL.newToastId + '" id="' + options.elementId + '">' +
                            '<div class="toast-header' + ((undefined !== options.headerClasses) ? options.headerClasses : '') + '">' +
                            (!isEmpty(options.iconImgSrc) ? '<img src="' + options.iconImgSrc + '" style="' + options.iconImgStyles + '">&nbsp;' : '') +
                            (!isEmpty(options.iconClass) ? '<span class="' + options.iconClass + '"></span>&nbsp;' : '') +
                            '<strong class="mr-auto">' + options.title + '</strong>' +
                            ((options.showTimeLabel) ? '<small class="btj-text-added-time">' + getWordTimeDifference(new Date(), options.lang) + '</small>' : '') +
                            ((options.closable) ? '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close"><span aria-hidden="true">&times;</span></button>' : '') +
                            '</div>' +
                            ((options.progress.show && (options.autoDestroy || options.autoHide)) ? '<div class="btj-progress bg-' + options.progress.type + ((options.progress.stripped) ? ' progress-bar-striped' : '') + ((options.progress.animated) ? ' progress-bar-animated' : '') + '" style="' + ((!isEmpty(options.progress.bgColor)) ? 'background-color: ' + options.progress.bgColor + '; ' : '') + 'height: 5px; width: 100%;"></div>' : '') +
                            '<div class="toast-body">' + options.content + '</div>' +
                            '</div>');
                    let newToastEl = $(this).find(options.elementId);
                    newToastEl.toast({'animation': options.fadeOutAnimation, 'autohide': false, 'delay': options.fadeOutDelay});
                    newToastEl.toast((options.show) ? 'show' : 'hide');
                    if(options.autoDestroy || options.autoHide) {
                        GLOBAL.toasts[GLOBAL.newToastId].timeout = setTimeout(function() {
                            newToastEl.toast('hide');
                            let options = GLOBAL.toasts[newToastEl.data('id')];
                            if(!isEmpty(options.onAutoClose)){
                                options.onAutoClose(options);
                            }
                            if(options.autoDestroy) {
                                newToastEl.remove();
                                GLOBAL.toasts[newToastEl.data('id')] = null;
                            }
                        }, options.displayTime);
                    }
                    if(options.closable) {
                        newToastEl.find('button[data-dismiss="toast"]').on('click', function(e) {
                            let toastEl = $(e.target).closest('.toast');
                            let options = GLOBAL.toasts[toastEl.data('id')];
                            if(!isEmpty(options.timeout)) {
                                clearTimeout(options.timeout);
                            }
                            if(!isEmpty(options.onClose)) {
                                options.onClose(options);
                            }
                            if(!isEmpty(options.onHide)) {
                                options.onHide(options);
                            }
                            if('destroy' === options.closeAction) {
                                GLOBAL.toasts[toastEl.data('id')] = null;
                                toastEl.on('hidden.bs.toast', function(e) {
                                    $(e.target).remove();
                                });
                            }
                            toastEl.toast('hide');
                        });
                    }
                    GLOBAL.newToastId++;
                    return newToastEl;
                }
            });
        } else {
            throw 'functions already exists';
        }
        setInterval(function () {
            for(let i = 0; i < GLOBAL.newToastId; i++) {
                let options = GLOBAL.toasts[i];
                if(!isEmpty(options)) {
                    let toastEl = $(document).find('#' + options.elementId);
                    if (0 !== toastEl.length && toastEl.is(':visible')) {
                        let createdTime = new Date(options.createdTime);
                        let wordTimeDifference = getWordTimeDifference(createdTime, options.lang);
                        if (wordTimeDifference !== toastEl.find('.btj-text-added-time').html()) {
                            toastEl.find('.btj-text-added-time').html(wordTimeDifference);
                        }
                        if (options.progress.show && (options.autoDestroy || options.autoHide)) {
                            toastEl.find('.btj-progress').css('width', (((options.displayTime - new Date().getTime() + createdTime.getTime()) / options.displayTime) * 100) + '%');
                        }
                    }
                }
            }
        }, 10);
    } else {
        throw 'jQuery is not defined';
    }
});