(function(app, $, ko) {

	$(document).ready(function() {
		ko.applyBindings({ 
			options: ['None', 'Shipped', 'Pending', 'Incomplete'],
			trackingNumber: 'z1-887698765458',
			orderStatus: ko.observable('None')
		});
	});

})(window.app = window.app || {}, jQuery, ko);