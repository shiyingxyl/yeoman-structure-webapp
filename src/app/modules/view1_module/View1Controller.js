import View1Service from "./View1Service";
class View1Controller {
    constructor() {
        this.homeService = new View1Service();
    }

    render() {
        let content = this.homeService.getData();
    }
}

export default View1Controller;
