global class EmailServiceEx implements Messaging.InboundEmailHandler {
    global Messaging.InboundEmailResult handleInboundEmail(Messaging.inboundEmail email, Messaging.InboundEnvelope env){
        Messaging.inboundEmailResult result = new Messaging.InboundEmailResult();
        system.debug('FromAddress: ' + email.fromAddress);
        system.debug('subject: ' + email.subject);
        system.debug('body: ' + email.plaintextbody);
        return result;
    }
}