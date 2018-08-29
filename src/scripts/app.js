'use strict';

// preloader
const _preloader = document.querySelector('.js-preloader');
setTimeout(() => {
	_preloader.classList.remove('active');
	document.documentElement.classList.remove('no-scroll');
}, 5150);

// preloader
(() => {
	var paper = Raphael("canvas", '100%', '100%');
	var h = $(window).height();
	var w = $(window).width();
	var cDiam = 40;
	var cx = w / 2;
	var cy = h / 2;

	var steps = w / cDiam;
	var incRad = w / steps;

	function drawCircles(){
		for (var i = 0; i < steps; i++) {
			 var startDiam = i*steps;
			var animCircle = Raphael.animation({'stroke-width':steps+1,'r':startDiam+20},1500, "<>").delay(i*50);
			paper.circle(cx, cy, startDiam).attr({
				'stroke': 'rgba(250, 148, 121, .1)',
				'stroke-width': '0',
				'fill': 'none'
			}).animate(animCircle);
		}
	}
	var toCenter = paper.path("M" + 0 + "," + h + "L" + 0 + "," + h);
	toCenter.attr({
		'stroke': '#fa9479',
		'stroke-width': '1',
		'stroke-linejoin': 'round',
		'fill': 'none'
	});
	var transformedPath = Raphael.transformPath("M" + 0 + "," + h + "L" + cx + "," + cy);
	toCenter.animate({
		path: transformedPath
	}, 1000, lineReverse);

	function lineReverse() {
		var reversedPath = Raphael.transformPath("M" + cx + "," + cy + "L" + cx + "," + cy);
		toCenter.animate({
			path: reversedPath
		}, 1000, ">", drawCircles);
	}
})();


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


