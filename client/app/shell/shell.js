define(['plugins/router', 'knockout', 'durandal/app', 'login/nav', 'services/mock'], 
function (router, ko, app, LoginVm, dataService) {
	return {
		title: app.title,
		router: router,
		login: new LoginVm,
		activate: function() {
			router.map([
				{ route: '', moduleId: 'contacts/list', title: 'Contacts', nav: true },
				{ route: 'contacts/new', moduleId: 'contacts/edit', title: 'New Contact', nav: true, auth: true },
				{ route: 'contacts/:id', moduleId: 'contacts/edit', title: 'Contact Details', nav: false }
			])
			.buildNavigationModel()
			.mapUnknownRoutes('shell/error', 'not-found');
			
			this.navigationModel = ko.computed(function() {
				var navigationModel = router.navigationModel();
				if (dataService.isLoggedIn())
					return navigationModel;
				else
					return navigationModel.filter(function(route) {
						return !route.auth;
					});
			});

			return router.activate({ pushState: true });
		}
	};
});