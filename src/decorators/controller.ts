import 'reflect-metadata';
import router from '../router';

export function Controller(root: string) {
  return function (target: new (...args: any[]) => any) {
    const handlerKeys = Object.getOwnPropertyNames(target.prototype).filter(
      (k) => k !== 'constructor'
    );

    handlerKeys.forEach((key) => {
      const path: string = Reflect.getMetadata('path', target.prototype, key);
      const method: string = Reflect.getMetadata(
        'method',
        target.prototype,
        key
      );

      const handler = target.prototype[key];

      const middleware =
        Reflect.getMetadata('middleware', target.prototype, key) || [];

      if (path && method) {
        const fullPath = root === '/' ? path : `${root}${path}`;
        router[method](fullPath, ...middleware, handler);
      }
    });
  };
}
