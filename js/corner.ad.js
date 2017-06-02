(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory); // AMD. Register as anonymous module.
    } else {
        factory(jQuery); // Browser globals.
    }
}(function($) {
    var adUrl = "ads.mp4";
    var player;
    var svgTab = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="70px" height="22px" viewBox="0 0 70 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 3.7 (28169) - http://www.bohemiancoding.com/sketch -->
    <title>tab</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Normal-state" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Slider-with-white-video" transform="translate(-44.000000, -20.000000)">
            <g id="tab" transform="translate(44.000000, 20.000000)">
                <polygon fill="#3C3B3D" points="18.7804878 0 0 22 70 22 51.2195122 0"></polygon>
                <path d="M20.8763908,16.5 L48.8763908,16.5" id="Line" stroke="#FFFFFF" stroke-width="3" stroke-linecap="square"></path>
                <path d="M20.8763908,11.5 L48.8763908,11.5" id="Line" stroke="#FFFFFF" stroke-width="3" stroke-linecap="square"></path>
                <path d="M20.8763908,6.5 L48.8763908,6.5" id="Line" stroke="#FFFFFF" stroke-width="3" stroke-linecap="square"></path>
            </g>
        </g>
    </g>
</svg>`;
    $(document).ready(function() {
        setTimeout(function() { loadPopupAd(); }, 1000);

    });

    function loadPopupAd() {

        var modal = {
            position: "fixed",
            "z-index": 600002,
            height: "308px",
            bottom: "30px",
            right: "30px",
            width: "100%",
            "min-width": "450px",
            "max-height": "308px",
            overflow: "hidden",
            "max-width": "450px"
        };

        var owClosed = {
            display: "none"
        };
        var omniOverlay = {
            position: "fixed",
            "z-index": 600001,
            bottom: "30px",
            right: "30px",
            height: "308px",
            width: "100%",
            "max-width": "450px",
            background: "#424242",
            opacity: "0.6"
        }

        var vastDiv = $('<div/>').attr("id", "newVastDiv").css("position", "relative").css("border", "1px solid black");

        var spanString = '<div id="dragTab" >' + svgTab + '</div>';
        var divAdv = $('<div style="width: 100%;height:20px;cursor:move;"/>')
            .html(spanString)
            .attr("id", "newDivAdBar")
            // .css();

        var divModal = $('<div/>')
            .attr("id", "newDivModal")
            .css(modal, owClosed)
            .append(divAdv)
            .append(vastDiv);

        $("body").append(divModal);
        $(divModal).tinyDraggable({ handle: '#dragTab' });

        $(divModal).omniWindow({
                callbacks: {
                    afterShow: function(subjects, internalCallback) {
                        var player = new VASTPlayer(document.getElementById('newVastDiv'));

                        player.once('AdStopped', function() {
                            $(divModal).hide();
                            console.log('Ad finished playback!');
                        });

                        player.load(
                            'http://tester.advertserve.com/servlet/vast3/zone?zid=33&pid=0&contextual=false'
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