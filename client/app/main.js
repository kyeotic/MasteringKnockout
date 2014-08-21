require.config({
    paths: {
        'text': '/lib/require/text',
        'durandal':'/lib/durandal/js',
        'plugins' : '/lib/durandal/js/plugins',
        'transitions' : '/lib/durandal/js/transitions',
        'knockout': '/lib/knockout-3.2.debug',
        'bootstrap': '/lib/bootstrap-3.1.1',
        'jquery': '/lib/jquery-2.1.1.min'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: '$.fn.popover'
        }
    },
    waitSeconds: 30
});

define(['durandal/system', 'durandal/app', 'common/extensions', 'services/mock', 'bootstrap'],
function(system, app, extensions, dataService) {

    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");  

    //specify which plugins to install and their configuration
    app.configurePlugins({
        //Durandal plugins
        router:true,
        dialog: true,
        widget: {
            kinds: ['contactList']
        }
    });

    extensions.install();

    app.title = 'Mastering Knockout';
    app.start().then(function () {
        app.setRoot(dataService.isLoggedIn() ? 'shell/shell' : 'login/page');
    });
});