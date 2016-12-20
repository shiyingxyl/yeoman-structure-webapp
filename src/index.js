//webpack-hot－middleware
//自动刷新hack
if (module.hot) {
  module.hot.accept();
}

if(process.env.NODE_ENV == "dev") {
    console.log("当前环境为" + process.env.NODE_ENV);
}

// console.log(__DEVAPI__);

import 'babel-polyfill';
import Main from './app/main';

const main = new Main();
main.init();
