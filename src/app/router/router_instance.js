import Router from "./Router.js";

const router = {
    init() {
        $('#myTab a').click(function () {
          $(this).tab('show');
        });


        let router = new Router();
        router.route('/', function() {
            router.navigate("/home", "home");
            console.log("这是主页");
        });
        let homeController;
        router.route('/home', function() {
            $('a[href="#home"]').tab('show');
            require.ensure(['modules/home_module/HomeController'], (require) => {
                if(!!!homeController) {
                    let HomeController = require('modules/home_module/HomeController');
                    homeController = new HomeController();
                }
                homeController.render();
            }, 'home');
            console.log("这是主页");
        });
        let loginController;
        router.route('/login', function() {
            $('a[href="#login"]').tab('show');
            require.ensure([], (require) => {
                if(!!!loginController) {
                    let LoginController = require('modules/login_module/LoginController');
                    loginController = new LoginController();
                }
                loginController.render();
            }, 'login');
            console.log("这是登录页");
        });
        let aboutController;
        router.route('/about', function() {
            $('a[href="#about"]').tab('show');
           require.ensure([], (require) => {
               if(!!!aboutController) {
                   let AboutController = require('modules/about_module/AboutController');
                   aboutController = new AboutController();
               }
                aboutController.render();
            }, 'about');
            console.log("这是关于页");
        });
        router.init();

    }
};

export default router;
