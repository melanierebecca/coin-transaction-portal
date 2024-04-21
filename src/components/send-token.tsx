// import React, { useState } from 'react';
// import { ethers } from 'ethers';

// const SendTokenModel = () => {
//   const [transactionHash, setTransactionHash] = useState('');

//   const handleSendTransaction = async () => {
//     // Your raw transaction data
//     const rawTransaction = {
//       nonce: '0x...', // Hex-encoded nonce
//       gasPrice: '0x...', // Hex-encoded gas price
//       gasLimit: '0x...', // Hex-encoded gas limit
//       to: '0x...', // Recipient address
//       value: '0x...', // Hex-encoded value to transfer
//       data: '0x...', // Optional hex-encoded data
//     };

//     // Connect to MetaMask provider
//     if (window.ethereum) {
//       try {
//         await window.ethereum.request({ method: 'eth_requestAccounts' });
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();

//         // Sign the transaction
//         const signedTx = await signer.sendTransaction(rawTransaction);

//         // Send the transaction
//         const tx = await provider.sendTransaction(signedTx);
        
//         // Get the transaction hash
//         setTransactionHash(tx.hash);
//       } catch (error) {
//         console.error('Error sending transaction:', error);
//       }
//     } else {
//       console.error('MetaMask extension not detected');
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleSendTransaction}>Send Transaction</button>
//       {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
//     </div>
//   );
// };

// export default SendTokenModel;
