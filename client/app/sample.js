(function(app, $, ko) {

	ko.bindingHandlers.valueFlash = {
		preprocess: function(value, name, addBinding) {
			addBinding('value', value);
		    return value;
		},
		update: function(element, valueAccessor) {
        	ko.unwrap(valueAccessor());  //unwrap to get dependency
	        $(element).css({opacity: 0}).animate({opacity: 1}, 500);
	    }
	};

	var BindingSample = function() {
		var self = this;

		self.firstName = ko.observable('Timothy');
	};
	
	$(document).ready(function() {
		ko.applyBindings(new BindingSample());
	});

})(window.app = window.app || {}, jQuery, ko);