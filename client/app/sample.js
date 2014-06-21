(function(app, $, ko) {

	var listTemplate = '<ul class="list-unstyled" data-bind="foreach: items"><li data-bind="text: $data"></li></ul>';

	ko.bindingHandlers.list = {
	    init: function(element, valueAccessor) {
	        
	        element.innerHTML = listTemplate;

        	ko.applyBindingsToDescendants({ items: valueAccessor()}, element);

	        // Also tell KO *not* to bind the descendants itself, otherwise they will be bound twice
        	return { controlsDescendantBindings: true };
	    }
	};


	var BindingSample = function() {
		var self = this;

		self.inputs = ko.observableArray(['One', 'Two', 'Three']);
		self.entry = ko.observable('');
		self.addEntry = function() {
			self.inputs.push(self.entry());
			self.entry('');
		};
	};
	
	$(document).ready(function() {
		ko.applyBindings(new BindingSample());
	});

})(window.app = window.app || {}, jQuery, ko);