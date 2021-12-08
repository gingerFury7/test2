module.exports = {
    pages: {
      'login': {
        entry: './src/main.js',
        template: 'public/index.html',
        chunks: [ 'chunk-vendors', 'chunk-common', 'login' ],
        subpage: './src/subpage/main.js',
        title: 'Вход'
      },
      'main_page': {
        entry: './src/Main_page/main_page.js',
        template: 'public/index.html',
        chunks: [ 'chunk-vendors', 'chunk-common', 'main_page' ],
        subpage: './src/subpage/main_page.js',
        title: 'Основная страница'
      }
    }
  }