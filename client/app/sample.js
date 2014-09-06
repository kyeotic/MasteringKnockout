(function(app, $, ko) {

	var viewModel = {
		autocompleteOptions: ko.observableArray(['Portland', 'Seattle', 'San Francisco']),
		autocompleteValue: ko.observable(),

		windowOpen: ko.observable(),

		startDate: ko.observable(new Date())
	};
	
	$(document).ready(function() {
		ko.applyBindings(viewModel);
	});

})(window.app = window.app || {}, jQuery, ko);