import axios from "axios";
export async function uploadImageMetadataToIpfs() {
  const requestBody = {
    name: "OpenRiver",
    description: "Early User NFT",
    file_url:
      "ipfs://bafybeidsqahwg7lqt3d2aan2hgkl6e6dthkhud3bjcc4aszvdkdz6xtkwm/bayc-2.png",
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: "4bf08cbc-304e-40e6-9ce3-4eded8ea524c",
  };

  console.log("Request Body");

  console.log(JSON.stringify(requestBody));

  const response = await axios.post(
    "https://api.nftport.xyz/v0/metadata",
    JSON.stringify(requestBody),
    { headers: headers }
  );

  console.log("-----Response-----");
  console.log(response.data.metadata_uri);
  return response.data.metadata_uri;
}
