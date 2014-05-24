function Contact(init) {
	var self = this,
		data = init || {};
	self.firstName = ko.observable(data.firstName || '');
	self.lastName = ko.observable(data.lastName || '');
	self.nickname = ko.observable(data.nickname || '');
	self.phoneNumber = ko.observable(data.phoneNumber || '');
	self.displayName = ko.computed(function() {
		var fullName = self.firstName() + ' ' 
						+ self.lastName(),
			nickname = self.nickname();
		if (nickname.length > 0)
			return nickname;
		else if (self.firstName().length > 0)
			return fullName;
		else
			return 'New Contact';
	});
};

var contactsVm = (function() {
	var contacts = ko.observableArray(),
		entryContact = ko.observable(new Contact());
	return {
		contacts: contacts,
		entryContact: entryContact,
		addContact: function() {
			contacts.push(entryContact());
			entryContact(new Contact());
		},
		clearEntry: function() {
			entryContact(new Contact());
		}
	};
})();

ko.applyBindings(contactsVm);