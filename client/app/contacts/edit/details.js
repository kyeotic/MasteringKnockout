define(['knockout', 'plugins/router', 'services/mock', 'contacts/contact'], 
function(ko, router, dataService, Contact) {
	return function ContactDetailsVm() {
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
				self.contact().state.reset();
				router.navigate('');
			});   
		};

		self.close = function() {
			router.navigate('');
		};

		self.canDeactivate = function() {
			if (!self.contact().state.isDirty())
				return true;
			return app.showMessage('You have unsaved changes. Are you sure you want to leave?', 'Cancel Edit?', ['No', 'Yes']);
		};
	};
});