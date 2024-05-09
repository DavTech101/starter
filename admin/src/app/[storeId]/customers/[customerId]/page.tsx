import { getCustomerById } from '@server/customers';
import CustomerForm from '@components/customers/CustomerForm';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type PageProps = {
  params: {
    customerId: string;
  };
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const CustomerPage: React.FC<PageProps> = async ({ params }) => {
  const customer = await getCustomerById(params.customerId);

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CustomerForm initialData={customer} />
      </div>
    </div>
  );
};

export default CustomerPage;
