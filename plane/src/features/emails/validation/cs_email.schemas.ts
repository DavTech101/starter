import { z } from 'zod';

//##########################################################################################
// COSITO'S SPICES CS EMAIL SCHEMA
//##########################################################################################
export type TConfirmOrderEmail = z.infer<typeof ConfirmOrderEmailDTO>;

export const ConfirmOrderEmailDTO = z.object({
  email: z.email(),
  name: z.string().min(1).max(100),
});
