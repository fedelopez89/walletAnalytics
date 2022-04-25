import React, { useContext } from "react";
// Components
import AccountInfo from "./components/AccountInfo/AccountInfo";
import AddWalletAddress from "./components/AddWalletAddress/AddWalletAddress";
import ExchangeRate from "./components/ExchangeRate/ExchangeRate";
import Header from "./components/Header/Header";
// Styles
import "./App.css";
import { Container } from "@mui/material";
// Store
import ExchangeContext from "./store/exchange-provider";

const apiUrl = process.env.PORT || "http://localhost:3000";

function App() {
  const exchangeContext = useContext(ExchangeContext);

  const warningEmptyList = exchangeContext.walletAddresses.length === 0 && (
    <p style={{ fontStyle: "italic" }}>
      There is no Ethereum adresses added within the wallet. Please, add one.
    </p>
  );

  return (
    <div className="App">
      <Header classesName="App-header" titleName="Wallet Analytics" />
      <main className="App-main">
        <Container>
          <div className="loading-section">
            <AddWalletAddress />
            <ExchangeRate />
          </div>
          <div>
            <h3 className="h3_title--margin-top">Wallet Adresses</h3>
            {warningEmptyList}
            <AccountInfo />
          </div>
        </Container>
      </main>
    </div>
  );
}

export default App;
