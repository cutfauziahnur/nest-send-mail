import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MailModule} from './mail/mail.module';
import {BullModule} from "@nestjs/bull";

@Module({
    imports: [
        BullModule.forRoot({
            redis: {
                host: 'localhost',
                port: 6379
            }
        }),
        BullModule.registerQueue({
            name: 'send-mail-queue'
        }),
        MailModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
