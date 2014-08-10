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

    ko.components.register('contact-list', { require: 'contact-list' });

    $(document).ready(function() {
        ko.applyBindings(new ContactsPageViewmodel());
    });
});