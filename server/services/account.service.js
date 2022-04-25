import fetch from "node-fetch";

const APIKEY = "NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY";

export async function getAccountBalance(address) {
  const apiUrl = "https://api.etherscan.io/api";
  const url = `${apiUrl}?module=account&action=balance&address=${address}&tag=latest&apikey=${APIKEY}`;
  try {
    const response = await fetch(url);
    const accountBalance = await response.json();
    return accountBalance;
  } catch (error) {
    console.log(`Error on getAPI: ${error}`);
  }
}

export async function getListNormalTrx(address) {
  const apiUrl = "https://api.etherscan.io/api";
  const url = `${apiUrl}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${APIKEY}`;
  try {
    const response = await fetch(url);
    const normalTrxResponse = await response.json();
    return normalTrxResponse.result;
  } catch (error) {
    console.log(`Error on getAPI: ${error}`);
  }
}
