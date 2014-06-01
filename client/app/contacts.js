(function(app, $, ko) {
	app.Contact = function(init) {
		var self = this,
			data = init || {};
		self.firstName = ko.observable(data.firstName || '');
		self.lastName = ko.observable(data.lastName || '');
		self.nickname = ko.observable(data.nickname || '');
		self.phoneNumber = ko.observable(data.phoneNumber || '');
		self.displayName = ko.computed(function() {
			var fullName = self.firstName() + ' ' 
							+ self.lastName(),
				nickname = self.nickname();
			if (nickname.length > 0)
				return nickname;
			else if (self.firstName().length > 0)
				return fullName;
			else
				return 'New Contact';
		});
	};

	var mockData = [
		{ 
			firstName: 'Timothy', 
			lastName: 'Moran', 
			phoneNumber: '503-555-1234' 
		}, { 
			firstName: 'John', 
			lastName: 'Smith', 
			phoneNumber: '503-555-4567' 
		}, { 
			firstName: 'Jane', 
			lastName: 'Doe', 
			phoneNumber: '503-555-8912' 
		}
	];

	app.ContactsPageViewmodel = function(init) {
		var self = this,
			data = init || [];

		self.entryContact = ko.observable(new app.Contact());
		self.contacts = ko.observableArray(data.map(function(c) {
			return new app.Contact(c);
		}));

		self.saveEntry = function() {
			self.contacts.push(self.entryContact());
			self.entryContact(new app.Contact());
		};

		self.clearEntry = function() {
			self.entryContact(new app.Contact());
		};
	};

	$(document).ready(function() {
		ko.applyBindings(new app.ContactsPageViewmodel(mockData));
	});

})(window.app = window.app || {}, jQuery, ko);