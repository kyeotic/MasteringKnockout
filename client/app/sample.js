(function(app, $, ko) {

	ko.extenders.recordChanges = function(target, options) {
		target.previousValues = ko.observableArray();
		target.subscribe(function(oldValue) {
			target.previousValues.push(oldValue);
		}, null, 'beforeChange');
		return target;
	};


	var BindingSample = function() {
		var self = this;

		self.amount = ko.observable(10).extend({ recordChanges: true})
	};
	
	$(document).ready(function() {
		ko.applyBindings(new BindingSample());
	});

})(window.app = window.app || {}, jQuery, ko);