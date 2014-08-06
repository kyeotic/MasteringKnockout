define(['durandal/system', 'knockout', 'plugins/router', 'services/mock', 'contacts/contact'], 
function(system, ko, router, dataService, Contact) {
	return function EditContactVm(init) {
		var self = this;

		self.contact = ko.observable(new Contact());
	};
});