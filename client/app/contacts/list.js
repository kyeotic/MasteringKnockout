define(['durandal/app', 'knockout', 'services/mock', 'plugins/router', 'durandal/system'],
function(app, ko, dataService, router, system) {
	function ContactListVM() {
		var self = this;

		self.contacts = ko.observableArray();

		var singleActivate = dataService.getContacts()
			.then(function(contacts) {
				self.contacts(contacts);
			});

		self.activate = function() {
			return singleActivate;
		};

		dataService.on('contact:added', self.contacts.push, self.contacts);

		//
		//CRUD Operations

		self.newEntry = function() {
			router.navigate('contacts/new');
		};
		
		self.editContact = function(contact) {
			router.navigate('contacts/' + contact.id());
		};
		
		self.deleteContact = function(contact) {
			app.showMessage('Are you sure you want to delete ' + contact.displayName() + '?', 'Delete Contact?', ['No', 'Yes'])
				.then(function(response) {
					if (response === 'Yes') {
						dataService.removeContact(contact.id()).then(function() {
							self.contacts.remove(contact);
						}); 
					}
				});
		};

		self.canEdit = ko.computed(function() {
			return dataService.isLoggedIn();
		});

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

	return new ContactListVM();
});