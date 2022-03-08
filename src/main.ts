import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //whitelist is use to pass field of body from client only that has been write in dto, otherwise will not pass to the cpntroller.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(5000, () => {
    console.log(`server run on port 5000`);
  });
}
bootstrap();
