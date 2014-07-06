(function(app, $, ko) {

	var BindingSample = function() {
		var self = this;

		self.name = ko.observable('Timothy');
		self.locations = ['Portland', 'Seattle', 'New York City'];
		self.selectedLocation = ko.observable();
		self.isAdmin = ko.observable(true)
	};
	
	$(document).ready(function() {
		ko.applyBindings(new BindingSample());
	});

})(window.app = window.app || {}, jQuery, ko);