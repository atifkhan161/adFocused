! function(q1Environment, q1SiteParams, q1EnabledAdsets) {
    ! function e(t, i, n) {
        function o(s, a) {
            if (!i[s]) {
                if (!t[s]) {
                    var c = "function" == typeof require && require;
                    if (!a && c) return c(s, !0);
                    if (r) return r(s, !0);
                    var d = new Error("Cannot find module '" + s + "'");
                    throw d.code = "MODULE_NOT_FOUND", d
                }
                var l = i[s] = {
                    exports: {}
                };
                t[s][0].call(l.exports, function(e) {
                    var i = t[s][1][e];
                    return o(i ? i : e)
                }, l, l.exports, e, t, i, n)
            }
            return i[s].exports
        }
        for (var r = "function" == typeof require && require, s = 0; s < n.length; s++) o(n[s]);
        return o
    }({
        1: [function(e, t, i) {
            var n = e("common/constants"),
                o = e("utils/utilityFunctions"),
                r = e("utils/adsetUtils"),
                s = function(e, t) {
                    var i = e + "x" + t,
                        n = {
                            "320x480": "full_320x480",
                            "300x250": "medrect",
                            "320x50": "xxlarge",
                            "1024x768": "full_1024x768",
                            "728x90": "leader",
                            "300x600": "widesky",
                            "160x600": "sky"
                        };
                    return n[i]
                },
                a = function(e, t) {
                    for (var i in q1EnabledAdsets) {
                        var o = q1EnabledAdsets[i].placements,
                            r = q1EnabledAdsets[i].type;
                        for (var s in o)
                            if (o[s]._id === t) return n.taboolaMapping[r][e]
                    }
                },
                c = function(e) {
                    var t = null,
                        i = o.getTargetWindowSpecs(),
                        r = n.vslider.DESKTOP_WIDTH,
                        s = n.vslider.DESKTOP_HEIGHT;
                    switch ("desktop" !== q1SiteParams.device && (r = n.vslider.MOBILE_WIDTH, s = n.vslider.MOBILE_HEIGHT), e.exchange) {
                        case n.exchanges.LIVERAIL:
                            var a = q1SiteParams.show_companion && "desktop" === q1SiteParams.device ? n.vslider.DESKTOP_WIDTH + ":" + n.vslider.COMPANION_HEIGHT + ":companion-container" : "";
                            t = "//ad4.liverail.com/?LR_PUBLISHER_ID=" + e.exchange_id + "&LR_FORMAT=application/javascript" + (q1SiteParams.isSafari || q1SiteParams.javascriptVpaid ? "" : ";application/x-shockwave-flash") + "&LR_COMPANIONS=" + a + "&LR_SCHEMA=vast2-vpaid&LR_AUTOPLAY=1&LR_CONTENT=6&LR_LAYOUT_LINEAR_PAUSEONCLICKTHRU=0&LR_TITLE=adexcitecontent&LR_URL=" + i.ref + "&LR_VERTICALS=" + e.type + "&LR_VIDEO_ID=adexcitecontent";
                            break;
                        case n.exchanges.SPOTX:
                            t = "//search.spotxchange.com/vast/2.00/" + e.exchange_id + "?VPAID=" + (q1SiteParams.javascriptVpaid || "desktop" !== q1SiteParams.device ? "JS" : "1") + "&player_dimensions=" + r + "x" + s + "&content_type=video&content_page_url=" + i.ref + "&custom[Product]=" + ("mutedvslider" === e.type ? "vSliderMuted" : "vSlider") + "&cb=" + o.cachebuster();
                            break;
                        case n.exchanges.AOLVIDEO:
                            t = "//ads.adaptv.advertising.com/" + e.exchange_id + "?cb=" + o.cachebuster() + "&pet=preroll&pageUrl=" + i.ref + "&eov=eov";
                            break;
                        case n.exchanges.VIDEOLOGY:
                            t = "//req.tidaltv.com/vmm.ashx?mt=1&pid=" + e.exchange_id + "&xf=12&ap=0&refUrl=" + i.ref + "&rand=" + o.cachebuster() + "&pd1=" + e._id;
                            break;
                        case n.exchanges.STICKYADS:
                            t = "//ads.stickyadstv.com/vast/vpaid-adapter/" + e.exchange_id
                    }
                    return t
                },
                d = function(e) {
                    var t = null,
                        i = o.getTargetWindowSpecs(),
                        c = null;
                    switch (e.exchange) {
                        case n.exchanges.APPNEXUS:
                            var d = r.getPlacementSize(e),
                                l = Array.isArray(d) ? d[0] : d,
                                p = Array.isArray(d) ? d.slice(1).join() : null,
                                u = [i.secure ? "https://secure.adnxs.com/ttj?" : "http://ads.q1media.com/ttj?", "id=" + e.exchange_id, l ? "&size=" + l : "", p ? "&promo_sizes=" + p : "", "&promo_alignment=centered"].join("");
                            t = '<script type="text/javascript" src="' + u + '"></script>';
                            break;
                        case n.exchanges.GOOGLEADX:
                            c = r.getDimensions(r.getPlacementSize(e)), t = ['<script type="text/javascript">', 'google_ad_client = "ca-pub-7979488788234971";', 'google_ad_slot = "' + e.exchange_id + '";', "google_ad_width = " + c.width + ";", "google_ad_height = " + c.height + ";", "</script>", '<script type="text/javascript" src="https://pagead2.googlesyndication.com/pagead/show_ads.js">', "</script>"].join("");
                            break;
                        case n.exchanges.OPENX:
                            t = ['<script type="text/javascript">', "if (!window.OX_ads) OX_ads = [];", "OX_ads.push({", 'auid: "' + e.exchange_id + '",', 'imp_beacon: "<script>window.top.postMessage(\\"q1impression\\", \\"*\\");<\\/script>"', "});", "</script>", '<script src="' + (i.secure ? "https" : "http") + '://us-ads.openx.net/w/1.0/jstag"></script>'].join("");
                            break;
                        case n.exchanges.SMAATO:
                            c = r.getDimensions(r.getPlacementSize(e)), t = ['<div id="smaatoad" style="padding:0px;width:' + c.width + "px;height:" + c.height + 'px;"></div>', '<script type="text/javascript" src="' + (i.secure ? "https" : "http") + '://soma-assets.smaato.net/js/smaatoAdTag.js"></script>', "<script>", "function callBackForSmaato(status) {", 'if (status == "SUCCESS") {', 'window.top.postMessage("q1impression", "*")', '} else if (status == "ERROR") {', 'window.top.postMessage("die", "*")', "}", "};", "SomaJS.loadAd({", 'adDivId: "smaatoad",', "publisherId: 1100009056,", "adSpaceId: " + e.exchange_id + ",", 'dimension: "' + s(c.width, c.height) + '"', "}, callBackForSmaato);", "</script>"].join("");
                            break;
                        case n.exchanges.SMARTADS:
                            var m = e.exchange_id.split("^_");
                            t = ['<script type="text/javascript" src="', i.secure ? "https" : "http", "://www9.smartadserver.com/ac?out=js&nwid=2111&siteid=", m[0], "&pgname=", m[3], "&fmtid=", m[2], '&visit=m"></script>'].join("");
                            break;
                        case n.exchanges.TABOOLA:
                            var g = a(r.getPlacementSize(e), e._id);
                            t = ['<div id="' + g.containerId + '"></div>', '<script type="text/javascript">', "window._taboola = window._taboola || [];", "var realURL = top.location.href;", "var realReferrer;", "if (top.document.referrer) {", "realReferrer = top.document.referrer;", "_taboola.push({", 'article: "auto",', "url: realURL,", "referrer: realReferrer", "});", "} else {", '_taboola.push({ article: "auto", url: realURL });', "}", "_taboola.push({", 'mode: "' + g.mode + '",', 'container: "' + g.containerId + '",', 'placement: "' + e.exchange_id + '",', 'target_type: "mix"', "});", "!function (e, f, u, i) {", "if (!document.getElementById(i)){", "e.async = 1;", "e.src = u;", "e.id = i;", "f.parentNode.insertBefore(e, f);", "}", '}(document.createElement("script"),', 'document.getElementsByTagName("script")[0],', '"' + (i.secure ? "https" : "http") + '://cdn.taboola.com/libtrc/q1media-network/loader.js",', '"tb_loader_script");', "</script>"].join("")
                    }
                    return t
                };
            t.exports = {
                generateVastTag: c,
                generateDisplayTag: d
            }
        }, {
            "common/constants": 5,
            "utils/adsetUtils": 17,
            "utils/utilityFunctions": 21
        }],
        2: [function(e, t, i) {
            function n(e, t) {
                this._adsets = Array.isArray(e) ? e : [e], this._currentAdsetIndex = 0, this._currentPlacementIndex = 0, this._placementIteratorKey = t || "placements", this.forEach = Array.prototype.forEach.bind(this._adsets)
            }
            n.prototype.getCurrentAdset = function() {
                return this._adsets[this._currentAdsetIndex]
            }, n.prototype.getCurrentPlacement = function() {
                return this.getCurrentAdset()[this._placementIteratorKey][this._currentPlacementIndex]
            }, n.prototype.getAdsetWithPlacementId = function(e) {
                var t;
                return this._adsets.forEach(function(i) {
                    t || i.placements.forEach(function(n) {
                        t || n._id === e && (t = i)
                    })
                }), t
            }, n.prototype.nextAdset = function() {
                return this._currentPlacementIndex = 0, this._adsets[++this._currentAdsetIndex]
            }, n.prototype.nextPlacement = function() {
                return this.getCurrentAdset()[this._placementIteratorKey][++this._currentPlacementIndex]
            }, n.prototype.peekNextAdset = function() {
                return this._adsets[this._currentAdsetIndex + 1]
            }, n.prototype.peekNextPlacement = function() {
                return this.getCurrentAdset()[this._placementIteratorKey][this._currentPlacementIndex + 1]
            }, t.exports = n
        }, {}],
        3: [function(e, t, i) {
            var n = e("utils/utilityFunctions"),
                o = {};
            o.setImmediate = function(e) {
                setTimeout(e, 0)
            }, o.iterator = function(e) {
                var t = function(i) {
                    var n = function() {
                        return e.length && e[i].apply(null, arguments), n.next()
                    };
                    return n.next = function() {
                        return i < e.length - 1 ? t(i + 1) : null
                    }, n
                };
                return t(0)
            }, o.waterfall = function(e, t) {
                if (t = t || n.noop, !Array.isArray(e)) {
                    var i = new Error("First argument to waterfall must be an array of functions");
                    return t(i)
                }
                if (!e.length) return t();
                var r = function(e) {
                    return function(i) {
                        if (i) t.apply(null, arguments), t = n.noop;
                        else {
                            var s = Array.prototype.slice.call(arguments, 1),
                                a = e.next();
                            a ? s.push(r(a)) : s.push(t), o.setImmediate(function() {
                                e.apply(null, s)
                            })
                        }
                    }
                };
                r(o.iterator(e))()
            }, o.parallel = function(e, t) {
                if (t = t || n.noop, !Array.isArray(e)) {
                    var i = new Error("First argument to parallel must be an array of functions");
                    return t(i)
                }
                if (!e.length) return t();
                var o = 0,
                    r = [];
                e.forEach(function(i, s) {
                    i(function(i, a) {
                        i ? (t.apply(null, arguments), t = n.noop) : (r[s] = a, ++o === e.length && t(null, r))
                    })
                })
            }, t.exports = o
        }, {
            "utils/utilityFunctions": 21
        }],
        4: [function(e, t, i) {
            function n() {
                return n.prototype.instance ? n.prototype.instance : void(n.prototype.instance = this)
            }
            var o = e("common/converters"),
                r = new(e("common/storage")),
                s = e("utils/utilityFunctions"),
                a = e("utils/adsetUtils");
            n.prototype.isAdsetCapped = function(e) {
                if (!s.isDefined(e.attr)) return !0;
                var t = o.toCurrentStrikeString(e._id),
                    i = o.toImpressionCountString(e._id),
                    n = !0;
                switch (a.getAttrProperty(e, "cap_type")) {
                    case "none":
                        n = !1;
                        break;
                    case "impression":
                        var c = parseInt(a.getAttrProperty(e, "imp_set_size", 7)),
                            d = parseInt(a.getAttrProperty(e, "imp_strike_impression", 3)),
                            l = parseInt(r.get(t)) || 0;
                        l++, l === d && (n = !1), l >= c && (l = 0), r.set(t, l);
                        break;
                    case "time":
                        var p = parseInt(r.get(i)) || 0,
                            u = parseInt(a.getAttrProperty(e, "time_impression_limit", 2));
                        p < u && (n = !1)
                }
                return n
            }, n.prototype.impressionServed = function(e) {
                if (s.isDefined(e.attr)) {
                    var t = o.toImpressionCountString(e._id),
                        i = o.toFirstImpressionTimeString(e._id);
                    switch (a.getAttrProperty(e, "cap_type")) {
                        case "none":
                        case "impression":
                            return;
                        case "time":
                            var n = (new Date).getTime(),
                                c = 36e4 * parseInt(a.getAttrProperty(e, "time_hour_limit"), 12),
                                d = parseInt(r.get(t)) || 0,
                                l = parseInt(r.get(i)) || n;
                            1 === ++d && r.set(i, l), n - l < c ? r.set(t, d) : (r.set(i, n), r.set(t, 1))
                    }
                }
            }, t.exports = n
        }, {
            "common/converters": 6,
            "common/storage": 12,
            "utils/adsetUtils": 17,
            "utils/utilityFunctions": 21
        }],
        5: [function(e, t, i) {
            var n = 800,
                o = 400,
                r = 2999999;
            t.exports = {
                MAX_WAIT_FOR_AD_TIME: 1e3,
                events: {
                    IMPACT_IMPRESSION: "impact_impression",
                    IMPACT_DEFAULT: "impact_default",
                    VSLIDER_IMPRESSION: "vslider_impression",
                    VSLIDER_READY: "vslider_ready"
                },
                exchanges: {
                    ADTECH: "adtech",
                    AOLVIDEO: "aolvideo",
                    APPNEXUS: "appnexus",
                    GOOGLEADX: "adx",
                    LIVERAIL: "liverail",
                    MILLENNIALMEDIA: "millennialmedia",
                    OPENX: "openx",
                    OPENX_HB: "openx_hb",
                    PULSEPOINT: "pulsepoint",
                    SMAATO: "smaato",
                    SMARTADS: "smartads",
                    SOVRN: "sovrn",
                    SPOTX: "spotxchange",
                    STICKYADS: "stickyads",
                    TABOOLA: "taboola",
                    VIDEOLOGY: "videology"
                },
                impact: {
                    MAX_WIDTH: 300,
                    SIDE_MARGIN_TOP_OFFSET: 300,
                    SLIDE_IN_SPEED: n,
                    SLIDE_OUT_SPEED: o,
                    Z_INDEX: r
                },
                mobileCloseButton: {
                    CSS: {
                        background: 'url("' + q1Environment.cdn_url + 'assets/images/close34.png")',
                        position: "absolute",
                        width: 34,
                        height: 34,
                        top: -34
                    }
                },
                pixelEvents: {
                    CONTROLLER_LOADED: "controller_loaded",
                    DISMISS: "dismiss",
                    ERROR: "error",
                    IMPRESSION: "impression",
                    INVENTORY: "inventory",
                    PASSBACK: "passback",
                    PREBID_INVENTORY: "prebid_inventory",
                    PREBID_WINNER: "prebid_winner",
                    PREBID_DEFAULT: "prebid_default",
                    VIEWABLE: "viewable"
                },
                poweredByQ1: {
                    css: {
                        LEFT: {
                            background: 'url("' + q1Environment.cdn_url + 'assets/images/powered-by-q1-left.png")',
                            position: "absolute",
                            width: 20,
                            height: 140
                        },
                        RIGHT: {
                            background: 'url("' + q1Environment.cdn_url + 'assets/images/powered-by-q1-right.png")',
                            position: "absolute",
                            width: 20,
                            height: 140
                        },
                        TOP: {
                            background: 'url("' + q1Environment.cdn_url + 'assets/images/powered-by-q1-top.png")',
                            position: "absolute",
                            width: 140,
                            height: 20
                        }
                    },
                    SLIDE_IN_DELAY: 3500,
                    SLIDE_IN_SPEED: n
                },
                vslider: {
                    ADS_CANCEL_TIMEOUT: 1e4,
                    AFTER_IMPACT_DELAY: 2e3,
                    BORDER_TOP_HEIGHT: 61,
                    BORDER_TOTAL_HEIGHT: 72,
                    BORDER_TOTAL_WIDTH: 20,
                    COMPANION_MARGIN: 3,
                    COMPANION_HEIGHT: 225,
                    DESKTOP_CLOSE_BUTTON_HEIGHT: 25,
                    DESKTOP_HEIGHT: 251,
                    DESKTOP_WIDTH: 430,
                    FINAL_ADS_CANCEL_TIMEOUT: 6e4,
                    MOBILE_CLOSE_BUTTON_HEIGHT: 34,
                    MOBILE_HEIGHT: 250,
                    MOBILE_WIDTH: 300,
                    SLIDE_IN_SPEED: n,
                    SLIDE_OUT_SPEED: o,
                    Z_INDEX: r
                },
                taboolaMapping: {
                    impact: {
                        "320x50": {
                            mode: "thumbnails-b",
                            containerId: "taboola-leaderboard-overlay-thumbnails"
                        },
                        "300x250": {
                            mode: "thumbnails-a",
                            containerId: "taboola-med-rec-overlay-thumbnails"
                        }
                    }
                }
            }
        }, {}],
        6: [function(e, t, i) {
            var n = function() {
                    return q1SiteParams.q1id + "_" + q1SiteParams.zone
                },
                o = function(e) {
                    if ("impact" === e.type) return "desktop" === e.device ? "impact" : "mobile_impact"
                },
                r = function(e) {
                    var t = {},
                        i = e.substr(e.indexOf("?") + 1),
                        n = i.split("&");
                    return n.forEach(function(e) {
                        var i = e.split("=");
                        t[i[0]] = i[1]
                    }), t.url = e, t
                },
                s = function(e) {
                    return "q1-adset-" + e + "-current-strike"
                },
                a = function(e) {
                    return e && "string" == typeof e ? 0 === e.indexOf("#") ? e : "#" + e : null
                },
                c = function(e) {
                    return "q1-adset-" + e + "-first-impression-time"
                },
                d = function(e) {
                    return "q1-adset-" + e + "-impression-count"
                },
                l = function(e) {
                    return "q1-adset-" + e + "-next-impression-time"
                },
                p = function(e) {
                    var t = ["vslider", "mutedvslider"];
                    if (t.indexOf(e.type) !== -1) {
                        var i = "desktop";
                        return "desktop" !== e.device && (i = "mobile"), i + "_" + e.type
                    }
                };
            t.exports = {
                controllerLoadedId: n,
                impactOrderKey: o,
                queryStringToObject: r,
                toCurrentStrikeString: s,
                toHtmlIdString: a,
                toFirstImpressionTimeString: c,
                toImpressionCountString: d,
                toNextImpressionTimeString: l,
                videoOrderKey: p
            }
        }, {}],
        7: [function(e, t, i) {
            function n() {
                if (n.prototype.instance) return n.prototype.instance;
                n.prototype.instance = this;
                var e = this;
                e.events = [];
                var t = function(t) {
                    for (var i = 0; i < e.events.length; i++)
                        if (e.events[i].eventName === t) return e.events[i];
                    return null
                };
                e.subscribe = function(i, n) {
                    var o = t(i);
                    o ? o.listeners.indexOf(n) === -1 && o.listeners.push(n) : e.events.push({
                        eventName: i,
                        listeners: [n]
                    })
                }, e.unsubscribe = function(e, i) {
                    var n = t(e);
                    if (n)
                        if (i) {
                            var o = n.listeners.indexOf(i);
                            o !== -1 && n.listeners.splice(o, 1)
                        } else n.listeners = []
                }, e.publish = function() {
                    var e = Array.prototype.slice.call(arguments),
                        i = t(e.shift());
                    i && i.listeners.forEach(function(t) {
                        o.setImmediate(function() {
                            t.apply(null, e)
                        })
                    })
                }
            }
            var o = e("common/async");
            t.exports = n
        }, {
            "common/async": 3
        }],
        8: [function(e, t, i) {
            function n() {
                return n.prototype.instance ? n.prototype.instance : (n.prototype.instance = this, this.targetWindowSpecs = s.getTargetWindowSpecs(), this.targetDocument = this.targetWindowSpecs.runtimeDocument, void(this.targetWindowSpecs.topDocument && (this.targetDocument = this.targetWindowSpecs.topDocument)))
            }
            var o = e("common/async"),
                r = new(e("common/logger")),
                s = e("utils/utilityFunctions");
            n.prototype.loadResource = function(e, t, i, n, o) {
                if (!s.isString(e)) throw new Error("name is required and must be a string");
                if (!s.isString(t)) throw new Error("src is required and must be a string");
                if (!s.isString(i)) throw new Error("type is required and must be a string");
                var r, a = this;
                switch (i) {
                    case "script":
                        r = a.targetDocument.createElement(i), r.setAttribute("data-q1resource", e), r.src = t, r.async = !0, r.type = "text/javascript";
                        break;
                    case "stylesheet":
                        r = a.targetDocument.createElement("link"), r.setAttribute("data-q1resource", e), r.href = t, r.rel = i, r.type = "text/css";
                        break;
                    case "inlinescript":
                        r = a.targetDocument.createElement("script"), r.setAttribute("data-q1resource", e), r.type = "text/javascript", r.appendChild(a.targetDocument.createTextNode(t));
                        break;
                    default:
                        throw new Error("unsupported type")
                }
                o && (r.id = o), s.isFunction(n) && (r.readyState ? r.onreadystatechange = function() {
                    "complete" !== r.readyState && "loaded" !== r.readyState || (r.onreadystatechange = null, n.call(r))
                } : r.onload = n.bind(r)), a.targetDocument.head.appendChild(r)
            }, n.prototype.isResourceOnDocument = function(e) {
                var t = this,
                    i = t.targetDocument.querySelector('[data-q1resource="' + e + '"]');
                return null !== i
            }, n.prototype.unloadResource = function(e) {
                var t = this,
                    i = t.targetDocument.querySelector('[data-q1resource="' + e + '"]');
                i && s.isFunction(i.remove) && i.remove()
            }, n.prototype.unloadAll = function() {
                var e = this,
                    t = e.targetDocument.querySelectorAll("[data-q1resource]");
                t.forEach(function(e) {
                    e && e.remove && e.remove()
                })
            }, n.prototype.loadJquery = function(e) {
                var t = this,
                    i = "https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js",
                    n = t.targetWindowSpecs.topWindow;
                t.loadResource("jquery", i, "script", function() {
                    var t = n.jQuery.noConflict(!0);
                    e(t)
                })
            }, n.prototype.loadVideoJs = function(e) {
                var t = this;
                r.debug("loading videojs");
                var i = q1Environment.devDependencies ? "assets/js/video.dev.js" : "assets/js/video.js";
                o.parallel([function(e) {
                    var n = q1Environment.cdn_url + i;
                    t.loadResource("videojs", n, "script", function() {
                        r.debug("externalResources:", i, "complete"), e()
                    })
                }, function(e) {
                    var i = q1Environment.cdn_url + "assets/css/videojs/video-js.css";
                    t.loadResource("videojsCss", i, "stylesheet", function() {
                        r.debug('externalResources: "css/videojs/video-js.min.css" complete'), e()
                    })
                }], function() {
                    r.debug("externalResources: loadVideoJs() complete"), e()
                })
            }, n.prototype.unloadVideoJs = function() {
                var e = this;
                e.unloadResource("videojs"), e.unloadResource("videojsCss")
            }, n.prototype.loadPrebidJs = function(e) {
                var t = this,
                    i = q1Environment.cdn_url + "assets/js/",
                    n = q1Environment.devDependencies ? ".dev.js" : ".js",
                    o = i + "prebid-" + q1Environment.prebid_version + n;
                s.isDefined(window.pbjs) ? e() : t.loadResource("pbjs", o, "script", e)
            }, n.prototype.unloadPrebidJs = function() {
                var e = this;
                e.unloadResource("pbjs")
            }, t.exports = n
        }, {
            "common/async": 3,
            "common/logger": 11,
            "utils/utilityFunctions": 21
        }],
        9: [function(e, t, i) {
            function n() {
                if (n.prototype.instance) return n.prototype.instance;
                n.prototype.instance = this, this.ALWAYS_SCRIPT_NAMES = ["captify", "simplifi", "lotame"], this.AVAILABLE_SCRIPT_NAMES = ["captify", "lotame", "magnetic_auto", "magnetic_entertainment", "magnetic_gaming", "magnetic_homeandgarden", "magnetic_tech", "magnetic_travel", "simplifi"];
                var e = q1SiteParams.keywords || [];
                this.siteKeywordsJoined = e.join(","), this.siteScriptNames = q1SiteParams.external_scripts || [], this.scriptConfigs = {
                    CAPTIFY: {
                        name: "captify",
                        src: "https://p.cpx.to/p/11821/px.js",
                        global: "captify_kw_query_11821",
                        globalAttributes: "Q1_SITE_KEYWORDS"
                    },
                    LOTAME: {
                        id: "LOTCC_9542",
                        name: "lotame",
                        onload: this._lotameOnload,
                        src: "https://tags.crwdcntrl.net/c/9542/cc.js?ns=_cc9542"
                    },
                    MAGNETIC: {
                        name: "magnetic",
                        base: {
                            global: "_mag",
                            globalAttributes: {
                                kw_encoded: 0,
                                kw: "Q1_SITE_KEYWORDS"
                            }
                        },
                        subScripts: {
                            auto: {
                                shortName: "q2media-auto"
                            },
                            entertainment: {
                                shortName: "q1media-entertainment"
                            },
                            gaming: {
                                shortName: "q1media-gaming"
                            },
                            homeandgarden: {
                                shortName: "q1media-homeandgarden"
                            },
                            tech: {
                                shortName: "q2media-tech"
                            },
                            travel: {
                                shortName: "q2media-travel"
                            }
                        }
                    },
                    SIMPLIFI: {
                        name: "simplifi",
                        src: "https://i.simpli.fi/dpx.js?cid=42566&m=1&sifi_tuid=21007"
                    }
                }
            }

            function o(e) {
                var t = e.split("_");
                return {
                    name: t[0],
                    subName: t[1]
                }
            }
            var r = new(e("common/externalResources")),
                s = new(e("common/logger")),
                a = e("utils/utilityFunctions");
            n.prototype._establishGlobal = function(e, t) {
                var i = this;
                if (a.isString(t)) "Q1_SITE_KEYWORDS" === t && (t = i.siteKeywordsJoined), window[e] = t;
                else {
                    window[e] = window[e] || {};
                    for (var n in t) "Q1_SITE_KEYWORDS" === t[n] ? window[e][n] = i.siteKeywordsJoined : window[e][n] = t[n]
                }
            }, n.prototype._setGlobalsAndLoad = function(e) {
                var t = this;
                e.global && t._establishGlobal(e.global, e.globalAttributes), r.loadResource(e.name, e.src, "script", e.onload, e.id)
            }, n.prototype._buildMagnetic = function(e) {
                var t = this,
                    i = t.scriptConfigs.MAGNETIC.subScripts[e].shortName,
                    n = a.extend({}, t.scriptConfigs.MAGNETIC.base);
                return n.name = [t.scriptConfigs.MAGNETIC.name, e].join("_"), n.globalAttributes.shortName = i, n.globalAttributes.startTime = Date.now(), n.globalAttributes.default_protocol = a.getTargetWindowSpecs().protocol, n.src = "https://d3ezl4ajpp2zy8.cloudfront.net/" + i + "_tag.js", n
            }, n.prototype._loadScript = function(e) {
                var t = this;
                s.debug("Loading external script: " + e);
                var i, n = o(e);
                switch (n.name) {
                    case t.scriptConfigs.CAPTIFY.name:
                        i = t.scriptConfigs.CAPTIFY;
                        break;
                    case t.scriptConfigs.LOTAME.name:
                        i = t.scriptConfigs.LOTAME;
                        break;
                    case t.scriptConfigs.MAGNETIC.name:
                        i = t._buildMagnetic(n.subName);
                        break;
                    case t.scriptConfigs.SIMPLIFI.name:
                        i = t.scriptConfigs.SIMPLIFI
                }
                s.debug(e + " scriptConfig: ", i), t._setGlobalsAndLoad(i)
            }, n.prototype.loadScripts = function() {
                var e = this,
                    t = [].concat(e.siteScriptNames, e.ALWAYS_SCRIPT_NAMES),
                    i = [];
                t.forEach(function(t) {
                    a.arrayContains(e.AVAILABLE_SCRIPT_NAMES, t) ? a.arrayContains(i, t) || r.isResourceOnDocument(t) || i.push(t) : s.error("Invalid external script requested: " + t)
                }), i.forEach(function(t) {
                    e._loadScript(t)
                })
            }, n.prototype._lotameOnload = function() {
                r.loadResource("lotame2", "_cc9542.bcp();", "inlinescript")
            }, n.prototype.loadGoogleAnalytics = function() {
                var e = "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){ (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', 'UA-98425682-1', 'auto');";
                r.loadResource("q1-google-analytics", e, "inlinescript")
            }, t.exports = n
        }, {
            "common/externalResources": 8,
            "common/logger": 11,
            "utils/utilityFunctions": 21
        }],
        10: [function(e, t, i) {
            function n() {
                this.targetWindowSpecs = s.getTargetWindowSpecs(), this.supportedExchanges = {}, this.supportedExchanges[o.exchanges.APPNEXUS] = {
                    enabled: !0,
                    implementation: "prebid",
                    prebidTemplate: {
                        bidder: "appnexus",
                        params: {
                            placementId: "exchange_id"
                        }
                    }
                }, this.supportedExchanges[o.exchanges.OPENX_HB] = {
                    enabled: !0,
                    implementation: "prebid",
                    prebidTemplate: {
                        bidder: "openx",
                        params: {
                            unit: "exchange_id",
                            delDomain: "delDomain"
                        },
                        constants: {
                            delDomain: "q1-media-d.openx.net"
                        }
                    }
                }, this.supportedExchanges[o.exchanges.ADTECH] = {
                    enabled: !0,
                    implementation: "prebid",
                    prebidTemplate: {
                        bidder: "aol",
                        params: {
                            placement: "exchange_id",
                            network: "network"
                        },
                        constants: {
                            network: "10333.1"
                        }
                    }
                }, this.supportedExchanges[o.exchanges.PULSEPOINT] = {
                    enabled: !0,
                    implementation: "prebid",
                    prebidTemplate: {
                        bidder: "pulsepoint",
                        params: {
                            cp: "cp",
                            ct: "exchange_id",
                            cf: "attr.size"
                        },
                        constants: {
                            cp: "560601"
                        }
                    }
                }, this.supportedExchanges[o.exchanges.SOVRN] = {
                    enabled: !0,
                    implementation: "prebid",
                    prebidTemplate: {
                        bidder: "sovrn",
                        params: {
                            tagid: "exchange_id",
                            sizes: "attr.size"
                        }
                    }
                }, this.prebidAdUnits = [], this.prebidAdUnitHash = {}
            }
            var o = e("common/constants"),
                r = new(e("common/logger")),
                s = e("utils/utilityFunctions"),
                a = e("utils/adsetUtils");
            n.prototype.takeHeaderBiddingUnits = function(e) {
                var t = this,
                    i = [];
                return e.forEach(function(e) {
                    t.isExchangeEnabled(e.exchange) ? t.addPlacement(e) : i.push(e)
                }), i
            }, n.prototype.getHeaderBiddingUnits = function() {
                return this.prebidAdUnits
            }, n.prototype.addPlacement = function(e) {
                var t = this.supportedExchanges[e.exchange];
                switch (t.implementation) {
                    case "prebid":
                        this.prebidAdUnitHash[e._id] = e;
                        var i = {
                                code: e._id,
                                bids: []
                            },
                            n = a.getPlacementSize(e);
                        Array.isArray(n) && (i.sizes = a.getDimensions(n, !0));
                        var r = {
                            bidder: t.prebidTemplate.bidder,
                            params: {}
                        };
                        for (var c in t.prebidTemplate.params) {
                            var d = t.prebidTemplate.params[c],
                                l = "";
                            if ("attr.size" === d && (d = "attr", l = "size"), s.isDefined(e[d]))
                                if ("attr" === d && "size" === l) {
                                    var p = e[d],
                                        u = p.size;
                                    if (t.prebidTemplate.bidder === o.exchanges.SOVRN) {
                                        var m = u.split("x"),
                                            g = [];
                                        g.push(parseInt(m[0])), g.push(parseInt(m[1])), r.params[c] = g
                                    } else r.params[c] = u
                                } else r.params[c] = e[d];
                            else t.prebidTemplate.constants && s.isDefined(t.prebidTemplate.constants[c]) && (r.params[c] = t.prebidTemplate.constants[c])
                        }
                        i.bids.push(r), this.prebidAdUnits.push(i)
                }
            }, n.prototype.isExchangeEnabled = function(e) {
                return !!s.isDefined(this.supportedExchanges[e]) && this.supportedExchanges[e].enabled
            }, n.prototype.requestAds = function(e) {
                var t = this,
                    i = this.targetWindowSpecs.topWindow;
                if (0 === t.getHeaderBiddingUnits().length) return e();
                i.q1Pbjs.setBidderSequence("random");
                var n = !0,
                    o = i.q1Pbjs.getBidResponses();
                Object.keys(t.prebidAdUnitHash).forEach(function(e) {
                    s.isDefined(o[e]) || (n = !1)
                }), n ? e(t.getHighestBidder(o)) : (i.q1Pbjs.que.push(function() {
                    i.q1Pbjs.addAdUnits(t.prebidAdUnits)
                }), i.q1Pbjs.que.push(function() {
                    i.q1Pbjs.requestBids({})
                }), i.q1Pbjs.que.push(function() {
                    i.q1Pbjs.enableAnalytics({
                        provider: "ga",
                        options: {
                            global: "UA-98425682-1",
                            enableDistribution: !1
                        }
                    })
                }), i.q1Pbjs.addCallback("allRequestedBidsBack", function() {
                    var n = i.q1Pbjs.getBidResponses();
                    r.debug("Received bids", n), e(t.getHighestBidder(n))
                }))
            }, n.prototype.clearBids = function() {
                var e = this.targetWindowSpecs.topWindow;
                e.q1Pbjs._bidsRequested = [], e.q1Pbjs._bidsReceived = [], e.q1Pbjs.adUnits = [], e.q1Pbjs.clearAuction()
            }, n.prototype.getHighestBidder = function(e) {
                function t(e) {
                    e.adUnitProperties = i.prebidAdUnitHash[e.adUnitCode], e && e.cpm && (n ? e.cpm > n.cpm && (n = e) : n = e)
                }
                var i = this,
                    n = null;
                for (var o in e) Object.keys(i.prebidAdUnitHash).indexOf(o) !== -1 && e[o].bids.forEach(t);
                return n
            }, t.exports = n
        }, {
            "common/constants": 5,
            "common/logger": 11,
            "utils/adsetUtils": 17,
            "utils/utilityFunctions": 21
        }],
        11: [function(e, t, i) {
            function n() {
                return n.prototype.instance ? n.prototype.instance : (n.prototype.instance = this, this.showDebug = !1, r.arrayContains(["production", "test"], q1Environment.environment) && "true" !== r.getQueryStringParameter("q1_debug") && !o.get("q1_debug") || (this.showDebug = !0), window.console || (window.console = {
                    log: r.noop,
                    error: r.noop,
                    warn: r.noop
                }), this.info = console.log.bind(console, "[Q1-INFO]:"), this.error = console.error.bind(console, "[Q1-ERROR]:"), this.warn = console.warn.bind(console, "[Q1-WARN]:"), this.styleLog = function(e, t) {
                    var i = "";
                    switch (t) {
                        case "loaded":
                            i = "font-weight: bold; color: #2666B0; font-size: 12px;"
                    }
                    console.log("%c[Q1MEDIA]: " + e, i)
                }, void(this.showDebug ? (this.debug = console.log.bind(console, "[Q1-DEBUG]:"), this.time = function() {
                    console.time.apply(console, r.arrayLikeObjectToArray(arguments))
                }, this.timeEnd = function() {
                    console.timeEnd.apply(console, r.arrayLikeObjectToArray(arguments))
                }) : (this.debug = r.noop, this.time = r.noop, this.timeEnd = r.noop)))
            }
            var o = new(e("common/storage")),
                r = e("utils/utilityFunctions");
            t.exports = n
        }, {
            "common/storage": 12,
            "utils/utilityFunctions": 21
        }],
        12: [function(e, t, i) {
            function n() {
                if (n.prototype.instance) return n.prototype.instance;
                n.prototype.instance = this, this.hasLocalStorage = !1;
                try {
                    localStorage.setItem("testLocalStorage", "testLocalStorage"), localStorage.removeItem("testLocalStorage"), this.hasLocalStorage = !0
                } catch (e) {}
            }
            var o = e("utils/cookieUtils");
            n.prototype.set = function(e, t) {
                this.hasLocalStorage ? localStorage.setItem(e, t) : o.setCookie(e, t, 31536e6)
            }, n.prototype.get = function(e) {
                return this.hasLocalStorage ? localStorage.getItem(e) || null : o.getCookie(e)
            }, n.prototype["delete"] = function(e) {
                return this.hasLocalStorage ? localStorage.removeItem(e) : o.deleteCookie(e)
            }, t.exports = n
        }, {
            "utils/cookieUtils": 18
        }],
        13: [function(e, t, i) {
            function n() {
                var e = new a,
                    t = new l,
                    i = new d,
                    n = s.getLoadedControllerTagsObject(),
                    m = o.controllerLoadedId();
                if (q1SiteParams.zone > 0 && n[m]) return void r.error("Duplicate Controller Tag loaded with Q1Id=" + q1SiteParams.q1id + " and zone=" + q1SiteParams.zone);
                n[m] = !0, "test" !== q1Environment.environment && (0 === q1SiteParams.zone ? r.styleLog("Display Controller Tag loaded with Q1Id=" + q1SiteParams.q1id, "loaded") : r.styleLog("Controller Tag loaded with Q1Id=" + q1SiteParams.q1id + " and zone=" + q1SiteParams.zone, "loaded")), i.loadGoogleAnalytics(), i.loadScripts(), r.debug("q1EnabledAdsets", q1EnabledAdsets);
                var g = [];
                if (q1EnabledAdsets.forEach(function(t) {
                        "display" !== t.type && e.isAdsetCapped(t) || g.push(t)
                    }), r.debug("canServeAdsets", g), 0 !== g.length) {
                    var f = {
                        desktopVideo: {
                            orderKey: o.videoOrderKey,
                            order: ["desktop_vslider", "desktop_mutedvslider"],
                            UnitCode: u,
                            adsets: []
                        },
                        mobileVideo: {
                            orderKey: o.videoOrderKey,
                            order: ["mobile_vslider"],
                            UnitCode: u,
                            adsets: []
                        },
                        desktop_impact: {
                            orderKey: o.impactOrderKey,
                            order: ["impact"],
                            UnitCode: p,
                            adsets: []
                        },
                        mobile_impact: {
                            orderKey: o.impactOrderKey,
                            order: ["mobile_impact"],
                            UnitCode: p,
                            adsets: []
                        },
                        display: {
                            order: ["display"],
                            UnitCode: c,
                            adsets: []
                        }
                    };
                    t.loadJquery(function(e) {
                        for (var t in f) {
                            for (var i = f[t], n = 0; n < i.order.length; n++)
                                for (var o = i.order[n], r = 0; r < g.length; r++) {
                                    var s = g[r],
                                        a = s.type;
                                    "function" == typeof i.orderKey && (a = i.orderKey(s)), a === o && i.adsets.push(s)
                                }
                            if (i.adsets.length) {
                                var c = new i.UnitCode(e, i.adsets);
                                c.serve()
                            }
                        }
                    })
                }
            }
            var o = e("common/converters"),
                r = new(e("common/logger")),
                s = e("utils/utilityFunctions"),
                a = e("common/capping"),
                c = e("units/display"),
                d = e("common/externalScripts"),
                l = e("common/externalResources"),
                p = e("units/impact"),
                u = e("units/vslider");
            "test" === q1Environment.environment ? t.exports = n : t.exports = new n
        }, {
            "common/capping": 4,
            "common/converters": 6,
            "common/externalResources": 8,
            "common/externalScripts": 9,
            "common/logger": 11,
            "units/display": 14,
            "units/impact": 15,
            "units/vslider": 16,
            "utils/utilityFunctions": 21
        }],
        14: [function(e, t, i) {
            function n(e, t) {
                var i = this;
                o = e, i.adsets = t, i.adsetIteratorHash = {}, i.adsets.forEach(function(e) {
                    i.adsetIteratorHash[e.controller_id] = new r(e, "waterfallPlacements"), i.adsetIteratorHash[e.controller_id].passback = e.passback, i.adsetIteratorHash[e.controller_id].dimensions = a.getDimensions(a.getAttrProperty(e, "size")), i.adsetIteratorHash[e.controller_id].refresh_count = e.refresh_count, i.adsetIteratorHash[e.controller_id].refresh_delay = e.refresh_delay
                }), i.refreshTimer = []
            }
            var o, r = e("common/adsetIterator"),
                s = e("common/headerBidding"),
                a = e("utils/adsetUtils"),
                c = e("common/adTagGenerators"),
                d = new(e("common/externalResources")),
                l = e("common/async"),
                p = e("common/converters"),
                u = e("utils/filters"),
                m = new(e("common/logger")),
                g = e("utils/unitUtils"),
                f = e("utils/utilityFunctions");
            n.prototype.serve = function() {
                var e = this;
                l.waterfall([e._loadResources.bind(e), e._setUpQ1AdsArray.bind(e)], f.noop)
            }, n.prototype._loadResources = function(e) {
                d.loadPrebidJs(function() {
                    e()
                })
            }, n.prototype._setUpQ1AdsArray = function() {
                function e(e) {
                    var i = /q1-waterfall=(.*)/i.exec(e.data);
                    if (null !== i) {
                        var n = i[1],
                            r = t.adsetIteratorHash[n];
                        r.nextPlacement(), m.debug("slot_" + n + "_Default"), o(r.slotSelector).html(""), t._attemptAd(n)
                    }
                }
                var t = this,
                    i = f.getTargetWindowSpecs().runtimeWindow;
                f.isDefined(i.q1Ads) || (i.q1Ads = []), i.q1Ads.listeningForWaterfallMessages !== !0 && (m.debug("adding listener to runtimeWindow and q1ads"), f.createMessageListener(i, e), f.onArrayPush(i.q1Ads, t._attemptQ1Ads.bind(t)), i.q1Ads.listeningForWaterfallMessages = !0)
            }, n.prototype._attemptQ1Ads = function() {
                var e = this,
                    t = f.getTargetWindowSpecs().runtimeWindow;
                t.q1Ads.forEach(function(i, n) {
                    var o = i.id,
                        r = e.adsetIteratorHash[o];
                    if (f.isDefined(r)) {
                        if (!t.q1Ads[n].attemptMade) {
                            t.q1Ads[n].attemptMade = !0, r.headerBidding = new s, r.slotSelector = p.toHtmlIdString(i.slot) || "body";
                            var a = r.getCurrentAdset().placements;
                            a = a.filter(u.validExchanges), r.getCurrentAdset().waterfallPlacements = r.headerBidding.takeHeaderBiddingUnits(a);
                            var c = r.headerBidding.getHeaderBiddingUnits();
                            c.length ? (m.debug("slot_" + o + "_RequestingBids"), m.debug("slot_" + o, c), r.headerBidding.requestAds(function(t) {
                                t ? (m.debug("slot_" + o + "_WinningBid"), m.debug("slot_" + o, t), f.isDefined(t.ad) ? r.ad = t.ad : f.isDefined(t.adUrl) && (r.adUrl = t.adUrl), e._serveAd(o)) : (m.debug("slot_" + o + "_NoWinner"), e._waterfallAdset(o))
                            })) : e._waterfallAdset(o)
                        }
                    } else m.debug("Q1 Display Adset " + o + " does not exist, or has no active placements.")
                })
            }, n.prototype._waterfallAdset = function(e) {
                var t = this,
                    i = t.adsetIteratorHash[e];
                m.debug("slot_" + e + "_Waterfall"), m.debug("slot_" + e, i.getCurrentAdset().waterfallPlacements), l.setImmediate(t._attemptAd.bind(t, e))
            }, n.prototype._prepareIframe = function(e) {
                var t = this,
                    i = t.adsetIteratorHash[e],
                    n = f.getTargetWindowSpecs().runtimeDocument,
                    r = g.createIframe("iframe-" + e),
                    s = o(i.slotSelector, n).html(r),
                    a = o("*" + i.slotSelector, n).length;
                if (0 === s.length) return m.error("Adset ID mismatch. Div " + i.slotSelector + " cannot be found in the DOM. Verify that the unit.slot specified in 'q1Ads' is correct.");
                a > 1 && m.error("Duplicated adset. Div " + i.slotSelector + " appears more than once in the DOM. Please remove the duplicate to avoid blanks.");
                var c = i.dimensions;
                return s.css({
                    width: c.width,
                    height: c.height
                }), r
            }, n.prototype._attemptAd = function(e) {
                var t = this,
                    i = t.adsetIteratorHash[e],
                    n = i.getCurrentPlacement();
                if (!f.isDefined(n)) return t._passback(e);
                m.debug("slot_" + e + "_Placement_" + n.exchange_id + "_Attempt");
                var o = c.generateDisplayTag(n);
                i.ad = ['<body style="margin:0px;">', '<script type="text/javascript">', "(function () {", "var controllerId = " + e + ";", "var onIframeWindowMessage = function (evt) {", "var q1passback = /q1pass/i.exec(evt.data);", "if (q1passback !== null) {", 'window.parent.postMessage("q1-waterfall=" + controllerId, "*");', "}", "};", "window.q1listener = true;", "if (window.addEventListener) {", 'window.addEventListener("message", onIframeWindowMessage, false);', "} else {", 'window.attachEvent("onmessage", onIframeWindowMessage);', "}", "})()", "</script>", '<div id="iframeAd" style="display:inline-block;">' + o + "</div>", "</body>"].join(" "), this._serveAd(e)
            }, n.prototype._serveAd = function(e) {
                var t = this,
                    i = t.adsetIteratorHash[e],
                    n = t._prepareIframe(e);
                f.isDefined(n) && (f.isDefined(i.ad) ? g.writeIframeContent(n, i.ad) : f.isDefined(i.adUrl) ? n.src = i.adUrl : t._passback(e)), i.refresh_count && i.refresh_delay && t._attemptRefreshAdSlot(e)
            }, n.prototype._passback = function(e) {
                var t = this,
                    i = t.adsetIteratorHash[e];
                m.info("slot_" + e + "_PublisherPassback");
                var n = i.passback;
                if (f.isDefined(n)) {
                    var r = "<!-- Q1 PASSBACK SLOT: " + e + " -->\n",
                        s = g.replaceMacros(n.tag);
                    if (s = "js" === n.type ? r + '<script type="text/javascript">' + s + "</script>" : r + s, n.inIframe) {
                        var a = t._prepareIframe(e);
                        g.writeIframeContent(a, s)
                    } else {
                        var c = f.getTargetWindowSpecs().runtimeDocument;
                        o(i.slotSelector, c).html(s)
                    }
                }
            }, n.prototype._attemptRefreshAdSlot = function(e) {
                var t = this,
                    i = f.getTargetWindowSpecs().runtimeWindow,
                    n = t.adsetIteratorHash[e],
                    o = n.refresh_count || 0;
                i.refreshCount = i.refreshCount || {}, i.refreshCount[e] = i.refreshCount[e] || 0, t.refreshTimer[e] && clearTimeout(t.refreshTimer[e]), i.refreshCount[e] < o && n.refresh_delay > 0 && (t.refreshTimer[e] = setTimeout(function() {
                    t._refreshAdSlot(e)
                }, 1e3 * n.refresh_delay))
            }, n.prototype._refreshAdSlot = function(e) {
                var t = this,
                    i = f.getTargetWindowSpecs().runtimeWindow,
                    n = t.adsetIteratorHash[e];
                n.headerBidding.clearBids(), delete n.ad, delete n.adUrl, o("#q1-adset-" + e).empty();
                var r = {
                    id: e,
                    slot: "q1-adset-" + e
                };
                i.q1Ads.push(r), i.refreshCount[e]++, m.debug("Refreshing q1-adset-", e)
            }, t.exports = n
        }, {
            "common/adTagGenerators": 1,
            "common/adsetIterator": 2,
            "common/async": 3,
            "common/converters": 6,
            "common/externalResources": 8,
            "common/headerBidding": 10,
            "common/logger": 11,
            "utils/adsetUtils": 17,
            "utils/filters": 19,
            "utils/unitUtils": 20,
            "utils/utilityFunctions": 21
        }],
        15: [function(e, t, i) {
            function n(e, t) {
                var i = this;
                o = e, i.adsets = new r(t, "waterfallPlacements")
            }
            var o, r = e("common/adsetIterator"),
                s = e("utils/adsetUtils"),
                a = e("common/adTagGenerators"),
                c = e("common/async"),
                d = new(e("common/capping")),
                l = e("common/constants"),
                p = new(e("common/events")),
                u = new(e("common/externalResources")),
                m = e("utils/filters"),
                g = new(e("common/headerBidding")),
                f = new(e("common/logger")),
                h = e("utils/unitUtils"),
                v = e("utils/utilityFunctions");
            n.prototype.serve = function() {
                var e = this;
                e.adsets.forEach(function(e) {
                    e.waterfallPlacements = [], e.placements = e.placements.filter(m.validExchanges), e.placements = e.placements.filter(m.placementsForDeviceSize), e.waterfallPlacements = g.takeHeaderBiddingUnits(e.placements)
                }), f.debug("impact adsets", e.adsets), c.waterfall([e._loadResources.bind(e), e._createImpactContainer.bind(e), e._setQ1EventsAndRequestAds.bind(e)], v.noop)
            }, n.prototype._loadResources = function(e) {
                u.loadPrebidJs(function() {
                    e()
                })
            }, n.prototype._createImpactContainer = function(e) {
                var t = this;
                f.debug("creating impact container");
                var i = v.getTargetWindowSpecs().topDocument,
                    n = o('<div id="impact-container"></div>').css({
                        position: "fixed",
                        display: "none",
                        "z-index": l.impact.Z_INDEX
                    }).append('<div id="display-creative"></div>').append(h.createCloseContainer(o, "impact"));
                "desktop" === q1SiteParams.device && n.append(h.createPoweredByContainer(o, "impact")), n.appendTo(i.body), o("#close-impact", n).click(function() {
                    t._unloadImpact(n)
                }), e(null, n)
            }, n.prototype._setQ1EventsAndRequestAds = function(e) {
                function t(t) {
                    var i = o.adsets.getCurrentAdset();
                    t.adUnitProperties && (t = t.adUnitProperties, i = o.adsets.getAdsetWithPlacementId(t._id)), d.impressionServed(i), o.impressionServed = !0, o._slideImpactIntoView(e)
                }

                function i() {
                    o._unloadImpact(e)
                }

                function n() {
                    o._unloadImpact(e)
                }
                var o = this;
                p.subscribe(l.events.VSLIDER_IMPRESSION, n), p.subscribe(l.events.IMPACT_IMPRESSION, t), p.subscribe(l.events.IMPACT_DEFAULT, i), o._requestAds(e)
            }, n.prototype._requestAds = function(e) {
                var t = this;
                g.getHeaderBiddingUnits().length ? g.requestAds(function(i) {
                    if (i) {
                        f.debug("winning bid received, ready container for adset");
                        var n = t.adsets.getAdsetWithPlacementId(i.adUnitProperties._id),
                            o = s.getAttrProperty(n, "position", "right");
                        "desktop" !== q1SiteParams.device && (o = h.getPositionBySize(i.size)), t._sizeContainerForAd(e, o, i.width, i.height, v.noop), f.debug("done sizing container for the ad"), t._serveHeaderBiddingResponse(e, i)
                    } else f.debug("No winning bid. Waterfalling."), t._waterfallAdsets(e)
                }) : t._waterfallAdsets(e)
            }, n.prototype._sizeContainerForAd = function(e, t, i, n, r) {
                function s() {
                    var o = h.calculateScaleFactor(i, n, t);
                    e.css({
                        "-webkit-transform": "scale(" + o + ")"
                    })
                }
                var a = this,
                    c = h.calculateScaleFactor(i, n, t);
                f.debug("Screen size based scale factor for ad =", c);
                var d = {
                        hidden: v.extend({}, l.poweredByQ1.css.RIGHT, {
                            right: 0,
                            bottom: 0
                        }),
                        visible: {
                            right: "-=" + l.poweredByQ1.css.RIGHT.width
                        }
                    },
                    p = {
                        hidden: v.extend({}, l.poweredByQ1.css.LEFT, {
                            left: 0,
                            bottom: 0
                        }),
                        visible: {
                            left: "-=" + l.poweredByQ1.css.LEFT.width
                        }
                    },
                    u = {
                        hidden: v.extend({}, l.poweredByQ1.css.TOP, {
                            left: 0,
                            top: 0
                        }),
                        visible: {
                            top: "-=" + l.poweredByQ1.css.TOP.height
                        }
                    };
                switch (h.clearCss(e, a.offScreenPosition), t) {
                    case "right":
                        o("#close-impact", e).css({
                            left: 0
                        }), a.offScreenPosition = {
                            right: -i,
                            top: "50%",
                            "margin-top": -l.impact.SIDE_MARGIN_TOP_OFFSET
                        }, a.visiblePosition = {
                            right: 0
                        }, a.poweredByQ1 = p, c && (a.offScreenPosition["-webkit-transform"] = "scale(" + c + ")", a.offScreenPosition.right -= i * c, a.visiblePosition.right += (i * c - i) / 2);
                        break;
                    case "bottom-right":
                        o("#close-impact", e).css({
                            left: 0
                        }), a.offScreenPosition = {
                            right: -i,
                            bottom: 0
                        }, a.visiblePosition = {
                            right: 0
                        }, a.poweredByQ1 = p;
                        break;
                    case "left":
                        o("#close-impact", e).css({
                            right: 0
                        }), a.offScreenPosition = {
                            left: -i,
                            top: "50%",
                            "margin-top": -l.impact.SIDE_MARGIN_TOP_OFFSET
                        }, a.visiblePosition = {
                            left: 0
                        }, a.poweredByQ1 = d;
                        break;
                    case "bottom-left":
                        o("#close-impact", e).css({
                            right: 0
                        }), a.offScreenPosition = {
                            left: -i,
                            bottom: 0
                        }, a.visiblePosition = {
                            left: 0
                        }, a.poweredByQ1 = d;
                        break;
                    case "bottom":
                        var m = parseInt(o("#close-impact", e).height());
                        o("#close-impact", e).css({
                            right: 0
                        }), a.offScreenPosition = {
                            left: "50%",
                            bottom: -(n + m),
                            "margin-left": -(i / 2)
                        }, a.visiblePosition = {
                            bottom: 0
                        }, a.poweredByQ1 = u, c && (a.offScreenPosition["-webkit-transform"] = "scale(" + c + ")", a.offScreenPosition.bottom -= n * c, a.visiblePosition.bottom += (n * c - n) / 2);
                        break;
                    case "interstitial":
                        o("#close-impact", e).css({
                            right: 1,
                            top: 1
                        }), a.offScreenPosition = {
                            top: "50%",
                            left: "50%",
                            "margin-top": -(n / 2),
                            "margin-left": -(i / 2),
                            display: "none"
                        }, a.visiblePosition = {
                            display: "block"
                        }, a.poweredByQ1 = p, c && (a.offScreenPosition["-webkit-transform"] = "scale(" + c + ")");
                        var g = v.getTargetWindowSpecs();
                        v.createOrientationChangeListener(g.topWindow, s)
                }
                o("#display-creative", e).css({
                    width: i,
                    height: n
                }), e.css(a.offScreenPosition), "none" !== a.offScreenPosition.display && e.show(), o("#poweredByQ1", e).css(a.poweredByQ1.hidden), r(null, e)
            }, n.prototype._serveHeaderBiddingResponse = function(e, t) {
                var i = this;
                f.debug("serving header bidding response");
                var n = h.createIframe(),
                    r = function() {
                        p.publish(l.events.IMPACT_IMPRESSION, t)
                    };
                t.ad ? (o("#display-creative", e).html(n), h.writeIframeContent(n, t.ad), n.onload = r) : t.adUrl ? (n.src = t.adUrl, n.onload = r, o("#display-creative", e).append(n)) : (f.error("invalid winning bid received, waterfalling"), i._waterfallAdsets(e))
            }, n.prototype._waterfallAdsets = function(e) {
                function t() {
                    return f.debug("next placement!"), n.adsets.nextPlacement(), n._attemptCurrentAdset(e)
                }

                function i(e) {
                    e && "die" === e.data ? (f.debug("q1die message"), n.impressionTimeout && (clearTimeout(n.impressionTimeout), n.impressionTimeout = null), t()) : e && "q1impression" === e.data && (f.debug("q1impression message"), p.publish(l.events.IMPACT_IMPRESSION, n.adsets.getCurrentPlacement()))
                }
                var n = this;
                f.debug("waterfalling adsets"), v.createMessageListener(window.top, i), n._attemptCurrentAdset(e)
            }, n.prototype._attemptCurrentAdset = function(e) {
                function t() {
                    return f.debug("next adset!"), i.adsets.nextAdset(), i._attemptCurrentAdset(e)
                }
                var i = this,
                    n = i.adsets.getCurrentAdset();
                if (f.debug("attempting adset", n), !v.isDefined(n)) return p.publish(l.events.IMPACT_DEFAULT);
                var o = i.adsets.getCurrentPlacement();
                if (v.isDefined(o)) {
                    var r = s.getAttrProperty(n, "position", "right"),
                        a = s.getDimensions(s.getPlacementSize(o));
                    "desktop" !== q1SiteParams.device && (r = h.getPositionBySize(a.width + "x" + a.height)), i._sizeContainerForAd(e, r, a.width, a.height, v.noop), i._attemptPlacement(e)
                } else f.debug("No placements available to serve."), t()
            }, n.prototype._attemptPlacement = function(e) {
                var t = this,
                    i = t.adsets.getCurrentPlacement(),
                    n = a.generateDisplayTag(i);
                i.exchange === l.exchanges.TABOOLA && b(e, i.attr.size);
                var r = h.createIframe();
                o("#display-creative", e).html(r), h.writeIframeContent(r, n), i.exchange === l.exchanges.GOOGLEADX && (t.impressionTimeout = setTimeout(function() {
                    window.top.postMessage("q1impression", "*")
                }, l.MAX_WAIT_FOR_AD_TIME))
            }, n.prototype._slideImpactIntoView = function(e) {
                function t() {
                    q1SiteParams.show_gtau && setTimeout(function() {
                        o("#poweredByQ1", e).animate(i.poweredByQ1.visible, l.poweredByQ1.SLIDE_IN_SPEED)
                    }, l.poweredByQ1.SLIDE_IN_DELAY)
                }
                var i = this;
                "none" === i.offScreenPosition.display ? e.fadeIn(l.impact.SLIDE_IN_SPEED, v.noop) : e.animate(i.visiblePosition, l.impact.SLIDE_IN_SPEED, t)
            }, n.prototype._unloadImpact = function(e) {
                function t() {
                    e.remove(), u.unloadPrebidJs()
                }
                var i = this;
                f.debug("unload impact"), i.impressionServed ? "none" === i.offScreenPosition.display ? e.fadeOut(t) : e.animate(i.offScreenPosition, t) : t()
            };
            var b = function(e, t) {
                switch (t) {
                    case "300x250":
                        e.css("right", "0"), e.css("bottom", "0"), e.css("top", ""), e.css("background", "#efeff5"), e.find("a").find("div#poweredByQ1").remove();
                        break;
                    case "320x50":
                        e.css("bottom", "0"), e.css("background", "#efeff5")
                }
            };
            t.exports = n
        }, {
            "common/adTagGenerators": 1,
            "common/adsetIterator": 2,
            "common/async": 3,
            "common/capping": 4,
            "common/constants": 5,
            "common/events": 7,
            "common/externalResources": 8,
            "common/headerBidding": 10,
            "common/logger": 11,
            "utils/adsetUtils": 17,
            "utils/filters": 19,
            "utils/unitUtils": 20,
            "utils/utilityFunctions": 21
        }],
        16: [function(e, t, i) {
            function n(e, t) {
                var i = this;
                o = e, i.adsets = new r(t), i.impressionServed = !1, i.hasBackground = !1, i.isVsliderUnloaded = !1, i.width = "desktop" === q1SiteParams.device ? l.vslider.DESKTOP_WIDTH : l.vslider.MOBILE_WIDTH, i.height = "desktop" === q1SiteParams.device ? l.vslider.DESKTOP_HEIGHT : l.vslider.MOBILE_HEIGHT
            }
            var o, r = e("common/adsetIterator"),
                s = e("utils/adsetUtils"),
                a = e("common/adTagGenerators"),
                c = e("common/async"),
                d = new(e("common/capping")),
                l = e("common/constants"),
                p = new(e("common/events")),
                u = new(e("common/externalResources")),
                m = e("utils/filters"),
                g = new(e("common/logger")),
                f = e("utils/unitUtils"),
                h = e("utils/utilityFunctions");
            n.prototype.serve = function() {
                function e() {
                    c.waterfall([t._createVsliderContainer.bind(t), t._setQ1Events.bind(t), t._applyBackground.bind(t), t._setInitialPosition.bind(t), t._waterfallPlacements.bind(t)], function(i) {
                        (i || t.impressionServed === !1) && (g.debug("no impression served, trying next adset if it exists"), h.isDefined(t.adsets.peekNextAdset()) && (t.adsets.nextAdset(), e()))
                    })
                }
                var t = this;
                t.adsets.forEach(function(e) {
                    e.placements = e.placements.filter(m.validExchanges)
                }), this._loadResources(e)
            }, n.prototype._loadResources = function(e) {
                u.loadVideoJs(e)
            }, n.prototype._createVsliderContainer = function(e) {
                var t = this,
                    i = o('<div id="vslider-container"></div>').css({
                        position: "fixed",
                        width: t.width,
                        height: t.height,
                        overflow: "visible",
                        font: '12px "Trebuchet MS", Arial, Helvetica, sans-serif',
                        "z-index": l.vslider.Z_INDEX
                    }).append('<div id="video-creative"></div>').append(f.createCloseContainer(o, "vslider"));
                "desktop" === q1SiteParams.device && i.prepend(o('<div id="companion-container"></div>').css("display", "none")).append(f.createPoweredByContainer(o, "vslider")), e(null, i)
            }, n.prototype._setQ1Events = function(e, t) {
                function i() {
                    o.isWaitingForImpact = !0, setTimeout(function() {
                        o.isWaitingForImpact = !1, p.publish(l.events.VSLIDER_READY)
                    }, l.vslider.AFTER_IMPACT_DELAY)
                }

                function n() {
                    o.impressionServed = !0, d.impressionServed(o.adsets.getCurrentAdset()), o._startCloseCountdownTimer(e), o._slideVsliderIntoView(e)
                }
                var o = this;
                p.subscribe(l.events.IMPACT_IMPRESSION, i), p.subscribe(l.events.VSLIDER_IMPRESSION, n), t(null, e)
            }, n.prototype._applyBackground = function(e, t) {
                var i, n = this,
                    r = n.adsets.getCurrentAdset();
                if (s.getAttrProperty(r, "double_skin")) i = s.getAttrProperty(r, "double_skin");
                else {
                    if (!s.getAttrProperty(r, "single_skin")) return t(null, e);
                    i = s.getAttrProperty(r, "single_skin")
                }
                n.hasBackground = !0, o("#video-creative", e).css({
                    "margin-top": l.vslider.BORDER_TOP_HEIGHT,
                    "padding-left": l.vslider.BORDER_TOTAL_WIDTH / 2
                }), o("#close-vslider", e).css({
                    top: "+=" + l.vslider.BORDER_TOP_HEIGHT + "px",
                    "margin-left": l.vslider.BORDER_TOTAL_WIDTH / 2 + "px"
                }), o("#poweredByQ1", e).css({
                    bottom: "+=4px"
                }), o(e).css({
                    height: "+=" + l.vslider.BORDER_TOTAL_HEIGHT,
                    width: "+=" + l.vslider.BORDER_TOTAL_WIDTH
                }), e.prepend('<div id="bg-top-left" class="custom-bg-area"></div><div id="bg-top-right" class="custom-bg-area"></div><div id="bg-bottom-left" class="custom-bg-area"></div><div id="bg-bottom-right" class="custom-bg-area"></div>'), o(".custom-bg-area", e).css({
                    background: 'no-repeat url("' + q1Environment.cdn_url_backgrounds + i + '")',
                    width: "50%",
                    height: "50%",
                    position: "absolute",
                    overflow: "hidden"
                }), o("#bg-top-left", e).css({
                    top: 0,
                    left: 0,
                    "background-position": "top left"
                }), o("#bg-top-right", e).css({
                    top: 0,
                    right: 0,
                    "background-position": "top right"
                }), o("#bg-bottom-left", e).css({
                    bottom: 0,
                    left: 0,
                    "background-position": "bottom left"
                }), o("#bg-bottom-right", e).css({
                    bottom: 0,
                    right: 0,
                    "background-position": "bottom right"
                }), t(null, e)
            }, n.prototype._setInitialPosition = function(e, t) {
                var i = this,
                    n = h.getTargetWindowSpecs().topDocument,
                    r = i.adsets.getCurrentAdset(),
                    a = s.getAttrProperty(r, "position", "bottom-right"),
                    c = e.outerWidth(),
                    d = e.outerHeight(),
                    p = {
                        hidden: h.extend({}, l.poweredByQ1.css.RIGHT, {
                            right: i.hasBackground ? "4px" : "0px",
                            bottom: i.hasBackground ? "4px" : "0px"
                        }),
                        visible: {
                            right: "-=" + l.poweredByQ1.css.RIGHT.width
                        }
                    },
                    u = {
                        hidden: h.extend({}, l.poweredByQ1.css.LEFT, {
                            left: i.hasBackground ? "4px" : "0px",
                            bottom: i.hasBackground ? "4px" : "0px"
                        }),
                        visible: {
                            left: "-=" + l.poweredByQ1.css.LEFT.width
                        }
                    };
                switch (a) {
                    case "top":
                        i.offScreenPosition = {
                            top: -d,
                            right: "50%",
                            "margin-right": "-" + c / 2 + "px"
                        }, i.visiblePosition = {
                            top: 0
                        }, i.poweredByQ1 = u;
                        break;
                    case "right":
                        i.offScreenPosition = {
                            top: "50%",
                            right: -c,
                            "margin-top": "-" + d / 2 + "px"
                        }, i.visiblePosition = {
                            right: 0
                        }, i.poweredByQ1 = u;
                        break;
                    case "bottom-right":
                        i.offScreenPosition = {
                            bottom: -d,
                            right: 0
                        }, i.visiblePosition = {
                            bottom: 0
                        }, i.poweredByQ1 = u;
                        break;
                    case "bottom":
                        i.offScreenPosition = {
                            bottom: -d,
                            right: "50%",
                            "margin-right": "-" + c / 2 + "px"
                        }, i.visiblePosition = {
                            bottom: 0
                        }, i.poweredByQ1 = u, "desktop" !== q1SiteParams.device && (i.offScreenPosition.bottom -= l.vslider.MOBILE_CLOSE_BUTTON_HEIGHT);
                        break;
                    case "bottom-left":
                        i.offScreenPosition = {
                            bottom: -d,
                            left: 0
                        }, i.visiblePosition = {
                            bottom: 0
                        }, i.poweredByQ1 = p;
                        break;
                    case "left":
                        i.offScreenPosition = {
                            top: "50%",
                            left: -c,
                            "margin-top": "-" + d / 2 + "px"
                        }, i.visiblePosition = {
                            left: 0
                        }, i.poweredByQ1 = p
                }
                e.css(i.offScreenPosition), "desktop" === q1SiteParams.device ? o("#poweredByQ1", e).css(i.poweredByQ1.hidden) : o("#close-vslider", e).css("right", 0), e.appendTo(n.body), t(null, e)
            }, n.prototype._waterfallPlacements = function(e, t) {
                function i() {
                    c.waterfall([function(t) {
                        t(null, e)
                    }, n._createVideoElement.bind(n), n._installVideoJs.bind(n), n._setupPlayerEventsAndPlay.bind(n)], function(o) {
                        (o || n.impressionServed === !1) && (g.debug("Placement failed to serve impression"), o && g.debug("Error Message:", o), h.isDefined(n.adsets.peekNextPlacement()) ? (n.adsets.nextPlacement(), i()) : (e.remove(), t(o)))
                    })
                }
                var n = this;
                i()
            }, n.prototype._createVideoElement = function(e, t) {
                var i = this,
                    n = o('<video id="q1-vslider-player" class="video-js vjs-default-skin" controls preload="auto"></video>').attr("width", i.width).attr("height", i.height);
                n.appendTo(o("#video-creative", e)), t(null, e)
            }, n.prototype._installVideoJs = function(e, t) {
                var i = this,
                    n = i.adsets.getCurrentPlacement(),
                    o = a.generateVastTag(n),
                    r = l.vslider.ADS_CANCEL_TIMEOUT;
                h.isDefined(i.adsets.peekNextPlacement()) || h.isDefined(i.adsets.peekNextAdset()) || (r = l.vslider.FINAL_ADS_CANCEL_TIMEOUT), g.debug(o, "timeout:", r), window.top.videojs("q1-vslider-player", {
                    controls: !0,
                    plugins: {
                        vastClient: {
                            url: o,
                            adCancelTimeout: r,
                            responseTimeout: 6e4,
                            adsEnabled: !0,
                            preferredTech: "html5",
                            verbosity: g.showDebug ? 4 : 0,
                            vpaidFlashLoaderPath: q1Environment.cdn_url + "assets/flash/VPAIDFlash.swf"
                        }
                    }
                }, function() {
                    i.player = this, t(null, e)
                })
            }, n.prototype._setupPlayerEventsAndPlay = function(e, t) {
                function i() {
                    function e() {
                        var e = a.adsets.getCurrentAdset();
                        p.publish(l.events.VSLIDER_IMPRESSION), a.player.volume(s.getAttrProperty(e, "volume", .2)), "mutedvslider" === e.type ? a.player.on("useractive", function() {
                            a.player.muted(!1)
                        }) : a.player.muted(!1)
                    }
                    a.isWaitingForImpact ? (a.player.vast.adUnit.pauseAd(), p.subscribe(l.events.VSLIDER_READY, function() {
                        a.player.vast.adUnit.resumeAd(), e()
                    })) : e()
                }

                function n() {
                    a._unloadVslider(e)
                }

                function r(e) {
                    e && e.error ? e = e.error : e || (e = new Error("Some error when trying to serve placement")), a.player.dispose(), t(e)
                }
                var a = this,
                    c = h.getTargetWindowSpecs().topDocument;
                a.player.on("vpaid.AdImpression", i), a.player.on(["vpaid.AdSkipped", "vpaid.AdStopped"], n), a.player.on("vast.adError", r), a.player.muted(!0), "desktop" === q1SiteParams.device ? a.player.play() : o(c.body).on("touchstart", function() {
                    a.player.play()
                })
            }, n.prototype._startCloseCountdownTimer = function(e) {
                function t() {
                    o("#close-vslider", e).html("X").css({
                        right: n.hasBackground ? "10px" : "0px",
                        cursor: "pointer",
                        width: "2.5em"
                    })
                }

                function i() {
                    o("#close-vslider", e).click(function() {
                        n._unloadVslider(e)
                    })
                }
                var n = this,
                    r = n.adsets.getCurrentAdset(),
                    a = parseInt(s.getAttrProperty(r, "close_wait_time", 10));
                if ("desktop" !== q1SiteParams.device) return i();
                if (0 === a) t(), i();
                else {
                    o("#close-vslider", e).html('<div id="close-text">You may close this ad in <span id="counter">' + a + '</span> second<span id="pl">s</span>.</div>');
                    var c = setInterval(function d() {
                        return o("#counter", e).html(a), 0 === --a && (t(), i(), clearInterval(c)), d
                    }(), 1e3)
                }
            }, n.prototype._slideVsliderIntoView = function(e) {
                var t = this,
                    i = t.adsets.getCurrentAdset(),
                    n = s.getAttrProperty(i, "position", "bottom-right"),
                    r = o("#companion-container", e).height();
                r && (e.css({
                    height: "+=" + r,
                    bottom: "-=" + (n.indexOf("bottom") !== -1 ? r : 0)
                }), o("#close-vslider", e).css({
                    top: "+=" + (l.vslider.COMPANION_HEIGHT + l.vslider.COMPANION_MARGIN)
                }), o("#companion-container", e).css({
                    position: "relative",
                    display: "block",
                    top: l.vslider.BORDER_TOP_HEIGHT
                })), e.animate(t.visiblePosition, l.vslider.SLIDE_IN_SPEED, function() {
                    q1SiteParams.show_gtau && setTimeout(function() {
                        o("#poweredByQ1", e).animate(t.poweredByQ1.visible, l.poweredByQ1.SLIDE_IN_SPEED)
                    }, l.poweredByQ1.SLIDE_IN_DELAY)
                })
            }, n.prototype._unloadVslider = function(e) {
                var t = this;
                t.isVsliderUnloaded || (t.isVsliderUnloaded = !0, e.animate(t.offScreenPosition, function() {
                    u.unloadVideoJs(), e.remove()
                }))
            }, t.exports = n
        }, {
            "common/adTagGenerators": 1,
            "common/adsetIterator": 2,
            "common/async": 3,
            "common/capping": 4,
            "common/constants": 5,
            "common/events": 7,
            "common/externalResources": 8,
            "common/logger": 11,
            "utils/adsetUtils": 17,
            "utils/filters": 19,
            "utils/unitUtils": 20,
            "utils/utilityFunctions": 21
        }],
        17: [function(e, t, i) {
            var n = e("./utilityFunctions"),
                o = e("./unitUtils"),
                r = {};
            r.getAttrProperty = function(e, t, i) {
                return n.isDefined(e) && n.isDefined(e.attr) ? n.getProperty(e.attr, t, i) : i
            }, r.getDimensions = function(e, t) {
                function i(e) {
                    if ("string" == typeof e) return n = e.split("x"), t ? n = n.map(function(e) {
                        return parseInt(e, 10)
                    }) : {
                        width: parseInt(n[0]),
                        height: parseInt(n[1])
                    }
                }
                var n;
                return Array.isArray(e) ? e.map(function(e) {
                    return i(e)
                }) : i(e)
            }, r.getPlacementSize = function(e) {
                var t = r.getAttrProperty(e, "size"),
                    i = o.filterSizesByDevice(r.getAttrProperty(e, "enabled_sizes"));
                return n.isDefined(t) ? "sizeless" === t && (t = n.isDefined(i) ? i : []) : n.isDefined(i) && (t = i), t
            }, t.exports = r
        }, {
            "./unitUtils": 20,
            "./utilityFunctions": 21
        }],
        18: [function(e, t, i) {
            var n = {};
            n.getCookie = function(e) {
                var t = new RegExp(e + "=([^;]+)"),
                    i = t.exec(document.cookie);
                return null !== i ? decodeURI(i[1]) : null
            }, n.setCookie = function(e, t, i) {
                var n = new Date,
                    o = new Date(n.getTime() + i);
                document.cookie = e + "=" + encodeURI(t) + "; path=/; expires=" + o.toGMTString()
            }, n.deleteCookie = function(e) {
                var t = new Date;
                t.setDate(t.getDate() - 1), document.cookie = encodeURI(e) + "=; path=/; expires=" + t.toGMTString()
            }, t.exports = n
        }, {}],
        19: [function(e, t, i) {
            var n = e("utils/adsetUtils"),
                o = e("common/constants"),
                r = e("utils/utilityFunctions"),
                s = {},
                a = {
                    "300x600": {
                        minWidth: 768
                    },
                    "160x600": {
                        minWidth: 768
                    },
                    test: {
                        minWidth: 500,
                        maxWidth: 501,
                        minHeight: 500,
                        maxHeight: 501
                    }
                };
            s.checkMinMaxSizes = function(e, t, i) {
                return !a[e] || !(r.isDefined(a[e].maxWidth) && a[e].maxWidth < t || r.isDefined(a[e].maxHeight) && a[e].maxHeight < i || r.isDefined(a[e].minWidth) && a[e].minWidth > t || r.isDefined(a[e].minHeight) && a[e].minHeight > i)
            }, s.canServeSizeOnDevice = function(e) {
                var t = !0,
                    i = r.getTargetWindowSpecs();
                switch (e) {
                    case "1024x768":
                        t = "tablet" === q1SiteParams.device;
                        break;
                    case "320x480":
                        t = "phone" === q1SiteParams.device;
                        break;
                    default:
                        var a = n.getDimensions(e, !1);
                        a.height + o.mobileCloseButton.CSS.height > i.screenHeight || a.width > i.screenWidth ? t = !1 : "desktop" === q1SiteParams.device || s.checkMinMaxSizes(e, i.screenWidth, i.screenHeighte) || (t = !1)
                }
                return t
            }, s.placementsForDeviceSize = function(e) {
                var t, i = n.getPlacementSize(e);
                return Array.isArray(i) ? (e.attr.enabled_sizes = i.filter(s.canServeSizeOnDevice), t = 0 !== e.attr.enabled_sizes.length) : t = s.canServeSizeOnDevice(i), t
            }, s.disabledExchanges = [o.exchanges.VIDEOLOGY, o.exchanges.GOOGLEADX], s.validExchanges = function(e) {
                return s.disabledExchanges.indexOf(e.exchange) === -1
            }, t.exports = s
        }, {
            "common/constants": 5,
            "utils/adsetUtils": 17,
            "utils/utilityFunctions": 21
        }],
        20: [function(e, t, i) {
            var n = e("common/constants"),
                o = e("./utilityFunctions"),
                r = {},
                s = ["320x480", "300x250", "320x50"],
                a = ["300x600", "1024x768", "300x250", "728x90", "160x600"];
            r.clearCss = function(e, t) {
                for (var i in t) e.css(i, "")
            }, r.calculateScaleFactor = function(e, t, i) {
                var n;
                if ("desktop" !== q1SiteParams.device) {
                    e = parseInt(e);
                    var r = o.getTargetWindowSpecs(),
                        s = r.topDocument,
                        a = s.body.clientWidth,
                        c = r.screenWidth,
                        d = r.screenHeight;
                    if (600 !== t && (a !== c || "interstitial" === i)) return "interstitial" === i ? (n = .9 * c / e, n * t > .9 * d && (n = .87 * d / t)) : n = a * (e / c) / e, n
                }
            }, r.createCloseContainer = function(e, t) {
                var i = e('<div id="close-' + t + '"></div>');
                if ("desktop" === q1SiteParams.device) switch (t) {
                    case "impact":
                        i.text("HIDE").css({
                            background: "rgb(40,102,176)",
                            color: "#FFFFFF",
                            cursor: "pointer",
                            height: "13px",
                            padding: "0 6px 3px 5px",
                            position: "absolute",
                            top: "-16px",
                            "-moz-box-sizing": "content-box",
                            "border-top-left-radius": "6px",
                            "border-top-right-radius": "6px",
                            "box-sizing": "content-box",
                            "font-family": "arial",
                            "font-size": "9px",
                            "line-height": "20px"
                        });
                        break;
                    case "vslider":
                        i.css({
                            width: n.vslider.DESKTOP_WIDTH,
                            height: n.vslider.DESKTOP_CLOSE_BUTTON_HEIGHT,
                            color: "#FFFFFF",
                            position: "absolute",
                            top: 0,
                            "line-height": n.vslider.DESKTOP_CLOSE_BUTTON_HEIGHT + "px",
                            "background-color": "rgba(7, 20, 30, 0.7)",
                            "font-family": "Arial, sans-serif",
                            "text-align": "center",
                            "z-index": 1
                        })
                } else i.css(n.mobileCloseButton.CSS);
                return i
            }, r.writeIframeContent = function(e, t) {
                e.contentDocument.open();
                var i = "<style>body{margin:0;}</style>";
                e.contentDocument.write(i), e.contentDocument.write(t), e.contentDocument.close()
            }, r.createIframe = function(e) {
                var t = document.createElement("iframe");
                return t.frameBorder = "none", t.marginWidth = 0, t.marginHeight = 0, t.scrolling = "no", t.style.width = "100%", t.style.height = "100%", t.style.border = "0", t.style.background = "transparent", t.style.overflow = "hidden", e && (t.id = e), t
            }, r.createPoweredByContainer = function(e, t) {
                var i;
                switch (t) {
                    case "vslider":
                        i = "http://hubs.ly/y0RYGB0";
                        break;
                    case "impact":
                        i = "http://hubs.ly/y0RYD_0"
                }
                var n = e('<a href="' + i + '" target="_newtab"></a>'),
                    o = e('<div id="poweredByQ1"></div>').css({
                        "z-index": -1
                    });
                return n.append(o)
            }, r.replaceMacros = function(e) {
                var t = o.getTargetWindowSpecs(),
                    i = {
                        "${CACHEBUSTER}": o.cachebuster(),
                        "${REFERRER_URL}": t.ref
                    };
                for (var n in i) {
                    var r = i[n];
                    e = e.replace(RegExp("\\" + n, "g"), r)
                }
                return e
            }, r.getPositionBySize = function(e) {
                switch (e) {
                    case "1024x768":
                    case "320x480":
                        return "interstitial";
                    case "300x600":
                    case "160x600":
                        return "right";
                    case "300x250":
                    case "320x50":
                    case "728x90":
                    default:
                        return "bottom"
                }
            }, r.filterSizesByDevice = function(e) {
                try {
                    var t = [];
                    if ("phone" === q1SiteParams.device) t = s;
                    else {
                        if ("tablet" !== q1SiteParams.device) return e;
                        t = a
                    }
                    return e.filter(function(e) {
                        return t.indexOf(e) > -1
                    })
                } catch (i) {
                    return e
                }
            }, t.exports = r
        }, {
            "./utilityFunctions": 21,
            "common/constants": 5
        }],
        21: [function(e, t, i) {
            var n = {};
            n.arrayContains = function(e, t) {
                return e.indexOf(t) !== -1
            }, n.arrayLikeObjectToArray = function(e) {
                return Array.prototype.slice.call(e)
            }, n.cachebuster = function() {
                return Math.floor(1e5 * Math.random())
            }, n.createMessageListener = function(e, t) {
                e.addEventListener ? e.addEventListener("message", t, !1) : e.attachEvent("onmessage", t)
            }, n.createOrientationChangeListener = function(e, t) {
                e.addEventListener ? e.addEventListener("orientationchange", t, !1) : e.attachEvent("orientationchange", t)
            }, n.extend = function(e) {
                var t, i, o;
                for (t = 1; t < arguments.length; t++) {
                    i = arguments[t];
                    for (o in i) i.hasOwnProperty(o) && (n.isObject(e[o]) && !n.isNull(e[o]) && n.isObject(i[o]) ? e[o] = n.extend({}, e[o], i[o]) : e[o] = i[o])
                }
                return e
            }, n.getLoadedControllerTagsObject = function() {
                var e = n.getTargetWindowSpecs();
                return e.topWindow ? (n.isDefined(e.topWindow.q1LoadedControllerTags) || (e.topWindow.q1LoadedControllerTags = {}), e.topWindow.q1LoadedControllerTags) : {}
            }, n.getTargetWindowSpecs = function(e) {
                var t = e || window,
                    i = t.document,
                    n = {
                        hostname: ""
                    };
                try {
                    if (n.runtimeWindow = t, n.runtimeDocument = t.document, n.protocol = t.location.protocol, n.secure = "https:" === n.protocol, n.screenWidth = t.screen.width, n.screenHeight = t.screen.height, t.top === t.self ? (n.ref = encodeURIComponent(t.location.href), n.origin = encodeURIComponent(t.location.origin)) : (n.ref = encodeURIComponent(i.referrer), n.origin = encodeURIComponent(i.origin)), n.topWindow = t.top, n.hostname = encodeURIComponent(t.top.location.hostname), n.topDocument = t.top.document, "undefined" === n.hostname) throw new DOMException
                } catch (o) {
                    "" !== n.hostname && "undefined" !== n.hostname || (n.topWindow = t, n.hostname = encodeURIComponent(t.location.hostname), n.topDocument = t.document)
                }
                return /http:\/\/localhost/.test(n.ref) && (n.ref = n.origin = "https://demo.q1media.com"), n
            }, n.getQueryStringParameter = function(e) {
                e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var t = new RegExp("[\\?&]" + e + "=([^&#]*)"),
                    i = t.exec(location.search);
                return null === i ? "" : decodeURIComponent(i[1].replace(/\+/g, " "))
            }, n.isBoolean = function(e) {
                return "boolean" == typeof e
            }, n.isFunction = function(e) {
                return "function" == typeof e
            }, n.isDefined = function(e) {
                return void 0 !== e
            }, n.isNull = function(e) {
                return null === e
            }, n.isObject = function(e) {
                return "object" == typeof e
            }, n.isString = function(e) {
                return "string" == typeof e
            }, n.getProperty = function(e, t, i) {
                return n.isDefined(e) && n.isDefined(e[t]) ? e[t] : i
            }, n.noop = function() {}, n.onArrayPush = function(e, t) {
                e.push = function(i) {
                    Array.prototype.push.call(e, i), t(e)
                }, e.length && t(e)
            }, n.randomString = function(e) {
                var t = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz".split("");
                e || (e = Math.floor(Math.random() * t.length));
                for (var i = "", n = 0; n < e; n++) i += t[Math.floor(Math.random() * t.length)];
                return i
            }, t.exports = n
        }, {}]
    }, {}, [13]);
}({
    "cdn_url": "//cdn.q1mediahydraplatform.com/",
    "cdn_url_backgrounds": "//cdn.q1mediahydraplatform.com/assets/backgrounds/",
    "devDependencies": false,
    "environment": "production",
    "pixel_enabled": false,
    "pixel_url": "//pix.q1media.com/pixel.gif",
    "prebid_version": "Q1Media"
}, {
    "device": "desktop",
    "external_scripts": [],
    "isSafari": false,
    "keywords": [],
    "pubid": "54f36b9bad1d148132955f2f",
    "q1id": "584afd73aaa7c04a7106aa18",
    "show_companion": true,
    "show_gtau": false,
    "javascriptVpaid": false,
    "zone": 1
}, [{
    "_id": "585aab4f8dfcd6175f200aaa",
    "controller_id": "120564",
    "type": "impact",
    "device": "desktop",
    "attr": {
        "size": "sizeless",
        "enabled_sizes": ["300x250", "300x1050", "320x250", "320x320", "120x600", "160x600", "300x600"],
        "cap_type": "none",
        "imp_set_size": 3,
        "imp_strike_impression": 1,
        "position": "right",
        "time_hour_limit": 8,
        "time_impression_limit": 1
    },
    "placements": []
}, {
    "_id": "585aab3b8dfcd6175f200aa7",
    "controller_id": "120563",
    "type": "vslider",
    "device": "desktop",
    "attr": {
        "enabled_sizes": [],
        "close_wait_time": 10,
        "volume": 0.2,
        "cap_type": "none",
        "imp_set_size": 20,
        "imp_strike_impression": 1,
        "position": "bottom-right",
        "time_hour_limit": "1",
        "time_impression_limit": 1
    },
    "placements": []
}, {
    "_id": "585aab628dfcd6175f200aad",
    "controller_id": "120565",
    "type": "impact",
    "device": "desktop",
    "attr": {
        "size": "sizeless",
        "enabled_sizes": ["468x60", "728x90", "970x250"],
        "cap_type": "none",
        "imp_set_size": 3,
        "imp_strike_impression": 1,
        "position": "bottom",
        "time_hour_limit": 8,
        "time_impression_limit": 1
    },
    "placements": []
}]);