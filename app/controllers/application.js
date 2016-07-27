import Controller from 'ember-controller';
import on from 'ember-evented/on';
import SlideShowController from "ember-slide-show/mixins/slide-show-controller";
import {EKMixin, keyPress} from 'ember-keyboard';

export default Controller.extend(SlideShowController, EKMixin, {
    init() {
        this._super(...arguments);

        this.set('keyboardActivated', true);
    },

    previousSlide: on(keyPress('ArrowLeft'), function () {
        this.decrementProperty('slideIndex');
    }),

    nextSlide: on(keyPress('ArrowRight'), function () {
        this.incrementProperty('slideIndex');
    })
});
