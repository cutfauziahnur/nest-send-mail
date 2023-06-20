export class SendMailDto{
    to : string
    from : string
    subject : string
    template : string
    context ?: any
}