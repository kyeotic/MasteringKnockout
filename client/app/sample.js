(function(app, $, ko) {
	
	$(document).ready(function() {
		var vm = { 
			tooltipText: ko.observable('Tooltip Text'),
			alerts: ko.observableArray([
                        {'message': 'Here is an Error', 'priority': 'danger'},
                        {'message': 'Here is a Warning', 'priority': 'warning'},
                        {'message': 'Here is a Success', 'priority': 'success'},
                        {'message': 'Here is some Info', 'priority': 'info'}
                    ])
		};

		vm.addAlert = function() {
			vm.alerts.push({'message': 'Here is an Error', 'priority': 'danger'});
		};

		vm.removeAlert = function() {
			vm.alerts.shift();
		};

		ko.applyBindings(vm);
	});

})(window.app = window.app || {}, jQuery, ko);