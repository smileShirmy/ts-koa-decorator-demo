import 'reflect-metadata';

function generateRequestDecorators(type: string) {
  return function (path: string) {
    return function (target: any, key: string) {
      Reflect.defineMetadata('path', path, target, key);
      Reflect.defineMetadata('method', type, target, key);
    };
  };
}

export const Get = generateRequestDecorators('get');
export const Post = generateRequestDecorators('post');
