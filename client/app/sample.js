(function(app, $, ko) {

	var defaultChartOptions = { 
			height: 300, 
			width: 300,
			animation: false
		},
		circularChartTypes =['Doughnut', 'Pie', 'PolarArea'];

	ko.bindingHandlers.circularChart = {
	    init: function(element, valueAccessor) {
	        var canvas = document.createElement('canvas'),
	        	options = ko.utils.extend(defaultChartOptions, valueAccessor()),
	        	chartContext = canvas.getContext('2d');
	        
	        element.appendChild(canvas);        

	        ko.computed(function() {

	        	canvas.height = ko.unwrap(options.height);
	        	canvas.width = ko.unwrap(options.width);

	        	var chartType = ko.unwrap(options.type);

	        	var data = ko.toJS(options.data).map(function(x) {
	        		return {
	        			value: parseFloat(x.value),
	        			color: x.color.indexOf('#') === 0 ? "#" + x.color : x.color
	        		}
	        	});

	        	var chart = new Chart(chartContext);
	        	
	        	if (circularChartTypes.indexOf(chartType) === -1)
	        		throw new Error('Chart Type ' + chartType + 'is not a Circular Chart Type');

	        	chart[chartType](data, options);
	        }, null, {disposeWhenNodeIsRemoved: element});
	    }
	};

	var ChartDatum = function(value, color) {
		var self = this;
		self.value = ko.observable(value);
		self.color = ko.observable(color);
	};


	var BindingSample = function() {
		var self = this;

		self.chartHeight = ko.observable(300);
		self.chartWidth = ko.observable(400);

		self.chartTypes = circularChartTypes;
		self.selectedChartType = ko.observable(self.chartTypes[0]);

		self.chartSeries = [
			new ChartDatum(20, 'D97041'),
			new ChartDatum(8, 'C7604C'),
			new ChartDatum(80, '21323D'),
			new ChartDatum(13, '9D9B7F'),
			new ChartDatum(145, '7D4F6D')
		];
	};
	
	$(document).ready(function() {
		ko.applyBindings(new BindingSample());
	});

})(window.app = window.app || {}, jQuery, ko);