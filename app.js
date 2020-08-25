const express = require('express');
const sassMiddleware = require('node-sass-middleware');
const morgan = require('morgan');

const spaBuilder = require('./server/routes/spa');

const config = require('./config');

class App {
  constructor() {
    this.core = express();
  }
  async up() {
    // routing setup
    await this.setupWebServer();
  }
  async setupWebServer() {
    // view engine setup
    this.core.set('view engine', 'pug');
    // views src-data
    this.core.set('views', config.server.viewsPath);
    // style engine setup
    this.core.use(sassMiddleware(config.sassParams));
    // static data
    this.core.use(express.static(config.server.staticPath));
    // pretty logger
    this.core.use(morgan(config.mode));
    // routing
    this.setupRoutes();
  }
  setupRoutes() {
    this.core.use('/**', spaBuilder);
  }
  async run() {
    await this.up();
    this.core.listen(config.server.port, () => {
      console.log(`Server has been started on port ${config.server.port}`);
      console.log(`Deploy mode ${config.mode}`);
    });
  }
}

const app = new App;
app.run();
