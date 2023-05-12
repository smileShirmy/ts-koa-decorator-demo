import Koa from 'koa';
import Router from 'koa-router';

const router = new Router();
const app = new Koa();

router.get('/', (ctx) => {
  ctx.body = 'hello world!';
});

app.use(router.routes());

app.listen(3000);
