/*

    Penumbra Beer Bash - penumbrabeerbash.com
    VERSION 1.0
    AUTHOR brian@brainbrian.com

    DEPENDENCIES:
    - jQuery v1.9.0
    - Modernizr 2.6.2

*/

var PENUMBRA = PENUMBRA || {};

PENUMBRA.main = {
    config: {
        isMobile: true
    },
    init: function () {
        var self = this;
		// event delegation
		$(window).bind('resize', function(event) {
			self.windowResize();
		});
		self.windowResize();
        $("#event-video").fitVids();
        // dialog prompt
        $.magnificPopup.open({
            items: {
                src: '#alert'
            },
            mainClass: 'mfp-fade',
            type: 'inline',
            removalDelay: 300
        });
        
    },
    mobileOff: function () {
    	var self = this;
    	self.config.isMobile = false;
    	// scroll to hash tags from main nav
        $('header nav ul li a').click(function (e) {
            e.preventDefault();
            var url = $(this).attr('href');
            self.utilities.pageScroll(url);
        });
        // header depth effect
        $(window).scroll(function () {
        	var pageY, scrollCloud2, scrollCloud3;
        	pageY = $(window).scrollTop();
        	if (pageY < 500) {
        		scroll2 = Math.round(pageY*.3) + 'px';
	        	scroll3 = Math.round(pageY*.7) + 'px';
	        	$(".cloud-2").css('top', scroll2);
	        	$(".cloud-3").css('top', scroll3);
                //$(".cloud-2").animate({ top: scroll2 }, { duration: 20, easing: 'swing', queue: false });
                //$(".cloud-3").animate({ top: scroll3 }, { duration: 20, easing: 'swing', queue:false });
        	}
		});
        // sticky header
        $('#date').waypoint(function(direction) {
            if (direction == "down") {
                $('header').addClass("waypoint");
                $('#date').addClass("waypoint");
                $('.cloud-2').addClass("waypoint");
                $('.cloud-3').addClass("waypoint");
            } else {
                $('header').removeClass("waypoint");
                $('#date').removeClass("waypoint");
                $('.cloud-2').removeClass("waypoint");
                $('.cloud-3').removeClass("waypoint");
            }
        });
    },
    mobileOn: function () {
    	var self = this;
    	self.config.isMobile = true;
    	$('header nav ul li a').unbind('click');
    	$(window).unbind('scroll');
    },
	windowResize: function () {
		var self, width;
		self = this;
		width = window.innerWidth || document.documentElement.clientWidth;
		if (width >= 580 && self.config.isMobile) {
			self.mobileOff();
		} else if (width < 580 && !self.config.isMobile) {
			self.mobileOn();
		}
	},
    utilities: {
        cookie: {
            getCookie: function (name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for (var i=0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0)==' ') c = c.substring(1,c.length);
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
                }
                return null;
            },
            setCookie: function (name, value, days) {
                var date, expires;
                if (days) {
                    date = new Date();
                    date.setTime(date.getTime()+(days*24*60*60*1000));
                    expires = "; expires="+date.toGMTString();
                } else {
                    expires = "";
                }
                document.cookie = name + "=" + value + expires + "; path=/";
            }
        },
        pageScroll: function (hash) {
            // Smooth Page Scrolling, update hash on complete of animation
            $('html,body').animate({scrollTop: $(hash).offset().top},'slow', function () { window.location = hash; });
        }
    }
};