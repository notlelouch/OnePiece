import WalletConnectProvider from "@walletconnect/web3-provider";

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "eaHOIpmkv7RpL3B9Ujk4Pf9ZzxHlUcQi", // required
    },
  },
};
