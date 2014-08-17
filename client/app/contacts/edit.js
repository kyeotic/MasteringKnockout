define(['durandal/app', 'knockout', 'plugins/router', 'services/mock', 'contacts/contact'], 
function(app, ko, router, dataService, Contact) {
	return function EditContactVm(init) {
		var self = this;

		self.contact = ko.observable(new Contact());

		self.activate = function(id) {
			//Id is only present when editing
			if (id)
				return dataService.getContact(id).then(self.contact);
		};

		var contactAdded = app.proxy('contact:added');
		var goToList = function() {
			self.contact().state.reset();
			router.navigate('');
		}

		self.saveEntry = function() {
			if (self.contact().id() === 0) {
				dataService.createContact(self.contact())
					.then(contactAdded)
					.then(goToList);
			} else {
				dataService.updateContact(self.contact())
					.then(goToList);
			}
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