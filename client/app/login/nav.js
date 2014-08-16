define(['durandal/app', 'knockout', 'services/mock'], function(app, ko, dataService) {
	return function LoginVm() {
		var self = this;

		self.username = ko.observable('');
		self.password = ko.observable('');

		self.isLoggedIn = ko.observable(false);
		self.signInError = ko.observable(false);

		if (dataService.isLoggedIn()) {
			self.username(dataService.getLoginName())
			self.isLoggedIn(true);
		}

		self.signIn = function() {
			if (self.isLoggedIn())
				return;

			self.signInError(false);
			dataService.tryLogin(self.username(), self.password())
				.then(function(result) {
					if (result) {
						self.password('');
						self.isLoggedIn(true);
						return;
					}
					self.signInError(true);
				});
		};

		self.logout = function() {
			self.username('');
			self.password('');
			self.isLoggedIn(false);
			dataService.logout();
		};
	};
});