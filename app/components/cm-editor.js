/* global CodeMirror */
import Component from 'ember-component';
import injectService from 'ember-service/inject';
import {reads} from 'ember-computed';
import run, {scheduleOnce} from 'ember-runloop';

export default Component.extend({
    lazyLoader: injectService(),

    _value: reads('content'),
    _editor: null,

    // options for the editor
    lineNumbers: true,
    indentUnit: 4,
    mode: 'htmlmixed',
    theme: 'xq-light',

    didInsertElement() {
        this._super(...arguments);

        this.get('lazyLoader').loadStyle('codemirror', '/assets/codemirror.css');

        this.get('lazyLoader').loadScript('codemirror', '/assets/codemirror.js').then(() => {
            scheduleOnce('afterRender', this, function () {
                this._initCodeMirror();
            });
        });
    },

    _initCodeMirror() {
        let options = this.getProperties('lineNumbers', 'indentUnit', 'mode', 'theme');
        let editor = new CodeMirror(this.element, options);

        editor.getDoc().setValue(this.get('_value'));

        editor.on('change', () => {
            run(this, function () {
                this.sendAction('update', editor.getDoc().getValue());
            });
        });
    }
});
