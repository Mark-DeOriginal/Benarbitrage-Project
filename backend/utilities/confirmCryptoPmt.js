export default function confirmCryptoPmt(txID, network, toAddress) {
  return new Promise((resolve, reject) => {
    if (network === "Ethereum (ERC20)") {
      confirmEthTx(txID, toAddress);
    } else {
      confirmTronTx(txID, toAddress);
    }

    // TRON (TRC20)
    function confirmTronTx(txID, toAddress) {
      const apiKey = "b9753574-67e1-4d22-8550-bca65c7b615d";
      const endpoint = `https://apilist.tronscanapi.com/api/transaction-info?hash=${txID}`;

      fetch(endpoint, {
        headers: {
          "TRON-PRO-API-KEY": apiKey,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((transactionDetails) => {
          const tronNetwkAddress = toAddress;
          const testAddress = "TQA2Z63x5rN561gCZSEnNPK5A5HK4W813s";

          if (transactionDetails.toAddress === testAddress) {
            resolve(transactionDetails);
          } else {
            const isError = true;
            reject(isError);
          }
        })
        .catch(() => reject(true));
    }

    // ETHEREUM (ERC20)
    function confirmEthTx(txID, toAddress) {
      const apiToken = "6626474d4a78404d9d629808ea7c444e";
      const endpoint = `https://api.blockcypher.com/v1/eth/main/txs/${txID}?token=${apiToken}`;

      fetch(endpoint)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((transactionDetails) => {
          const ethNetwkAddress = toAddress;

          if (transactionDetails.outputs[0].addresses[0] === ethNetwkAddress) {
            resolve(transactionDetails);
          } else {
            const isError = true;
            reject(isError);
          }
        })
        .catch(() => reject(true));
    }
  });
}
