import Head from "next/head";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider, lightTheme, darkTheme } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ThemeProvider, useTheme } from "next-themes";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { okxWallet, bybitWallet } from '@rainbow-me/rainbowkit/wallets';
import { useEffect, useState } from "react";

// Define Solana Chain
const solanaChain = {
  id: 101,
  name: "Solana Mainnet",
  network: "solana",
  nativeCurrency: {
    decimals: 9,
    name: "Solana",
    symbol: "SOL",
  },
  rpcUrls: {
    default: {
      http: ["https://api.mainnet-beta.solana.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Solana Explorer",
      url: "https://explorer.solana.com",
    },
  },
  testnet: false,
};

// Configure Chains and Providers
const { chains, provider } = configureChains(
  [solanaChain],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "DeDoctor",
  chains,
  connectors: () => [
    new PhantomWalletAdapter(),
    okxWallet(),
    bybitWallet(),
  ],
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }) {
  const { theme } = useTheme();

  return (
    <div className="dark:bg-[#030B29] dark:text-dark-muted">
      <Head>
        <title>DeDoctor</title>
        <meta name="description" content="DeDoctor is a web3-based Doctor appointment app." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo_2.ico" />
        <meta name="keywords" content="doctor,safe,medicine,blockchain" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dmed.vercel.app/" />
        <meta property="og:title" content="DeDoctor is a web3-based Doctor appointment app." />
        <meta property="og:description" content="DeDoctor helps with online consultation and payment with the Shardeum network, ensuring patient data is safe." />
        <meta property="og:image" content="/logo-no-background.svg" />
        <meta name="language" content="ES" />
        <meta name="author" content="Abraham Anavheoba, wisdomvolt@gmail.com" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://dmed.vercel.app/" />
        <meta property="twitter:title" content="DeDoctor is a web3-based Doctor appointment app." />
        <meta property="twitter:description" content="DeDoctor helps with online consultation and payment with the Shardeum network, ensuring patient data is safe." />
        <meta property="twitter:image" content="/logo-no-background.svg" />
        <meta name="url" content="https://dmed.vercel.app/" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="DeDoctor helps with online consultation and payment with the Shardeum network, ensuring patient data is safe." />
        <link rel="apple-touch-icon" href="/logo-no-background.svg" />
      </Head>
      <ThemeProvider enableSystem={true} attribute="class">
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains} theme={theme === 'light' ? lightTheme() : darkTheme()}>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </RainbowKitProvider>
        </WagmiConfig>
      </ThemeProvider>
    </div>
  );
}

