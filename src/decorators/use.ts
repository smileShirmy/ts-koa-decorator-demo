import { RouterContext } from 'koa-router';
import 'reflect-metadata';

export function Use(
  middleware: (ctx: RouterContext, next: () => Promise<any>) => Promise<any>,
  position: 'last' | number = 'last'
) {
  return function (target: any, key: string) {
    const ms = Reflect.getMetadata('middleware', target, key) || [];
    if (position === 'last') {
      ms.push(middleware);
    } else {
      ms.splice(position, 0, middleware);
    }
    Reflect.defineMetadata('middleware', ms, target, key);
  };
}
