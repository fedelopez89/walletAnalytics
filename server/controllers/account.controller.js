import {
  getAccountBalance,
  getListNormalTrx,
} from "../services/account.service.js";

export async function controllerGetAccountBalance(req, res) {
  try {
    const { address } = req.params;
    const accountBalance = await getAccountBalance(address);
    return res.status(200).send(accountBalance);
  } catch (error) {
    return res.status(500).send(`Error: ${error.message}`);
  }
}

export async function controllerGetListNormalTrx(req, res) {
  try {
    const { address } = req.params;
    const listNormalTrx = await getListNormalTrx(address);
    return res.status(200).send(listNormalTrx);
  } catch (error) {
    return res.status(500).send(`Error: ${error.message}`);
  }
}
