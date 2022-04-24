import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
// Utils
import PropTypes from "prop-types";

// 0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae
// 0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a
// 0x63a9975ba31b0b9626b34300f7f627147df1f526
// 0x198ef1ec325a96cc354c7266a038be8b5c558f67
const INPUT_PLACEHOLDER = "Ethereum Address";

const AddWalletAddress = ({ onAddWalletAddress }) => {
  const [address, setAddress] = useState("");
  const [inputError, setInputError] = useState(true);

  const handleOnChangeEvent = (event) => {
    setAddress(event.target.value);
  };

  const handleOnClick = () => {
    onAddWalletAddress(address);
    setAddress("");
  };

  useEffect(() => {
    setTimeout(() => {
      setInputError(false);
    }, 1500);
  }, [])
  
  return (
    <section style={{ width: "55%" }}>
      <h3 className="h3_title--margin-top">Load Account</h3>
      <TextField
        error={inputError}
        label={inputError?"Invalid Etherum Address!":INPUT_PLACEHOLDER}
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

AddWalletAddress.propTypes = {
  onAddWalletAddress: PropTypes.func.isRequired,
};

export default AddWalletAddress;
