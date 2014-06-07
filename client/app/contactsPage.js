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

		self.entryContact = ko.observable(null);

		self.saveEntry = function() {
			if (self.entryContact().id() === 0) {
				dataService.createContact(self.entryContact(), function() {
					self.contacts.push(self.entryContact());
					self.entryContact(null);
				});
			} else {
				dataService.updateContact(self.entryContact(), function() {
					self.entryContact(null);
				});
			}			
		};
		self.newEntry = function() {
			self.entryContact(new app.Contact());
		};
		self.cancelEntry = function() {
			self.entryContact(null);
		};
		self.editContact = function(contact) {
			self.entryContact(contact);
		};

		self.deleteContact = function(contact) {
			dataService.removeContact(contact.id(), function() {
				self.contacts.remove(contact);
			});			
		};

		//
		//Searching
		self.query = ko.observable('');
		self.clearQuery = function() { self.query(''); };

		self.displayContacts = ko.computed(function() {
			var query = self.query().toLowerCase();
			//No query, just return everythying
			if (self.query() === '')
				return self.contacts();
			//Otherwise, filter all contacts using the query
			return ko.utils.arrayFilter(self.contacts(), function(c) {
				return c.displayName().toLowerCase().indexOf(query) !== -1
						// || c.firstName().toLowerCase().indexOf(query) !== -1
						// || c.lastName().toLowerCase().indexOf(query) !== -1
						// || c.nickName().toLowerCase().indexOf(query) !== -1						
						|| c.phoneNumber().toLowerCase().indexOf(query) !== -1;
			});
		}).extend({ 
			//We don't want queries updating the filter too quickly
			//Debounce on 100ms
			rateLimit: {
				timeout: 100,
				method: 'notifyWhenChangesStop'
			}
		});
	};

	$(document).ready(function() {
		ko.applyBindings(new app.ContactsPageViewmodel(app.mockDataService));
	});

})(window.app = window.app || {}, jQuery, ko);