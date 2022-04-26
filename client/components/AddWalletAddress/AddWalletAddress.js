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
const ERROR_DUPLICATE_ADDRESS = "Error! Address is already added";

const AddWalletAddress = ({ onLoadingData }) => {
  const [address, setAddress] = useState("");
  const exchangeContext = useContext(ExchangeContext);
  const [inputError, setInputError] = useState({ value: false, msgError: "" });

  const handleOnChangeEvent = (event) => {
    if (inputError.value) {
      setInputError({ value: false, msgError: "" });
    }
    setAddress(event.target.value);
  };

  const handleOnClick = async () => {
    onLoadingData(true);
    const response = await getAccountBalance(address);
    if (response.status != 1) {
      setAddress("");
      onLoadingData(false);
      return setInputError({ value: true, msgError: ERROR_INVALID_ADDRESS });
    }
    if (
      exchangeContext.walletAddresses.filter(
        (account) => account.address === address
      ).length > 0
    ) {
      setAddress("");
      onLoadingData(false);
      return setInputError({ value: true, msgError: ERROR_DUPLICATE_ADDRESS });
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
        error={inputError.value}
        label={inputError.value ? inputError.msgError : INPUT_PLACEHOLDER}
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
