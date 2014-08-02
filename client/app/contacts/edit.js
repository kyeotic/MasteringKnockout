define(['durandal/system', 'knockout', 'plugins/router', 'services/mock', 'contacts/contact', 'plugins/dialog'], 
function(system, ko, router, dataService, Contact, dialog) {
	return function EditContactVm(init) {
		var self = this;

		self.contact = ko.observable(new Contact());

		self.activate = function(id) {
			//Id is only present when editing
			if (id)
				dataService.getContact(id, self.contact);			
		};

		self.saveEntry = function() {
			var action = self.contact().id() === 0 
						? dataService.createContact 
						: dataService.updateContact;

			action(self.contact(), function() {
				self.close(self.contact());
			});
		};

		self.cancel = function() {
			self.close(null);
		};

		self.close = function(result) {
			if (dialog.getDialog(self))
				dialog.close(self, result);
			else
				router.navigate('');
		};
	};
});