import { Mailer } from '../mailer.class';
import { TEmailData } from '../validation/email.schemas';
import { handleSchemaValidation } from '@shared/server/lib/handlers';
import { CS_MAILER_CONFIG, CS_EMAIL_SENDER_NAME } from '../email.constants';
import { operationSuccessResponse } from '@shared/server/lib/successResponses';

import {
  TConfirmOrderEmail,
  ConfirmOrderEmailDTO,
} from '../validation/cs_email.schemas';

//##########################################################################################
// SEND EMAIL CONTROLLER
//##########################################################################################
export const sendEmailController = async (data: TEmailData) => {
  const mailer = new Mailer(data.mailerConfig);

  mailer.setEmailBody(data.body);
  mailer.setSender(data.sender);
  mailer.setSubject(data.subject);
  mailer.setReceiver(data.receiver);
  mailer.setAttachments(data.attachments || []);

  const res = await mailer.sendMail();

  if (res.status !== 'success') throw res;

  return operationSuccessResponse('Invoice email', res.status, 'sent!');
};

//##########################################################################################
// ORDER CONFIRMATION CONTROLLER
//##########################################################################################
export const confirmOrderEmailController = async (data: TConfirmOrderEmail) => {
  const subject = 'Order Confirmation';
  const validatedValues = handleSchemaValidation(ConfirmOrderEmailDTO, data);
  const content = '';

  const emailConf = {
    body: content,
    subject: subject,
    sender: CS_EMAIL_SENDER_NAME,
    mailerConfig: CS_MAILER_CONFIG,
    receiver: validatedValues.data.email,
  };

  await sendEmailController(emailConf);
};
