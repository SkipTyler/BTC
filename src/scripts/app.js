'use strict';

// preloader
const _preloader = document.querySelector('.js-preloader');
setTimeout(() => {
	_preloader.classList.remove('active');
	document.documentElement.classList.remove('no-scroll');
}, 5500);



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
