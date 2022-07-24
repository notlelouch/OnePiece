import abi from "$lib/constants/abi";
import { ethers } from "ethers";
import { nftSwapAddress, signer } from "../../store";
import { get } from "svelte/store";

export async function depositNftForOtherNfts(
  nftId: string,
  allowExchangeWithThisNfts: Array<string>
) {
  const nftSwap = new ethers.Contract(
    get(nftSwapAddress),
    abi.nftSwap,
    get(signer)
  );

  let gasLimit = await nftSwap.estimateGas.depositRequestForExchange(
    nftId,
    allowExchangeWithThisNfts);
  gasLimit = gasLimit.mul(4).div(3);

  const tx = await nftSwap.depositRequestForExchange(
    nftId,
    allowExchangeWithThisNfts
  );

  console.log("Tx deposit nft", tx);
  return tx;
}
