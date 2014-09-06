(function(app, $, ko) {

	function Person(init) {
		var self = this,
			data = init || {};

		self.name = data.name || '';
		self.age = data.age || '';
		self.alive = data.alive !== undefined ? data.alive : true;
		self.job = data.job || '';

		self.incrementAge = function() { self.age++; };
		self.decrementAge = function() { self.age--; };

		self.toggleAlive = function() {
			self.alive = !self.alive;
		};

		ko.track(self);

		ko.getObservable(self, 'age').subscribe(function(newValue) {
			console.log(self.name + ' age was changed to ' + newValue);
		});

		ko.defineProperty(self, 'canRemove', function() {
			return !self.alive;
		});
	}

	function Viewmodel(init) {
		var self = this,
			data = init || {},
			people = data.people || [];

		self.jobs = data.jobs || ['None Listed'];

		self.people = people.map(function(person) {
			return new Person(person);
		});

		self.removePerson = function(person) {
			self.people.remove(person);
		};

		self.newPerson = function() {
			self.people.push(new Person);
		};

		ko.track(self);
	};
	
	$(document).ready(function() {
		ko.applyBindings(new Viewmodel({
			jobs: ['Developer', 'Doctor', 'Teacher'],
			people: [
				{ name: 'Timothy Moran', job: 'Developer', age: 27, alive: true },
				{ name: 'James Hillock', job: 'Doctor', age: 48, alive: false },
				{ name: 'Alison Langdahl', job: 'Teacher', age: 45, alive: true },
				{ name: 'Richard English', job: 'Teacher', age: 50, alive: true }
			]
		}));
	});

})(window.app = window.app || {}, jQuery, ko);