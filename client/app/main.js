require.config({
    paths: {
        'text': '/lib/require-text-2.0.12',
        'knockout': '/lib/knockout-3.2.0',
        'bootstrap': '/lib/bootstrap-3.1.1',
        'jquery': '/lib/jquery-2.1.1.min'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: '$.fn.popover'
        }
    }
});

define(['jquery', 'knockout', 'contactsPage', 'bootstrap'], function($, ko, ContactsPageViewmodel) {

    ko.components.register('contact-list', {
    	template: { fromUrl: 'contact-list.html', maxCacheAge: 100 },
    	viewModel: { require: 'contact-list'  }
    });

    var templateFromUrlLoader = {
	    loadTemplate: function(name, templateConfig, callback) {
	        if (templateConfig.fromUrl) {
	            // Uses jQuery's ajax facility to load the markup from a file
	            var fullUrl = '/app/' + templateConfig.fromUrl + '?cacheAge=' + templateConfig.maxCacheAge;
	            $.get(fullUrl, function(markupString) {
	            	callback($.parseHTML(markupString));
	            });
	        } else {
	            // Unrecognized config format. Let another loader handle it.
	            callback(null);
	        }
	    }
	};
	 
	// Register it
	ko.components.loaders.unshift(templateFromUrlLoader);

    $(document).ready(function() {
        ko.applyBindings(new ContactsPageViewmodel());
    });
});