define(['plugins/router', 'knockout', 'durandal/app', 'contacts/edit', 'contacts/list'], 
function (router, ko, app, EditVm, ListVm) {
	var listVm = new ListVm(),
		editVm = new EditVm();
	return {
		title: app.title,
		router: router,
		currentModel: ko.observable(listVm),
		setEdit: function() { this.currentModel(editVm); },
		setList: function() { this.currentModel(listVm); }
	};
});