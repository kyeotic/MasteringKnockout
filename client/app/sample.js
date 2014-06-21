(function(app, $, ko) {

	ko.bindingHandlers.stopBinding = {
	    init: function(element, valueAccessor) {
	        return { controlsDescendantBindings: ko.unwrap(valueAccessor()) };
	    }
	};
	ko.virtualElements.allowedBindings.stopBinding = true;

	var BindingSample = function() {
		var self = this;

		self.title = ko.observable('Example');
	};
	
	$(document).ready(function() {
		ko.applyBindings(new BindingSample());
	});

})(window.app = window.app || {}, jQuery, ko);