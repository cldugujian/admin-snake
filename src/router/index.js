import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import LandingPage from '@/components/Views/Tabs/LandingPage'

Vue.use(Router);

export default new Router({
    linkActiveClass: 'active',
    routes: [

        /* 重定向 begin */
        {path: '/', redirect:{name:'Home'} },
        /* 重定向 end */

        /* 主页 begin */
        {path: '/', name: 'Home', component: Home},
        /* 主页 end */

        /* 首页 begin */
        { path: '/LandingPage', name: 'LandingPage', component: LandingPage },
        /* 首页 end */
	    
    ]
});
