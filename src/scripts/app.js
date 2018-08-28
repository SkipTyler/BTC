'use strict';

// preloader
const _preloader = document.querySelector('.js-preloader');
setTimeout(() => {
	_preloader.classList.remove('active');
	document.documentElement.classList.remove('no-scroll');
}, 3500);



// delegate events
const delegate = (criteria, listener) => {
	return function(e) {
		const el = e.target;
		do {
			if (!criteria(el)) {
				continue;
			}
			e.delegateTarget = el;
			listener.call(this, e);
			return;
		} while ((el === el.parentNode));
	};
};

// scroll to
(() => {
	const scrollBtn = elem => {
		return (elem instanceof HTMLElement) && elem.matches('.js-scrollTo');
	};
	const scrollOut = ev => {
		ev.preventDefault();
		const _target = ev.target || ev.currentTarget;
		const _id = _target.getAttribute('href');
		const _to = document.querySelector(_id);
		_to.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	document.addEventListener("click", delegate(scrollBtn, scrollOut));
})();

// drop menu
(() => {
	const _dropBtn = document.querySelector('.js-drop');

	_dropBtn.addEventListener('click', ev => {
		ev.preventDefault();
		const _target = ev.target || ev.currentTarget;
		const _parent = _target.parentNode;
		const _list = _parent.querySelector('.js-dropList');
		_list.classList.toggle('active');
	})
})();

//timer
(() =>{
	const timer = (parent, data) => {
		const second = 1000;
		const minute = second * 60;
		const hour = minute * 60;
		const day = hour * 24;
		const month = day * 30;

		const countDown = new Date(data).getTime();

		const x = setInterval(() => {
			const now = new Date().getTime();
			const distance = countDown - now;

			const _parent = document.querySelector(parent);
			const _month = _parent.querySelector('.js-timerMonth');
			const _day = _parent.querySelector('.js-timerDay');
			const _hour = _parent.querySelector('.js-timerHour');
			const _minutes = _parent.querySelector('.js-timerMinutes');
			const _seconds = _parent.querySelector('.js-timerSeconds');

			_month.innerHTML = Math.floor((distance / month));
			_day.innerHTML = Math.floor((distance % month) / day);
			_hour.innerHTML = Math.floor((distance % day) / hour);
			_minutes.innerHTML = Math.floor((distance % hour) / minute);
			_seconds.innerHTML = Math.floor((distance % minute) / second);
			if (distance < 0) clearInterval(x);
		}, second);
	};
	timer('.js-timer', 'July 25, 2019 00:00:00');
})();

document.addEventListener('DOMContentLoaded', function () {
    const circles = document.querySelectorAll('.diagrams_image');
    const load = document.querySelectorAll('.plan_item_info_loading');

    // rotate animation
    for (let circle of circles) {
        circle.classList.add('scale');
    }

    for (let item of load) {
        item.classList.add('load');
    }

    // colors animation

});
// mobile menu
(() => {
	const _menuBtn = document.querySelector('.js-menuBtn');
	const _menu = document.querySelector('.js-menu');
	const _menuLink = document.querySelectorAll('.js-menuLink');

	_menuBtn.addEventListener('click', ev => {
		ev.preventDefault();
		const _target = ev.target || ev.currentTarget;
		_target.classList.toggle('active');
		_menu.classList.toggle('active');
	});
	
	Array.prototype.forEach.call(_menuLink, el => {
		el.addEventListener('click', () => {
			if (window.innerWidth <= 1200) {
				_menuBtn.classList.remove('active');
				_menu.classList.remove('active');
			}
		})
	})
})();


(() => {

	var colors = new Array(
		[62,35,255],
		[60,255,60],
		[255,35,98],
		[45,175,230],
		[255,0,255],
		[255,128,0]);

	var step = 0;
//color table indices for:
// current color left
// next color left
// current color right
// next color right
	var colorIndices = [0,1,2,3];

//transition speed
	var gradientSpeed = 0.002;

	function updateGradient()
	{

		if ( $===undefined ) return;

		var c0_0 = colors[colorIndices[0]];
		var c0_1 = colors[colorIndices[1]];
		var c1_0 = colors[colorIndices[2]];
		var c1_1 = colors[colorIndices[3]];

		var istep = 1 - step;
		var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
		var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
		var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
		var color1 = "rgb("+r1+","+g1+","+b1+")";

		var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
		var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
		var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
		var color2 = "rgb("+r2+","+g2+","+b2+")";


		// if ($(window).width() <= 1024) {
		// 	$('.roadmap__line').css({
		// 		background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+")) center/2px 100% no-repeat"}).css({
		// 		background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%) center/2px 100% no-repeat"});
		// } else if ($(window).width() <= 680) {
		// 	$('.roadmap__line').css({
		// 		background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+")) left/2px 100% no-repeat"}).css({
		// 		background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%) left/2px 100%  no-repeat"});
		// } else {
		// 	$('.roadmap__line').css({
		// 		background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+")) center/100% 2px no-repeat"}).css({
		// 		background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%) center/100% 2px no-repeat"});
		// }


		if ($(window).width() >= 680 && $(window).width() < 1024) {
			$('.roadmap__line').css({
				background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+")) center/2px 100% no-repeat"}).css({
				background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%) center/2px 100% no-repeat"});
		} else if ($(window).width() >= 1024) {
			$('.roadmap__line').css({
				background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+")) center/100% 2px no-repeat"}).css({
				background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%) center/100% 2px no-repeat"});
		} else {
			$('.roadmap__line').css({
				background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+")) left/2px 100% no-repeat"}).css({
				background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%) left/2px 100%  no-repeat"});
		}



		$('.roadmap__line-circle').css({
			background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
			background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});

		$('.roadmap__line .after').css({
			background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
			background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+")"});
		$('.roadmap__line .before').css({
			background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
			background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+")"});

		step += gradientSpeed;
		if ( step >= 1 )
		{
			step %= 1;
			colorIndices[0] = colorIndices[1];
			colorIndices[2] = colorIndices[3];

			//pick two new target color indices
			//do not pick the same as the current one
			colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
			colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;

		}
	}

	setInterval(updateGradient,10);
})();

(() => {
	const _graph = document.querySelector('.graph__img');
	const _height = document.documentElement.clientHeight;
	let isActive = true;
	window.addEventListener('scroll', () => {
		let _offset = _graph.getBoundingClientRect().y;

		if (isActive) {
			if (_offset < _height) {
				_graph.classList.add('active');
				isActive = false;
			}
		}
	});



})();