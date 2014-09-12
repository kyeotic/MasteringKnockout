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

		var totalSubscription = self.total.subscribe(function(oldValue) {
			console.log('The total is about to change, the current value is ' + oldValue);
		}, self, 'beforeChange');

		var subtotalSubscription = self.subtotal.subscribe(function(newValue) {
			console.log('The subtotal value was updated to: ' + newValue);
		});

		self.stopSubscribing = function() {
			if (subtotalSubscription) {
				subtotalSubscription.dispose();
				subtotalSubscription = null;
			}
		};
	};

	$(document).ready(function() {
		ko.applyBindings(new ComputedSample());
	});

})(window.app = window.app || {}, jQuery, ko);