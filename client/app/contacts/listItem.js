define(['knockout', 'plugins/router'], function(ko, router) {
	return function ListItem(contact) {
		var self = this;

		self.contact = contact;

		self.edit = function() {
			router.navigate('contacts/' + self.contact.id());
		};
	};
});