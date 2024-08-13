import { NFTStorage, File } from "nft.storage";
import WeaveDB from "weavedb-sdk";

const nftStorage = new NFTStorage({
  token: process.env.NEXT_PUBLIC_NFT_STORAGE_API || "",
});

export const storeDataOnIPFS = async (data) => {
  if (!data.image) throw new Error("No image file provided");
  
  const imageFile = new File([data.image], data.image.name, { type: data.image.type });
  const metadata = {
    name: data.name,
    description: data.description,
    image: imageFile,
  };

  try {
    const result = await nftStorage.store(metadata);
    return `https://ipfs.io/ipfs/${result.url.substring(7)}`;
  } catch (error) {
    console.error("Error storing data on IPFS:", error);
    throw new Error("Failed to store data on IPFS");
  }
};

export const saveDataToWeaveDB = async (weaveDB, data) => {
  try {
    await weaveDB.save(data);
  } catch (error) {
    console.error("Error saving data to WeaveDB:", error);
    throw new Error("Failed to save data to WeaveDB");
  }
};

export const initializeWeaveDB = async () => {
  const db = new WeaveDB({ contractTxId: process.env.NEXT_PUBLIC_WEAVEDB_CONTRACT_TX_ID });
  await db.init();
  return db;
};
