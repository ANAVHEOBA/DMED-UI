import { useState, useCallback } from "react";
import { NFTStorage } from "nft.storage";

const useNFTStorage = () => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  // Initialize the NFTStorage client with your token
  const client = new NFTStorage({
    token: process.env.NEXT_PUBLIC_NFT_STORAGE_API || "",
  });

  const storeData = useCallback(
    async (data) => {
      setIsReady(false);
      setError(null);

      try {
        const result = await client.store(data);
        const ipfsURL = `https://ipfs.io/ipfs/${result.url.slice(7)}`;
        setIsReady(true);
        return ipfsURL;
      } catch (err) {
        setError(err);
        return null;
      }
    },
    [client]
  );

  const fetchData = useCallback(
    async (hash) => {
      setIsReady(false);
      setError(null);

      try {
        const result = await client.retrieve(hash);
        setIsReady(true);
        return await result.text(); // Assuming you want the text content
      } catch (err) {
        setError(err);
        return null;
      }
    },
    [client]
  );

  return { storeData, fetchData, isReady, error };
};

export default useNFTStorage;
