'use strict';
// drop menu
// (() => {
// 	const _dropBtn = document.querySelector('.js-drop');
//
// 	_dropBtn.addEventListener('click', ev => {
// 		ev.preventDefault();
// 		const _target = ev.target || ev.currentTarget;
// 		const _parent = _target.parentNode;
// 		const _list = _parent.querySelector('.js-dropList');
// 		_list.classList.toggle('active');
// 	})
// })();
//
// //timer
// (() =>{
// 	const timer = (parent, data) => {
// 		const second = 1000;
// 		const minute = second * 60;
// 		const hour = minute * 60;
// 		const day = hour * 24;
// 		const month = day * 30;
//
// 		const countDown = new Date(data).getTime();
//
// 		const x = setInterval(() => {
// 			const now = new Date().getTime();
// 			const distance = countDown - now;
//
// 			const _parent = document.querySelector(parent);
// 			const _month = _parent.querySelector('.js-timerMonth');
// 			const _day = _parent.querySelector('.js-timerDay');
// 			const _hour = _parent.querySelector('.js-timerHour');
// 			const _minutes = _parent.querySelector('.js-timerMinutes');
// 			const _seconds = _parent.querySelector('.js-timerSeconds');
//
// 			_month.innerHTML = Math.floor((distance / month));
// 			_day.innerHTML = Math.floor((distance % month) / day);
// 			_hour.innerHTML = Math.floor((distance % day) / hour);
// 			_minutes.innerHTML = Math.floor((distance % hour) / minute);
// 			_seconds.innerHTML = Math.floor((distance % minute) / second);
// 			if (distance < 0) clearInterval(x);
// 		}, second);
// 	};
// 	timer('.js-timer', 'July 25, 2019 00:00:00');
// })();

document.addEventListener('DOMContentLoaded', function () {
	const svg = document.querySelector('.diagrams_image');
	// const size = parseInt(getComputedStyle(svg).height);
	// const circles = svg.querySelectorAll('circle');
	//
	// for (let circle of circles) {
    //     circle.setAttribute('r', size / 4);
    //     circle.setAttribute('cx', size / 2);
    //     circle.setAttribute('cy', size / 2);
    //     circle.setAttribute('stroke-dasharray', `${Math.PI * 2 * size / 4 *0.25} ${Math.PI * 2 * size / 4}`);
    //     circle.setAttribute('stroke-dashoffset', `${Math.PI * 2 * size / 4 *0.25}`);
    //     circle.setAttribute('stroke-width', `${ size / 4}`);
	// }

    const dataset = [
        {
            value: 5,
            color: '#dc3912'
        }, {
            value: 40,
            color: '#ff9900'
        }, {
            value: 30,
            color: '#109618'
        }, {
            value: 25,
            color: '#990099'
        }
    ];

});