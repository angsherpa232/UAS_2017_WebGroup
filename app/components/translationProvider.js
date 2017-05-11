angular.module('translations', [])
        .constant('LOCALES', {
            'locales': {
                'de_DE': 'Deutsch',
                'en_EN': 'English'
            },
            'preferredLocale': 'en_EN'
        })
        .config(['$translateProvider', function ($translateProvider) {
                console.log('translation configuration is set up.');
                $translateProvider.translations('de', {
                    // defaults:
                    'WEBSITE_TITLE'     :   'UAS WebApp',
                    
                    // TOOLBAR:
                    'CHANGE_LANGUAGE'   :   'Sprache wechseln'
                });
                $translateProvider.translations('en', {
                    // defaults:
                    'WEBSITE_TITLE'     :   'UAS WebApp',
                    
                    // TOOLBAR:
                    'CHANGE_LANGUAGE'   :   'change language'
                }
                );
                $translateProvider.preferredLanguage('en');
            }
        ]);