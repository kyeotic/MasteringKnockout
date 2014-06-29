(function(app, $, ko) {

	ko.bindingHandlers.tooltip = {
	    getNamespacedHandler: function(binding) {
	        return {	        	
	            update: function(element, valueAccessor) {
	            	//Cleanup previous tooltips
	            	if (element.attributes && element.attributes['data-original-title'])
	            		$(element).tooltip('destroy');
	                $(element).tooltip({ placement: binding, title: ko.unwrap(valueAccessor()) });
	            }
	        };
	    }
	};

	var BindingSample = function() {
		var self = this;

		self.leftTitle = ko.observable('I\'m on the left');
		self.rightTitle = ko.observable('I\'m on the right');
		self.topTitle = ko.observable('I\'m on the top');
		self.bottomTitle = ko.observable('I\'m on the bottom');
	};
	
	$(document).ready(function() {
		ko.punches.enableAll();
		ko.applyBindings(new BindingSample());
	});

})(window.app = window.app || {}, jQuery, ko);