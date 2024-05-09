'use client';

import useOrigin from '@hooks/useOrigin';
import { useParams } from 'next/navigation';
import ApiAlert from '@components/ui/ApiAlert';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type ApiListProps = {
  entityName: string;
  entityIdName: string;
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const ApiList: React.FC<ApiListProps> = ({ entityName, entityIdName }) => {
  const origin = useOrigin();
  const { storeId } = useParams();

  const baseUrl = `${origin}/api/${storeId}`;

  return (
    <div className='flex flex-col gap-3'>
      <ApiAlert
        title='GET'
        variant='public'
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title='GET'
        variant='public'
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title='Post'
        variant='admin'
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title='PATCH'
        variant='admin'
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title='DELETE'
        variant='admin'
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </div>
  );
};

export default ApiList;
