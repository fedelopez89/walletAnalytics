import "regenerator-runtime/runtime";

export const walletAddressIsOld = async (address) => {
  // const apiUrl = process.env.PORT || "http://localhost:3000";
  const apiUrl = "https://api.etherscan.io/api";
  const apiKey = "NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY";
  const url = `${apiUrl}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const { result } = await response.json();
    const date = new Date();
    const dateLessOneYear = Math.floor(
      date.setMonth(date.getMonth() - 12) / 1000
    );
    return result[0].timeStamp <= dateLessOneYear;
  } catch (error) {
    console.error(error);
  }
};
