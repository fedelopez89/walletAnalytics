import "regenerator-runtime/runtime";

export const getAccountBalance = async (address) => {
  const DOMAIN_LOCAL = "http://localhost:3000";
  // const DOMAIN_TEST = "https://api.etherscan.io";
  const url = `${DOMAIN_LOCAL}/api/v1/account/${address}`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
