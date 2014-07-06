(function(app, $, ko) {

	var BindingSample = function() {
		var self = this;

		self.name = ko.observable('Timothy');
		self.isAdmin = ko.observable(true)
	};
	
	$(document).ready(function() {
		ko.applyBindings(new BindingSample());
	});

})(window.app = window.app || {}, jQuery, ko);