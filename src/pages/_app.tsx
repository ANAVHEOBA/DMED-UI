import Head from "next/head";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider, lightTheme, darkTheme } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, Chain } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ThemeProvider, useTheme } from "next-themes";

import {
  getHuddleClient,
  HuddleClientProvider,
} from "@huddle01/huddle01-client";
const huddleClient = getHuddleClient(
  "1bc609a2c914912b57e4f3da0fdfc25e06fd643a87f3afe7dd159458b19fb412"
);

const shardeumChain: Chain = {
  id: 8081,
  name: "Shardeum Liberty 2.X",
  network: "shardeum",
  nativeCurrency: {
    decimals: 18,
    name: "Shardeum",
    symbol: "SHM",
  },
  rpcUrls: {
    default: {
      http: ["https://liberty20.shardeum.org/"],
    },
    public: {
      http: ["https://liberty20.shardeum.org/"],
    },
  },
  blockExplorers: {
    default: {
      name: "SnowTrace",
      url: "https://explorer-liberty20.shardeum.org/",
    },
    etherscan: {
      name: "SnowTrace",
      url: "https://explorer-liberty20.shardeum.org/",
    },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [shardeumChain],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "DeDoctor",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  const { theme } = useTheme();
  
  return (
    <div className="dark:bg-[#030B29] dark:text-dark-muted">
      <Head>
        <title>DeDoctor</title>
        <meta
          name="description"
          content="DeDoctor are web3 based Doctor appointment app."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo_2.ico" />
        <meta name="keywords" content="doctor,safe,medicine,blockchain" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="ttps://Dmed.vercel.app/" />
        <meta
          property="og:title"
          content="DeDoctor are web3 based Doctor appointment app."
        />
        <meta
          property="og:description"
          content="DeDoctor can help you online consultation and payment with shardeum network so patient data are safe"
        />
        <meta property="og:image" content="/logo-no-background.svg" />

        <meta name="language" content="ES" />
        <meta
          name="author"
          content="Abraham Anavheoba, wisdomvolt@gmail.com"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://dmed.vercel.app/" />
        <meta
          property="twitter:title"
          content="DeDoctor are web3 based Doctor appointment app."
        />
        <meta
          property="twitter:description"
          content="DeDoctor can help you online consultation and payment with shardeum network so patient data are safe."
        />
        <meta property="twitter:image" content="/logo-no-background.svg" />

        <meta name="url" content="https://dmed.vercel.app/" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="DeDoctor can help you online consultation and payment with shardeum network so patient data are safe."
        />
        <link rel="apple-touch-icon" href="/logo-no-background.svg" />
      </Head>
      <ThemeProvider enableSystem={true} attribute="class">
        <HuddleClientProvider value={huddleClient}>
          <Provider store={store}>
            <WagmiConfig client={wagmiClient}>
              <RainbowKitProvider chains={chains} theme={theme === 'light'? lightTheme() : darkTheme()} >
                <Navbar />
                <Component {...pageProps} />
                <Footer />
              </RainbowKitProvider>
            </WagmiConfig>
          </Provider>
        </HuddleClientProvider>
      </ThemeProvider>
    </div>
  );
}