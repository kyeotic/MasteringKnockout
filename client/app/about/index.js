define(['plugins/router'], function(router) {

	var childRouter = router.createChildRouter()
		.makeRelative({
			moduleId: 'about',
			fromParent: true
		}).map([
			{ route: ['author', ''], moduleId: 'author', title: 'Author', nav: true },
			{ route: 'publisher', moduleId: 'publisher', title: 'Publisher', nav: true }
		]).buildNavigationModel();

	return {
		router:childRouter
	};
});