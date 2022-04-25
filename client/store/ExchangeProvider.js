import React, { useReducer } from "react";
import ExchangeContext from "./exchange-provider";

const defaultAccountState = {
  countLoaded: 0,
  currencyRateList: [
    {
      currency: "USD",
      rate: "2808.85",
      displayRate: "2808.85",
      editDisabled: true,
      inputError: false,
    },
    {
      currency: "EUR",
      rate: "2614.79",
      displayRate: "2614.79",
      editDisabled: true,
      inputError: false,
    },
  ],
  walletAddresses: [],
};

const accountReducer = (state, action) => {
  /* Account Functions */
  if (action.type === "ADD_ACCOUNT") {
    const { address, weiBalance, isOld } = action.account;
    const updCountLoaded = state.countLoaded + 1;
    const newAccount = {
      address,
      balance: {
        weiBalance,
        displayBalance: (weiBalance * Math.pow(10, -18)).toFixed(2),
      },
      favorite: false,
      currency: "eth",
      countLoaded: updCountLoaded,
      isOld,
    };
    return {
      ...state,
      countLoaded: updCountLoaded,
      walletAddresses: [...state.walletAddresses, newAccount],
    };
  }
  if (action.type === "CHANGE_ACCOUNT_CURRENCY") {
    const selectedAddressIndex = state.walletAddresses.findIndex(
      (walletAddress) => walletAddress.address === action.address
    );
    const updateWalletAddresses = [...state.walletAddresses];
    updateWalletAddresses[selectedAddressIndex].currency = action.newCurrency;
    const normalizeWeiToEth =
      updateWalletAddresses[selectedAddressIndex].balance.weiBalance *
      Math.pow(10, -18);
    if (action.newCurrency === "eth") {
      updateWalletAddresses[selectedAddressIndex].balance.displayBalance =
        normalizeWeiToEth.toFixed(2);
    } else {
      const rateNewCurrency = state.currencyRateList?.find(
        (curr) => curr.currency === action.newCurrency.toLocaleUpperCase()
      ).rate;
      if (!rateNewCurrency) {
        rateNewCurrency = 1;
      }
      updateWalletAddresses[selectedAddressIndex].balance.displayBalance = (
        normalizeWeiToEth * rateNewCurrency
      ).toFixed(2);
    }
    return {
      ...state,
      walletAddresses: updateWalletAddresses,
    };
  }
  if (action.type === "SIGN_OUT_ACCOUNT") {
    const updateWalletAddresses = state.walletAddresses.filter(
      (walletAddress) => walletAddress.address != action.address
    );
    return {
      ...state,
      walletAddresses: updateWalletAddresses,
    };
  }
  if (action.type === "SORT_ACCOUNT_BY") {
    const updateWalletAddresses = [...state.walletAddresses];
    if (action.isSortActive) {
      updateWalletAddresses.sort((a, b) => b.countLoaded - a.countLoaded);
    } else {
      updateWalletAddresses.sort((a, b) => b.favorite - a.favorite);
    }
    return {
      ...state,
      walletAddresses: updateWalletAddresses,
    };
  }
  if (action.type === "TAG_FAV_ACCOUNT") {
    const selectedAddressIndex = state.walletAddresses.findIndex(
      (walletAddress) => walletAddress.address === action.address
    );
    const updateWalletAddresses = [...state.walletAddresses];
    updateWalletAddresses[selectedAddressIndex].favorite =
      !updateWalletAddresses[selectedAddressIndex].favorite;
    return {
      ...state,
      walletAddresses: updateWalletAddresses,
    };
  }
  /* ExchangeRate Functions */
  if (action.type === "CHANGE_CURRENCY") {
    const currencyValidationPattern = /^-?\d+\.?\d*$/;
    const re = RegExp(currencyValidationPattern);
    const updateCurrencyRates = [...state.currencyRateList];
    const selectedCurrencyIndex = state.currencyRateList.findIndex(
      (currencyRate) => currencyRate.currency === action.currency
    );
    updateCurrencyRates[selectedCurrencyIndex].displayRate = action.value;
    if (
      action.value &&
      action.value.length &&
      action.value > 0 &&
      re.test(action.value)
    ) {
      updateCurrencyRates[selectedCurrencyIndex].inputError = false;
    } else {
      updateCurrencyRates[selectedCurrencyIndex].inputError = true;
    }
    return {
      ...state,
      currencyRateList: updateCurrencyRates,
    };
  }
  if (action.type === "CANCEL_EDIT_CURRENCY") {
    const selectedCurrencyIndex = state.currencyRateList.findIndex(
      (currencyRate) => currencyRate.currency === action.currency
    );
    const updateCurrencyRates = [...state.currencyRateList];
    updateCurrencyRates[selectedCurrencyIndex].displayRate =
      updateCurrencyRates[selectedCurrencyIndex].rate;
    updateCurrencyRates[selectedCurrencyIndex].inputError = false;
    updateCurrencyRates[selectedCurrencyIndex].editDisabled = true;
    return {
      ...state,
      currencyRateList: updateCurrencyRates,
    };
  }
  if (action.type === "SAVE_EDIT_CURRENCY") {
    const selectedCurrencyIndex = state.currencyRateList.findIndex(
      (currencyRate) => currencyRate.currency === action.currency
    );
    const updateCurrencyRates = [...state.currencyRateList];
    if (updateCurrencyRates[selectedCurrencyIndex].inputError) {
      updateCurrencyRates[selectedCurrencyIndex].displayRate =
        updateCurrencyRates[selectedCurrencyIndex].rate;
    } else {
      updateCurrencyRates[selectedCurrencyIndex].rate =
        updateCurrencyRates[selectedCurrencyIndex].displayRate;
    }
    updateCurrencyRates[selectedCurrencyIndex].inputError = false;
    updateCurrencyRates[selectedCurrencyIndex].editDisabled = true;
    // Update AccountDisplays
    const updateWalletAddresses = [...state.walletAddresses];
    const updateDisplayBalance = (currency, value, originBalance) => {
      const normalizeWeiToEth = originBalance * Math.pow(10, -18);
      if (currency === "eth") {
        return normalizeWeiToEth.toFixed(2);
      } else {
        return (normalizeWeiToEth * value).toFixed(2);
      }
    };
    updateWalletAddresses.map((accountAddress) =>
      accountAddress.currency.toLocaleUpperCase() ===
      action.currency.toLocaleUpperCase()
        ? (accountAddress.balance.displayBalance = updateDisplayBalance(
            accountAddress.currency,
            updateCurrencyRates[selectedCurrencyIndex].rate,
            accountAddress.balance.weiBalance
          ))
        : null
    );
    return {
      ...state,
      currencyRateList: updateCurrencyRates,
      walletAddresses: updateWalletAddresses,
    };
  }
  if (action.type === "EDIT_CURRENCY") {
    const selectedCurrencyIndex = state.currencyRateList.findIndex(
      (currencyRate) => currencyRate.currency === action.currency
    );
    const updateCurrencyRates = [...state.currencyRateList];
    updateCurrencyRates[selectedCurrencyIndex].editDisabled = false;
    return {
      ...state,
      currencyRateList: updateCurrencyRates,
    };
  }
  return defaultAccountState;
};

