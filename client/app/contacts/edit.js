define(['durandal/app', 'knockout', 'plugins/router'], 
function(app, ko, router) {

	var childRouter = router.createChildRouter()
		.makeRelative({
			moduleId: 'contacts/edit',
			fromParent: true,
			dynamicHash: ':id'
		}).map([
			{ route: ['details', ''], moduleId: 'details', title: 'Details', nav: true },
			{ route: 'bio', moduleId: 'bio', title: 'Biography', nav: true },
			{ route: 'location', moduleId: 'location', title: 'Location', nav: true }
		]).buildNavigationModel();

	return {
		router: childRouter
	};
});