import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());

  (app as any).set('etag', false);
  app.use((_req, res, next) => {
    res.removeHeader('x-powered-by');
    next();
  });

  const port = process.env.PORT;

  await app.listen(port);
}
bootstrap();
