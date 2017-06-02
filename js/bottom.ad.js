(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory); // AMD. Register as anonymous module.
    } else {
        factory(jQuery); // Browser globals.
    }
}(function($) {
    var adUrl = "ads.mp4";
    mininiseAfter = 5000; //5 sec
    var player;
    $(document).ready(function() {
        setTimeout(function() { loadPopupAd(); }, 1000);

    });

    function loadPopupAd() {

        var modal = {
            position: "fixed",
            "z-index": 600002,
            height: "308px",
            bottom: "0",
            left: "50%",
            width: "100%",
            "min-width": "450px",
            "max-height": "308px",
            overflow: "hidden",
            "max-width": "450px",
            "margin": "auto"
        };
        var owClosed = {
            display: "none"
        };
        var omniOverlay = {
            position: "fixed",
            "z-index": 600001,
            bottom: "0",
            left: "0",
            height: "308px",
            width: "100%",
            background: "#424242",
            opacity: "0.6"
        }
        var spanString = '<span style="color: white;font-size: 15px;margin-left: 1%;">Advertisement</span>';
        spanString += '<span id="spanStatus" style="color: white;font-size: 15px;float:right">Close in ' + (mininiseAfter / 1000) + '>></span>';

        var divOwerlay = $('<div/>')
            .attr("id", "newDivOwerlay")
            .css(omniOverlay, owClosed)
            .append(spanString);

        var vastDiv = $('<div/>').attr("id", "newVastDiv").css("position", "relative").css("border", "1px solid black");

        var divModal = $('<div/>')
            .attr("id", "newDivModal")
            .css(modal, owClosed)
            .append(vastDiv);

        $("body").append(divModal, divOwerlay);
        $(divModal).omniWindow({
                callbacks: {
                    afterShow: function(subjects, internalCallback) {
                        var player = new VASTPlayer(document.getElementById('newVastDiv'));
                        var counter = setInterval(function() {
                            if (mininiseAfter > 0) {
                                mininiseAfter = mininiseAfter - 1000;
                                $("#spanStatus").text('Close in ' + (mininiseAfter / 1000) + '>>');
                            } else {
                                $("#spanStatus").text('Close >>').click(function() {
                                    $(divModal).hide();
                                    $(divOwerlay).hide();
                                }).css('cursor', 'pointer');
                                clearInterval(counter);
                            }
                        }, 1000);
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