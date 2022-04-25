import React, { useContext, useState } from "react";
import { Button, TextField } from "@mui/material";
// Helpers
import { getAccountBalance } from "../../helpers/getAccountBalance";
import { getListNormalTrxByAddress } from "../../helpers/getListNormalTrxByAddress";
import { walletAddressIsOld } from "../../helpers/walletAddressIsOld";
// Store
import ExchangeContext from "../../store/exchange-provider";

// Eth Address examples:
// 0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae
// 0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a
// 0x63a9975ba31b0b9626b34300f7f627147df1f526
// 0x198ef1ec325a96cc354c7266a038be8b5c558f67
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
