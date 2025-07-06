import request from '@/utils/request'

// 获取文章列表
export function getArticles(params) {
  return request({
    url: '/api/blog/articles',
    method: 'get',
    params
  })
}

// 获取文章详情
export function getArticleDetail(id) {
  return request({
    url: `/api/blog/articles/${id}`,
    method: 'get'
  })
}

// 获取分类列表
export function getCategories() {
  return request({
    url: '/api/blog/categories',
    method: 'get'
  })
}

// 获取标签列表
export function getTags() {
  return request({
    url: '/api/blog/tags',
    method: 'get'
  })
}

// 获取作者信息
export function getAuthorInfo() {
  return request({
    url: '/api/blog/author',
    method: 'get'
  })
}

// 根据分类获取文章
export function getArticlesByCategory(category, params) {
  return request({
    url: `/api/blog/articles/category/${category}`,
    method: 'get',
    params
  })
}

// 根据标签获取文章
export function getArticlesByTag(tag, params) {
  return request({
    url: `/api/blog/articles/tag/${tag}`,
    method: 'get',
    params
  })
}

// 搜索文章
export function searchArticles(keyword, params) {
  return request({
    url: '/api/blog/articles/search',
    method: 'get',
    params: {
      keyword,
      ...params
    }
  })
}
