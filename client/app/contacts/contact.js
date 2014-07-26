define(['knockout'], function(ko) {
	return function Contact(init) {
		var self = this;
		self.id = ko.observable(0);
		self.firstName = ko.observable('');
		self.lastName = ko.observable('');
		self.nickname = ko.observable('');
		self.phoneNumber = ko.observable('');

		self.displayName = ko.computed(function() {
			var nickname = self.nickname() || '';
			if (nickname.length > 0)
				return nickname;
			else if ((self.firstName() || '').length > 0)
				return self.firstName() + ' ' + self.lastName();
			else
				return 'New Contact';
		});

		self.saveEntry = function() {
			if (self.entryContact().id() === 0) {
				dataService.createContact(self.entryContact(), function() {
					self.contacts.push(self.entryContact());
					self.entryContact(null);
				});
			} else {
				dataService.updateContact(self.entryContact(), function() {
					self.entryContact(null);
				});
			}     
		};

		self.close = function() {
			router.navigate('');
		};

		//Generic update method, merge all properties into the viewmodel
		self.update = function(update, options) {
			data = update || {};
			Object.keys(data).forEach(function(prop) {
				if (ko.isObservable(self[prop]))
					self[prop](data[prop]);
			});

			if (options && options.isDirty)
				self.dirtyFlag.reset();
		};

		//Set the initial values using our handy-dandy update method.
		self.update(init);

		//Remove unwanted properties from serialized data
		self.toJSON = function() {
			var copy = ko.toJS(self);
			delete copy.displayName;
			return copy;
		};
	};
});