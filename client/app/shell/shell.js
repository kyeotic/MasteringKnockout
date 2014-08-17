define(['plugins/router', 'knockout', 'durandal/app', 'login/nav', 'services/mock'], 
function (router, ko, app, LoginVm, dataService) {
	return {
		title: app.title,
		router: router,
		login: new LoginVm,
		activate: function() {
			router.map([
				{ route: '', moduleId: 'contacts/list', title: 'Contacts', nav: true },
				{ route: 'contacts/new', moduleId: 'contacts/edit', title: 'New Contact', nav: true },
				{ route: 'contacts/:id', moduleId: 'contacts/edit', title: 'Contact Details', nav: false }
			])
			.buildNavigationModel()
			.mapUnknownRoutes('shell/error', 'not-found');

			var contactRoute = router.navigationModel()[1];

			ko.computed(function() {
				if (dataService.isLoggedIn() && router.navigationModel().indexOf(contactRoute) === -1)
					router.navigationModel.push(contactRoute);
				else
					router.navigationModel.remove(contactRoute);
			});

			return router.activate({ pushState: true });
		}
	};
});