var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var Particles = function (_React$Component) {_inherits(Particles, _React$Component);function Particles() {_classCallCheck(this, Particles);return _possibleConstructorReturn(this, (Particles.__proto__ || Object.getPrototypeOf(Particles)).apply(this, arguments));}_createClass(Particles, [{ key: "render", value: function render()
	{
		return (
			React.createElement("div", { className: "wrap" },
				Array.apply(null, Array(500)).map(function (item, i) {
					return (
						React.createElement("div", { className: "p" },
							React.createElement("div", { className: "q" })));


				}, this)));


	} }]);return Particles;}(React.Component);


ReactDOM.render(React.createElement(Particles, null), document.getElementById("root"));



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