//graph
(() => {

	class Controller {
		constructor() {
			this.text = 'hello world!';
			this.data = [
				{date: new Date('02/21/2018 12:00:00 AM'), val: 60},
				{date: new Date('03/14/2018 12:00:00 AM'), val: 63},
				{date: new Date('03/28/2018 12:00:00 AM'), val: 91},
				{date: new Date('04/11/2018 12:00:00 AM'), val: 100},
				{date: new Date('04/25/2018 12:00:00 AM'), val: 110},
				{date: new Date('05/16/2018 12:00:00 AM'), val: 135},
				{date: new Date('05/30/2018 12:00:00 AM'), val: 150},
				{date: new Date('06/13/2018 12:00:00 AM'), val: 171},
				{date: new Date('06/27/2018 12:00:00 am'), val: 179},
				{date: new Date('07/18/2018 12:00:00 am'), val: 187},
				{date: new Date('08/01/2018 12:00:00 am'), val: 198},
				{date: new Date('08/21/2018 12:00:00 am'), val: 220},


			];

			//this.data = []
		}
	};

	angular.module('app', [])
		.factory('highstock', ($window) => {
			const Highcharts = $window.Highcharts;

			Highcharts.setOptions({
				global: {useUTC: false}
			});

			return Highcharts;
		})
		.controller('Controller', Controller)
		.directive('areaChart', ($filter, highstock) => {
			const chartColor = '#fa9479';
			const chartConfig = {
				chart: {
					type: 'area',
					backgroundColor: 'none',
					ignoreHiddenSeries: false
				},
				title: {
					style: {display: 'none'}
				},
				subTitle: {
					style: {display: 'none'}
				},
				legend: {
					enabled: false,
				},
				xAxis: {
					tickWidth: 0,
					lineWidth: 0,
					showFirstLabel: true,
					showLastLabel: true,
					startOnTick: false,
					crosshair: {
						color: '#999'
					},
					dateTimeLabelFormats: {
						millisecond: '%H:%M:%S.%L',
						second: '%H:%M:%S',
						minute: '%H:%M',
						hour: '%H:%M',
						day: '%m-%d',
						week: '%m-%d',
						month: '%Y-%m',
						year: '%Y'
					},
					range: 1000 * 3600 * 24 * 30, // Show 1 month range by default
					//minRange: 1000 * 3600 * 24 * 30 // Minimum range is also 1 month (bug: this does weird things)
				},
				yAxis: {
					softMax: 50,
					opposite: false,
					gridLineColor: 'rgba(221,221,221,0.1)',
					showLastLabel: true,
					//minTickInterval: 50,
					labels: {
						formatter() {
							return this.value + '.000';
						}
					}
				},
				rangeSelector: {enabled: false},
				navigator: {
					enabled: true,
					handles: {
						backgroundColor: 'transparent',
						borderColor: 'rgba(221,221,221,0.5)',
					},
					//outlineColor: null,
					outlineColor: 'rgba(221,221,221,0.1)',
					xAxis: {
						gridLineWidth: 1,
						gridLineColor: 'rgba(221,221,221,0.1)',
						labels: {enabled: false}
					}
				},
				scrollbar: {
					enabled: true,
					buttonBorderRadius: 5,
					buttonBorderColor: 'transparent',
					buttonBackgroundColor: 'transparent',
					barBackgroundColor: 'white',
					barBorderColor: 'transparent',
					//trackBackgroundColor: 'transparent',
					trackBackgroundColor: 'rgba(71, 71, 246, 0.5)',
					trackBorderColor: 'transparent',
					rifleColor: ' rgba(71, 71, 246, 1)'
				},
				tooltip: {
					borderWidth: 0,
					backgroundColor: '',
					useHTML: true,
					formatter() {
						const point = this.points[0];
						const time = new Date(point.key);

						return `
                    <div class="area-chart-tooltip">
                        <header>${$filter('date')(time, 'yyyy-MM-dd')}</header>
<div class="point-value"><span>${point.y+'.000'}</span></div>
                    </div>
                `;
					},
					followPointer: true
				},
				plotOptions: {
					area: {
						lineColor: chartColor,
						lineWidth: 1,
						fillColor: {
							linearGradient: {
								x1: 0,
								y1: 0,
								x2: 0,
								y2: 1
							},
							stops: [
								[0, highstock.Color(chartColor).setOpacity(0.7).get('rgba')],
								[1, highstock.Color(chartColor).setOpacity(0.2).get('rgba')]
							]
						},
						threshold: null,
						states: {
							hover: {
								lineWidth: 1
							}
						}
					}
				},
				series: [
					{
						name: '',
						data: null,
					},
					//{
					//    visible: false,
					//    data: null,
					//}
				],
				noData: {
					style: {
						display: 'none'
					}
				},
				credits: {
					enabled: false
				},
				exporting: {
					enabled: false
				},
			};

			const createDaySeries = (startDate, numDays, fillValue) => {
				startDate = startDate || new Date;
				numDays = numDays || 30;
				const series = [];

				let date = new Date(startDate);
				for (let i = 1; i <= numDays; i++) {
					series.push([date.getTime(), fillValue])
					date.setDate(date.getDate() + 1);
				}

				return series;
			};

			const diffDays = (date1, date2) => {
				const oneDayMs = 1000 * 60 * 60 * 24;
				return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDayMs));
			};

			return {
				restrict: 'AE',
				scope: {
					data: '='
				},
				template: `
            <section class="area-chart"></section>
        `,
				link(scope, elem) {
					const chartData = scope.data;
					const chartElem = elem[0].getElementsByClassName('area-chart')[0];
					chartConfig.chart.renderTo = chartElem;

					const createChart = () => {
						const series = chartConfig.series[0];
						const hiddenSeries = chartConfig.series[1] || {};
						let points = [];

						for (let dataPoint of chartData) {
							points.push([dataPoint.date.getTime(), dataPoint.val]);
						}

						if (!points.length) {
							// Empty chart. Fill with hidden series
							hiddenSeries.data = createDaySeries(new Date, 30, 60);
						} else {
							const MIN_DAYS = 30;
							const len = chartData.length;
							const firstDate = chartData[0].date;
							const lastDate = chartData[len - 1].date;
							const missingDays = MIN_DAYS - diffDays(firstDate, lastDate);
							if (missingDays > 0) {
								points.push(...createDaySeries(lastDate, missingDays, null));
							}
						}

						// Configure chart and render
						series.data = points;
						let chart = new highstock.StockChart(chartConfig);
					};

					// Show at least 30 days using hidden series

					createChart();
				}
			};
		})

})();