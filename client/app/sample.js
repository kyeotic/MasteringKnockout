(function(app, $, ko) {

	ko.bindingHandlers.text.preprocess = function(value) {
	    return 'ko.unwrap(' + value + ').toUpperCase()';
	};

	var BindingSample = function() {
		var self = this;

		self.firstName = ko.observable('Timothy');
	};
	
	$(document).ready(function() {
		ko.applyBindings(new BindingSample());
	});

})(window.app = window.app || {}, jQuery, ko);