define(['knockout', 'durandal/app'], 
function (ko, app, EditVm, ListVm) {
	return {
		title: app.title,
		name: ko.observable('Tim')
	};
});