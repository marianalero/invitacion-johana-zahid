;(function () {
	
	'use strict';
	var params = {};
	location.search.slice(1).split("&").forEach(function(pair) {
		pair = pair.split("=");
		params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);});
	console.log("se entro a la invitacion",params.number)
		var number =(params.number == undefined )?0:params.number
		var pases = (number == 1) ? " pase" : " pases";
	document.getElementById("numInv").innerHTML = "Esta invitación es valida por "+ number+ pases;
	
	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};



	// Carousel Feature Slide
	var testimonialCarousel = function(){
		
		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			animateOut: 'fadeOut',
			items: 1,
			loop: true,
			margin: 0,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: false
		});
	};

	var sliderMain = function() {
		
	  	$('#qbootstrap-slider-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});

	};



	// animate-box
	var contentWayPoint = function() {

		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this).hasClass('animated') ) {
			
				$(this.element).addClass('fadeInUp animated');
			
			}

		} , { offset: '75%' } );

	};


	// Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-qbootstrap-nav-toggle', function(event){

			if ( $('#navbar').is(':visible') ) {
				$(this).removeClass('active');	
			} else {
				$(this).addClass('active');	
			}

			event.preventDefault();
			
		});

	};


	// Parallax
	var parallax = function() {
		if ( !isiPad() || !isiPhone() ) {
			$(window).stellar();
		}
	};



	
	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};
	var navigationSection = function() {

		var $section = $('div[data-section]');
		
		$section.waypoint(function(direction) {
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		    
		  	}
		}, {
		  	offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};


	// Window Scroll
	var windowScroll = function() {
		var lastScrollTop = 0;

		$(window).scroll(function(event){

		   	var header = $('#qbootstrap-header'),
				scrlTop = $(this).scrollTop();

			if ( scrlTop > 500 && scrlTop <= 2000 ) {
				header.addClass('navbar-fixed-top qbootstrap-animated slideInDown');
			} else if ( scrlTop <= 500) {
				if ( header.hasClass('navbar-fixed-top') ) {
					header.addClass('navbar-fixed-top qbootstrap-animated slideOutUp');
					setTimeout(function(){
						header.removeClass('navbar-fixed-top qbootstrap-animated slideInDown slideOutUp');
					}, 100 );
				}
			} 
			
		});
	};



	// Animations
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};


	var inlineSVG = function() {
		$('img.svg').each(function(){
	    var $img = $(this);
	    var imgID = $img.attr('id');
	    var imgClass = $img.attr('class');
	    var imgURL = $img.attr('src');

	    $.get(imgURL, function(data) {
	        // Get the SVG tag, ignore the rest
	        var $svg = jQuery(data).find('svg');

	        // Add replaced image's ID to the new SVG
	        if(typeof imgID !== 'undefined') {
	            $svg = $svg.attr('id', imgID);
	        }
	        // Add replaced image's classes to the new SVG
	        if(typeof imgClass !== 'undefined') {
	            $svg = $svg.attr('class', imgClass+' replaced-svg');
	        }

	        // Remove any invalid XML tags as per http://validator.w3.org
	        $svg = $svg.removeAttr('xmlns:a');

	        // Replace image with new SVG
	        $img.replaceWith($svg);

	    }, 'xml');

		});
	};
	
	const formatNumber = n => ("0" + n).slice(-2);
	var end = new Date('10/14/2023 5:00 PM');

    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;

	function showRemaining() {
        var now = new Date();
        var distance = end - now;
        if (distance < 0) {

            clearInterval(timer);
            document.getElementById('countdown').innerHTML = 'EXPIRED!';

            return;
        }
        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);

        document.getElementById("days").innerHTML = days +"<br/> <span style='font-size: 20px;'>Días</span>";
		document.getElementById("hours").innerHTML = hours + "<br/> <span style='font-size: 20px;'>Hrs</span>";
		document.getElementById("minutes").innerHTML = minutes + "<br/> <span style='font-size: 20px;'>Mins</span>";
		document.getElementById("seconds").innerHTML = seconds + "<br/> <span style='font-size: 20px;'>Segs</span>";
    }

    timer = setInterval(showRemaining, 1000);
		
		
	var bgVideo = function() {
		$('.player').mb_YTPlayer();
	};

	
	document.getElementById("confirmar").addEventListener("click", confirmar);
	function confirmar(){
		var name = document.getElementById("name").value
		var telefono = document.getElementById("telefono").value
		var number = document.getElementById("numInv").innerHTML;
		number = number.substring(30,32);
		// number = number.slice(-6);
		console.log("confirmando",name,number,telefono);
		var message= "Hola,";
		var radioValue = $("input[name='confirm']:checked").val();
            if(radioValue == "confirm"){
				message+="%20quiero%20confirmar%20mi%20asistencia%20para%20la%20boda%20de%20Estefania%20y%20Leobardo%20para%20"+number+" personas. Mi nombre es "+name+".%20Télefono:"+telefono;
            }else{
				message+="%20lamentablemente%20no%20podré%20asistir%20a%20la%20boda%20de%20Estefania%20y%20Leobardo. Mi nombre es "+name+".%20Télefono:"+telefono;
			}
	
		window.open("https://wa.me/+526621563799/?text="+ message,"_blank");
		
	
	}





