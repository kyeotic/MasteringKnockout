define(['durandal/system', 'knockout', 'plugins/router', 'services/mock', 'contacts/contact'], 
function(system, ko, router, dataService, Contact) {
	return function EditContactVm(init) {
		var self = this;

		self.contact = ko.observable(new Contact());

		self.activate = function(id) {
			//Id is only present when editing
			if (!id) return;

			dataService.getContact(id, self.contact);
		};

		self.saveEntry = function() {
			if (self.contact().id() === 0) {
				dataService.createContact(self.contact(), function() {
					router.navigate('');
				});
			} else {
				dataService.updateContact(self.contact(), function() {
					router.navigate('');
				});
			}     
		};

		self.close = function() {
			router.navigate('');
		};
	};
});