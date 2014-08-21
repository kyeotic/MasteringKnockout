define(['durandal/system', 'jquery', 'jquery-ui'], function(system, $) {

	var outDuration = 400,
		outDirection = 'down'
		inDuration = 400,
		inDirection = 'up',
		easing = 'swing';

	return function slideAnimation(settings) {

		var currentView = settings.activeView,
			newView = settings.child;

		return system.defer(function(defer) {

			function endTransition() {
	            defer.resolve();
	        }

	        function slideIn() {
	        	$(newView).show('slide', { direction: inDirection, easing: easing }, inDuration, endTransition);
	        }

	        if (currentView)
				$(currentView).hide('slide', { direction: outDirection, easing: easing }, outDuration, newView ? slideIn : endTransition);
			else {
				$(newView).show();
				endTransition();
			}

		}).promise();
	};
});