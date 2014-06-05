(function(app, $, ko) {

	var Person = function(data) {
		var self = this;
		self.name = data.name;
		self.children = data.children.map(function(child) {
			return new Person(child);
		});
	};

	var BindingSample = function() {
		var self = this;

		self.forefather = new Person({
			name: 'Alexander Hamilton',
			children: [
				{
					name: 'James Hamilton',
					children: [
						{
							name: 'Alexander Hamilton',
							children: [
								{
									name: 'John Hamilton',
									children: []
								}, {
									name: 'Rebecca Cunningham',
									children: []
								}
							]
						}, {
							name: 'Elizabeth Pollock',
							children: [
								{
									name: 'Robert Pollock',
									children: []
								}, {
									name: 'Annabel Stewart',
									children: []
								}
							]
						}
					]
				}, {
					name: 'Rachel Fawcett',
					children: [
						{
							name: 'Jean Faucette IV',
							children: []
						}, {
							name: 'Mary Uppington',
							children: []
						}
					]
				}
			]
		});
	};
	
	$(document).ready(function() {
		ko.applyBindings(new BindingSample());
	});

})(window.app = window.app || {}, jQuery, ko);