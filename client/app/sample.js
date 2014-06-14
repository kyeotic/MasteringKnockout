(function(app, $, ko) {

	ko.bindingHandlers.slideVisible = {
	    init: function(element, valueAccessor) {
	        var value = ko.unwrap(valueAccessor());
	        $(element).toggle(value);
	    },
	    update: function(element, valueAccessor, allBindings) {
	        var value = ko.unwrap(valueAccessor());
	        var duration = allBindings.get('slideDuration') || 400;

	        if (value == true)
	            $(element).slideDown(duration);
	        else
	            $(element).slideUp(duration);
	    }
	};


	var BindingSample = function() {
		var self = this;

		self.isShowing = ko.observable(true);
		self.toggleShowing = function() {
			self.isShowing(!self.isShowing());
		}
	};
	
	$(document).ready(function() {
		ko.applyBindings(new BindingSample());
	});

})(window.app = window.app || {}, jQuery, ko);