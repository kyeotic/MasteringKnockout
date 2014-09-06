(function(app, $, ko) {

	var vm = {
		people: ko.observableArray([{name: "Moroni", age: 50},
                                      {name: "Tiancum", age: 43},
                                      {name: "Jacob", age: 27},
                                      {name: "Nephi", age: 29},
                                      {name: "Alex", age: 27},
                                      {name: "Joseph", age: 29},
                                      {name: "Meriki", age: 27},
                                      {name: "Alfred", age: 29},
                                      {name: "Amanos", age: 27},
                                      {name: "Kreda", age: 29},
                                      {name: "Maximillius", age: 27},
                                      {name: "Wuino", age: 29},
                                      {name: "Phereas", age: 27},
                                      {name: "Hector", age: 29},
                                      {name: "Enos", age: 34}])
	};

	vm.remove = function(person) {
		this.people.remove(person);
	}.bind(vm);
	
	$(document).ready(function() {
		ko.applyBindings(vm);
	});

})(window.app = window.app || {}, jQuery, ko);