define(['knockout', 'text!contacts/list.html', 'core/dataService', 'core/router'], 
function(ko, templateString, dataService, router) {

	function ContactsListViewmodel() {
		var self = this;

		self.contacts = ko.observableArray();

		//Note: since our data service is sending back exactly the data we need (typed with the Contact object)
		//we could write this call like this: dataService.getContacts(self.contacts);
		//Since the contacts array is a function, it can be used as a callback
		dataService.getContacts(function(contacts) {
			self.contacts(contacts);
		});

		self.newEntry = function() {
			router.navigate('/contacts/new');
		};

		self.editContact = function(contact) {
			router.navigate('/contacts/' + contact.id());
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

		self.dispose = function() {
			self.contacts.removeAll();
		};
	}

	return { template: templateString, viewModel: ContactsListViewmodel };
});