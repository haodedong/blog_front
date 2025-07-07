<template>
  <div class="article-detail-container">
    <!-- 顶部导航栏 -->
    <header class="blog-header">
      <div class="header-container">
        <div class="logo">
          <router-link to="/blog">
            <h1>{{ language.title }}</h1>
          </router-link>
        </div>
        <nav class="main-nav">
          <ul>
            <li><router-link to="/blog">{{ language.nav.home }}</router-link></li>
            <li><router-link to="/blog/articles">{{ language.nav.articles }}</router-link></li>
            <li><router-link to="/blog/categories">{{ language.nav.categories }}</router-link></li>
            <li><router-link to="/blog/tags">{{ language.nav.tags }}</router-link></li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- 主要内容 -->
    <main class="article-main">
      <div class="content-wrapper">
        <!-- 加载状态 -->
        <div v-if="loading" class="loading">
          <div class="loading-spinner" />
          <p>{{ language.loading }}</p>
        </div>

        <!-- 文章内容 -->
        <article v-else-if="article" class="article-content">
          <!-- 文章头部 -->
          <header class="article-header">
            <div v-if="article.cover" class="article-cover">
              <img :src="article.cover" :alt="article.title">
            </div>
            <div class="article-meta-info">
              <h1 class="article-title">{{ article.title }}</h1>
              <div class="article-meta">
                <div class="meta-item">
                  <i class="icon-calendar" />
                  <span>{{ formatDate(article.createTime) }}</span>
                </div>
                <div v-if="article.category" class="meta-item">
                  <i class="icon-folder" />
                  <span class="category">{{ article.category }}</span>
                </div>
                <div v-if="article.author" class="meta-item">
                  <i class="icon-user" />
                  <span>{{ article.author }}</span>
                </div>
                <div v-if="article.readCount" class="meta-item">
                  <i class="icon-eye" />
                  <span>{{ article.readCount }} {{ language.meta.views }}</span>
                </div>
              </div>
              <div v-if="article.tags && article.tags.length" class="article-tags">
                <router-link
                  v-for="tag in article.tags"
                  :key="tag.id"
                  :to="`/blog/tag/${tag.id}`"
                  class="tag-item"
                >
                  {{ tag.name }}
                </router-link>
              </div>
            </div>
          </header>

          <!-- 文章正文 -->
          <div class="article-body">
            <div v-if="article.summary" class="article-summary">
              <p>{{ article.summary }}</p>
            </div>
            <div class="article-content-html" v-html="article.content" />
          </div>

          <!-- 文章底部 -->
          <footer class="article-footer">
            <div class="article-actions">
              <button class="action-btn like-btn" :class="{ active: isLiked }" @click="toggleLike">
                <i class="icon-heart" />
                <span>{{ article.likeCount || 0 }}</span>
              </button>
              <button class="action-btn comment-btn" @click="scrollToComments">
                <i class="icon-comment" />
                <span>{{ language.actions.comment }}</span>
              </button>
              <button class="action-btn share-btn" @click="shareArticle">
                <i class="icon-share" />
                <span>{{ language.actions.share }}</span>
              </button>
            </div>
          </footer>
        </article>

        <!-- 错误状态 -->
        <div v-else class="error-state">
          <h2>{{ language.error.notFound }}</h2>
          <p>{{ language.error.message }}</p>
          <router-link to="/blog" class="back-btn">{{ language.actions.backToHome }}</router-link>
        </div>
      </div>

      <!-- 相关文章 -->
      <section v-if="relatedArticles.length" class="related-articles">
        <div class="section-wrapper">
          <h3 class="section-title">{{ language.sections.relatedArticles }}</h3>
          <div class="related-list">
            <article v-for="related in relatedArticles" :key="related.id" class="related-item">
              <router-link :to="`/blog/article/${related.id}`" class="related-link">
                <div class="related-image">
                  <img :src="related.cover" :alt="related.title">
                </div>
                <div class="related-info">
                  <h4>{{ related.title }}</h4>
                  <p>{{ related.summary }}</p>
                  <span class="related-date">{{ formatDate(related.createTime) }}</span>
                </div>
              </router-link>
            </article>
          </div>
        </div>
      </section>
    </main>

    <!-- 返回顶部按钮 -->
    <button v-show="showBackToTop" class="back-to-top" @click="scrollToTop">
      <i class="icon-arrow-up" />
    </button>
  </div>
