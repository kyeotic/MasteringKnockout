(function(app, $, ko) {

	var protoVm = {
		name: ko.observable('New User')
	};

	var base1 = Object.create(protoVm);
	var base2 = Object.create(protoVm);

	base2.name("Base2");

	$(document).ready(function() {
		ko.applyBindings({
			base1: base1,
			base2: base2
		});
	});

})(window.app = window.app || {}, jQuery, ko);