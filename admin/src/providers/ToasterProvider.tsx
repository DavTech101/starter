'use client';

import { Toaster } from 'react-hot-toast';
import useIsMounted from '@hooks/useIsMounted';

//##########################################################################################
// COMPONENT
//##########################################################################################
const ToasterProvider: React.FC = () => {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return <Toaster />;
};

export default ToasterProvider;
