"use client";
import { useEffect, useState } from "react";
import { tokenTransfer } from "../../services/coin-api.service";

export default function StablecoinWallet() {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<
    { amount: number; recipientAddress: string }[]
  >([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchStablecoinData = async () => {
      try {
        //TODO: Fetch stablecoin balance from API
        // const balanceResponse = await fetch("/api/stablecoin/balance");
        // const balanceData = await balanceResponse.json();
        // setBalance(balanceData.balance);
        setBalance(575);

        //TODO: Fetch recent transactions from API
        // const transactionsResponse = await fetch(
        //   "/api/stablecoin/transactions"
        // );
        // const transactionsData = await transactionsResponse.json();
        // setTransactions(transactionsData.transactions);
        const transactionsExample: {
          amount: number;
          recipientAddress: string;
        }[] = [
          { amount: 100, recipientAddress: "0x123456789abcdef" },
          { amount: 50, recipientAddress: "0xabcdef123456789" },
          { amount: 75, recipientAddress: "0x987654321fedcba" },
          { amount: 200, recipientAddress: "0xfedcba987654321" },
          { amount: 150, recipientAddress: "0xabcdef098765432" },
        ];
        setTransactions(transactionsExample);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStablecoinData();
  }, []);

  const handleSendStableCoins = async (e: any) => {
    e.preventDefault();
    if (
      !recipientAddress ||
      !amount ||
      isNaN(parseFloat(amount)) ||
      parseFloat(amount) <= 0
    ) {
      setError("Please enter a valid recipient address and amount.");
      return;
    }
    // Reset error state
    setError("");
    // Send stable coins logic goes here
    console.log("Sending stable coins to", recipientAddress, "Amount:", amount);
    const access_token = localStorage.getItem('access_token');
    const response = await tokenTransfer({
      token: access_token,
      amount: amount,
      toAddress: recipientAddress,
    });
    if(response){
      setIsPopupOpen(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Stablecoin Wallet</h2>

      <div className="mb-4">
        <p className="text-gray-700 dark:text-gray-300">
          Balance: {balance} Stablecoins
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Recent Transactions</h3>
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
              <p>
                Sent {transaction.amount} Stablecoins to{" "}
                {transaction.recipientAddress}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => setIsPopupOpen(true)}
        className="bg-primary-600 text-white rounded-lg px-4 py-2 mb-4"
      >
        Send Stablecoins
      </button>

      <div
        className={`fixed inset-0 z-10 overflow-y-auto ${
          isPopupOpen ? "" : "hidden"
        }`}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Send Stablecoins
                  </h3>
                  <form className="mt-2">
                    <div className="mb-4">
                      <label
                        htmlFor="recipientAddress"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Recipient Address
                      </label>
                      <input
                        type="text"
                        id="recipientAddress"
                        value={recipientAddress}
                        onChange={(e) => setRecipientAddress(e.target.value)}
                        className="mt-1 p-2.5 block text-gray-700 w-full shadow-sm focus:ring-primary-600 focus:border-primary-600 sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="amount"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Amount
                      </label>
                      <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="mt-1 p-2.5 block text-gray-700 w-full shadow-sm focus:ring-primary-600 focus:border-primary-600 sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    {error && (
                      <p className="text-red-500 text-sm mb-4">{error}</p>
                    )}
                    <button
                      type="button"
                      onClick={handleSendStableCoins}
                      className="w-full inline-flex justify-center px-4 py-2 bg-primary-600 border border-transparent rounded-md font-semibold text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:text-sm"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
