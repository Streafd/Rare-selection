//对外暴露配置路由
export const constantRoute = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录', hidden: true, icon: 'Plus' }
  },
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('@/layout/index.vue'),
    meta: { title: 'layout', hidden: false, icon: 'Minus' },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页', hidden: false, icon: 'House' }
      }
    ]
  },
  {
    path: '/screen',
    name: 'Screen',
    component: () => import('@/views/screen/index.vue'),
    meta: { title: '数据大屏', hidden: false, icon: 'Monitor' }
  },
  {
    path: '/acl',
    name: 'Acl',
    component: () => import('@/layout/index.vue'),
    meta: { title: '权限管理', hidden: false, icon: 'Lock' },
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        name: 'Acl',
        component: () => import('@/views/acl/user/index.vue'),
        meta: { title: '用户管理', hidden: false, icon: 'User' }
      },
      {
        path: '/acl/role',
        name: 'Role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: { title: '角色管理', hidden: false, icon: 'UserFilled' }
      },
      {
        path: '/acl/permission',
        name: 'Permission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: { title: '菜单管理', hidden: false, icon: 'Open' }
      }
    ]
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('@/layout/index.vue'),
    meta: { title: '商品管理', hidden: false, icon: 'Goods' },
    redirect: '/product/trademark',
    children: [
      {
        path: '/product/trademark',
        name: 'Trademark',
        component: () => import('@/views/Product/trademark/index.vue'),
        meta: { title: '品牌管理', hidden: false, icon: 'ShoppingCart' }
      },
      {
        path: '/product/attr',
        name: 'Attr',
        component: () => import('@/views/Product/attr/index.vue'),
        meta: { title: '属性管理', hidden: false, icon: 'Document' }
      },
      {
        path: '/product/sku',
        name: 'Sku',
        component: () => import('@/views/Product/sku/index.vue'),
        meta: { title: 'SKU管理', hidden: false, icon: 'Tickets' }
      },
      {
        path: '/product/spu',
        name: 'Spu',
        component: () => import('@/views/Product/spu/index.vue'),
        meta: { title: 'SPU管理', hidden: false, icon: 'Memo' }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: { title: '404', hidden: true, icon: 'House' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: { title: 'any', hidden: true, icon: 'Link' }
  }
]
