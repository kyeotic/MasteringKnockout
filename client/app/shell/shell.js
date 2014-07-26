define(['knockout', 'durandal/app'], 
function (ko, app, EditVm, ListVm) {
	return {
		title: app.title,
		currentModel: ko.observable('contacts/list'),
		setEdit: function() { this.currentModel('contacts/edit'); },
		setList: function() { this.currentModel('contacts/list'); }
	};
});