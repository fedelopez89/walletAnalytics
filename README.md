## Securitize Challenge - Wallet Analytics
(By fede.lopez89@gmail.com)

# Objective

Build a generic platform that return analytics on Ethereum wallets.

# How to run App

1. Git clone project
2. npm install
3. Run on terminal: `node server.js`
4. Open browser and go to LOCALHOST (http://localhost:3000/) to see FrontEnd App.
5. Ready to test App :)

# Tools

To get information on Ethereum wallet please use https://etherscan.io/apis.
API Key: `NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY`

# Requirements

The application have the following requirements:

1. Add wallet addresses and display them.

2. From the set of wallets, the user should be able to select favorites and order by them.

3. We should have a way to know if a wallet is old. A wallet is considered old if the first
transaction was performed at least one year ago.

4. The user should be able to do the following actions -
a. Get exchange rates from Euro and US Dollar to ETH (Ethereum), those can be stored in-memory or in any DB of your preference.
b. Edit the exchange rate of Euro or US Dollar to ETH.

3. Given a currency (Euro or US Dollar) then the user should have the balance of the ETH in the wallet in the selected currency using the exchange rates from step 4.

# Endpoints

## Wallet

- `GET /api/v1/account/:address` to get the balance account of a specific address eth account.

- `GET /api/v1/account/listtrx/:address` to get a list of the Normal transaccions for a specific address eth account.


## Testing

Any of the following Ethereum Addresses can be use to test the App.

- 0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae
- 0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a
- 0x63a9975ba31b0b9626b34300f7f627147df1f526
- 0x198ef1ec325a96cc354c7266a038be8b5c558f67

### Is-Old Strategy

For the `is-old` validation , I firstly get the list of normal transactions for a specifc account and then I check if the first transaction `.result[0].timeStamp` (property since it ordered by timestamp asc) is greater than current date less 1 year.

## Notes 

- At first load, user is available to:
*  Load an specific ETH account.
*  Check current exchange rate for the day. (USD and EUR currency).
- Validation on account address & editable exchange rate.
- List of address acount. For each one of them, user can:
* Tag favorites of them and sort by them (favorites).
* Close them idependently.
* Change current currency and balance account will be update.
* Edit exchange rate and if there are account address that match with the editabled currency they will be automatically updated.
