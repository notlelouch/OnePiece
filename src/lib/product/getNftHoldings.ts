
import { tokenIdToPfp } from '../constants/tokenIds';
import { Contract, Provider } from 'ethers-multicall';
import abi from '../constants/abi';
import { ethers } from "ethers";



const infuraKey = "7b6e08e0772b4c93a860cf2d40f8b400";
const ethersProvider = new ethers.providers.InfuraProvider("rinkeby", infuraKey);

// const ethersProvider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/S0wwNAH54JiaIRou2mcRl2MgHZkfbRSm");
export async function getNftHoldingsForAddress(address: any, nftContractAddress: any) {
	const erc721 = new Contract(nftContractAddress, abi.erc721);
	const provider = new Provider(ethersProvider);
	await provider.init();
	
	const calls = [];
	const tokens = [];

	for (let tokenId = 0; tokenId < 10; tokenId++) {
		calls.push(erc721.ownerOf(tokenId));
	}

	const results = await provider.all(calls);
	for (let tokenId = 0; tokenId < 10; tokenId++) {
		const realOwner = results.shift();
		

		if (
			realOwner !== undefined &&
			realOwner.toString().toLowerCase() == address.toString().toLowerCase()
		) {
			tokens.push({
				// @ts-ignore
				img: tokenIdToPfp[tokenId],
				tokenId: tokenId.toString()
			});
			
		}
	}

	return {
		"bayc": tokens
	}

}