import "regenerator-runtime/runtime";

export const getAccountBalance = async (address) => {
  // const apiUrl = process.env.PORT || "http://localhost:3000";
  const apiUrl = "https://api.etherscan.io/api";
  const apiKey = "NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY";
  const url = `${apiUrl}?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;
  // https://api.etherscan.io/api?module=account&action=balance&address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae&tag=latest&apikey=NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY

  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
