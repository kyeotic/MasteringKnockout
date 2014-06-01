(function(app, $, ko) {

	var ComputedSample = function() {
		var self = this;
		self.subtotal = ko.observable(20);
		self.tax = ko.observable(0.05);
		self.total = ko.computed(function() {
			return self.subtotal() * (1 + self.tax());
		});
	};

	$(document).ready(function() {
		ko.applyBindings(new ComputedSample());
	});

})(window.app = window.app || {}, jQuery, ko);