import { RouterContext } from 'koa-router';
import 'reflect-metadata';

export function Validate() {
  return function (target: any, key: string) {
    const validateParamsMiddleware = (
      ctx: RouterContext,
      next: () => Promise<any>
    ) => {
      // TODO
      return Promise.resolve();
    };

    const ms = Reflect.getMetadata('middleware', target, key) || [];
    ms.push(validateParamsMiddleware);
    Reflect.defineMetadata('middleware', ms, target, key);
  };
}
