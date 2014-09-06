(function(app, $, ko) {

	var vm = {
		people: ko.observableArray([{name: "Moroni", age: 50},
                                      {name: "Tiancum", age: 43},
                                      {name: "Jacob", age: 27},
                                      {name: "Nephi", age: 29},
                                      {name: "Enos", age: 34}])
	}
	
	$(document).ready(function() {
		ko.applyBindings(vm);
	});

})(window.app = window.app || {}, jQuery, ko);