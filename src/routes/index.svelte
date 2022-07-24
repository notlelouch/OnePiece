<script lang="ts">
import Header from "../components/Header.svelte";
import Vault from "../components/Vault.svelte";

  
</script>

<!-- Header -->
<div class=" font-libre p-4 min-h-screen bg-[#222222] text-[#EDDFD7]">
  <Header />
  <!-- Divider -->
  <div class="h-[2px] bg-[#EDDFD7]" />
  <!-- Intro header -->
  <div class=" p-12 text-xl text-center">
    One Piece is a decentralized bucket where users deposit their NFTs in the
    vault and mention NFTs they are willing to swap with theirs. The bucket will
    actively look out for any match between two distinct users. Our Dapp will
    automatically exchange the NFTs when there is a match between two users;
    thus, users get their desired NFTs without actively golfing for them on
    marketplaces.
  </div>

  <!-- Body/Buckets -->

  <Vault />
</div>
