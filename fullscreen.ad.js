(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory); // AMD. Register as anonymous module.
    } else {
        factory(jQuery); // Browser globals.
    }
}(function($) {
    // var adUrl = "ads.mp4";
    var adUrl = "http://tester.advertserve.com/servlet/vast3/zone?zid=33&pid=0&contextual=true"
    var mininiseAfter = 5000;
    var player;
    $(document).ready(function() {
        setTimeout(function() { loadPopupAd(); }, 5000);

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


        // var video = $('<video id="adgfullscreen" class="video-js vjs-default-skin" controls preload="auto"   data-setup="{}"/>', {
        //     id: 'add-fullscreen',
        //     src: adUrl,
        //     type: 'video/mp4',
        //     controls: true
        // });
        var vastDiv = $('<div/>').attr("id", "newVastDiv").css("position", "relative");
        var spanString = '<span style="color: white;font-size: 15px;margin-left: 45%;">Advertise</span>';
        spanString += '<span id="spanStatus" style="color: white;font-size: 15px;float:right">Minimise in ' + (mininiseAfter / 1000) + '>></span>';
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
                        // player = videojs('#adgfullscreen', {
                        //     controls: true,
                        //     sources: [{ src: adUrl, type: 'video/mpd' }],
                        //     techOrder: ['html5']
                        // });
                        // player.play();
                        var counter = setInterval(function() {
                            if (mininiseAfter > 0) {
                                mininiseAfter = mininiseAfter - 1000;
                                $("#spanStatus").text('Minimise in ' + (mininiseAfter / 1000) + '>>');
                            } else {
                                $("#spanStatus").text('Close >>').click(function() {
                                    $(divModal).hide();
                                    $(divOwerlay).hide();
                                }).css('cursor', 'pointer');
                                clearInterval(counter);
                            }
                        }, 1000);
                        // player.width($(divModal).width()).height($(divModal).height() - 20);
                        // player.on('ended', function() {
                        //     $(divModal).hide();
                        //     $(divOwerlay).hide();
                        // });
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