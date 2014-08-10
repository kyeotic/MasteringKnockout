define(['knockout'], function(ko) {
	return function ListViewmodel(params) {
		this.contacts = params.contacts;
		this.edit = params.edit;
		this.delete = function(contact) {
			console.log('Mock Deleting Contact', ko.toJS(contact));
		};
	};
});