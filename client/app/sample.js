(function(app, $, ko) {

	var Person = function(data) {
		var self = this;
		self.name = data.name;
		self.age = data.age;
		self.location = data.location;
		self.favoriteColor = data.favoriteColor;
	};

	var BindingSample = function() {
		var self = this;

		self.father = new Person({
			name: 'Curt Ford',
			age: 50,
			location: 'Fairview',
			favoriteColor: 'Blue'
		});

		self.editing = ko.observable(false);
		self.toggleEdit = function() {
			self.editing(!self.editing());
		};

		self.template = ko.computed(function() {
			return self.editing() ? 'editTemplate' : 'viewTemplate';
		});
	};
	
	$(document).ready(function() {
		ko.applyBindings(new BindingSample());
	});

})(window.app = window.app || {}, jQuery, ko);