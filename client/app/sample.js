(function(app, $, ko) {

	var Viewmodel = function() {
		var self = this;
		self.tooltipText = ko.observable('Tooltip Text');
		self.progressVal = ko.observable(20);

		self.progressWidth = ko.computed(function(){
	        return self.progressVal() + '%';
	    });
	}
	
	$(document).ready(function() {
		ko.applyBindings(new Viewmodel());
	});

})(window.app = window.app || {}, jQuery, ko);