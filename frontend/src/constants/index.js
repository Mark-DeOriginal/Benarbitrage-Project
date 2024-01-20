import openAIImg from "../assets/brands/open-ai.svg";
import coinbaseImg from "../assets/brands/coinbase.svg";
import binanceImg from "../assets/brands/binance.svg";
import stripeImg from "../assets/brands/stripe.svg";
import paypalImg from "../assets/brands/paypal.svg";
import cashappImg from "../assets/brands/cashapp.svg";
import masterCardImg from "../assets/brands/master-card.svg";
import visaImg from "../assets/brands/visa.svg";
import bitcoinLogo from "../assets/icons/cryptos/bitcoin.svg";
import ethereumLogo from "../assets/icons/cryptos/ethereum.svg";
import bnbLogo from "../assets/icons/cryptos/bnb.svg";
import avalancheLogo from "../assets/icons/cryptos/avalanche.svg";
import litecoinLogo from "../assets/icons/cryptos/litecoin.svg";
import tronTrxLogo from "../assets/icons/cryptos/tron-trx.svg";
import appleLogo from "../assets/brands/apple.svg";
import teslaLogo from "../assets/brands/tesla.svg";
import netflixLogo from "../assets/brands/netflix.svg";
import amazonLogo from "../assets/brands/amazon.svg";
import microsoftLogo from "../assets/brands/microsoft.svg";
import metaPlatformsLogo from "../assets/brands/meta-platforms.svg";

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
    url: "/dashboard",
    title: "Dashboard",
    hasOption: false,
  },
];

export const footerLinks = [
  {
    category: "Useful Links",
    links: [
      {
        content: "Home",
        type: "link",
        url: "/",
      },
      {
        content: "Learn",
        type: "link",
        url: "/learn",
      },
      {
        type: "link",
        content: "AI Trading",
        url: "/ai-trading",
      },
      {
        type: "link",
        content: "Become an affiliate",
        url: "/affiliate/register",
      },
    ],
  },
  {
    category: "Company",
    links: [
      {
        content: "About",
        type: "link",
        url: "/about",
      },
      {
        content: "Terms and Conditions",
        type: "link",
        url: "/terms-of-use",
      },
      {
        content: "Privacy Policy",
        type: "link",
        url: "/terms-of-use",
      },
      {
        content: "Refund Policy",
        type: "link",
        url: "/terms-of-use",
      },
    ],
  },
  {
    category: "Contact",
    info: [
      {
        content: "23b Cheraton Block 1401, West Street, DC 98064, USA",
        type: "address",
      },
      {
        content: "info@benarbitrage.com",
        type: "email",
      },
    ],
  },
];

export const brands = [
  {
    name: "open-ai",
    logo: openAIImg,
  },
  {
    name: "coinbase",
    logo: coinbaseImg,
  },
  {
    name: "binance",
    logo: binanceImg,
  },
  {
    name: "stripe",
    logo: stripeImg,
  },
  {
    name: "paypal",
    logo: paypalImg,
  },
  {
    name: "cashapp",
    logo: cashappImg,
  },
  {
    name: "master-card",
    logo: masterCardImg,
  },
  {
    name: "visa",
    logo: visaImg,
  },
];

export const statistics = [
  {
    title: "Active Traders",
    figure: "4.6M+",
  },
  {
    title: "Trading Volume",
    figure: "$1.2B",
  },
  {
    title: "Bullrun Trade",
    figure: "$2.7B",
  },
  {
    title: "Launch Date",
    figure: "Sept, 2023",
  },
];

export function initializeExchanges() {
  const exchanges = [
    {
      name: "Cryptos",
      types: [
        {
          name: "Bitcoin",
          abbr: "BTC",
          logo: bitcoinLogo,
          marketPrice: 42113.3,
          currency: "$",
          performance: 0.17,
        },
        {
          name: "Ethereum",
          abbr: "ETH",
          logo: ethereumLogo,
          marketPrice: 2327.55,
          currency: "$",
          performance: 0.21,
        },
        {
          name: "BNB",
          abbr: "BNB",
          logo: bnbLogo,
          marketPrice: 413.5,
          currency: "$",
          performance: 0.52,
        },
        {
          name: "Avalanche",
          abbr: "AVAX",
          logo: avalancheLogo,
          marketPrice: 160.76,
          currency: "$",
          performance: 1.62,
        },
        {
          name: "Litecoin",
          abbr: "LTC",
          logo: litecoinLogo,
          marketPrice: 150.94,
          currency: "$",
          performance: 1.27,
        },
        {
          name: "TRON",
          abbr: "TRX",
          logo: tronTrxLogo,
          marketPrice: 1.13,
          currency: "$",
          performance: 1.3,
        },
      ],
    },
    {
      name: "Stocks",
      types: [
        {
          name: "Apple",
          logo: appleLogo,
          marketPrice: 177.49,
          currency: "$",
          performance: 2.58,
        },
        {
          name: "Tesla",
          logo: teslaLogo,
          marketPrice: 260.53,
          currency: "$",
          performance: 0.48,
        },
        {
          name: "Netflix",
          logo: netflixLogo,
          marketPrice: 381.51,
          currency: "$",
          performance: 8.92,
        },
        {
          name: "Amazon.com",
          logo: amazonLogo,
          marketPrice: 127.96,
          currency: "$",
          performance: 2.0,
        },
        {
          name: "Microsoft",
          logo: microsoftLogo,
          marketPrice: 327.26,
          currency: "$",
          performance: 7.9,
        },
        {
          name: "Meta Platforms",
          logo: metaPlatformsLogo,
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

  return exchanges;
}

export const accountTypes = [
  {
    name: "Basic",
    least_trade: "$100",
    trading_speed: "25 mkts/s",
  },
  {
    name: "Standard",
    least_trade: "$300",
    trading_speed: "75 mkts/s",
    isMostPopular: true,
  },
  {
    name: "Business",
    least_trade: "$500",
    trading_speed: "125 mkts/s",
  },
];
