<template>
  <div class="blog-container">
    <!-- 顶部导航栏 -->
    <header class="blog-header">
      <div class="header-container">
        <div class="logo">
          <h1>{{ language.title }}</h1>
        </div>
        <nav class="main-nav">
          <ul>
            <li><router-link to="/">{{ language.nav.home }}</router-link></li>
            <li><router-link to="/articles">{{ language.nav.articles }}</router-link></li>
            <li><router-link to="/categories">{{ language.nav.categories }}</router-link></li>
            <li><router-link to="/tags">{{ language.nav.tags }}</router-link></li>
            <li><router-link to="/about">{{ language.nav.about }}</router-link></li>
          </ul>
        </nav>
        <div class="language-switcher">
          <select v-model="currentLang" @change="changeLang">
            <option value="zh">中文简体</option>
            <option value="zh-tw">中文繁体</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </header>

    <!-- 主要内容区 -->
    <main class="blog-main">
      <!-- 简化的横幅 -->
      <div class="blog-banner">
        <div class="banner-content">
          <h2>{{ language.banner.welcome }}</h2>
          <p>{{ language.banner.slogan }}</p>
        </div>
      </div>

      <!-- 文章列表区域 -->
      <div class="content-wrapper">
        <div class="articles-container">
          <h3 class="section-title">{{ language.sections.latestArticles }}</h3>

          <!-- 加载状态 -->
          <div v-if="loading" class="loading">
            <p>{{ language.loading }}</p>
          </div>

          <!-- 紧凑的文章列表 -->
          <div v-else class="articles-list">
            <article v-for="article in articles" :key="article.id" class="article-item">
              <div class="article-thumbnail">
                <img :src="article.cover" :alt="article.title">
              </div>
              <div class="article-info">
                <div class="article-meta">
                  <span class="article-category">{{ article.category }}</span>
                  <span class="article-date">{{ formatDate(article.createTime) }}</span>
                </div>
                <h4 class="article-title">
                  <router-link :to="`/blog/article/${article.id}`">{{ article.title }}</router-link>
                </h4>
                <p class="article-summary">{{ article.summary }}</p>
                <router-link :to="`/blog/article/${article.id}`" class="read-more">
                  {{ language.buttons.readMore }} <span class="arrow">→</span>
                </router-link>
              </div>
            </article>
          </div>

          <!-- 分页 -->
          <div class="pagination">
            <button
              class="prev-page"
              :disabled="currentPage === 1"
              @click="prevPage"
            >
              ← {{ language.pagination.prev }}
            </button>
            <span class="page-number">{{ currentPage }} / {{ totalPages }}</span>
            <button
              class="next-page"
              :disabled="currentPage === totalPages"
              @click="nextPage"
            >
              {{ language.pagination.next }} →
            </button>
          </div>
        </div>

        <!-- 侧边栏 -->
        <aside class="blog-sidebar">
          <div class="sidebar-module about">
            <h3>{{ language.sidebar.about }}</h3>
            <div class="author-info">
              <div class="author-avatar">
                <img :src="authorAvatarSrc" :alt="authorInfo.name">
              </div>
              <p class="author-description">{{ authorInfo.description }}</p>
            </div>
          </div>

          <div class="sidebar-module categories">
            <h3>{{ language.sidebar.categories }}</h3>
            <ul class="category-list">
              <li v-for="category in categories" :key="category.id">
                <router-link :to="`/blog/category/${category.id}`">
                  {{ category.name }}
                  <span class="category-count">{{ category.count || 0 }}</span>
                </router-link>
              </li>
            </ul>
          </div>

          <div class="sidebar-module tags">
            <h3>{{ language.sidebar.tags }}</h3>
            <div class="tag-cloud">
              <router-link
                v-for="tag in tags"
                :key="tag.id"
                :to="`/blog/tag/${tag.id}`"
                class="tag-item"
              >
                {{ tag.name }}
              </router-link>
            </div>
          </div>
        </aside>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="blog-footer">
      <div class="footer-content">
        <p>{{ language.footer.copyright }} &copy; 2023-{{ new Date().getFullYear() }}</p>
        <div class="social-links">
          <a href="#" target="_blank" class="social-link">🐙</a>
          <a href="#" target="_blank" class="social-link">🐦</a>
          <a href="#" target="_blank" class="social-link">📧</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { getArticles, getCategories, getTags, getAuthorInfo } from '@/api/blog'

