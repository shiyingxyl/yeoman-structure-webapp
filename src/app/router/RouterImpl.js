export default  class RouterImpl {
    constructor(options) {
        this.root  = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';
        this.routes = [];
        this.mode = options && options.mode && options.mode == "history"
                    && !!(history.pushState) ? 'history' : 'hash';
    }

    clearSlashes(path) {
        return path.toString().replace(/\/$/, "").replace(/^\//, '');
    }

    getFragment() {
        let fragment = '';
        if(this.mode == 'history') {
            fragment = this.clearSlashes( decodeURI(location.pathname + location.search) );
            fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
        } else {
            var match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1]: '';
        }

        return fragment;
    }

    add(re, handler) {
        if(typeof  re == 'function') {
            handler = re;
            re = "";
        }
        this.routes.push({
            re: re,
            handler: handler
        });

        return this;
    }

    remove(param) {
        for(let i=0, r; i<this.routes.length, r=this.routes[i]; i++) {
            if(r.handler===param || r.re.toString()===param.toString() ) {
                this.routes.splice(i, 1);
                return this;
            }
        }
        return this;
    }

    flush() {
        this.routes = [];
        this.mode = null;
        this.root = '/';
        return this;
    }

    check(f) {
        let fragment = f || this.getFragment();
        for(let i=0; i<this.routes.length; i++) {
            let match = fragment.match( this.routes[i].re );
            if(match) {
                match.shift();
                this.routes[i].handler.apply({}, match);
                return this;
            }
        }

        return this;
    }

    listen() {
        let self = this;
        let current = this.getFragment();
        let fn = () => {
            if(current != self.getFragment() ) {
                current = self.getFragment();
                self.check(current);
            }
        };

        clearInterval(this.interval);
        this.interval = setInterval(fn, 50);

        return this;
    }

    navigate(path) {
        path = path ? path : '';
        if(this.mode == 'history') {
            history.pushState(null, null, this.root + this.clearSlashes(path) );
        } else {
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        }

        return this;
    }

    handle() {

    }
}
