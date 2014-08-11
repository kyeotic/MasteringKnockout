require.config({
	paths: {
		'text': '/lib/require-text-2.0.12',
		'knockout': '/lib/knockout-3.2.0',
		'bootstrap': '/lib/bootstrap-3.1.1',
		'jquery': '/lib/jquery-2.1.1.min',
		'sammy': '/lib/sammy-0.7.4'
	},
	shim: {
		'bootstrap': {
			deps: ['jquery'],
			exports: '$.fn.popover'
		}
	}
});

define(['jquery', 'knockout', 'sammy', 'bootstrap'], function($, ko, Sammy) {
	var pageVm = {
		name: ko.observable(),
		data: ko.observable(),
		setRoute: function(name, data) {
			//Set data first, otherwise component will get old data
			this.data(data);
			this.name(name);
		}
	};

	var sammyConfig = Sammy('#appHost', function() {
		var self = this;
		var pages = [
			  { route: ['/', '#/'], 							component: 'contact-list', 	module: 'contacts/list'} 
			, { route: ['#/contacts/new', '#/contacts/:id'], 	component: 'contact-edit', 	module: 'contacts/edit' } 
			, { route: '#/settings', 							component: 'settings-page', module: 'settings/page' }
		];

		pages.forEach(function(page) {
			//Register the component, only needs to hapen
			ko.components.register(page.component, { require: page.module });

			//Force routes to be an array
			if (!(page.route instanceof Array))
				page.route = [page.route];

			//Register routes with Sammy
			page.route.forEach(function(route) {
				self.get(route, function() {

					//Collect the parameters, if present
					var params = {};
					ko.utils.objectForEach(this.params, function(name, value) {
						params[name] = value;
					});

					//Set the page
					pageVm.setRoute(page.component, params);
				});
			});
		});
	});

	$(document).ready(function() {
		sammyConfig.run('#/');
		ko.applyBindings(pageVm);
	});
});