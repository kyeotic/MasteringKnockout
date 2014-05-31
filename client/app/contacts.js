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

var mockData = [
	{ 
		firstName: 'Timothy', 
		lastName: 'Moran', 
		phoneNumber: '503-555-1234' 
	}, { 
		firstName: 'John', 
		lastName: 'Smith', 
		phoneNumber: '503-555-4567' 
	}, { 
		firstName: 'Jane', 
		lastName: 'Doe', 
		phoneNumber: '503-555-8912' 
	}
];

var contactsPageVm = (function(init) {
	var data = init || [],
		contacts = ko.observableArray(data.map(function(c) {
			return new Contact(c);
		})),
		entryContact = ko.observable(new Contact());
	return {
		contacts: contacts,
		entryContact: entryContact,
		saveEntry: function() {
			contacts.push(entryContact());
			entryContact(new Contact());
		},
		clearEntry: function() {
			entryContact(new Contact());
		}
	};
})(mockData);

$(document).ready(function() {
	ko.applyBindings(new Contact({ 
		firstName: 'Timothy', 
		lastName: 'Moran', 
		phoneNumber: '503-555-1234' 
	}));
});