import $ from 'jquery';
import Ember from 'ember';
import RSVP from 'rsvp';
import Service from 'ember-service';
import injectService from 'ember-service/inject';

const {testing} = Ember;

export default Service.extend({
    ajax: injectService(),

    // This is needed so we can disable it in unit tests
    testing,

    scripts: {},

    loadScript(key, url) {
        if (this.get('testing')) {
            return RSVP.resolve();
        }

        if (this.get(`scripts.${key}`)) {
            // Script is already loaded/in the process of being loaded,
            // so return that promise
            return this.get(`scripts.${key}`);
        }

        let ajax = this.get('ajax');

        let scriptPromise = ajax.request(url, {
            dataType: 'script',
            cache: true
        });

        this.set(`scripts.${key}`, scriptPromise);

        return scriptPromise;
    },

    loadStyle(key, url) {
        if (this.get('testing')) {
            return RSVP.resolve();
        }

        if (!$(`#${key}-styles`).length) {
            let $style = $(`<link rel="stylesheet" id="${key}-styles" />`);
            $style.attr('href', url);
            $('head').append($style);
        }
    }
});
