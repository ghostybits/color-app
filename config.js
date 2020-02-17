var path = require('path');

export default {
  PORT: process.env.PORT || 3030,
  LIST_PAGE_SIZE: process.env.LIST_PAGE_SIZE || 15,
  DB_PATH: path.join(__dirname, 'color_app.db'),
  HTML_PATH: path.join(__dirname, 'index.html')
};