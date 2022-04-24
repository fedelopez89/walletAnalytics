import React, { useState, useEffect } from "react";
// Styles
import { Button, TextField } from "@mui/material";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";

const CONST_EXCHANGE_RATE = `Exchange Rate`;
const currencyRateList = [
  {
    currency: "USD",
    rate: "200.10",
    displayRate: "200.10",
    editDisabled: true,
  },
  {
    currency: "EUR",
    rate: "399.10",
    displayRate: "399.10",
    editDisabled: true,
  },
];

const ExchangeRate = () => {
  const [exchangeRateList, setExchangeRateList] = useState([]);

  useEffect(() => {
    setExchangeRateList(currencyRateList);
  }, [])
  
  const handleOnChangeCurrency = (currency, event) => {
    const selectedCurrencyIndex = exchangeRateList.findIndex(
      (currencyRate) => currencyRate.currency === currency
    );
    const updateCurrencyRates = [...exchangeRateList];
    updateCurrencyRates[selectedCurrencyIndex].displayRate = event.target.value;
    setExchangeRateList(updateCurrencyRates);
  };

  const handleCancelEdit = (currency) => {
    const selectedCurrencyIndex = exchangeRateList.findIndex(
      (currencyRate) => currencyRate.currency === currency
    );
    const updateCurrencyRates = [...exchangeRateList];
    updateCurrencyRates[selectedCurrencyIndex].displayRate =
      updateCurrencyRates[selectedCurrencyIndex].rate;
    updateCurrencyRates[selectedCurrencyIndex].editDisabled = true;
    setExchangeRateList(updateCurrencyRates);
  };

  const handleSaveEdit = (currency) => {
    const selectedCurrencyIndex = exchangeRateList.findIndex(
      (currencyRate) => currencyRate.currency === currency
    );
    const updateCurrencyRates = [...exchangeRateList];
    updateCurrencyRates[selectedCurrencyIndex].rate =
      updateCurrencyRates[selectedCurrencyIndex].displayRate;
    updateCurrencyRates[selectedCurrencyIndex].editDisabled = true;
    setExchangeRateList(updateCurrencyRates);
  };

  const handleOnEdit = (currency) => {
    const selectedCurrencyIndex = exchangeRateList.findIndex(
      (currencyRate) => currencyRate.currency === currency
    );
    const updateCurrencyRates = [...exchangeRateList];
    updateCurrencyRates[selectedCurrencyIndex].editDisabled = false;
    setExchangeRateList(updateCurrencyRates);
  };

  return (
    <section>
      <h3 className="h3_title--margin-top">{CONST_EXCHANGE_RATE}</h3>
      <ul>
        {exchangeRateList.map(
          ({ currency, rate, displayRate, editDisabled }) => (
            <li key={currency} style={{ marginBottom: "10px" }}>
              <TextField
                disabled={true}
                size="small"
                style={{ marginRight: "15px", width: "20%" }}
                value={currency}
              />
              <TextField
                disabled={editDisabled}
                onChange={(event) => handleOnChangeCurrency(currency, event)}
                size="small"
                value={displayRate}
              />
              {editDisabled ? (
                <Button
                  color="primary"
                  onClick={() => handleOnEdit(currency)}
                  style={{ marginLeft: "1%", padding: "8px" }}
                  size="small"
                  variant="text"
                >
                  <EditIcon />
                </Button>
              ) : (
                <>
                  <Button
                    color="primary"
                    onClick={() => handleCancelEdit(currency)}
                    style={{ marginLeft: "1%", padding: "8px" }}
                    size="small"
                    variant="text"
                  >
                    <CloseIcon />
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => handleSaveEdit(currency)}
                    style={{ marginLeft: "1%", padding: "8px" }}
                    size="small"
                    variant="text"
                  >
                    <DoneIcon />
                  </Button>
                </>
              )}
            </li>
          )
        )}
      </ul>
    </section>
  );
};

export default ExchangeRate;
