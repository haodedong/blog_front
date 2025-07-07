const blogRoutes = {
  path: '/blog',
  component: () => import('@/views/blog/BlogLayout'), // 使用独立布局
  redirect: '/blog/home',
  name: 'Blog',
  meta: {
    title: '博客',
    noAuth: true
  },
  children: [
    {
      path: 'home',
      name: 'BlogHome',
      component: () => import('@/views/blog/Home'),
      meta: {
        title: '博客首页',
        noAuth: true
      }
    },
    {
      path: 'article/:id',
      name: 'ArticleDetail',
      component: () => import('@/views/blog/ArticleDetail'),
      meta: {
        title: '文章详情',
        noAuth: true
      },
      hidden: true
    }
  ]
}

export default blogRoutes
