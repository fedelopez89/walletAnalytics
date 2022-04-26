import React, { useContext, useState } from "react";
import { Button, TextField } from "@mui/material";
// Helpers
import { getAccountBalance } from "../../helpers/getAccountBalance";
import { getListNormalTrxByAddress } from "../../helpers/getListNormalTrxByAddress";
import { walletAddressIsOld } from "../../helpers/walletAddressIsOld";
// Store
import ExchangeContext from "../../store/exchange-provider";

const INPUT_PLACEHOLDER = "Ethereum Address";
const ERROR_INVALID_ADDRESS = "Error! Invalid address format";

const AddWalletAddress = ({ onLoadingData }) => {
  const [address, setAddress] = useState("");
  const exchangeContext = useContext(ExchangeContext);
  const [inputError, setInputError] = useState(false);

  const handleOnChangeEvent = (event) => {
    if (inputError) {
      setInputError(false);
    }
    setAddress(event.target.value);
  };

  const handleOnClick = async () => {
    onLoadingData(true);
    const response = await getAccountBalance(address);
    if (response.status != 1) {
      setAddress("");
      onLoadingData(false);
      return setInputError(true);
    }
    const listNormalTrx = await getListNormalTrxByAddress(address);
    const isOld = walletAddressIsOld(listNormalTrx[0].timeStamp);
    onLoadingData(false);
    const account = { address, weiBalance: response.result, isOld };
    exchangeContext.addNewAddressAccount(account);
    setAddress("");
  };

  return (
    <section style={{ width: "55%" }}>
      <h3 className="h3_title--margin-top">Load Account</h3>
      <TextField
        error={inputError}
        label={inputError ? ERROR_INVALID_ADDRESS : INPUT_PLACEHOLDER}
        onChange={handleOnChangeEvent}
        value={address}
        style={{ width: "75%" }}
      />
      <Button
        color="primary"
        onClick={handleOnClick}
        style={{ marginLeft: "1%", padding: "16px 25px" }}
        variant="contained"
      >
        Add
      </Button>
    </section>
  );
};

export default AddWalletAddress;
