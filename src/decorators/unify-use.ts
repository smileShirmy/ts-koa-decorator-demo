import 'reflect-metadata';
import { RouterContext } from 'koa-router';

export function UnifyUse<T extends string>(
  middleware: (ctx: RouterContext, next: () => Promise<any>) => Promise<any>,
  excludes: T[] = [],
  inLast = false
) {
  return function (target: new (...args: any[]) => any) {
    const handlerKeys = Object.getOwnPropertyNames(target.prototype).filter(
      (key) => key !== 'constructor'
    );

    handlerKeys.forEach((key) => {
      if (!excludes.includes(key as T)) {
        const ms =
          Reflect.getMetadata('middleware', target.prototype, key) || [];
        if (inLast) {
          ms.push(middleware);
        } else {
          ms.unshift(middleware);
        }

        Reflect.defineMetadata('middleware', ms, target.prototype, key);
      }
    });
  };
}
