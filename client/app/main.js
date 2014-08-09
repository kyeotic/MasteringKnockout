require.config({
    paths: {
        'knockout': '/lib/knockout-3.2.0',
        'bootstrap': '/lib/bootstrap-3.1.1',
        'jquery': '/lib/jquery-2.1.1.min'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        }
    },
    waitSeconds: 30
});

define(['jquery', 'knockout', 'contactsPage', 'bootstrap'], function($, ko, ContactsPageViewmodel) {
    $(document).ready(function() {
        ko.applyBindings(new ContactsPageViewmodel());
    });
});