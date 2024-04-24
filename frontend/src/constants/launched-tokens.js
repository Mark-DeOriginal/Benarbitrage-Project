import rozyCoin from "../assets/launched-tokens/rozycoin.jpg";
import catWifPod from "../assets/launched-tokens/catwifpod.webp";

export const launchedTokens = {
  CatWifPodToken: {
    id: 2,
    tokenName: "CatWifPod",
    ticker: "$CATPOD",
    tokenImage: catWifPod,
    description: `$CATPOD is a meme coin with utility and operates on the Solana Blockchain. Soon, you will be able to carry out financial transactions on Benarbitrage using $CATPOD.`,
    contractAddress: "",
    dateLaunched: "24/4/2024 10PM",
    isMainToken: true,
  },
  RozyCoinToken: {
    id: 1,
    tokenName: "RozyCoin",
    ticker: "$ROZYCOIN",
    tokenImage: rozyCoin,
    description: `RozyCoin is a digital currency that operates on the Solana Blockchain. Soon, you will be able to purchase assets and carry out other financial transactions with $ROZYCOIN.`,
    contractAddress: "",
    dateLaunched: "24/4/2024 8PM",
  },

  // CatWifPodToken: {
  //   id: 2,
  //   tokenName: "CatWifPod",
  //   ticker: "$CATPOD",
  //   tokenImage: catWifPod,
  //   description: `$CATPOD is a meme coin with utility and operates on the Solana Blockchain. Soon, you will be able to purchase assets and carry out other financial transactions with $CATPOD.`,

  //   contractAddress: "",
  //   dateLaunched: "24/4/2024 10PM",
  //   isLatestToken: true,
  // },
};
