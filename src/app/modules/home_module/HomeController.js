import HomeService from "./HomeService";
import jade from './home.jade';
class HomeController {
    constructor() {
        this.homeService = new HomeService();
    }

    render() {
        let content = this.homeService.getData();
        let tpl = jade(content);
        $('#myContainer').html(tpl);
    }
}


module.exports = HomeController;
