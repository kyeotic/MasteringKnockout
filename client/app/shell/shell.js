define(['knockout', 'durandal/app', 'contacts/edit', 'contacts/list'], 
function (ko, app, EditVm, ListVm) {
	return {
		title: app.title,
		currentModel: ko.observable(ListVm),
		setEdit: function() { this.currentModel(EditVm); },
		setList: function() { this.currentModel(ListVm); }
	};
});