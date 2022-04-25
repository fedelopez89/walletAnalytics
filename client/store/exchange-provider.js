import React from "react";

const ExchangeContext = React.createContext({
  currencyRateList: [
    {
      currency: "",
      rate: "",
      displayRate: "",
      editDisabled: true,
    },
  ],
  walletAddresses: [
    {
      address: "",
      balance: {
        weiBalance: "",
        displayBalance: "",
      },
      currency: "",
      favorite: false,
      countLoaded: 0,
      isOld: false,
    },
  ],
  addNewAddressAccount: (address) => [{}],
  changeAccountCurrency: (address, currency) => [{}],
  tagFavoriteAccount: (address) => [{}],
  signOutAccount: (address) => [{}],
  sortAccountBy: (isSortActive) => [{}],
  changeCurrency: (currency, value) => [{}],
  cancelEditCurrency: (currency) => [{}],
  editCurrency: (currency) => [{}],
  saveEditCurrency: (currency) => [{}],
});

export default ExchangeContext;
