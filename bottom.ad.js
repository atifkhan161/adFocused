(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory); // AMD. Register as anonymous module.
    } else {
        factory(jQuery); // Browser globals.
    }
}(function($) {
    var adUrl = "ads.mp4";
    var player;
    $(document).ready(function() {
        setTimeout(function() { loadPopupAd(); }, 5000);

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
        var divOwerlay = $('<div/>')
            .attr("id", "newDivOwerlay")
            .css(omniOverlay, owClosed);


        // var video = $('<video id="adgfullscreen" class="video-js vjs-default-skin" controls preload="auto" width="640" height="264"  data-setup="{}"/>', {
        //     id: 'add-fullscreen',
        //     src: adUrl,
        //     type: 'video/mp4',
        //     controls: true
        // });
        var vastDiv = $('<div/>').attr("id", "newVastDiv").css("position", "relative");

        var divModal = $('<div/>')
            .attr("id", "newDivModal")
            .css(modal, owClosed)
            .append(vastDiv);

        $("body").append(divModal, divOwerlay);
        $(divModal).omniWindow({
                callbacks: {
                    afterShow: function(subjects, internalCallback) {
                        // player = videojs('#adgfullscreen', {
                        //     controls: true,
                        //     sources: [{ src: 'ads.mp4', type: 'video/mp4' }],
                        //     techOrder: ['html5']
                        // });
                        // player.play();
                        // player.width($(divModal).width()).height($(divModal).height());
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