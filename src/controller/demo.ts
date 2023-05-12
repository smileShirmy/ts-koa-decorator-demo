import { RouterContext } from 'koa-router';
import { Get, Post, Use, Controller, Validate, UnifyUse } from 'src/decorators';

function SharedMiddleware(ctx: RouterContext, next: () => Promise<any>) {
  return Promise.resolve();
}

type MethodName = 'getName' | 'postName';

@Controller('/demo')
@UnifyUse<MethodName>(SharedMiddleware)
class DemoController {
  @Validate(/* TODO */)
  @Use(SharedMiddleware)
  @Get('/name')
  getName(ctx: RouterContext) {
    const { name } = ctx.request.query;
    ctx.body = {
      name
    };
  }

  @Post('/name')
  postName(ctx: RouterContext) {
    // const { name } = ctx.request.body;
    // ctx.body = {
    //   name
    // };
  }
}
