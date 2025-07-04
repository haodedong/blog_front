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

          <!-- 紧凑的文章列表 -->
          <div class="articles-list">
            <article v-for="(article, index) in articles" :key="index" class="article-item">
              <div class="article-thumbnail">
                <img :src="article.cover" :alt="article.title">
              </div>
              <div class="article-info">
                <div class="article-meta">
                  <span class="article-category">{{ article.category }}</span>
                  <span class="article-date">{{ article.date }}</span>
                </div>
                <h4 class="article-title">
                  <router-link :to="`/blog/article/${article.id}`">{{ article.title }}</router-link>
                </h4>
                <p class="article-summary">{{ article.summary }}</p>
                <router-link :to="`/blog/article/${article.id}`" class="read-more">
                  {{ language.buttons.readMore }} →
                </router-link>
              </div>
            </article>
          </div>

          <!-- 分页 -->
          <div class="pagination">
            <button class="prev-page">← {{ language.pagination.prev }}</button>
            <span class="page-number">1 / 5</span>
            <button class="next-page">{{ language.pagination.next }} →</button>
          </div>
        </div>

        <!-- 侧边栏 -->
        <aside class="blog-sidebar">
          <div class="sidebar-module about">
            <h3>{{ language.sidebar.about }}</h3>
            <div class="author-info">
              <div class="author-avatar">
                <img src="https://via.placeholder.com/60x60/667eea/ffffff?text=Author" alt="作者头像">
              </div>
              <p class="author-description">{{ language.sidebar.authorDescription }}</p>
            </div>
          </div>

          <div class="sidebar-module categories">
            <h3>{{ language.sidebar.categories }}</h3>
            <ul class="category-list">
              <li v-for="(count, category) in categories" :key="category">
                <router-link :to="`/blog/category/${category}`">
                  {{ category }}
                  <span class="category-count">{{ count }}</span>
                </router-link>
              </li>
            </ul>
          </div>

          <div class="sidebar-module tags">
            <h3>{{ language.sidebar.tags }}</h3>
            <div class="tag-cloud">
              <router-link
                v-for="(count, tag) in tags"
                :key="tag"
                :to="`/blog/tag/${tag}`"
                class="tag-item"
              >
                {{ tag }}
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
export default {
  name: 'BlogHome',
  data() {
    return {
      currentLang: 'zh',
      articles: [
        {
          id: 1,
          title: '如何提高Vue项目性能',
          cover: 'https://via.placeholder.com/120x80/667eea/ffffff?text=Vue',
          date: '2023-06-15',
          category: '前端开发',
          summary: 'Vue项目性能优化的几种常见方法，包括懒加载、组件缓存、虚拟滚动等技术的实践应用。'
        },
        {
          id: 2,
          title: 'JavaScript ES6+新特性详解',
          cover: 'https://via.placeholder.com/120x80/764ba2/ffffff?text=JS',
          date: '2023-06-10',
          category: 'JavaScript',
          summary: '深入了解ES6+的新特性，包括箭头函数、解构赋值、Promise、async/await等现代JavaScript语法。'
        },
        {
          id: 3,
          title: 'CSS Grid布局完全指南',
          cover: 'https://via.placeholder.com/120x80/f093fb/ffffff?text=CSS',
          date: '2023-06-08',
          category: 'CSS',
          summary: 'CSS Grid是现代网页布局的强大工具，本文将详细介绍Grid布局的各种属性和实用技巧。'
        },
        {
          id: 4,
          title: 'React Hooks最佳实践',
          cover: 'https://via.placeholder.com/120x80/4facfe/ffffff?text=React',
          date: '2023-06-05',
          category: 'React',
          summary: 'React Hooks改变了我们编写React组件的方式，了解如何正确使用Hooks来提高代码质量。'
        },
        {
          id: 5,
          title: 'Node.js后端开发入门',
          cover: 'https://via.placeholder.com/120x80/43e97b/ffffff?text=Node',
          date: '2023-06-01',
          category: '后端开发',
          summary: '从零开始学习Node.js后端开发，包括Express框架、数据库操作、API设计等核心知识。'
        }
      ],
      categories: {
        '前端开发': 12,
        'JavaScript': 8,
        'CSS': 6,
        'Vue': 9,
        'React': 5,
        '后端开发': 4
      },
      tags: {
        'Vue': 15,
        'JavaScript': 20,
        'CSS': 8,
        'HTML': 6,
        'webpack': 4,
        'Node.js': 7,
        'React': 6,
        'TypeScript': 10,
        'HTTP': 3,
        'Git': 5
      },
      blogLanguage: {
        zh: {
          title: '我的博客',
          nav: {
            home: '首页',
            articles: '文章',
            categories: '分类',
            tags: '标签',
            about: '关于'
          },
          banner: {
            welcome: '欢迎来到我的博客',
            slogan: '分享技术，记录成长'
          },
          sections: {
            latestArticles: '最新文章'
          },
          sidebar: {
            about: '关于作者',
            categories: '文章分类',
            tags: '标签云',
            authorDescription: '全栈开发者，热爱技术分享，专注于前端和后端技术研究。'
          },
          buttons: {
            readMore: '阅读更多'
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
          nav: {
            home: '首頁',
            articles: '文章',
            categories: '分類',
            tags: '標籤',
            about: '關於'
          },
          banner: {
            welcome: '歡迎來到我的博客',
            slogan: '分享技術，記錄成長'
          },
          sections: {
            latestArticles: '最新文章'
          },
          sidebar: {
            about: '關於作者',
            categories: '文章分類',
            tags: '標籤雲',
            authorDescription: '全棧開發者，熱愛技術分享，專注於前端和後端技術研究。'
          },
          buttons: {
            readMore: '閱讀更多'
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
          nav: {
            home: 'Home',
            articles: 'Articles',
            categories: 'Categories',
            tags: 'Tags',
            about: 'About'
          },
          banner: {
            welcome: 'Welcome to My Blog',
            slogan: 'Share Technology, Record Growth'
          },
          sections: {
            latestArticles: 'Latest Articles'
          },
          sidebar: {
            about: 'About Author',
            categories: 'Categories',
            tags: 'Tag Cloud',
            authorDescription: 'Full-stack developer, passionate about technology sharing, focused on frontend and backend technology research.'
          },
          buttons: {
            readMore: 'Read More'
          },
          pagination: {
            prev: 'Previous',
            next: 'Next'
          },
          footer: {
            copyright: 'All Rights Reserved'
          }
        }
      }
    }
  },
  computed: {
    language() {
      return this.blogLanguage[this.currentLang] || this.blogLanguage.zh
    }
  },
  methods: {
    changeLang(event) {
      this.currentLang = event.target.value
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

/* 头部样式 */
.blog-header {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
}

.logo h1 {
  margin: 0;
  font-size: 24px;
  color: #2c3e50;
  font-weight: 700;
}

.main-nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.main-nav li {
  margin: 0 15px;
}

.main-nav a {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  transition: color 0.3s ease;
}

.main-nav a:hover {
  color: #667eea;
}

.language-switcher select {
  padding: 6px 10px;
  border: 1px solid #e1e8ed;
  border-radius: 4px;
  background: white;
  color: #2c3e50;
  cursor: pointer;
}

/* 主要内容区样式 */
.blog-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.blog-banner {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 40px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 30px;
}

.banner-content h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 10px;
}

.banner-content p {
  font-size: 16px;
  opacity: 0.9;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #2c3e50;
  border-bottom: 2px solid #667eea;
  padding-bottom: 10px;
}

/* 紧凑的文章列表样式 */
.articles-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.article-item {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  min-height: 120px;
}

.article-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.article-thumbnail {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  overflow: hidden;
}

.article-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-info {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.article-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 8px;
  font-size: 12px;
}

.article-category {
  background: #667eea;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
}

.article-date {
  color: #718096;
}

.article-title {
  margin: 0 0 10px 0;
  font-size: 18px;
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
  font-size: 14px;
  margin-bottom: 12px;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.read-more {
  color: #667eea;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  align-self: flex-start;
  transition: color 0.3s ease;
}

.read-more:hover {
  color: #764ba2;
}

/* 分页样式 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 15px;
}

.pagination button {
  background: #667eea;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
}

.pagination button:hover {
  background: #764ba2;
}

.page-number {
  font-weight: 600;
  color: #2c3e50;
  padding: 8px 16px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 侧边栏样式 */
.blog-sidebar {
  position: sticky;
  top: 100px;
  align-self: start;
}

.sidebar-module {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.sidebar-module h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #2c3e50;
  font-size: 16px;
  font-weight: 700;
  border-bottom: 2px solid #667eea;
  padding-bottom: 8px;
}

.author-info {
  text-align: center;
}

.author-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 10px;
  overflow: hidden;
  border: 2px solid #e1e8ed;
  display: inline-block;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-description {
  color: #4a5568;
  font-size: 14px;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-list li {
  margin-bottom: 8px;
}

.category-list a {
  text-decoration: none;
  color: #4a5568;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
  border-radius: 4px;
  transition: background 0.3s ease;
  font-size: 14px;
}

.category-list a:hover {
  background: #f7fafc;
  color: #667eea;
}

.category-count {
  background: #e1e8ed;
  color: #2c3e50;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag-item {
  text-decoration: none;
  color: #667eea;
  background: #f7fafc;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tag-item:hover {
  background: #667eea;
  color: white;
}

/* 页脚样式 */
.blog-footer {
  background: white;
  padding: 30px 20px;
  text-align: center;
  margin-top: 40px;
  border-top: 1px solid #e1e8ed;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content p {
  margin-bottom: 15px;
  color: #4a5568;
  font-size: 14px;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #667eea;
  color: white;
  border-radius: 50%;
  text-decoration: none;
  font-size: 14px;
  transition: background 0.3s ease;
}

.social-link:hover {
  background: #764ba2;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }

  .article-item {
    flex-direction: column;
    min-height: auto;
  }

  .article-thumbnail {
    width: 100%;
    height: 180px;
  }

  .banner-content h2 {
    font-size: 24px;
  }

  .header-container {
    flex-direction: column;
    gap: 15px;
  }

  .main-nav ul {
    flex-wrap: wrap;
    justify-content: center;
  }

  .main-nav li {
    margin: 5px 10px;
  }
}
</style>
