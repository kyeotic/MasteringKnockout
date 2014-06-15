(function(app, $, ko) {

	ko.bindingHandlers.datepicker = {
	    init: function(element, valueAccessor, allBindingsAccessor) {
	        //initialize datepicker with some optional options
	        var options = allBindingsAccessor().datepickerOptions || {},
	            $el = $(element);

	        $el.datepicker(options);

	        //handle the field changing
	        ko.utils.registerEventHandler(element, "change", function () {
	            var observable = valueAccessor();
	            observable($el.datepicker("getDate"));
	        });

	        //handle disposal (if KO removes by the template binding)
	        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
	            $el.datepicker("destroy");
	        });

	    },
	    update: function(element, valueAccessor) {
	        var value = ko.utils.unwrapObservable(valueAccessor()),
	            $el = $(element),
	            current = $el.datepicker("getDate");

	        if (value - current !== 0) {
	            $el.datepicker("setDate", value);
	        }
	    }
	};


	var BindingSample = function() {
		var self = this;

		self.currentDate = ko.observable(new Date());
	};
	
	$(document).ready(function() {
		ko.applyBindings(new BindingSample());
	});

})(window.app = window.app || {}, jQuery, ko);