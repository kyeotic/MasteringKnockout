(function(app, $, ko) {

	var mockServerResponse = {
		name: 'Timothy Moran',
		age: 24
	};

	var mockServerJSON = JSON.stringify(mockServerResponse);

	var mappedViewmodel = ko.mapping.fromJS(mockServerResponse);
	var jsonMappedViewmodel = ko.mapping.fromJSON(mockServerJSON);
	
	$(document).ready(function() {
		ko.applyBindings({
			vm: mappedViewmodel,
			jsonVm: jsonMappedViewmodel
		});
	});

})(window.app = window.app || {}, jQuery, ko);