// const audioPlayer = document.querySelector(".audio-player");
// const audio = new Audio(
//   "./audio/Maluma - ADMV (LetraLyrics).mp3"
// );


// console.dir(audio);

// audio.addEventListener(
//   "loadeddata",
//   () => {
//     audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
//       audio.duration
//     );
//     audio.volume = .75;
//   },
//   false
// );

// //click on timeline to skip around
// const timeline = audioPlayer.querySelector(".timeline-audio");
// timeline.addEventListener("click", e => {
//   const timelineWidth = window.getComputedStyle(timeline).width;
//   const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
//   audio.currentTime = timeToSeek;
// }, false);

// //click volume slider to change volume
// const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
// volumeSlider.addEventListener('click', e => {
//   const sliderWidth = window.getComputedStyle(volumeSlider).width;
//   const newVolume = e.offsetX / parseInt(sliderWidth);
//   audio.volume = newVolume;
//   audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
// }, false)

// //check audio percentage and update time accordingly
// setInterval(() => {
//   const progressBar = audioPlayer.querySelector(".progress-audio");
//   progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
//   audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
//     audio.currentTime
//   );
// }, 500);

// //toggle between playing and pausing on button click
// const playBtn = audioPlayer.querySelector(".controls .toggle-play");
// playBtn.addEventListener(
//   "click",
//   () => {
//     if (audio.paused) {
//       playBtn.classList.remove("play");
//       playBtn.classList.add("pause");
//       audio.play();
//     } else {
//       playBtn.classList.remove("pause");
//       playBtn.classList.add("play");
//       audio.pause();
//     }
//   },
//   false
// );

// audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
//   const volumeEl = audioPlayer.querySelector(".volume-container .volume");
//   audio.muted = !audio.muted;
//   if (audio.muted) {
//     volumeEl.classList.remove("icono-volumeMedium");
//     volumeEl.classList.add("icono-volumeMute");
//   } else {
//     volumeEl.classList.add("icono-volumeMedium");
//     volumeEl.classList.remove("icono-volumeMute");
//   }
// });

// //turn 128 seconds into 2:08
// function getTimeCodeFromNum(num) {
//   let seconds = parseInt(num);
//   let minutes = parseInt(seconds / 60);
//   seconds -= minutes * 60;
//   const hours = parseInt(minutes / 60);
//   minutes -= hours * 60;

//   if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
//   return `${String(hours).padStart(2, 0)}:${minutes}:${String(
//     seconds % 60
//   ).padStart(2, 0)}`;
// }

	// Document on load.
	$(function(){

		burgerMenu();
		testimonialCarousel();
		sliderMain();	
		parallax();
		navigationSection();
		contentWayPoint();
		inlineSVG();
		bgVideo();

		
		
	});

	
	
}());