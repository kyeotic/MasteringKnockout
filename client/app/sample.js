(function(app, $, ko) {

	var BindingSample = function() {
		var self = this;

		self.firstName = ko.observable('Tim');
		self.canEdit = ko.observable(true);

		self.toggleEdit = function() {
			self.canEdit(!self.canEdit());
		};

		self.contacts = ko.observableArray([{ name: 'Tim' }, { name: 'Bob' }, {name: 'Justin'}]);
		self.removeContact = function (contact) {
	         self.contacts.remove(contact);   
	    };

		self.location = {
			name: ko.observable('Portland')
		};

		self.observableLocation = ko.observable({
			name: self.location.name
		});

		self.age = ko.observable(19);

		self.oldEnough = function(age) {
			return age() >= 18 ? 'Yes' : 'No';
		};
	};
	
	$(document).ready(function() {
		ko.applyBindings(new BindingSample());
	});

})(window.app = window.app || {}, jQuery, ko);