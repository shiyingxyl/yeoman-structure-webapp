import Router from './Router';
import RouterImpl from "./RouterImpl.js";
describe("router instance", () => {
    let routerImpl  = new RouterImpl({
        mode: 'history'
    });

    it("should can match href", () => {
        // adding routes
        routerImpl
            .add(/home/, function() {
                $('a[href="#home"]').tab('show');
                require.ensure([], () => {
                    let HomeController = require('modules/home_module/HomeController');
                    let homeController = new HomeController();
                    homeController.render();
                }, 'home');
                console.log("这是主页");
            })
            .add(/login/, function () {
                $('a[href="#login"]').tab('show');
                require.ensure([], () => {
                    let LoginController = require('modules/login_module/LoginController');
                    let loginController = new LoginController();
                    loginController.render();
                }, 'login');
                console.log("这是登录页");
            })
            .add(/about/, function () {
                $('a[href="#about"]').tab('show');
                require.ensure([], () => {
                    let AboutController = require('modules/about_module/AboutController');
                    let aboutController = new AboutController();
                    aboutController.render();
                }, 'about');
                console.log("这是关于页");
            })
            .add(/products\/(.*)\/edit\/(.*)/, function() {
                expect(Array.prototype.slice.call(arguments) ).toEqual(['12', '22']);
            })
            .add(function() {
                console.log('default');
            })
            .check('/products/12/edit/22');
    });



});

