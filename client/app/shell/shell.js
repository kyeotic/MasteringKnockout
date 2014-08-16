define(['plugins/router', 'knockout', 'durandal/app', 'login/nav'], 
function (router, ko, app, loginVm) {
	return {
		title: app.title,
		router: router,
		login: loginVm,
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