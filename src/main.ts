import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { HttpexceptionFilter } from './common/httpexception/httpexception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpexceptionFilter);
   app.enableCors({
    origin:'http://localhost:4200',
    method:['GET','POST','PUT','PATCH','DELETE']
  })
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
