(function(app, $, ko) {

	ko.extenders.recordChanges = function(target, options) {
	  var ignore = options.ignore instanceof Array ? options.ignore : [];
	  //Make sure this value is available
	  var result = ko.computed({
	    read: target,
	    write: function(newValue) {
	      if (ignore.indexOf(newValue) === -1) {
	        result.previousValues.push(target());
	        target(newValue);
	      } else {
	      	target.notifySubscribers(target());
	      }
	    }
	  }).extend({ notify: 'always'});

	  result.previousValues = ko.observableArray();

	  //Return the computed observable
	  return result;
	};

	var BindingSample = function() {
		var self = this;

		self.amount = ko.observable(10).extend({ recordChanges: {ignore: ['0', null, ''] } });
	};
	
	$(document).ready(function() {
		ko.applyBindings(new BindingSample());
	});

})(window.app = window.app || {}, jQuery, ko);