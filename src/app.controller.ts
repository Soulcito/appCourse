import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const controller = UsersController;
    console.log('path', Reflect.getMetadata('path', controller));
    console.log('paths', Reflect.getMetadata('paths', controller));
    return this.appService.getHello();
  }
}

//decorador de metodo
function MetodoGet(path: string) {
  return function (
    target: any,
    propertykey: string,
    //descriptor: PropertyDescriptor,
  ): any {
    if (!Reflect.hasMetadata('paths', target.constructor)) {
      Reflect.defineMetadata('paths', [], target.constructor);
    }

    const paths = Reflect.getMetadata('paths', target.constructor);

    paths.push({
      path,
      verb: 'get',
      methodName: propertykey,
    });

    Reflect.defineMetadata('paths', paths, target.constructor);
  };
}

//decorador de clase
function Controlador(path: string) {
  return function (constructor: any) {
    console.log('Controlador', path);
    Reflect.defineMetadata('path', path, constructor);
  };
}

@Controlador('/users')
export class UsersController {
  constructor() {
    //console.log('UsersController');
  }

  @MetodoGet('/list')
  List() {
    console.log('list');
  }
}
