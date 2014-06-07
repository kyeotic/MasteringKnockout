(function(app, $, ko) {
	app.ContactsPageViewmodel = function(dataService) {
		var self = this;

		self.contacts = ko.observableArray();

		//Note, since our data service is sending back exactly the data we need (typed with the Contact ctor)
		//we could write this call like this: dataService.getContacts(self.contacts);
		//Since the contacts array is a function, it can be used as a callback
		dataService.getContacts(function(contacts) {
			self.contacts(contacts);
		});		

		self.entryContact = ko.observable(new app.Contact());

		self.saveEntry = function() {
			dataService.createContact(self.entryContact(), function() {
				self.contacts.push(self.entryContact());
				self.entryContact(new app.Contact());
			});
		};
		self.clearEntry = function() {
			self.entryContact(new app.Contact());
		};
		self.removeContact = function(contact) {
			dataService.removeContact(contact.id(), function() {
				self.contacts.remove(contact);
			});			
		};
	};

	$(document).ready(function() {
		ko.applyBindings(new app.ContactsPageViewmodel(app.mockDataService));
	});

})(window.app = window.app || {}, jQuery, ko);