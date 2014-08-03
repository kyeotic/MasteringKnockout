define(['durandal/system', 'knockout', 'plugins/router', 'services/mock', 'contacts/contact'], 
function(system, ko, router, dataService, Contact) {
	return function EditContactVm(init) {
		var self = this;

		self.contact = ko.observable(new Contact());

		self.activate = function(id) {
			//Id is only present when editing
			if (id)
				return dataService.getContact(id).then(self.contact);
		};

		self.saveEntry = function() {
			var action = self.contact().id() === 0
						? dataService.createContact
						: dataService.updateContact;
			action(self.contact()).then(function() {
				router.navigate('');
			});   
		};

		self.close = function() {
			router.navigate('');
		};
	};
});