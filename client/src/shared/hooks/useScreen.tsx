'use client';

import { useState, useEffect } from 'react';

//##########################################################################################
// USE SCREEN HOOK
//##########################################################################################
const useScreen = () => {
  const IPadScreen = 1251;
  const MobileScreen = 834; //834;
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth < IPadScreen ? setIsTablet(true) : setIsTablet(false);
      window.innerWidth < MobileScreen ? setIsMobile(true) : setIsMobile(false);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return [isMobile, isTablet];
};

export default useScreen;
