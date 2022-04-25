import React, { useContext } from "react";
// Store
import ExchangeContext from "../../store/exchange-provider";
// Styles
import { Button, TextField } from "@mui/material";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";

const CONST_EXCHANGE_RATE = `Exchange Rate (to ETH)`;

const ExchangeRate = () => {
  const exchangeCtx = useContext(ExchangeContext);

  const handleOnChangeCurrency = (currency, value) => {
    return exchangeCtx.changeCurrency(currency, value);
  };

  const handleCancelEdit = (currency) => {
    exchangeCtx.cancelEditCurrency(currency);
  };

  const handleSaveEdit = (currency) => {
    exchangeCtx.saveEditCurrency(currency);
  };

  const handleOnEdit = (currency) => {
    exchangeCtx.editCurrency(currency);
  };

  return (
    <section>
      <h3 className="h3_title--margin-top">{CONST_EXCHANGE_RATE}</h3>
      <ul>
        {exchangeCtx.currencyRateList.map(
          ({ currency, displayRate, editDisabled, inputError }) => (
            <li key={currency} style={{ marginBottom: "10px" }}>
              <TextField
                disabled={true}
                size="small"
                style={{ marginRight: "15px", width: "20%" }}
                value={currency}
              />
              <TextField
                error={inputError}
                label={inputError ? "Invalid rate - format 99.99" : null}
                disabled={editDisabled}
                onChange={(event) =>
                  handleOnChangeCurrency(currency, event.target.value)
                }
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
