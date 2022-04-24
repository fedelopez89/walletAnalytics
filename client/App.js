import React, { useState } from "react";
// Components
import AccountInfo from "./components/AccountInfo/AccountInfo";
import AddWalletAddress from "./components/AddWalletAddress/AddWalletAddress";
import ExchangeRate from "./components/ExchangeRate/ExchangeRate";
import Header from "./components/Header/Header";
// Helpers
import { getAccountBalance } from "./helpers/getAccountBalance";
import { walletAddressIsOld } from "./helpers/walletAddressIsOld";
// Styles
import "./App.css";
import { Container } from "@mui/material";

const apiUrl = process.env.PORT || "http://localhost:3000";

function App() {
  const [walletAddresses, setWalletAddresses] = useState([]);
  const [accountLoaded, setAccountLoaded] = useState(0);

  const handleChangeCurrency = (address, newCurrency) => {
    const selectedAddressIndex = walletAddresses.findIndex(
      (walletAddress) => walletAddress.address === address
    );
    const updateWalletAddresses = [...walletAddresses];
    updateWalletAddresses[selectedAddressIndex].currency = newCurrency;
    if (newCurrency === "eth") {
      updateWalletAddresses[selectedAddressIndex].balance.displayBalance = (
        updateWalletAddresses[selectedAddressIndex].balance.weiBalance *
        Math.pow(10, -18)
      ).toFixed(2);
    }
    if (newCurrency === "usd") {
      updateWalletAddresses[selectedAddressIndex].balance.displayBalance = (
        updateWalletAddresses[selectedAddressIndex].balance.weiBalance *
        Math.pow(10, -19)
      ).toFixed(2);
    }
    if (newCurrency === "eur") {
      updateWalletAddresses[selectedAddressIndex].balance.displayBalance = (
        updateWalletAddresses[selectedAddressIndex].balance.weiBalance *
        Math.pow(10, -20)
      ).toFixed(2);
    }
    setWalletAddresses(updateWalletAddresses);
  };

  const handleSignOut = (address) => {
    const updateWalletAddresses = walletAddresses.filter(
      (walletAddress) => walletAddress.address != address
    );
    setWalletAddresses(updateWalletAddresses);
  };

  const handleSortFav = (isFavSorted) => {
    isFavSorted
      ? setWalletAddresses(
          walletAddresses.sort((a, b) => b.idLoaded - a.idLoaded)
        )
      : setWalletAddresses(
          walletAddresses.sort((a, b) => b.favorite - a.favorite)
        );
  };

  const handleTagFavorite = (address) => {
    const selectedAddressIndex = walletAddresses.findIndex(
      (walletAddress) => walletAddress.address === address
    );
    const updateWalletAddresses = [...walletAddresses];
    updateWalletAddresses[selectedAddressIndex].favorite =
      !updateWalletAddresses[selectedAddressIndex].favorite;
    setWalletAddresses(updateWalletAddresses);
  };

  const getAccountLoadedNumber = () => {
    setAccountLoaded((prevState) => prevState + 1);
    return accountLoaded;
  };

  const addWalletAddress = async (address) => {
    const response = await getAccountBalance(address);
    if (response.status != 1) return;
    const isOld = await walletAddressIsOld(address);
    setWalletAddresses((prevState) => [
      ...prevState,
      {
        address,
        balance: {
          weiBalance: response.result,
          displayBalance: (response.result * Math.pow(10, -18)).toFixed(2),
        },
        favorite: false,
        currency: "eth",
        idLoaded: getAccountLoadedNumber(),
        isOld,
      },
    ]);
  };

  const walletAddressesList =
    walletAddresses.length === 0 ? (
      <p style={{ fontStyle: "italic" }}>
        There is no Ethereum adresses added within the wallet. Please, add one.
      </p>
    ) : (
      <AccountInfo
        walletAddresses={walletAddresses}
        onChangeCurrency={handleChangeCurrency}
        onSignOut={handleSignOut}
        onSortFav={handleSortFav}
        onTagFav={handleTagFavorite}
      />
    );

  return (
    <div className="App">
      <Header classesName="App-header" titleName="Wallet Analytics" />
      <main className="App-main">
        <Container>
          <div className="loading-section">
            <AddWalletAddress onAddWalletAddress={addWalletAddress} />
            <ExchangeRate />
          </div>
          <div>
            <h3 className="h3_title--margin-top">Wallet Adresses</h3>
            {walletAddressesList}
          </div>
        </Container>
      </main>
    </div>
  );
}

export default App;
