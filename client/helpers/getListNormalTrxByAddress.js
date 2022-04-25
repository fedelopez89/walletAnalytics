import "regenerator-runtime/runtime";

export const getListNormalTrxByAddress = async (address) => {
  const DOMAIN_LOCAL = "http://localhost:3000";
  // const DOMAIN_TEST = "https://api.etherscan.io";
  const url = `${DOMAIN_LOCAL}/api/v1/account/listtrx/${address}`;
  
  try {
    const response = await fetch(url);
    const listNormalTrx = await response.json();
    return listNormalTrx;
  } catch (error) {
    console.error(error);
  }
};
