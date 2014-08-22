define(['durandal/app', 'knockout', 'plugins/router', 'services/mock', 'contacts/contact', 'plugins/dialog'], 
function(app, ko, router, dataService, Contact, dialog) {
	function EditContactVm(init) {
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

		self.show = function() {
			return dialog.show(self);
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

		self.canDeactivate = function() {
			if (!self.contact().state.isDirty())
				return true;
			return app.showMessage('You have unsaved changes. Are you sure you want to leave?', 'Cancel Edit?', ['No', 'Yes']);
		};
	};

	return EditContactVm;
});