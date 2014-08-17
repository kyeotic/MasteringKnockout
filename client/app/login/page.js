define(['durandal/app', 'knockout', 'services/mock'], function(app, ko, dataService) {
	return function LoginVm() {
		var self = this;

		self.username = ko.observable('');
		self.password = ko.observable('');

		self.signInError = ko.observable(false);

		self.signIn = function() {
			self.signInError(false);
			dataService.tryLogin(self.username(), self.password())
				.then(function(result) {
					if (result) {
						app.setRoot('shell/shell');
						return;
					}
					self.signInError(true);
				});
		};
	};
});