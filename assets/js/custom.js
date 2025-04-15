(function ($) {

	"use strict";

	$('.owl-show-events').owlCarousel({
		items: 4,
		loop: true,
		dots: true,
		nav: true,
		autoplay: true,
		margin: 30,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 2
			},
			1000: {
				items: 4
			}
		}
	})

	// Define time constants (in milliseconds)
	const second = 1000,
		minute = second * 60,
		hour = minute * 60,
		day = hour * 24;

	// Set this flag to true if you want the countdown to appear;
	// set to false if you want it deactivated (hidden).
	let countdownActive = false;

	// Get the countdown container element
	const countdownElement = document.getElementById('countdown');

	// If countdown is not active, hide the countdown container and do not run the timer
	if (!countdownActive) {
		countdownElement.style.display = "none";
	} else {
		// Set target date and time
		let countDown = new Date('Mar 31, 2025 09:30:00').getTime();

		// Start the countdown interval (updates every second)
		let x = setInterval(function () {
			let now = new Date().getTime();
			let distance = countDown - now;

			// When the countdown finishes, clear the timer and display a message
			if (distance < 0) {
				clearInterval(x);
				countdownElement.innerHTML = "<h2>🎉 IT'S MY BIRTHDAY! 🎉</h2>";
				alert("🎉 IT'S MY BIRTHDAY! 🎂");
				return;
			}

			// Display or update the countdown numbers
			document.getElementById('days').innerText = Math.floor(distance / day);
			document.getElementById('hours').innerText = Math.floor((distance % day) / hour);
			document.getElementById('minutes').innerText = Math.floor((distance % hour) / minute);
			document.getElementById('seconds').innerText = Math.floor((distance % minute) / second);
		}, second);
	}

	// Initialize jQuery tabs (if used)
	$(function () {
		$("#tabs").tabs();
	});


	$('.schedule-filter li').on('click', function () {
		var tsfilter = $(this).data('tsfilter');
		$('.schedule-filter li').removeClass('active');
		$(this).addClass('active');
		if (tsfilter == 'all') {
			$('.schedule-table').removeClass('filtering');
			$('.ts-item').removeClass('show');
		} else {
			$('.schedule-table').addClass('filtering');
		}
		$('.ts-item').each(function () {
			$(this).removeClass('show');
			if ($(this).data('tsmeta') == tsfilter) {
				$(this).addClass('show');
			}
		});
	});


	// Window Resize Mobile Menu Fix
	mobileNav();


	// Scroll animation init
	window.sr = new scrollReveal();


	// Menu Dropdown Toggle
	if ($('.menu-trigger').length) {
		$(".menu-trigger").on('click', function () {
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// Page loading animation
	$(window).on('load', function () {

		$('#js-preloader').addClass('loaded');

	});


	// Window Resize Mobile Menu Fix
	$(window).on('resize', function () {
		mobileNav();
	});


	// Window Resize Mobile Menu Fix
	function mobileNav() {
		var width = $(window).width();
		$('.submenu').on('click', function () {
			if (width < 767) {
				$('.submenu ul').removeClass('active');
				$(this).find('ul').toggleClass('active');
			}
		});
	}


})(window.jQuery);