</template>

<script>
import { getArticleDetail, getRelatedArticles, toggleArticleLike } from '@/api/blog'

export default {
  name: 'ArticleDetail',
  data() {
    return {
      loading: true,
      article: null,
      relatedArticles: [],
      isLiked: false,
      showBackToTop: false,
      currentLang: 'zh',
      blogLanguage: {
        zh: {
          title: '我的博客',
          loading: '加载中...',
          nav: {
            home: '首页',
            articles: '文章',
            categories: '分类',
            tags: '标签'
          },
          meta: {
            views: '次阅读'
          },
          actions: {
            comment: '评论',
            share: '分享',
            backToHome: '返回首页'
          },
          sections: {
            relatedArticles: '相关文章'
          },
          error: {
            notFound: '文章未找到',
            message: '抱歉，您访问的文章不存在或已被删除。'
          }
        },
        en: {
          title: 'My Blog',
          loading: 'Loading...',
          nav: {
            home: 'Home',
            articles: 'Articles',
            categories: 'Categories',
            tags: 'Tags'
          },
          meta: {
            views: 'views'
          },
          actions: {
            comment: 'Comment',
            share: 'Share',
            backToHome: 'Back to Home'
          },
          sections: {
            relatedArticles: 'Related Articles'
          },
          error: {
            notFound: 'Article Not Found',
            message: 'Sorry, the article you are looking for does not exist or has been deleted.'
          }
        }
      }
    }
  },
  computed: {
    language() {
      return this.blogLanguage[this.currentLang] || this.blogLanguage.zh
    },
    articleId() {
      return this.$route.params.id
    }
  },
  async mounted() {
    await this.loadArticle()
    this.setupScrollListener()
  },
  beforeDestroy() {
    this.removeScrollListener()
  },
  methods: {
    async loadArticle() {
      try {
        this.loading = true
        const response = await getArticleDetail(this.articleId)
        this.article = response.data

        // 加载相关文章
        if (this.article) {
          await this.loadRelatedArticles()
        }
      } catch (error) {
        console.error('加载文章失败:', error)
        this.article = null
      } finally {
        this.loading = false
      }
    },
    async loadRelatedArticles() {
      try {
        const response = await getRelatedArticles(this.articleId)
        this.relatedArticles = response.data || []
      } catch (error) {
        console.error('加载相关文章失败:', error)
        this.relatedArticles = []
      }
    },
    async toggleLike() {
      if (!this.article) return

      try {
        const response = await toggleArticleLike(this.articleId)
        this.isLiked = response.data.isLiked
        this.article.likeCount = response.data.likeCount
      } catch (error) {
        console.error('点赞失败:', error)
      }
    },
    shareArticle() {
      if (navigator.share) {
        navigator.share({
          title: this.article.title,
          text: this.article.summary,
          url: window.location.href
        })
      } else {
        // 复制链接到剪贴板
        navigator.clipboard.writeText(window.location.href)
        this.$message.success('链接已复制到剪贴板')
      }
    },
    scrollToComments() {
      // 滚动到评论区域
      const commentsSection = document.querySelector('.comments-section')
      if (commentsSection) {
        commentsSection.scrollIntoView({ behavior: 'smooth' })
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    setupScrollListener() {
      window.addEventListener('scroll', this.handleScroll)
    },
    removeScrollListener() {
      window.removeEventListener('scroll', this.handleScroll)
    },
    handleScroll() {
      this.showBackToTop = window.scrollY > 300
    },
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString(this.currentLang === 'en' ? 'en-US' : 'zh-CN')
    }
  }
}
</script>

<style scoped>
.article-detail-container {
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #2c3e50;
  line-height: 1.6;
  min-height: 100vh;
  background: #f8f9fa;
}

/* 顶部导航栏 */
.blog-header {
  background: white;
  box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  max-width: 75rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #2c3e50;
  font-weight: 700;
}

.logo a {
  text-decoration: none;
  color: inherit;
}

.main-nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 1rem;
}

.main-nav a {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  transition: color 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}

