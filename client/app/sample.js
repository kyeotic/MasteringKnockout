(function(app, $, ko) {

	var BindingSample = function() {
		var self = this;

		self.firstName = ko.observable('Timothy');
		self.lastName = ko.observable('Moran');
		self.birthDate = ko.observable('3/19/1987');
	};
	
	$(document).ready(function() {
		ko.applyBindings(new BindingSample());
	});

})(window.app = window.app || {}, jQuery, ko);