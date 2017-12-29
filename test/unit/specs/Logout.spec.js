import Vue from 'vue';
import App from '@/App';

describe('App.vue', () => {
    it('logout correctly', () => {
        const Consructor = Vue.extend(App);
        const AppComponent = new Consructor().$mount();
        const button = AppComponent.$el.querySelector('a.button.is-outlined')[0];
        const clickEvent = new window.Event('click');
        button.dispatchEvent(clickEvent);
        AppComponent._watcher.run();
        expect(AppComponent.isLoggedIn).to.equal(false);
    })
})