export default {
  name: 'BlogHome',
  data() {
    return {
      currentLang: 'zh',
      loading: false,
      articles: [],
      categories: [],
      tags: [],
      authorInfo: {
        name: '',
        avatar: '',
        description: ''
      },
      currentPage: 1,
      pageSize: 10,
      totalPages: 1,
      totalCount: 0,
      blogLanguage: {
        zh: {
          title: '我的博客',
          loading: '加载中...',
          nav: {
            home: '首页',
            articles: '文章',
            categories: '分类',
            tags: '标签',
            about: '关于'
          },
          banner: {
            welcome: '欢迎来到我的技术博客',
            slogan: '分享前端技术，记录学习心得'
          },
          sections: {
            latestArticles: '最新文章'
          },
          sidebar: {
            about: '关于作者',
            categories: '文章分类',
            tags: '标签云'
          },
          buttons: {
            readMore: '阅读全文'
          },
          pagination: {
            prev: '上一页',
            next: '下一页'
          },
          footer: {
            copyright: '版权所有'
          }
        },
        'zh-tw': {
          title: '我的博客',
          loading: '加載中...',
          nav: {
            home: '首頁',
            articles: '文章',
            categories: '分類',
            tags: '標籤',
            about: '關於'
          },
          banner: {
            welcome: '歡迎來到我的技術博客',
            slogan: '分享前端技術，記錄學習心得'
          },
          sections: {
            latestArticles: '最新文章'
          },
          sidebar: {
            about: '關於作者',
            categories: '文章分類',
            tags: '標籤雲'
          },
          buttons: {
            readMore: '閱讀全文'
          },
          pagination: {
            prev: '上一頁',
            next: '下一頁'
          },
          footer: {
            copyright: '版權所有'
          }
        },
        en: {
          title: 'My Blog',
          loading: 'Loading...',
          nav: {
            home: 'Home',
            articles: 'Articles',
            categories: 'Categories',
            tags: 'Tags',
            about: 'About'
          },
          banner: {
            welcome: 'Welcome to My Tech Blog',
            slogan: 'Share frontend technology, record learning insights'
          },
          sections: {
            latestArticles: 'Latest Articles'
          },
          sidebar: {
            about: 'About Author',
            categories: 'Categories',
            tags: 'Tag Cloud'
          },
          buttons: {
            readMore: 'Read More'
          },
          pagination: {
            prev: 'Previous',
            next: 'Next'
          },
          footer: {
            copyright: 'Copyright'
          }
        }
      }
    }
  },
  computed: {
    language() {
      return this.blogLanguage[this.currentLang] || this.blogLanguage.zh
    },
    authorAvatarSrc() {
      // 检查是否有头像数据
      if (!this.authorInfo.avatar) {
        return '/default-avatar.png' // 默认头像
      }

      // 如果已经是完整的 data URL，直接返回
      if (this.authorInfo.avatar.startsWith('data:')) {
        return this.authorInfo.avatar
      }

      // 如果是 base64 字符串，添加 data URL 前缀
      return `data:image/jpeg;base64,${this.authorInfo.avatar}`
    }
  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      this.loading = true
      try {
        const [, categoriesRes, tagsRes, authorRes] = await Promise.all([
          this.loadArticles(),
          getCategories(),
          getTags(),
          getAuthorInfo()
        ])

        this.categories = Array.isArray(categoriesRes.data) ? categoriesRes.data : []
        this.tags = Array.isArray(tagsRes.data) ? tagsRes.data : []
        this.authorInfo = authorRes.data || this.authorInfo
      } catch (error) {
        console.error('加载数据失败:', error)
        if (this.$message) {
          this.$message.error('加载数据失败，请刷新页面重试')
        }
      } finally {
        this.loading = false
      }
    },
    async loadArticles() {
      try {
        const params = {
          page: this.currentPage,
          size: this.pageSize
        }
        const response = await getArticles(params)

        if (response.data) {
          this.articles = response.data.list || []
          this.totalCount = response.data.total || 0
          this.totalPages = response.data.totalPages || 1
        }

        return response
      } catch (error) {
        console.error('加载文章失败:', error)
        throw error
      }
    },
    async changeLang(event) {
      this.currentLang = event.target.value
      await this.loadArticles()
    },
    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        await this.loadArticles()
      }
    },
    async nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        await this.loadArticles()
      }
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
.blog-container {
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #2c3e50;
  line-height: 1.6;
  min-height: 100vh;
  background: #f8f9fa;
}

/* 加载状态样式 */
.loading {
  text-align: center;
  padding: 3rem;
  color: #666;
}

