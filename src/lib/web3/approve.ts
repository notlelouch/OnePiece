import abi from "../constants/abi";
import { ethers } from "ethers";
import { signer } from "../../store";
import { get } from "svelte/store";

export async function approveERC721(
    nftContractAddress: string,
    addressToApprove: string,
    tokenId: string
  ) {
    const erc721 = new ethers.Contract(
      nftContractAddress,
      abi.erc721,
      get(signer)
    );
  
    let gasLimit = await erc721.estimateGas.approve(addressToApprove, tokenId);
    gasLimit = gasLimit.mul(4).div(3);
    console.log("Approve gas limit", gasLimit);
    const tx = await erc721.approve(addressToApprove, tokenId, { gasLimit });
    return tx;
  }