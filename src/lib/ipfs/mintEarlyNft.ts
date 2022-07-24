import abi from "$lib/constants/abi";
import { ethers } from "ethers";
import {
  earlyUserNftContractAddress,
  signer,
} from "../../store";
import { get } from "svelte/store";

export async function mintEarlyUserNft() {
  const nftContract = new ethers.Contract(
    get(earlyUserNftContractAddress),
    abi.nftSwap,
    get(signer)
  );

  let gasLimit = await nftContract.estimateGas.mint();
  gasLimit = gasLimit.mul(4).div(3);

  const tx = await nftContract.mint();

  console.log("Tx", tx);
  return tx;
}
