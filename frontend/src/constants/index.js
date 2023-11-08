export const navLinks = [
  {
    url: "/",
    title: "Home",
    hasOption: false,
  },
  {
    url: "/learn",
    title: "Learn",
    hasOption: false,
  },
  {
    url: "/ai-trading",
    title: "AI Trading",
    hasOption: false,
  },
  {
    url: "",
    title: "Exchanges",
    hasOption: true,
    options: [
      {
        url: "/forex",
        title: "Forex",
      },
      {
        url: "/stocks",
        title: "Stocks",
      },
      {
        url: "/cryptos",
        title: "Cryptos",
      },
      {
        url: "/commodities",
        title: "Commodities",
      },
    ],
  },
  {
    url: "/support-center",
    title: "Support Center",
    hasOption: false,
  },
];

export const brands = [
  {
    name: "open-ai",
    logo: "/src/assets/brands/open-ai.svg",
  },
  {
    name: "coinbase",
    logo: "/src/assets/brands/coinbase.svg",
  },
  {
    name: "binance",
    logo: "/src/assets/brands/binance.svg",
  },
  {
    name: "stripe",
    logo: "/src/assets/brands/stripe.svg",
  },
  {
    name: "paypal",
    logo: "/src/assets/brands/paypal.svg",
  },
  {
    name: "cashapp",
    logo: "/src/assets/brands/cashapp.svg",
  },
  {
    name: "master-card",
    logo: "/src/assets/brands/master-card.svg",
  },
  {
    name: "visa",
    logo: "/src/assets/brands/visa.svg",
  },
];

export const statistics = [
  {
    title: "Active Traders",
    figure: "14M+",
  },
  {
    title: "Trading Volume",
    figure: "$2.5B",
  },
  {
    title: "Bullrun Trade",
    figure: "$4.3B",
  },
];

export const exchanges = [
  {
    name: "Cryptos",
    types: [
      {
        name: "Bitcoin",
        abbr: "BTC",
        logo: "/src/assets/icons/cryptos/bitcoin.svg",
        marketPrice: 27313.3,
        currency: "$",
        performance: 2.03,
      },
      {
        name: "Ethereum",
        abbr: "ETH",
        logo: "/src/assets/icons/cryptos/ethereum.svg",
        marketPrice: 1639.55,
        currency: "$",
        performance: 0.38,
      },
      {
        name: "BNB",
        abbr: "BNB",
        logo: "/src/assets/icons/cryptos/bnb.svg",
        marketPrice: 213.5,
        currency: "$",
        performance: 0.52,
      },
      {
        name: "Avalanche",
        abbr: "AVAX",
        logo: "/src/assets/icons/cryptos/avalanche.svg",
        marketPrice: 18.76,
        currency: "$",
        performance: 1.62,
      },
      {
        name: "Litecoin",
        abbr: "LTC",
        logo: "/src/assets/icons/cryptos/litecoin.svg",
        marketPrice: 65.94,
        currency: "$",
        performance: 1.27,
      },
      {
        name: "Binance USD",
        abbr: "BUSD",
        logo: "/src/assets/icons/cryptos/binance-usd.svg",
        marketPrice: 12.68,
        currency: "$",
        performance: 0.87,
      },
    ],
  },
  {
    name: "Stocks",
    types: [
      {
        name: "Apple",
        logo: "/src/assets/brands/apple.svg",
        marketPrice: 177.49,
        currency: "$",
        performance: 2.58,
      },
      {
        name: "Tesla",
        logo: "/src/assets/brands/tesla.svg",
        marketPrice: 260.53,
        currency: "$",
        performance: 0.48,
      },
      {
        name: "Netflix",
        logo: "/src/assets/brands/netflix.svg",
        marketPrice: 381.51,
        currency: "$",
        performance: 8.92,
      },
      {
        name: "Amazon.com",
        logo: "/src/assets/brands/amazon.svg",
        marketPrice: 127.96,
        currency: "$",
        performance: 2.0,
      },
      {
        name: "Microsoft",
        logo: "/src/assets/brands/microsoft.svg",
        marketPrice: 327.26,
        currency: "$",
        performance: 7.9,
      },
      {
        name: "Meta Platforms",
        logo: "/src/assets/brands/meta-platforms.svg",
        marketPrice: 315.42,
        currency: "$",
        performance: 10.63,
      },
    ],
  },
  {
    name: "Forex",
    CPT: "1 BTC",
    types: [
      {
        name: "US Dollar",
        abbr: "USD",
        marketPrice: 27913.3,
        currency: "$",
        performance: 1.25,
      },
      {
        name: "British Pound",
        abbr: "GBP",
        marketPrice: 22864.3,
        currency: "€",
        performance: 1.48,
      },
      {
        name: "Canadian Dollar",
        abbr: "CAD",
        marketPrice: 38291.71,
        currency: "$",
        performance: 2.15,
      },
      {
        name: "Japanese Yen",
        abbr: "JPY",
        marketPrice: 4176195.93,
        currency: "¥",
        performance: 1.02,
      },
      {
        name: "Australian Dollar",
        abbr: "AUD",
        marketPrice: 43851.3,
        currency: "$",
        performance: 0.98,
      },
      {
        name: "Euro",
        abbr: "EUR",
        marketPrice: 26400.5,
        currency: "£",
        performance: 1.62,
      },
    ],
  },
  {
    name: "Commodities",
    types: [
      {
        name: "Crude Oil",
        marketPrice: 82.78,
        currency: "$",
        performance: 0.28,
      },
      {
        name: "Natural Gas",
        marketPrice: 3.33,
        currency: "$",
        performance: 4.02,
      },
      {
        name: "Gold",
        marketPrice: 1831.66,
        currency: "$",
        performance: 1.03,
      },
      {
        name: "Silver",
        marketPrice: 21.56,
        currency: "$",
        performance: 1.05,
      },
      {
        name: "Copper",
        marketPrice: 7886.75,
        currency: "$",
        performance: 1.86,
      },
      {
        name: "Platinum",
        marketPrice: 881.0,
        currency: "$",
        performance: 0.32,
      },
    ],
  },
];

export const accountTypes = [
  {
    name: "Basic",
    least_trade: "$100",
    trading_speed: "13 mkts/s",
    trading_fee: "1.04%",
  },
  {
    name: "Standard",
    least_trade: "$300",
    trading_speed: "22 mkts/s",
    trading_fee: "1.82%",
    isMostPopular: true,
  },
  {
    name: "Business",
    least_trade: "$1,000",
    trading_speed: "85 mkts/s",
    trading_fee: "6.05%",
  },
];
