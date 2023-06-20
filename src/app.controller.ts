import {Controller, Get, Query} from '@nestjs/common';
import {SendMailProducer} from "./mail/send-mail.producer";

@Controller('mail')
export class AppController {
    constructor(
        private sendMailProducerService: SendMailProducer
    ) {
    }

    @Get('send-mail')
    async sendMail(
        @Query('msg') msg : string
    ) : Promise<string>{
        await this.sendMailProducerService.sendMail({
            to : 'john@test.com',
            from : 'ifa@dev.com',
            template : 'welcome',
            subject : 'Hello',
            context : {
                name : 'John Doe',
                message : msg
            }
        })
        return msg
    }
}
