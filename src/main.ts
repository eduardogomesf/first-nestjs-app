import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    await app.listen(3000, () => {
        console.log("I'm running on port 3000");
    });
}
bootstrap();
