const blogRoutes = {
  path: '/blog',
  component: () => import('@/views/blog/Home'),
  name: 'Blog',
  meta: {
    title: '博客',
    icon: 'documentation',
    noAuth: true
  }
}

export default blogRoutes
