(function(app, $, ko) {

	ko.bindingHandlers.starRating = {
	    init: function(element, valueAccessor) {
	        $(element).addClass("starRating");
	        for (var i = 0; i < 5; i++)
	           $("<span>").appendTo(element);
	       
	        // Handle mouse events on the stars
	        $("span", element).each(function(index) {
	            $(this).hover(
	                function() { 
	                	$(this).prevAll().add(this)
	                		.addClass("hoverChosen");
	                }, 
	                function() { 
	                	$(this).prevAll().add(this)
	                		.removeClass("hoverChosen");
	                }                
	            ).click(function() { 
	                var observable = valueAccessor();
	                observable(index+1); 
	            });
	        });            
	    },
	    update: function(element, valueAccessor) {
	        // Give the first x stars the "chosen" class
	        // where x <= rating
	        var observable = valueAccessor();
	        $("span", element).each(function(index) {
	            $(this).toggleClass("chosen", index < observable());
	        });
	    }    
	};


	var BindingSample = function(init) {
		var self = this,
			data = init && init instanceof Array ? init : [];

		self.movies = ko.observableArray(data.map(function(movie) {
			return {
				name: movie.name,
				rating: ko.observable(movie.rating)
			}
		}))
	};
	
	$(document).ready(function() {
		ko.applyBindings(new BindingSample([
			{ name: 'The Matrix', rating: 4 },
			{ name: 'The Incredibles', rating: 5},
			{ name: 'Divergent', rating: 2 },
			{ name: 'Vampire Academy', rating: 1}
		]));
	});

})(window.app = window.app || {}, jQuery, ko);