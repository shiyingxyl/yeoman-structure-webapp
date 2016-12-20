import './main.scss';
import 'f7/js/framework7';
import 'f7/css/framework7.ios.css';
import 'f7/css/framework7.ios.colors.css';
import 'modules/toolbar_module/toolbar.scss';

import Router from './router/Router.js';
export default class Main {
    constructor() {
        // Initialize your app
        window.app = new Framework7({
            // init: false,
            modalTitle: 'F7 App',
            modalButtonOk:'确定',
            modalButtonCancel:'取消',
            animateNavBackIcon: true,
            dynamicNavbar: true,
            pushState: false,
            // pushStateSeparator: "#/",
            popupCloseByOutside:false,
            // precompileTemplates: true,
            template7Pages: true,
            preroute:function(view, options){
                return true;

            }
        });

        // Export selectors engine
        window.$$ = Dom7;
    }

    init() {
        this.initApp();
        this.initRouter();
        this.render();
    }

    initRouter() {
        new Router();
    }

    initApp() {
        //Add view
        this.view1 = app.addView('#view-1', {
            dynamicNavbar: true
        });

        this.view2 = app.addView('#view-2', {
            dynamicNavbar: true
        });

        this.view3 = app.addView('#view-3', {
            dynamicNavbar: true
        });

        this.view4 = app.addView('#view-4', {
            dynamicNavbar: true
        });
    }

    render() {

    }

    toString() {

    }
}
