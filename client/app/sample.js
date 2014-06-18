(function(app, $, ko) {

	ko.bindingHandlers.labelInput = {
	    init: function(element, valueAccessor) {
	        var input = document.createElement('input'),
	        	label = document.createElement('label'),
	        	labelText = valueAccessor().label,
	        	inputValue = valueAccessor().value;

	        label.innerHTML = labelText;
	        label.appendChild(input);

			element.appendChild(label);

			ko.applyBindingsToNode(input, {
				value: inputValue,
				valueUpdate: 'afterkeydown'
			});
	    }
	};


	var BindingSample = function() {
		var self = this;

		self.name = ko.observable('Timothy');
	};
	
	$(document).ready(function() {
		ko.applyBindings(new BindingSample());
	});

})(window.app = window.app || {}, jQuery, ko);