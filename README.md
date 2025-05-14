# ERC20 Smart Contract Interaction Application

This project provides a simple web application interface for interacting with a deployed Test ERC20 Coin smart contract. It allows users and potentially other services to retrieve token information, check wallet balances, and initiate certain token transactions via a web interface.

## Features

- **Coin Details:** Retrieve the token's name, symbol, and total supply.
- **Contract Information:** Access the contract's ABI, address and chain HTTP url.
- **Wallet Balance:** Check the balance of any given wallet address.
- **Transaction Forms:** Provides HTML pages for initiating `Mint`, `Approve`, and `TransferFrom` transactions via a web browser.
- **Balance Confirmation:** Includes functionality to confirm balances, potentially on behalf of the service or specific users.

## Setup Instructions

To get this project up and running, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd erc20-smart-contract
    ```

2.  **Install dependencies:**

    ```bash
    nvm use
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root directory of the project based on the provided `.env.example`. You will need to configure:

    - `PORT`: The port the application server will listen on (defaulting to 3000 or similar if not specified in code).
    - `CONTRACT_ADDRESS`: The address of the deployed ERC20 smart contract you want to interact with.
    - `CHAIN_HTTP_API_URL`: HTTP API address for requests to the chain.
    - `SERVICE_ACCOUNT_PRIVATE_KEY`: Private service key for approve operation as admin.

4.  **Setup local chain**

    ```bash
    # Start local chain
    $ npx hardhat node

    # Deploy the Test ERC20 Coin contract to the local chain.
    # Then paste the resulting contract address into the .env file as a CONTRACT_ADDRESS variable
    $ npx hardhat ignition deploy ./ignition/modules/ERC20.ts --network localhost
    ```

5.  **Run the application:**
    ```bash
    npm run dev
    # or using yarn
    # yarn start
    ```
    The application should now be running, typically on `http://localhost:3000` (or the port specified in your `.env`).

**Run the tests**

```bash
npx hardhat test
```

## Usage Examples

Once the application is running, you can interact with it using a Swagger UI (`http://localhost:3000/api/docs`) or tools like `curl` or Postman.

- **Get Token Details:**

  ```bash
  curl http://localhost:3000/api/coin/details
  ```

  Expected output: JSON containing `name`, `symbol`, and `totalSupply`.

- **Get Contract Info:**

  ```bash
  curl http://localhost:3000/api/coin/contractInfo
  ```

  Expected output: JSON containing `abi` and `address`.

- **Get Wallet Balance:**
  Replace `0x...` with the actual wallet address.

  ```bash
  curl http://localhost:3000/api/0x.../balance
  ```

  Expected output: JSON containing the balance details (`current`, `blocked`, `total`).

- **Approve Spending (Requires Basic Auth):**
  This endpoint allows the service admin (the account associated with `SERVICE_ACCOUNT_PRIVATE_KEY` key in `.env`) to approve the address balance (specified in the URL) to spend a certain amount on their behalf.
  Replace `0x...` with the wallet address to approve.

  ```bash
  curl -X POST \
    http://localhost:3000/api/0x.../approve \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Basic <base64_encoded_credentials>' \
    -d '{ "amount": "1000000000000000000" }' # Amount in smallest token units (e.g., 1 token if 18 decimals)
  ```

  Expected output: JSON containing the transaction hash.

- **Access Transaction Forms:**
  Open these URL in your web browser `http://localhost:3000/api/transaction/transferFrom`.
  First, you need to bind a wallet on behalf of which the actions will be performed (using a private key). Then it is necessary to fill in the fields in the Mint & Approve form to replenish the balance and allowance of these funds automatically. After that the form for transfer of funds to the specified address will be opened

## Design Decisions and Considerations

- **Technology Stack:** The project uses Node.js with Express for the web server and Viem for interacting with the Ethereum blockchain. This provides a lightweight and efficient way to build the application.
- **API Endpoints:** RESTful-like endpoints are provided for retrieving information (`GET`) and initiating actions (`POST`).
- **Transaction Forms:** Providing simple HTML forms for transactions such as `Mint`, `Approve` and `TransferFrom` provides a secure way to interact with the smart contract. All requests are made directly to the chain HTTP endpoint.
- **Error Handling:** Basic error handling is included, returning appropriate HTTP status codes and JSON responses.
- **Scalability:** For high-traffic applications, consider adding caching, load balancing, and potentially using a dedicated transaction relayer service.
- **Security:** Always validate user inputs thoroughly to prevent injection attacks or unexpected contract interactions.

---
