define(function() {
	return {
		navigate: function(path) {
			window.location.hash = '#' + path;
		}
	};
});