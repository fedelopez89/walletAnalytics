import React, { useContext, useState } from "react";
// Styles
import {
  Button,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CloseIcon from "@material-ui/icons/Close";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
// Store
import ExchangeContext from "../../store/exchange-provider";

const useStyles = makeStyles({
  root: {
    "& > *": {
      borderStyle: "solid",
      border: 0,
      "&h4": {
        fontWeight: 900,
      },
    },
  },
});

const AccountInfo = () => {
  const classes = useStyles();
  const [sortFavActive, setsortFavActive] = useState(false);
  const exchangeCtx = useContext(ExchangeContext);

  if (exchangeCtx.walletAddresses.length === 0) return null;

  const handleCloseEthAddress = (address) => {
    exchangeCtx.signOutAccount(address);
  };

  const handleTagFavorite = (address) => {
    exchangeCtx.tagFavoriteAccount(address);
  };

  const clickonSortFav = () => {
    exchangeCtx.sortAccountBy(sortFavActive);
    setsortFavActive((prevState) => !prevState);
  };

  const handleCurrencyChange = (value, address) => {
    exchangeCtx.changeAccountCurrency(address, value);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{ background: "rgb(224 224 224)" }}>
          <TableRow className={classes.root}>
            <TableCell align="center">
              <h4>ID</h4>
            </TableCell>
            <TableCell align="center">
              <h4>Account Adress</h4>
            </TableCell>
            <TableCell align="center">
              <h4>Currency</h4>
            </TableCell>
            <TableCell align="center">
              <h4>Balance</h4>
            </TableCell>
            <TableCell align="center">
              <h4>Age</h4>
            </TableCell>
            <TableCell align="center">
              {exchangeCtx.walletAddresses.filter(
                ({ favorite }) => favorite === true
              ).length > 0 ? (
                sortFavActive ? (
                  <Button onClick={clickonSortFav}>
                    <KeyboardArrowDownIcon />
                  </Button>
                ) : (
                  <Button onClick={clickonSortFav}>
                    <KeyboardArrowUpIcon />
                  </Button>
                )
              ) : null}
            </TableCell>
            <TableCell align="center">
              <h4></h4>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exchangeCtx.walletAddresses.map(
            ({ address, balance, currency, favorite, isOld }, id) => (
              <TableRow className={classes.root} key={address}>
                <TableCell component="th" scope="row" align="center">
                  {id + 1}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {address}
                </TableCell>
                <TableCell align="center">
                  <Select
                    onChange={(event) =>
                      handleCurrencyChange(event.target.value, address)
                    }
                    value={currency}
                    style={{ width: "100px", color: "black" }}
                  >
                    <MenuItem value="usd">USD</MenuItem>
                    <MenuItem value="eth">ETH</MenuItem>
                    <MenuItem value="eur">EUR</MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="right">{balance.displayBalance}</TableCell>
                <TableCell align="center">
                  {isOld ? (
                    <div
                      style={{
                        backgroundColor: "rgb(250 147 147)",
                        color: "darkred",
                        padding: "15px",
                      }}
                    >
                      is old!
                    </div>
                  ) : null}
                </TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleTagFavorite(address)}>
                    {favorite ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderOutlinedIcon />
                    )}
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleCloseEthAddress(address)}>
                    <CloseIcon />
                  </Button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AccountInfo;
