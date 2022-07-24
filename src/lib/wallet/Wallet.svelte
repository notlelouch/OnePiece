<script lang="ts">
  import { walletConnected, address, openWallet } from "../../store";
  import { getShortAddress } from "../utils/util";
  import { connectWallet, handleConnect, handleDisconnect } from "./wallet";
  import { afterUpdate, onMount } from "svelte";

  afterUpdate(async () => {
    console.log("Hello");

    if (typeof window !== 'undefined') {
        await handleConnect();
    }
    
  });
</script>

{#if $walletConnected}
  <div class=" group relative font-poppins">
    <button
      class=" flex gap-3 items-center bg-[#F6F6FE] border border-[#E9ECFF] rounded-[28px] py-2 px-4"
      on:click={() => {
        openWallet.set(!$openWallet);
        handleDisconnect()
      }}
    >
      <!-- Metamask -->
      <img src="/metamask.svg" alt="" />

      <!-- Short address -->
      <p class=" text-sm text-black">{getShortAddress($address)}</p>
      <!-- down arrow -->
      {#if $openWallet == false}
        <img class=" h-5" src="/cross.svg" alt="" />
      {/if}
    </button>
  </div>
{:else}
  <div class=" rounded-3xl bg-gradient-to-r from-[#97d7ff] to-[#ffc80e]">
    <div
      on:click={connectWallet}
      class=" transition ease-in cursor-pointer text-black rounded-xl py-2 px-4 "
    >
      Connect Wallet
    </div>
  </div>
{/if}
