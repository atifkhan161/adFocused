(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory); // AMD. Register as anonymous module.
    } else {
        var t = this,
            i = "https://code.jquery.com/jquery-3.2.1.slim.min.js",
            n = window;
        loadResource("jquery", i, "script", function() {
            // var t = n.jQuery.noConflict(!0);
            window.jQuery = n.jQuery;
            loadResource("VASTPlayer", "https://cdn.jsdelivr.net/vast-player/latest/vast-player.min.js", "script", function() {
                // var t = n.jQuery.noConflict(!0);

                factory(n.jQuery, n.VASTPlayer); // Browser globals.
            });
        });

        function loadResource(e, t, i, n, o) {
            if (!e) throw new Error("name is required and must be a string");
            if (!t) throw new Error("src is required and must be a string");
            if (!i) throw new Error("type is required and must be a string");
            var r, a = this;
            switch (i) {
                case "script":
                    r = document.createElement(i), r.setAttribute("data-q1resource", e), r.src = t, r.async = !0, r.type = "text/javascript";
                    break;
                case "stylesheet":
                    r = document.createElement("link"), r.setAttribute("data-q1resource", e), r.href = t, r.rel = i, r.type = "text/css";
                    break;
                case "inlinescript":
                    r = document.createElement("script"), r.setAttribute("data-q1resource", e), r.type = "text/javascript", r.appendChild(document.createTextNode(t));
                    break;
                default:
                    throw new Error("unsupported type")
            }
            o && (r.id = o), typeof n === 'function' && (r.readyState ? r.onreadystatechange = function() {
                "complete" !== r.readyState && "loaded" !== r.readyState || (r.onreadystatechange = null, n.call(r))
            } : r.onload = n.bind(r)), document.head.appendChild(r)
        }
    }
}(function($, VASTPlayer) {
    $.fn.extend({
        omniWindow: function(options) {
            options = $.extend(true, {
                animationsPriority: {
                    show: ['overlay', 'modal'],
                    hide: ['modal', 'overlay']
                },
                overlay: {
                    selector: '.ow-overlay',
                    hideClass: 'ow-closed',
                    animations: {
                        show: function(subjects, internalCallback) { return internalCallback(subjects); },
                        hide: function(subjects, internalCallback) { return internalCallback(subjects); },
                        internal: {
                            show: function(subjects) { subjects.overlay.removeClass(options.overlay.hideClass); },
                            hide: function(subjects) { subjects.overlay.addClass(options.overlay.hideClass); }
                        }
                    }
                },
                modal: {
                    hideClass: 'ow-closed',
                    animations: {
                        show: function(subjects, internalCallback) { return internalCallback(subjects); },
                        hide: function(subjects, internalCallback) { return internalCallback(subjects); },
                        internal: {
                            show: function(subjects) { subjects.modal.removeClass(options.modal.hideClass); },
                            hide: function(subjects) { subjects.modal.addClass(options.modal.hideClass); }
                        }
                    },
                    internal: {
                        stateAttribute: 'ow-active'
                    }
                },
                eventsNames: {
                    show: 'show.ow',
                    hide: 'hide.ow',
                    internal: {
                        overlayClick: 'click.ow',
                        keyboardKeyUp: 'keyup.ow'
                    }
                },
                callbacks: { // Callbacks execution chain
                    beforeShow: function(subjects, internalCallback) { return internalCallback(subjects); }, // 1 (stop if returns false)
                    positioning: function(subjects, internalCallback) { return internalCallback(subjects); }, // 2
                    afterShow: function(subjects, internalCallback) { return internalCallback(subjects); }, // 3
                    beforeHide: function(subjects, internalCallback) { return internalCallback(subjects); }, // 4 (stop if returns false)
                    afterHide: function(subjects, internalCallback) { return internalCallback(subjects); }, // 5
                    internal: {
                        beforeShow: function(subjects) {
                            if (subjects.modal.data(options.modal.internal.stateAttribute)) {
                                return false;
                            } else {
                                subjects.modal.data(options.modal.internal.stateAttribute, true);
                                return true;
                            }
                        },
                        afterShow: function(subjects) {
                            $(document).bind(options.eventsNames.internal.keyboardKeyUp, function(e) {
                                if (e.keyCode === 27) { // if the key pressed is the ESC key
                                    subjects.modal.trigger(options.eventsNames.hide);
                                    subjects.overlay.css('display', ''); // clear inline styles after jQ animations
                                    subjects.modal.css('display', '');
                                }
                            });

                            subjects.overlay.bind(options.eventsNames.internal.overlayClick, function() {
                                subjects.modal.trigger(options.eventsNames.hide);
                                subjects.overlay.css('display', ''); // clear inline styles after jQ animations
                                subjects.modal.css('display', '');
                            });
                        },
                        positioning: function(subjects) {
                            subjects.modal.css('margin-left', Math.round(subjects.modal.outerWidth() / -2));
                        },
                        beforeHide: function(subjects) {
                            if (subjects.modal.data(options.modal.internal.stateAttribute)) {
                                subjects.modal.data(options.modal.internal.stateAttribute, false);
                                return true;
                            } else {
                                return false;
                            }
                        },
                        afterHide: function(subjects) {
                            subjects.overlay.off(options.eventsNames.internal.overlayClick);
                            $(document).off(options.eventsNames.internal.keyboardKeyUp);
                            subjects.overlay.css('display', ''); // clear inline styles after jQ animations
                            subjects.modal.css('display', '');
                        }
                    }
                }
            }, options);

            var animate = function(process, subjects, callbackName) {
                var first = options.animationsPriority[process][0],
                    second = options.animationsPriority[process][1];

                options[first].animations[process](subjects, function(subjs) { // call USER's    FIRST animation (depends on priority)
                    options[first].animations.internal[process](subjs); // call internal  FIRST animation

                    options[second].animations[process](subjects, function(subjs) { // call USER's    SECOND animation
                        options[second].animations.internal[process](subjs); // call internal  SECOND animation

                        // then we need to call USER's
                        // afterShow of afterHide callback
                        options.callbacks[callbackName](subjects, options.callbacks.internal[callbackName]);
                    });
                });
            };

            var showModal = function(subjects) {
                if (!options.callbacks.beforeShow(subjects, options.callbacks.internal.beforeShow)) { return; } // cancel showing if beforeShow callback return false

                options.callbacks.positioning(subjects, options.callbacks.internal.positioning);

                animate('show', subjects, 'afterShow');
            };

            var hideModal = function(subjects) {
                if (!options.callbacks.beforeHide(subjects, options.callbacks.internal.beforeHide)) { return; } // cancel hiding if beforeHide callback return false

                animate('hide', subjects, 'afterHide');
            };

            var $overlay = $(options.overlay.selector);

            return this.each(function() {
                var $modal = $(this);
                var subjects = { modal: $modal, overlay: $overlay };

                $modal.bind(options.eventsNames.show, function() { showModal(subjects); })
                    .bind(options.eventsNames.hide, function() { hideModal(subjects); });
            });
        }
    });
    $.fn.tinyDraggable = function(options) {
        var settings = $.extend({ handle: 0, exclude: 0 }, options);
        return this.each(function() {
            var dx, dy, el = $(this),
                handle = settings.handle ? $(settings.handle, el) : el;
            handle.on({
                mousedown: function(e) {
                    if (settings.exclude && ~$.inArray(e.target, $(settings.exclude, el))) return;
                    e.preventDefault();
                    var os = el.offset();
                    dx = e.pageX - os.left, dy = e.pageY - os.top;
                    $(document).on('mousemove.drag', function(e) { el.offset({ top: e.pageY - dy, left: e.pageX - dx }); });
                },
                mouseup: function(e) { $(document).off('mousemove.drag'); }
            });
        });
    }


    // var adUrl = "http://tester.advertserve.com/servlet/vast3/zone?zid=33&pid=0&contextual=true"
    var mininiseAfter = 5000;
    var player, mode, adUrl;

    $(document).ready(function() {
        var queryParams = $('#adFocusedVast').attr('src');
        adUrl = getQueryVariable('adUrl', queryParams);
        loadPopupAd();
    });

    function loadPopupAd() {
        var modal = {
            position: "fixed",
            "z-index": 20,
            height: "426px",
            left: "50% ",
            top: "20%",
            width: "100%",
            "min-width": "450px",
            "max-height": "426px",
            overflow: "hidden",
            "max-width": "750px"
        };
        var owClosed = {
            display: "none"
        };
        var omniOverlay = {
            position: "fixed",
            "z-index": 10,
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            background: "#424242",
            opacity: "0.8"
        }
        var divOwerlay = $('<div/>')
            .attr("id", "newDivOwerlay")
            .css(omniOverlay, owClosed);

        var vastDiv = $('<div/>').attr("id", "newVastDiv").css("position", "relative").css("border", "1px solid black");
        var spanString = '<span style="color: white;font-size: 15px;margin-left: 45%;">Advertisement</span>';
        spanString += '<span id="spanStatus" style="color: white;font-size: 15px;float:right">Continue to Site in ' + (mininiseAfter / 1000) + '>></span>';
        var divAdv = $('<div style="width: 100%;height:20px"/>')
            .html(spanString)
            .attr("id", "newDivAdBar")
            // .css();
        var divModal = $('<div/>')
            .attr("id", "newDivModal")
            .css(modal, owClosed)
            .append(divAdv)
            .append(vastDiv);

        $("body").append(divModal, divOwerlay);
        $(divModal).omniWindow({
                callbacks: {
                    afterShow: function(subjects, internalCallback) {
                        var counter = setInterval(function() {
                            if (mininiseAfter > 0) {
                                mininiseAfter = mininiseAfter - 1000;
                                $("#spanStatus").text('Continue to Site in ' + (mininiseAfter / 1000) + '>>');
                            } else {
                                $("#spanStatus").text('Continue to Site >>').click(function() {
                                    $(divModal).hide();
                                    $(divOwerlay).hide();
                                }).css('cursor', 'pointer');
                                clearInterval(counter);
                            }
                        }, 1000);

                        var player = new VASTPlayer(document.getElementById('newVastDiv'));

                        player.once('AdStopped', function() {
                            $(divModal).hide();
                            $(divOwerlay).hide();
                            console.log('Ad finished playback!');
                        });

                        player.load(
                            'http://tester.advertserve.com/servlet/vast3/zone?zid=33&pid=0&contextual=true'
                        ).then(function startAd() {
                            return player.startAd();
                        }).catch(function(reason) {
                            setTimeout(function() {
                                throw reason;
                            }, 0);
                        });
                        return internalCallback(subjects); // call internal callback 
                    },

                    beforeHide: function(subjects, internalCallback) {

                        if (player.remainingTime() > 0) {

                            return false; // doesn't allow to hide! 
                        } else {
                            return internalCallback(subjects); // call internal callback 
                        }
                    }
                }
            }) // create modal
            .trigger('show')
    }
}));