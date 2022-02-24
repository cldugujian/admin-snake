import Vue from 'vue'
import App from './App'
import router from './router'

/* 以下是注册自定义全局组件 */

/* 以下是Mint-UI */
import MintUi from 'mint-ui';
Vue.use(MintUi);
import 'mint-ui/lib/style.css';

/* 以下是zepto */
import $ from 'zepto';

/* 去除警告信息 */
Vue.config.productionTip = false;

/* 以下是页面中的css */
import main from './assets/styles/main.css'
Vue.use(main);

/* 以下是自定义js */
import user from './assets/scripts/user'
Vue.use(user);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
