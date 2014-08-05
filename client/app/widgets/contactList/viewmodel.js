define(['durandal/app', 'knockout'], function(app, ko) {
	return function ContactListWidget() {
		var self = this;

		self.activate = function(options) {
			self.contacts = options.data;
			self.edit = options.edit;
			self.delete = options.delete;
		};
	};
});