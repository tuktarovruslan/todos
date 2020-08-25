const path = require('path');

const env = (name, def) => {
  const envValue = process.env[name];
  if (envValue != null) return envValue;
  return def;
};

module.exports = {
  server: {
    port: env('PORT', 8000),
    staticPath: path.join(__dirname, 'static'),
    viewsPath: path.join(__dirname, 'client/views'),
  },
  sassParams: {
    src: path.join(__dirname, 'client/styles'),
    dest: path.join(__dirname, 'static/styles'),
    debug: false,
    indentedSyntax: false,
    outputStyle: 'compressed',
    prefix:  '/styles',
  },
  mode: env('NODE_ENV', 'dev'),
};
