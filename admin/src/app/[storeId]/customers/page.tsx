import { getCustomers } from '@server/customers';
import CustomerClient from '@components/customers/CustomerClient';
import { TCustomerColumn } from '@components/customers/CustomerColumn';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type PageProps = {
  params: {
    storeId: string;
  };
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const CustomersPage: React.FC<PageProps> = async ({ params }) => {
  const customers = await getCustomers(params.storeId);

  const formattedCustomers: TCustomerColumn[] = customers.map((customer) => ({
    id: customer.id,
    name: `${customer.firstName} ${customer.lastName}`,
    email: customer.email,
    orders: customer.firstName.length,
    createdAt: customer.createdAt.toDateString(),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CustomerClient data={formattedCustomers} />
      </div>
    </div>
  );
};

export default CustomersPage;
