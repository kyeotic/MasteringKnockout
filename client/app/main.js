require.config({
    paths: {
        'text': '/lib/require-text-2.0.12',
        'knockout': '/lib/knockout-3.2.0',
        'bootstrap': '/lib/bootstrap-3.1.1',
        'jquery': '/lib/jquery-2.1.1.min',
        'sammy': '/lib/sammy-0.7.4'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: '$.fn.popover'
        }
    }
});

define(['jquery', 'knockout', 'sammy', 'bootstrap'], function($, ko, Sammy) {

    ko.components.register('contact-list', { require: 'contacts/list' });
    ko.components.register('contact-edit', { require: 'contacts/edit' });
    ko.components.register('settings-page', { require: 'settings/page' });

    var app = {
        page: ko.observable('home-page'),
        data: ko.observable(),
        setRoute: function(name, data) {
            this.data(data);
            this.page(name);
        }
    };

    var sammyConfig = Sammy('#appHost', function() {
        var self = this,
            routes = [
                          { route:'#/',               component: 'contact-list'   }
                        , { route:'/',                component: 'contact-list'   }
                        , { route:'#/contacts/new',   component: 'contact-edit'   }
                        , { route:'#/contacts/:id',   component: 'contact-edit'   }
                        , { route:'#/settings',       component: 'settings-page'  }
                    ];
            
        routes.forEach(function(config) {
            self.get(config.route, function() {
                var params = {};                
                ko.utils.objectForEach(this.params, function(name, value) {
                    params[name] = value;
                });
                app.setRoute(config.component, params);
            });
        });
    }).run();

    $(document).ready(function() {
        sammyConfig.run('#/');
        ko.applyBindings(app);
    });
});