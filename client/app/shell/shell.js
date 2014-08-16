define(['plugins/router', 'knockout', 'durandal/app', 'services/mock'], 
function (router, ko, app, dataService) {
	return {
		title: app.title,
		router: router,
		username: dataService.getLoginName(),
		logout: function() {
			dataService.logout();
			location.href = '/';
		},
		activate: function() {

			router.map([
				{ route: '', moduleId: 'contacts/list', title: 'Contacts', nav: true },
				{ route: 'contacts/new', moduleId: 'contacts/edit', title: 'New Contact', nav: true },
				{ route: 'contacts/:id', moduleId: 'contacts/edit', title: 'Contact Details', nav: false }
			])
			.buildNavigationModel()
			.mapUnknownRoutes('shell/error', 'not-found');

			return router.activate({ pushState: true });
		}
	};
});