.main-nav a:hover {
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

/* 主要内容 */
.article-main {
  max-width: 50rem;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.content-wrapper {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* 加载状态 */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
  color: #666;
}

.loading-spinner {
  width: 2rem;
  height: 2rem;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 文章内容 */
.article-content {
  padding: 2rem;
}

.article-header {
  margin-bottom: 2rem;
}

.article-cover {
  width: 100%;
  height: 20rem;
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
  overflow: hidden;
}

.article-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2c3e50;
  line-height: 1.3;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #718096;
  font-size: 0.875rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.icon-calendar::before { content: '📅'; }
.icon-folder::before { content: '📁'; }
.icon-user::before { content: '👤'; }
.icon-eye::before { content: '👁'; }
.icon-heart::before { content: '❤️'; }
.icon-comment::before { content: '💬'; }
.icon-share::before { content: '📤'; }
.icon-arrow-up::before { content: '↑'; }

.category {
  background: #667eea;
  color: white;
  padding: 0.125rem 0.5rem;
  border-radius: 0.75rem;
  font-weight: 500;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-item {
  text-decoration: none;
  color: #667eea;
  background: #f7fafc;
  padding: 0.25rem 0.5rem;
  border-radius: 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tag-item:hover {
  background: #667eea;
  color: white;
}

/* 文章正文 */
.article-body {
  margin-bottom: 2rem;
}

.article-summary {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  border-left: 4px solid #667eea;
}

.article-summary p {
  margin: 0;
  color: #4a5568;
  font-style: italic;
}

.article-content-html {
  font-size: 1rem;
  line-height: 1.8;
  color: #2c3e50;
}

.article-content-html h1,
.article-content-html h2,
.article-content-html h3,
.article-content-html h4,
.article-content-html h5,
.article-content-html h6 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.article-content-html p {
  margin-bottom: 1rem;
}

.article-content-html img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1rem 0;
}

.article-content-html code {
  background: #f1f3f4;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
}

.article-content-html pre {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
  border: 1px solid #e1e8ed;
}

.article-content-html blockquote {
  border-left: 4px solid #667eea;
  padding-left: 1rem;
  margin: 1rem 0;
  color: #4a5568;
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 0.25rem;
}

/* 文章底部 */
.article-footer {
  border-top: 1px solid #e1e8ed;
  padding-top: 1.5rem;
}

.article-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background: #f8f9fa;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.action-btn:hover {
  background: #e2e8f0;
  transform: translateY(-0.0625rem);
}

.like-btn.active {
  background: #fed7d7;
  color: #e53e3e;
}

/* 相关文章 */
.related-articles {
  margin-top: 3rem;
}

.section-wrapper {
  max-width: 50rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  text-align: center;
}

.related-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.related-item {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.related-item:hover {
  transform: translateY(-0.125rem);
}

.related-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.related-image {
  width: 100%;
  height: 10rem;
  overflow: hidden;
}

.related-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.related-info {
  padding: 1rem;
}

.related-info h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
}

.related-info p {
  margin: 0 0 0.75rem 0;
  color: #4a5568;
  font-size: 0.875rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-date {
  color: #718096;
  font-size: 0.75rem;
}

/* 错误状态 */
.error-state {
  text-align: center;
  padding: 4rem 2rem;
}

.error-state h2 {
  color: #e53e3e;
  margin-bottom: 1rem;
}

.error-state p {
  color: #4a5568;
  margin-bottom: 2rem;
}

.back-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background 0.3s ease;
}

.back-btn:hover {
  background: #764ba2;
}

/* 返回顶部按钮 */
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3rem;
  height: 3rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.25rem;
  z-index: 1000;
  transition: all 0.3s ease;
}

.back-to-top:hover {
  background: #764ba2;
  transform: translateY(-0.125rem);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    gap: 1rem;
  }

  .main-nav ul {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }

  .article-main {
    padding: 1rem;
  }

  .article-content {
    padding: 1rem;
  }

  .article-title {
    font-size: 1.5rem;
  }

  .article-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .article-actions {
    flex-direction: column;
  }

  .related-list {
    grid-template-columns: 1fr;
  }

  .back-to-top {
    bottom: 1rem;
    right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
  }
}
</style>
