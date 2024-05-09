import prisma from '@utils/prisma';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type GraphData = {
  name: string;
  total: number;
};

//##########################################################################################
// CALCULATE TOTAL REVENUE
//##########################################################################################
export const calcTotalRevenue = async (storeId: string) => {
  const totalRevenue = 0;

  return totalRevenue;
};
//##########################################################################################
// GET STOCK COUNT
//##########################################################################################
export const getStockCount = async (storeId: string) => {
  const stockCount = 10;

  return stockCount;
};

//##########################################################################################
// GET SALES COUNT
//##########################################################################################
export const getSalesCount = async (storeId: string) => {
  const salesCount = 100;

  return salesCount;
};

//##########################################################################################
// GET GRAPH REVENUE
//##########################################################################################
export const getGraphRevenue = async (
  storeId: string
): Promise<GraphData[]> => {
  // Converting the grouped data into the format expected by the graph
  const graphData: GraphData[] = [
    { name: 'Jan', total: 0 },
    { name: 'Feb', total: 0 },
    { name: 'Mar', total: 0 },
    { name: 'Apr', total: 0 },
    { name: 'May', total: 0 },
    { name: 'Jun', total: 0 },
    { name: 'Jul', total: 0 },
    { name: 'Aug', total: 0 },
    { name: 'Sep', total: 0 },
    { name: 'Oct', total: 0 },
    { name: 'Nov', total: 0 },
    { name: 'Dec', total: 0 },
  ];

  return graphData;
};

export default calcTotalRevenue;
