(function(app, $, ko) {
	app.Contact = function(init) {
		var self = this,
			data = init || {};
		self.firstName = ko.observable(data.firstName || '');
		self.lastName = ko.observable(data.lastName || '');
		self.nickname = ko.observable(data.nickname || '');
		self.phoneNumber = ko.observable(data.phoneNumber || '');
	};

	app.ContactsPageViewmodel = function(init) {
		var self = this,
			data = init || {};

		self.contacts = ko.observableArray(data.map(function(c) {
			return new app.Contact(c);
		}));

		self.entryContact = ko.observable(new app.Contact());

		self.saveEntry = function() {
			self.contacts.push(self.entryContact());
			self.entryContact(new app.Contact());
		};
		self.clearEntry = function() {
			self.entryContact(new app.Contact());
		};
		self.removeContact = function(contact) {
			self.contacts.remove(contact);
		};
	};

	$(document).ready(function() {
		ko.applyBindings(new app.ContactsPageViewmodel(mockData));
	});

})(window.app = window.app || {}, jQuery, ko);