define(['knockout', 'durandal/app', 'contacts/edit', 'contacts/list'], 
function (ko, app, EditVm, ListVm) {
	var listVm = new ListVm(),
		editVm = new EditVm();
	return {
		title: app.title,
		currentModel: ko.observable(listVm),
		setEdit: function() { this.currentModel(editVm); },
		setList: function() { this.currentModel(listVm); }
	};
});