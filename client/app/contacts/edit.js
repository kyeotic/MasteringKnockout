define(['knockout', 'text!contacts/edit.html', 'core/dataService', 'core/router', 'contacts/contact'], 
function(ko, templateString, dataService, router, Contact) {

	function ContactEditViewmodel(params) {
		//
		//CRUD Operations

		self.entryContact = ko.observable(new Contact());

		if (params && params.id) {
			dataService.getContact(params.id, function(contact) {
				if (contact)
					self.entryContact(contact);
			});
		}

		self.cancelEntry = function() {
			router.navigate('/');
		};

		self.saveEntry = function() {

			var action = self.entryContact().id() === 0 
				? dataService.createContact 
				: dataService.updateContact;

			action(self.entryContact(), function() {
				router.navigate('/');
			});
		};

		self.dispose = function() {
			self.entryContact(null);
		};
	}

	return { template: templateString, viewModel: ContactEditViewmodel };
});