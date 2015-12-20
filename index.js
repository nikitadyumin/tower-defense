const koa = require('koa');
const serve = require('koa-static');
const app = koa();
const port = +process.env.PORT || 2000;
const host = process.env.HOST || '0.0.0.0';

app.use(serve('./static'));

app.listen(port, host);