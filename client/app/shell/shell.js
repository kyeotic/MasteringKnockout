define(['plugins/router', 'knockout', 'durandal/app'], 
function (router, ko, app) {
	return {
		title: app.title,
		router: router,
		activate: function() {

			router.map([
				{ route: '', moduleId: 'contacts/list', title: 'Contacts', nav: true },
				{ route: 'contacts/new', moduleId: 'contacts/edit', title: 'Contacts', nav: false },
				{ route: 'contacts/:id', moduleId: 'contacts/edit', title: 'Contacts', nav: false }
			]).buildNavigationModel();

			return router.activate();
		}
	};
});