import { ethers } from "ethers";
import { get } from "svelte/store";
import Web3Modal from "web3modal";
import {
  address,
  chainId,
  ethersProvider,
  openWallet,
  signer
} from "../../store";
import networkConfig from "../constants/networkConfig";
import { providerOptions } from "./providerOptions";

let web3Modal;

// @ts-ignore
const handleAccountsChanged = (accounts) => {
  if (typeof window !== "undefined") {
    window.location.reload();
  }
};

const handleChainChanged = () => {
  if (typeof window !== "undefined") {
    //here `window` is available
    window.location.reload();
  }
};

export const handleDisconnect = () => {
  // console.log("disconnect", error);
  disconnectWallet();
};

export async function handleConnect() {
  web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
  });
  openWallet.set(false);
  if (web3Modal.cachedProvider) {
    connectWallet();
  }
}
// @ts-ignore
export async function connectWallet() {
  try {
    const provider = await web3Modal.connect();
    ethersProvider.set(new ethers.providers.Web3Provider(provider));
    signer.set(get(ethersProvider).getSigner());
    // @ts-ignore
    chainId.set((await get(ethersProvider).getNetwork()).chainId);
    console.log("Chain ID", get(chainId));

    let addressString = await get(signer).getAddress();
    console.log("Address", addressString);

    address.set(addressString);

    console.log("Provider", provider);
    console.log("EthersProvider", get(ethersProvider));

    provider.on("accountsChanged", handleAccountsChanged);
    provider.on("chainChanged", handleChainChanged);
    provider.on("disconnect", handleDisconnect);
    return provider;
  } catch (error) {
    console.log("Hellljjjj");

    console.log(error);
  }
}

export async function switchNetwork() {
  try {
    // @ts-ignore
    await get(ethersProvider).provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: networkConfig[1].chainHex }],
    });
  } catch (switchError) {
    // @ts-ignore
    if (switchError.code === 4902) {
      try {
        // @ts-ignore
        await get(ethersProvider).provider.request({
          method: "wallet_addEthereumChain",
          params: [{ chainId: networkConfig[1].chainHex }],
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
}

export function refreshState() {
  // @ts-ignore
  ethersProvider.set(undefined);
  // @ts-ignore
  signer.set(undefined);
  address.set("");
  openWallet.set(false);
}

export async function disconnectWallet() {
  refreshState();
  await web3Modal.clearCachedProvider();
}
