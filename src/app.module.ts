import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { CustomerModule } from './modules/customer.module';
import { SessionModule } from './modules/session.module';

@Module({
    imports: [CustomerModule, SessionModule],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('customers');
    }
}
