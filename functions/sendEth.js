const { ethers } = require("ethers");

async function sendEther(fromPrivateKey, toAddress, etherAmount) {
  const provider = new ethers.InfuraProvider(
    "sepolia",
    "3e71c39f476040a498217bd8ddac375f"
  );
  const wallet = new ethers.Wallet(fromPrivateKey, provider);

  const weiAmount = ethers.parseEther(etherAmount);

  const gasPrice = await provider.estimateGas(wallet);

  const transaction = {
    to: toAddress,
    value: weiAmount,
    gasPrice: gasPrice,
  };
  const gasLimit = await wallet.estimateGas(transaction);
  transaction.gasLimit = gasLimit;

  const result = await wallet.sendTransaction(transaction);

  return result.hash;
}

module.exports = {
	sendEther
};
