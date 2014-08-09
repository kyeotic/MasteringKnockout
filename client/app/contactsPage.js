define(['knockout', 'contact', 'dataService'], function(ko, Contact, dataService) {
	return function ContactsPageViewmodel() {
		var self = this;

		self.contacts = ko.observableArray();

		//Note: since our data service is sending back exactly the data we need (typed with the Contact object)
		//we could write this call like this: dataService.getContacts(self.contacts);
		//Since the contacts array is a function, it can be used as a callback
		dataService.getContacts(function(contacts) {
			self.contacts(contacts);
		});

		function ListViewmodel(params) {
			this.contacts = params.contacts;
			this.edit = params.edit;
			this.delete = function(contact) {
				console.log('Mock Deleting Contact', ko.toJS(contact));
			};
		};

		//List Component
		ko.components.register('contact-list', {
			template: { require: 'text!contact-list.html'},
			viewModel: ListViewmodel
		});

		//
		//CRUD Operations

		self.entryContact = ko.observable(null);

		self.newEntry = function() {
			self.entryContact(new Contact());
		};
		self.cancelEntry = function() {
			self.entryContact(null);
		};
		self.editContact = function(contact) {
			self.entryContact(contact);
		};

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
			//No query, just return everythying
			if (self.query() === '')
				return self.contacts();
			var query = self.query().toLowerCase();
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
});