/* 禁用按钮样式 */
.pagination button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.pagination button:disabled:hover {
  background: #ccc;
  transform: none;
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

.language-switcher select {
  padding: 0.5rem 0.75rem;
  border: 1px solid #e1e8ed;
  border-radius: 0.25rem;
  background: white;
  color: #2c3e50;
  cursor: pointer;
  font-size: 0.875rem;
}

/* 主要内容区 */
.blog-main {
  max-width: 75rem;
  margin: 0 auto;
  padding: 1.5rem;
}

.blog-banner {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 3rem 2rem;
  border-radius: 0.5rem;
  text-align: center;
  margin-bottom: 2rem;
}

.banner-content h2 {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.banner-content p {
  font-size: clamp(0.875rem, 2vw, 1rem);
  opacity: 0.9;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.section-title {
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.75rem;
}

.articles-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.article-item {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  min-height: 8rem;
}

.article-item:hover {
  transform: translateY(-0.125rem);
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.15);
}

.article-thumbnail {
  width: 8rem;
  height: 8rem;
  flex-shrink: 0;
  overflow: hidden;
}

.article-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-info {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.article-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
}

.article-category {
  background: #667eea;
  color: white;
  padding: 0.125rem 0.5rem;
  border-radius: 0.75rem;
  font-weight: 500;
}

.article-date {
  color: #718096;
}

.article-title {
  margin: 0 0 0.75rem 0;
  font-size: clamp(1rem, 2.5vw, 1.125rem);
  font-weight: 600;
  line-height: 1.4;
}

.article-title a {
  text-decoration: none;
  color: #2c3e50;
  transition: color 0.3s ease;
}

.article-title a:hover {
  color: #667eea;
}

.article-summary {
  color: #4a5568;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.read-more {
  color: #667eea;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  align-self: flex-start;
  transition: color 0.3s ease;
}

.read-more:hover {
  color: #764ba2;
}

.arrow {
  margin-left: 0.25rem;
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.pagination button {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 0.875rem;
}

.pagination button:hover:not(:disabled) {
  background: #764ba2;
  transform: translateY(-0.0625rem);
}

.page-number {
  font-weight: 600;
  color: #2c3e50;
  padding: 0.5rem 1rem;
  background: white;
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
}

/* 侧边栏 */
.blog-sidebar {
  position: sticky;
  top: 7rem;
  align-self: start;
}

.sidebar-module {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
}

.sidebar-module h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #2c3e50;
  font-size: 1rem;
  font-weight: 700;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.5rem;
}

.author-info {
  text-align: center;
}

.author-avatar {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  margin: 0 auto 0.75rem;
  overflow: hidden;
  border: 2px solid #e1e8ed;
  display: block;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-description {
  color: #4a5568;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-list li {
  margin-bottom: 0.5rem;
}

.category-list a {
  text-decoration: none;
  color: #4a5568;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  transition: all 0.3s ease;
  font-size: 0.875rem;
}

.category-list a:hover {
  background: #f7fafc;
  color: #667eea;
}

.category-count {
  background: #e1e8ed;
  color: #2c3e50;
  padding: 0.125rem 0.375rem;
  border-radius: 0.625rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.tag-cloud {
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

/* 页脚 */
.blog-footer {
  background: white;
  padding: 2rem 1.5rem;
  text-align: center;
  margin-top: 3rem;
  border-top: 1px solid #e1e8ed;
}

.footer-content {
  max-width: 75rem;
  margin: 0 auto;
}

.footer-content p {
  margin-bottom: 1rem;
  color: #4a5568;
  font-size: 0.875rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: #667eea;
  color: white;
  border-radius: 50%;
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #764ba2;
  transform: translateY(-0.0625rem);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content-wrapper {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .article-item {
    flex-direction: column;
    min-height: auto;
  }

  .article-thumbnail {
    width: 100%;
    height: 12rem;
  }

  .header-container {
    flex-direction: column;
    gap: 1rem;
  }

  .main-nav ul {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }

  .blog-main {
    padding: 1rem;
  }

  .blog-banner {
    padding: 2rem 1rem;
  }

  .sidebar-module {
    padding: 1rem;
  }

  .blog-footer {
    padding: 1.5rem 1rem;
  }
}

@media (max-width: 480px) {
  .pagination {
    flex-direction: column;
    gap: 0.5rem;
  }

  .pagination button {
    width: 100%;
    max-width: 12rem;
  }

  .article-info {
    padding: 1rem;
  }

  .tag-cloud {
    gap: 0.25rem;
  }

  .social-links {
    gap: 0.5rem;
  }
}
</style>
