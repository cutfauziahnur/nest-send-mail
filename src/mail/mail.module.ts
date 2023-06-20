import {Module} from '@nestjs/common';
import {MailService} from './mail.service';
import {MailerModule} from '@nestjs-modules/mailer';
import {HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import {join} from 'path';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {SendMailProducer} from "./send-mail.producer";
import {SendMailConsumer} from "./send-mail.consumer";
import {BullModule} from "@nestjs/bull";

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config : ConfigService) => ({
                transport: {
                    host: config.get('EMAIL_HOST'),
                    port : config.get('EMAIL_PORT'),
                    secure: false,
                    auth: {
                        user: config.get('EMAIL_USER'),
                        pass: config.get('EMAIL_PASSWORD'),
                    },
                },
                defaults: {
                    from: 'tvigy@dev.com'
                },
                template: {
                    dir: join(__dirname, './templates'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true
                    }
                }
            }),
        inject: [ConfigService]
        }),
        BullModule.registerQueue({
            name : 'send-mail-queue'
        }),
        ConfigModule.forRoot()],
    providers: [MailService, SendMailProducer, SendMailConsumer],
    exports : [MailService, SendMailProducer, SendMailConsumer]
})
export class MailModule {
}
