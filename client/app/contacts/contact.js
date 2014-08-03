define(['knockout'], function(ko, router) {
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

		//Generic update method, merge all properties into the viewmodel
		self.update = function(update) {
			data = update || {};
			Object.keys(data).forEach(function(prop) {
				if (ko.isWriteableObservable(self[prop]))
					self[prop](data[prop]);
			});
		};

		//Set the initial values using our handy-dandy update method.
		self.update(init);

		//Remove unwanted properties from serialized data
		self.toJSON = function() {
			var copy = ko.toJS(self);
			delete copy.displayName;
			return copy;
		};

		self.state = ko.dirtyFlag(self);
	};
});