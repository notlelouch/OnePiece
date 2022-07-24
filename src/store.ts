import { derived, writable, type Writable } from 'svelte/store';
import type { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';

export const enteredNftId = writable("")
export const interestedNFTs = writable([])

export const userNfts = writable(undefined)
export const selectedNft = writable(undefined)

export const nftSwapAddress = writable("0x70D116df41a1Bf953803ED0D4955B3F1e0FE1E87")

export const address = writable("")
export const nftContractAddress = writable("0xf58998Eb66FA47a59aB5D37592176C6dd6F7012B")

export const chainId = writable(undefined);
// @ts-ignore
export const ethersProvider: Writable<Web3Provider> = writable(undefined);

// @ts-ignore
export const signer: Writable<JsonRpcSigner> = writable(undefined);

export const walletConnected = derived([address], ([$address]) => {
	if ($address === '') {
		return false;
	}
	return true;
});

export const openWallet = writable(false);

export const isApproved = writable(false);

export const earlyUserNftContractAddress = writable("")