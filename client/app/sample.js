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

		self.mother = new Person({
			name: 'Gina Ford',
			age: 53,
			location: 'Fairview',
			favoriteColor: 'Green'
		});
	};
	
	$(document).ready(function() {
		ko.applyBindings(new BindingSample());
	});

})(window.app = window.app || {}, jQuery, ko);