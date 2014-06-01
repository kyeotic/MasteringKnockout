(function(app, $, ko) {
	app.Contact = function(init) {
		var self = this,
			data = init || {};
		self.firstName = ko.observable(data.firstName || '');
		self.lastName = ko.observable(data.lastName || '');
		self.nickname = ko.observable(data.nickname || '');
		self.phoneNumber = ko.observable(data.phoneNumber || '');
	};

	$(document).ready(function() {
		ko.applyBindings(new app.ContactsPageViewmodel(mockData));
	});

})(window.app = window.app || {}, jQuery, ko);