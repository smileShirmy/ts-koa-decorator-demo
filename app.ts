import Koa from 'koa';
import './src/controller/demo';
import router from 'src/router';

const app = new Koa();

app.use(router.routes());

app.listen(3000);
