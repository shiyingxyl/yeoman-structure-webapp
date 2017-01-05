class Router {
    constructor() {
        let self = this;
        $$(document).on('pageBeforeInit', function (e) {
            let page = e.detail.page;
            self.pageBeforeInit(page);
        });

        $$(document).on('pageAfterAnimation', function (e) {
            let page = e.detail.page;
            self.pageAfterAnimation(page);
        });

        $$(document).on('pageBeforeAnimation', function (e) {
            let page = e.detail.page;
            self.pageBeforeAnimation(page);
        });

        $('#view-1').on('show', function (evt) {

        });
        $('#view-2').on('show', function (evt) {

        });
        $('#view-3').on('show', function (evt) {

        });
        $('#view-4').on('show', function (evt) {

        });

        $$('.panel-left').on('panel:opened', function () {
            // app.alert('Left panel opened!');
        });
        $$('.panel-left').on('panel:close', function () {
            // app.alert('Left panel is closing!');
        });
        $$('.panel-right').on('panel:open', function () {
            // app.alert('Right panel is opening!');
        });
        $$('.panel-right').on('panel:closed', function () {
            // app.alert('Right panel closed!');
        });


    }

    pageBeforeAnimation(page) {
        let name = page.name;
        let from = page.from;
    }

    pageAfterAnimation(page){
        let name = page.name;
        let from = page.from;
    }

    pageBeforeInit(page) {
        let name = page.name;
        let query = page.query;
        switch (name) {
            case 'page-1':
                break;
            case 'page-2':
                break;
            case 'page-3':
                break;
            case 'page-4':
                break;
            case 'page-5':
                let view5Controller;
                require.ensure([], () => {
                    if(!!!view5Controller) {
                        let View5Controller = require('modules/view5_module/View5Controller');
                        view5Controller = new View5Controller(page);
                    }
                    view5Controller.render();
                }, 'page5');
                break;
            case 'page-6':
                break;
            default:
        }

    }

    init() {

    }
}

export default Router;
