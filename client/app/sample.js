(function(app, $, ko) {

	ko.bindingHandlers.merge = {
	    init: function(element, valueAccessor, allBindings, viewmodel, bindingContext) {
	        
	        var value = valueAccessor(),
	        	merge = ko.utils.extend(value.target, value.source);
	        	child = bindingContext.createChildContext(merge);

			ko.applyBindingsToDescendants(child, element);        	

	        // Also tell KO *not* to bind the descendants itself, otherwise they will be bound twice
        	return { controlsDescendantBindings: true };
	    }
	};

	var BindingSample = function() {
		var self = this;

		self.springCourse = { knots: true, woodworking: true, metalworking: true };
		self.summerCourse = { rafting: true, diving: true, tracking: false };
	};
	
	$(document).ready(function() {
		ko.applyBindings(new BindingSample());
	});

})(window.app = window.app || {}, jQuery, ko);