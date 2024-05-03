'use client';

import { useEffect, useState } from 'react';

//##########################################################################################
// HYDRATION CHECK - Check if the component is mounted
//##########################################################################################
const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
};

export default useIsMounted;
