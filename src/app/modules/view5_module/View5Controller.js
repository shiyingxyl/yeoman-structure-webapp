import View5Service from "./View5Service";
class View1Controller {
    constructor(page) {
        this.view5Service = new View5Service();
        this.$pageNavbar = $(page.navbarInnerContainer);
        this.$pageContainer = $(page.container);
        this.query = page.query;
        this.$title = this.$pageNavbar.find('.js-title');
        this.$content = this.$pageContainer.find('.js-content');
    }

    render() {
        let content = this.view5Service.getData();
        this.$title.html(content.title);
        this.$content.html(content.content);
    }
}

module.exports = View1Controller;
