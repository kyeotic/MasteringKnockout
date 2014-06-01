(function(app, $, ko) {

	var ComputedSample = function() {
		var self = this;
		self.subtotal = ko.observable(20);
		self.tax = ko.observable(0.05);
		self.total = ko.computed({
			write: function(newValue) {
				var tax = parseFloat(self.tax()),
					totalMinusTax = newValue / (1 + tax);
				self.subtotal(totalMinusTax);
			},
			read: function() {
				var subtotal = parseFloat(self.subtotal()),
					tax = parseFloat(self.tax());
				return subtotal * (1 + tax);
			}
		});
	};

	$(document).ready(function() {
		ko.applyBindings(new ComputedSample());
	});

})(window.app = window.app || {}, jQuery, ko);