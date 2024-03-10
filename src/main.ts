import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap'); //para que muestre con un log en la terminar

  //agregar caracteristias a la url endpoint "api"
  app.setGlobalPrefix('api/'), 

  //configuracion para utilizar los pipes  en nest 
  app.useGlobalPipes(
      new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
   );

  await app.listen(process.env.PORT);
  logger.log(`corriendo en el purto ${process.env.PORT}`);
  
}
bootstrap();
