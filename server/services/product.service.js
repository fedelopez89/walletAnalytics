export async function getProducts() {
  try {
    const response = fetch(
      `https://api.etherscan.io/api?module=account&action=balancemulti&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a,0x63a9975ba31b0b9626b34300f7f627147df1f526,0x198ef1ec325a96cc354c7266a038be8b5c558f67&tag=latest&apikey=NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY`
    );
    console.log(`OK RESPONSE: ${response}`);
    return response.data;
  } catch (error) {
    console.log(`Error on getAPI: ${error}`);
  }
}
