/**
 * Created by knowthis on 16/4/11.
 */
'use strict';

define([], function (argument) {
    var urlObj = {
        dev: {
            api: '',
            loginUrl:''
        },
        test: {
            api: '',
            loginUrl:''
        },
        release: {
            api: '',
            loginUrl:''
        }
    };
    var environment = 'dev';
    return urlObj[environment];
});