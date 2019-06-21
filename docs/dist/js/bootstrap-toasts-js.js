$(function(){
    let TOASTS = [];
    function getWordTimeDifference(time, lang) {
        const dictionary = {
            en:{after:' ago',before:'',second:'second',seconds:'seconds',minute:'minute',minutes:'minutes',hour:'hour',hours:'hour',day:'day',days:'days'},
            cz:{after:'',before:'Před ',second:'sekundou',seconds:'sekundami',minute:'minutou',minutes:'minutami',hour:'hodinou',hours:'hodinami',day:'dnem',days:'dny'}
        };
        if(undefined === dictionary[lang]) {
            throw 'language ' + lang + ' is not supported';
        }
        let difference = Math.floor((new Date().getTime() - time.getTime()) / 1000);
        if(difference < 60) {
            if(difference === 1)
                return dictionary[lang]['before'] + difference + ' ' + dictionary[lang]['second'] + dictionary[lang]['after'];
            return dictionary[lang]['before'] + difference + ' ' + dictionary[lang]['seconds'] + dictionary[lang]['after'];
        } else if(difference < 3600) {
            if(Math.floor(difference / 60) === 1)
                return dictionary[lang]['before'] + Math.floor(difference / 60) + ' ' + dictionary[lang]['minute'] + dictionary[lang]['after'];
            return dictionary[lang]['before'] + Math.floor(difference / 60) + ' ' + dictionary[lang]['minutes'] + dictionary[lang]['after'];
        } else if(difference < 86400) {
            if(Math.floor(difference / 3600) === 1)
                return dictionary[lang]['before'] + Math.floor(difference / 3600) + ' ' + dictionary[lang]['hour'] + dictionary[lang]['after'];
            return dictionary[lang]['before'] + Math.floor(difference / 3600) + ' ' + dictionary[lang]['hours'] + dictionary[lang]['after'];
        } else {
            if(Math.floor(difference / 86400) === 1)
                return dictionary[lang]['before'] + Math.floor(difference / 86400) + ' ' + dictionary[lang]['day'] + dictionary[lang]['after'];
            return dictionary[lang]['before'] + Math.floor(difference / 86400) + ' ' + dictionary[lang]['days'] + dictionary[lang]['after'];
        }
    }
    if('undefined' !== typeof(jQuery)) {
        if('undefined' === typeof(jQuery.fn.addToast)) {
            jQuery.fn.extend({
                addToast: function (options) {
                    const DEFAULTS = {
                        animation: true,
                        autoHide: false,
                        closable: true,
                        displayTime: 2000,
                        fadeOutDelay: 500,
                        headerClasses: function(options){ return ((['dark','danger','info','primary','secondary','success','warning'].indexOf(options.type) !== -1) ? ' text-white' : '') +  ' bg-' + options.type; },
                        iconImgStyles: 'height: 20px; width: 20px;',
                        lang: 'en',
                        show: true,
                        showTimeLabel: true,
                        time: function(options){ return getWordTimeDifference(new Date(), options.lang); },
                        type: 'default'
                    };
                    for(let key in DEFAULTS) {
                        if(undefined === options[key]) {
                            if('function' === typeof(DEFAULTS[key])) {
                                options[key] = DEFAULTS[key](options);
                            } else {
                                options[key] = DEFAULTS[key];
                            }
                        }
                    }
                    let newId = (0 === $(document).find('.toast:last').length) ? 0 : $(document).find('.toast:last').data('id') + 1;
                    $(this).append('<div class="toast" aria-atomic="true" aria-live="assertive" role="alert" data-added="' + new Date().getTime() + '" data-id="' + newId + '" id="toast-' + newId + '" data-lang="' + options.lang + '">' +
                            '<div class="toast-header' + ((undefined !== options.headerClasses) ? options.headerClasses : '') + '">' +
                            ((undefined !== options.iconImgSrc) ? '<img src="' + options.iconImgSrc + '" style="' + options.iconImgStyles + '">&nbsp;' : '') +
                            ((undefined !== options.iconClass) ? '<span class="' + options.iconClass + '"></span>&nbsp;' : '') +
                            '<strong class="mr-auto">' + options.title + '</strong>' +
                            ((options.showTimeLabel) ? '<small class="text-added-time">' + options.time + '</small>' : '') +
                            ((options.closable) ? '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close"><span aria-hidden="true">&times;</span></button>' : '') +
                            '</div>' +
                            '<div class="toast-body">' + options.content + '</div>' +
                            '</div>');
                    let newToastEl = $(this).find('#toast-' + newId);
                    newToastEl.toast({animation: options.animation, autohide: false, delay: options.fadeOutDelay});
                    newToastEl.toast((options.show) ? 'show' : 'hide');
                    if(options.closable) {
                        newToastEl.find('button[data-dismiss="toast"]').on('click', function(e){
                            $(e.target).closest('.toast').remove();
                        });
                    }
                    if(options.showTimeLabel) {
                        TOASTS.push(newId);
                    }
                    if(options.autoHide && options.show) {
                        setTimeout(function() {
                            newToastEl.toast('hide');
                        }, options.displayTime);
                    }
                    return newToastEl;
                }
            });
        } else {
            throw 'function "addToast" already exist';
        }
        setInterval(function () {
            TOASTS.forEach(function (item) {
                let toastEl = $(document).find('#toast-' + item);
                if(0 !== toastEl.length){
                    toastEl.find('.text-added-time').html(getWordTimeDifference(new Date(toastEl.data('added')), toastEl.data('lang')));
                }
            });
        }, 1000);
    } else {
        throw 'jQuery is not defined';
    }
});