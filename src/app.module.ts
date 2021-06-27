import { Module } from '@nestjs/common';
import { UserModule } from './resources/user.module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
