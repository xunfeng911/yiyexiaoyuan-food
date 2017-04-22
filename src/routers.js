import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routers = [{
  path: '/',
  name: 'index',
  component (resolve) {
    require.ensure(['./App.vue'], () => {
      resolve(require('./App.vue'))
    })
  },
  children: [
    // 主页
    {
      path: '/homepage',
      name: 'homepage',
      component (reslove) {
        require.ensure(['./components/homepage/homepage.vue'], () => {
          reslove(require('./components/homepage/homepage.vue'))
        })
      }
    },
    // 登陆
    {
      path: '/login',
      name: 'login',
      component (reslove) {
        require.ensure(['./components/login/login.vue'], () => {
          reslove(require('./components/login/login.vue'))
        })
      }
    },
    // 注册
    {
      path: '/register',
      name: 'register',
      component (reslove) {
        require.ensure(['./components/register/register.vue'], () => {
          reslove(require('./components/register/register.vue'))
        })
      }
    },
    // set password
    {
      path: '/setpass',
      name: 'setpass',
      component (reslove) {
        require.ensure(['./components/register/setpass.vue'], () => {
          reslove(require('./components/register/setpass.vue'))
        })
      }
    },
    // 修改个人信息
    // 个人中心
    {
      path: '/usrcenter',
      name: 'usrcenter',
      component (reslove) {
        require.ensure(['./components/usrcenter/usrcenter.vue'], () => {
          reslove(require('./components/usrcenter/usrcenter.vue'))
        })
      }
    },
    // 我的消息
    {
      path: '/message',
      name: 'message',
      component (reslove) {
        require.ensure(['./components/usrcenter/message.vue'], () => {
          reslove(require('./components/usrcenter/message.vue'))
        })
      }
    },
    // 我的朋友圈
    {
      path: '/mycomment',
      name: 'mycomment',
      component (reslove) {
        require.ensure(['./components/usrcenter/mycomment.vue'], () => {
          reslove(require('./components/usrcenter/mycomment.vue'))
        })
      }
    },
    // 用户信息修改
    {
      path: '/inforch',
      name: 'inforch',
      component (reslove) {
        require.ensure(['./components/usrcenter/inforchange.vue'], () => {
          reslove(require('./components/usrcenter/inforchange.vue'))
        })
      }
    },
    // changeName
    {
      path: '/changename',
      name: 'changename',
      component (reslove) {
        require.ensure(['./components/usrcenter/change_name.vue'], () => {
          reslove(require('./components/usrcenter/change_name.vue'))
        })
      }
    },
    // changeqq
    {
      path: '/changeqq',
      name: 'changeqq',
      component (reslove) {
        require.ensure(['./components/usrcenter/change_qq.vue'], () => {
          reslove(require('./components/usrcenter/change_qq.vue'))
        })
      }
    },
    // 重置密码
    {
      path: '/respass',
      name: 'respass',
      component (reslove) {
        require.ensure(['./components/usrcenter/resetpass.vue'], () => {
          reslove(require('./components/usrcenter/resetpass.vue'))
        })
      }
    },
    // 商家发布白食
    {
      path: '/pushbaichi',
      name: 'pushbaichi',
      component (reslove) {
        require.ensure(['./components/usrcenter/pushbaichi.vue'], () => {
          reslove(require('./components/usrcenter/pushbaichi.vue'))
        })
      }
    },
    // 商家发布优惠
    {
      path: '/pushyouhui',
      name: 'pushyouhui',
      component (reslove) {
        require.ensure(['./components/usrcenter/pushyouhui.vue'], () => {
          reslove(require('./components/usrcenter/pushyouhui.vue'))
        })
      }
    },
    // 商家相册
    {
      path: '/shopphoto',
      name: 'shopphoto',
      component (reslove) {
        require.ensure(['./components/usrcenter/shopphoto.vue'], () => {
          reslove(require('./components/usrcenter/shopphoto.vue'))
        })
      }
    },
    // 商家详情介绍
    {
      path: '/shopjieshao',
      name: 'shopjieshao',
      component (reslove) {
        require.ensure(['./components/shopjieshao/shopjieshao.vue'], () => {
          reslove(require('./components/shopjieshao/shopjieshao.vue'))
        })
      }
    },
    // 活动详情
    {
      path: '/hdxq',
      name: 'hdxq',
      component (reslove) {
        require.ensure(['./components/shopjieshao/huodongxiangqing.vue'], () => {
          reslove(require('./components/shopjieshao/huodongxiangqing.vue'))
        })
      }
    },
    // 白吃详情
    {
      path: '/bcxq',
      name: 'bcxq',
      component (reslove) {
        require.ensure(['./components/shopjieshao/baichixiangqing.vue'], () => {
          reslove(require('./components/shopjieshao/baichixiangqing.vue'))
        })
      }
    },
    // 商家发布动态
    {
      path: '/hdrpublish',
      name: 'hdrpublish',
      component (reslove) {
        require.ensure(['./components/publish/hdr_publish.vue'], () => {
          reslove(require('./components/publish/hdr_publish.vue'))
        })
      }
    },
    // 用户发布动态
    {
      path: '/stpublish',
      name: 'stpublish',
      component (reslove) {
        require.ensure(['./components/publish/st_publish.vue'], () => {
          reslove(require('./components/publish/st_publish.vue'))
        })
      }
    },
    // 替我选择
    {
      path: '/replaceme',
      name: 'replaceme',
      component (reslove) {
        require.ensure(['./components/replaceme/replaceme.vue'], () => {
          reslove(require('./components/replaceme/replaceme.vue'))
        })
      }
    },
    // 所有商家列表
    {
      path: '/foodcourt',
      name: 'foodcourt',
      component (reslove) {
        require.ensure(['./components/foodcourt/foodcourt.vue'], () => {
          reslove(require('./components/foodcourt/foodcourt.vue'))
        })
      }
    },
    // 免费白食
    {
      path: '/freemeal',
      name: 'freemeal',
      component (reslove) {
        require.ensure(['./components/freemeal/freemeal.vue'], () => {
          reslove(require('./components/freemeal/freemeal.vue'))
        })
      }
    }
  ]
}]

export default routers
