<script lang="ts">
  import { getNftHoldingsForAddress } from "../lib/product/getNftHoldings";

  import { afterUpdate, onMount } from "svelte";

  import {
    address,
    enteredNftId,
    interestedNFTs,
    isApproved,
    nftContractAddress,
    nftSwapAddress,
    selectedNft,
    userNfts,
  } from "../store";
import { approveERC721 } from "$lib/web3/approve";
import { depositNftForOtherNfts } from "$lib/web3/depositNft";

  function addNftToWantedList(event: any) {
    if (event.key == "Enter") {
      if (Number($enteredNftId) >= 0 && Number($enteredNftId) <= 100) {
        interestedNFTs.set($interestedNFTs.concat(event.target.value));
        enteredNftId.set("");
      } else {
        alert("Please enter valid NFT Id");
        enteredNftId.set("");
      }
    }
  }

  function removeNftFromInterestingList(nftId: string) {
    console.log("Removing NFT Id: " + nftId);

    interestedNFTs.set(
      $interestedNFTs.filter((id) => {
        return id != nftId;
      })
    );
  }

  afterUpdate(async () => {
    if ($userNfts == undefined) {
      console.log("Hiiii");
      console.log("Address: " + $address);

      if ($address !== "") {
        console.log("Hello World");

        const userSet = await getNftHoldingsForAddress(
          $address,
          $nftContractAddress
        );

        if (userSet != undefined) {
          console.log("UserSet");
          console.log(userSet["bayc"]);

          // @ts-ignore
          userNfts.set(userSet);
          console.log("User NFTs");
          // @ts-ignore
          console.log($userNfts["bayc"]);
        }
      }
    }
  });
</script>

<div class="flex flex-row items-center justify-center ">
  <div
    class=" flex flex-col gap-2 p-2 w-[400px] bg-[#EDDFD7] rounded-xl text-[#222222]"
  >
    <!-- Background -->

    <img class="img-responsive rounded-t-xl" src="/bayc/bayc-bg.png" alt="" />

    <!-- Title of NFT -->
    <p class=" text-center">Bored Ape Yacht Club</p>
    <div class=" h-[1px] bg-[#222222]" />
    <!-- Select NFT to deposit -->
    <p class=" text-sm p-1">Select NFT to list for swap</p>

    <!-- List of Owned NFTs for this collection -->

    <div class=" flex flex-row gap-2 overflow-x-auto ">
      {#if $userNfts != undefined}
        {#each $userNfts["bayc"] as nft}
          <div
            class={` rounded-lg mr-2 p-2 flex flex-col items-center ${
              $selectedNft == nft["tokenId"]
                ? " bg-[#FFF3C7] border-2 border-[#26b74f] drop-shadow-2xl   "
                : " border-2 border-[#896384]"
            }`}
            on:click={() => {
              // @ts-ignore
              selectedNft.set(nft.tokenId);
            }}
          >
            <img
              class=" rounded-lg object-contain  h-[70px]"
              src={nft["img"]}
              alt=""
            />
            <div class=" w-[100px] h-0 bg-transparent" />
            <p class=" text-center text-xs">{"Bored Ape"}</p>
            <div
              class=" bg-white w-max rounded-lg border border-[#E7E7E7] px-2"
            >
              <p class=" text-center">#{nft["tokenId"]}</p>
            </div>
          </div>
        {/each}
      {:else}
        <p
          class="flex flex-row overflow-x-auto font-poppins text-[12px] cursor-pointer"
        >
          Loading ...
        </p>
      {/if}
    </div>

    <!-- List to exchange it with -->
    <div class=" h-[1px] bg-[#222222]" />
    <div class=" flex  p-1 items-center">
      <p class=" flex-1 text-sm">Swap it with any of the following:</p>
      <input
        class=" h-8  w-12 text-center rounded-xl outline-none"
        bind:value={$enteredNftId}
        on:keydown={(event) => addNftToWantedList(event)}
        placeholder="-"
        type="text"
      />
    </div>
    <!-- List -->
    <div class=" flex flex-row gap-2 overflow-x-auto">
      {#each $interestedNFTs as nftId}
        <div
          class="flex flex-row gap-1 bg-[#FFF3C7] rounded-lg p-2 items-center"
        >
          <div class="flex-1">
            <p class="text-sm">{nftId}</p>
          </div>
          <div
            class="flex-1"
            on:click={() => removeNftFromInterestingList(nftId)}
          >
            <img class=" cursor-pointer" src="/cross.svg" alt="" />
          </div>
        </div>
      {/each}
    </div>

    <!-- drop button -->

    <div class=" flex items-center justify-center">
      {#if $isApproved === false}
        <div
          class=" cursor-pointer bg-[#222222] text-[#EDDFD7] px-6 py-2 rounded-[20px] text-base font-bold hover:drop-shadow-2xl ease-in-out delay-150 hover:scale-125 duration-300"
          on:click={async () => {
            console.log("Selected NFT: " + $selectedNft);
            
            const tx = await approveERC721($nftContractAddress, $nftSwapAddress, $selectedNft)
            await tx.wait();
            isApproved.set(true);
          }}
        >
          Approve
        </div>
      {:else}
        <div
          class=" cursor-pointer bg-[#222222] text-[#EDDFD7] px-6 py-2 rounded-[20px] text-base font-bold hover:drop-shadow-2xl ease-in-out delay-150 hover:scale-125 duration-300"
          on:click={async () => {
            console.log("Depositing ... ");
            
            const tx = await depositNftForOtherNfts($selectedNft, $interestedNFTs)
            await tx.wait();
            selectedNft.set(undefined);
            enteredNftId.set("");
            interestedNFTs.set([]);
          }}
        >
          Drop
        </div>
      {/if}
    </div>
  </div>
</div>