const ExchangeProvider = (props) => {
  const [accountState, dispatchAccountAction] = useReducer(
    accountReducer,
    defaultAccountState
  );

  /* AddressAccount Functions */
  const addNewAddressAccountHandler = (newAccount) => {
    dispatchAccountAction({
      type: "ADD_ACCOUNT",
      account: newAccount,
    });
  };

  const changeAccountCurrencyHandler = (address, currency) => {
    dispatchAccountAction({
      type: "CHANGE_ACCOUNT_CURRENCY",
      address: address,
      newCurrency: currency,
    });
  };

  const signOutAccountHandler = (address) => {
    dispatchAccountAction({
      type: "SIGN_OUT_ACCOUNT",
      address: address,
    });
  };

  const sortAccountByHandler = (isSortActive) => {
    dispatchAccountAction({
      type: "SORT_ACCOUNT_BY",
      isSortActive: isSortActive,
    });
  };

  const tagFavoriteAccountHandler = (address) => {
    dispatchAccountAction({
      type: "TAG_FAV_ACCOUNT",
      address: address,
    });
  };

  /* Exchange Functions */
  const changeCurrencyToListHandler = (currency, value) => {
    dispatchAccountAction({
      type: "CHANGE_CURRENCY",
      currency: currency,
      value: value,
    });
  };

  const cancelEditCurrencyToListHandler = (currency) => {
    dispatchAccountAction({
      type: "CANCEL_EDIT_CURRENCY",
      currency: currency,
    });
  };

  const editCurrencyToListHandler = (currency) => {
    dispatchAccountAction({
      type: "EDIT_CURRENCY",
      currency: currency,
    });
  };

  const saveEditCurrencyToListHandler = (currency) => {
    dispatchAccountAction({
      type: "SAVE_EDIT_CURRENCY",
      currency: currency,
    });
  };

  const exchangeContext = {
    currencyRateList: accountState.currencyRateList,
    walletAddresses: accountState.walletAddresses,
    addNewAddressAccount: addNewAddressAccountHandler,
    changeAccountCurrency: changeAccountCurrencyHandler,
    tagFavoriteAccount: tagFavoriteAccountHandler,
    signOutAccount: signOutAccountHandler,
    sortAccountBy: sortAccountByHandler,
    changeCurrency: changeCurrencyToListHandler,
    cancelEditCurrency: cancelEditCurrencyToListHandler,
    editCurrency: editCurrencyToListHandler,
    saveEditCurrency: saveEditCurrencyToListHandler,
  };

  return (
    <ExchangeContext.Provider value={exchangeContext}>
      {props.children}
    </ExchangeContext.Provider>
  );
};

export default ExchangeProvider;
