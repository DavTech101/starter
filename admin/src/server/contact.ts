import mailer from '@utils/mailer';
import toCurrency from '@utils/currency';

//##########################################################################################
// FUNCTION TYPES
//##########################################################################################
type TContactData = {
  name: string;
  city: string;
  email: string;
  order: string;
  total: number;
  address: string;
  postalCode: string;
  phoneNumber: string;
};

//##########################################################################################
// CONTACT ADMIN ACTION
//##########################################################################################
export const contactAdminAction = async (data: TContactData) => {
  const toEmail = process.env.EMAIL_OWNER;
  const subject = `CS Order from ${data.name}`;
  const body = `
    <h1>New order from ${data.name}</h1>
    <hr />
    <p>Name: ${data.name}</p>
    <p>Email: ${data.email}</p>
    <p>Phone number: ${data.phoneNumber}</p>
    <p>Address:</p>
    <p>${data.address}</p>
    <p>${data.postalCode}, ${data.city}</p>
    <p>Order: € ${toCurrency(data.total)}</p>
    <p>${data.order}</p>
    <p></p>
  `;

  try {
    const feedback = await mailer(toEmail, subject, body);

    if (feedback.status === 'error') {
      throw new Error(feedback.message);
    } else {
      return {
        status: 'success',
        message: 'Email sent succesfully',
      };
    }
  } catch (error) {
    console.log(error);

    return error;
  }
};

export default contactAdminAction;
