angular.module('translations', [])
    .constant('LOCALES', {
        'locales': {
            'de_DE' : 'Deutsch'
        },
        'preferredLocale': 'de_DE'
    })
    .config(['$translateProvider', function($translateProvider){
        console.log('translation configuration is set up.');
        $translateProvider.translations('de', {
            // defaults:
            'WEBSITE_TITLE'         : 'adBoxx'
        });
        $translateProvider.preferredLanguage('de');
    }
]);