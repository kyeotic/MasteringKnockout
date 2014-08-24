define(['knockout', 'plugins/observable'], function(ko, observable) {
	return function Contact(init) {
		var self = this;

		self.id = 0;
		self.firstName = '';
		self.lastName = '';
		self.nickname = '';
		self.phoneNumber = '';

		observable.convertObject(self);

		observable.defineProperty(self, 'displayName', function() {
			var nickname = self.nickname || '';
			if (nickname.length > 0)
				return nickname;
			else if ((self.firstName || '').length > 0)
				return self.firstName + ' ' + self.lastName;
			else
				return 'New Contact';
		});

		//Generic update method, merge all properties into the viewmodel
		self.update = function(update) {
			data = update || {};
			Object.keys(data).forEach(function(prop) {
				if (ko.isWriteableObservable(observable(self, prop)))
					self[prop] = data[prop];
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