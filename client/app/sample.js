(function(app, $, ko) {

	var BindingSample = function() {
		var self = this;

		self.isAdmin = ko.observable(false);
		self.toggleAdmin = function() {
			self.isAdmin(!self.isAdmin());
		};

		self.navigationItems = ko.observableArray(['People', 'Locations' , 'Users']);
	};
	
	$(document).ready(function() {
		ko.applyBindings(new BindingSample());
	});

})(window.app = window.app || {}, jQuery, ko);