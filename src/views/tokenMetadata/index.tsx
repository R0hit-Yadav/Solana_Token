import React, { FC, useState, useCallback, useRef, useEffect } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Metadata, PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { LuX, LuSearch, LuLink, LuRefreshCw } from "react-icons/lu";
import { ClipLoader } from "react-spinners";
import { notify } from "../../utils/notifications";
import { InputView } from "../input";

interface TokenMetadataProps {
  setOpenTokenMetadata: (open: boolean) => void;
}

export const TokenMetadata: FC<TokenMetadataProps> = ({ setOpenTokenMetadata }) => {
  const { connection } = useConnection();
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenMetadata, setTokenMetadata] = useState<any>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenTokenMetadata(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setOpenTokenMetadata]);

  // Close modal on outside click
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setOpenTokenMetadata(false);
    }
  };

  const getMetadata = useCallback(async () => {
    if (!tokenAddress) {
      notify({ type: "error", message: "Please enter a token address." });
      return;
    }
    setIsLoading(true);
    try {
      const tokenMint = new PublicKey(tokenAddress);
      const metadataPDA = PublicKey.findProgramAddressSync(
        [Buffer.from("metadata"), PROGRAM_ID.toBuffer(), tokenMint.toBuffer()],
        PROGRAM_ID
      )[0];

      const metadataAccount = await connection.getAccountInfo(metadataPDA);
      if (!metadataAccount) throw new Error("Metadata account not found.");
      
      const [metadata] = Metadata.deserialize(metadataAccount.data);
      
      const response = await fetch(metadata.data.uri);
      const json = await response.json();

      setTokenMetadata(metadata.data);
      setLogo(json.image);
      setLoaded(true);
      notify({ type: "success", message: "Token Metadata Fetched Successfully!" });
    } catch (error: any) {
      notify({ type: "error", message: `Failed to fetch metadata: ${error?.message}` });
      resetState();
    } finally {
      setIsLoading(false);
    }
  }, [tokenAddress, connection]);

  const resetState = () => {
    setTokenAddress("");
    setTokenMetadata(null);
    setLogo(null);
    setLoaded(false);
  };
  
  const renderContent = () => {
    if (!loaded) {
      // SEARCH VIEW
      return (
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
            <LuSearch size={32} />
          </div>
          <h3 className="mb-2 text-2xl font-bold text-white">View Token Metadata</h3>
          <p className="mb-6 text-gray-400">
            Enter a token mint address to view its on-chain and off-chain metadata.
          </p>
          <InputView
            name="Token Address"
            placeholder="Enter token mint address"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
          />
          <button
            onClick={getMetadata}
            disabled={isLoading}
            className="group mt-4 inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3 text-lg font-semibold text-white transition-all duration-300 hover:from-purple-700 hover:to-cyan-600 hover:scale-105 disabled:opacity-50"
          >
            {isLoading ? "Fetching..." : "Get Metadata"}
          </button>
        </div>
      );
    } else {
      // DISPLAY VIEW
      return (
        <div>
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <img 
              src={logo || 'assets/images/logo1.png'} 
              alt="Token Logo" 
              className="h-28 w-28 rounded-full border-2 border-gray-700 object-cover animate-float" // Animation added here
            />
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-bold text-white">{tokenMetadata?.name}</h2>
              <span className="text-lg font-semibold text-gray-400">{tokenMetadata?.symbol}</span>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between rounded-lg bg-gray-800/50 p-3">
              <span className="font-semibold text-gray-400">Mint Address</span>
              <span className="truncate font-mono text-sm text-gray-200">{tokenMetadata?.mint?.toString().substring(0, 16)}...</span>
            </div>
            <div className="flex justify-between items-center rounded-lg bg-gray-800/50 p-3">
              <span className="font-semibold text-gray-400">Metadata URI</span>
              <a href={tokenMetadata?.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300">
                View JSON <LuLink />
              </a>
            </div>
          </div>
          
          <button
            onClick={resetState}
            className="group mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full border-2 border-gray-600 px-6 py-3 text-lg font-semibold text-gray-300 transition-all duration-300 hover:border-gray-500 hover:text-white"
          >
            <LuRefreshCw className="transition-transform group-hover:rotate-45" />
            Search Again
          </button>
        </div>
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
      onClick={handleOutsideClick}
    >
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <ClipLoader color="#9333ea" size={50} />
        </div>
      )}
      <div
        ref={modalRef}
        className="relative w-full max-w-lg rounded-2xl border border-gray-700/50 bg-gray-900/80 p-8 shadow-2xl shadow-purple-500/10"
      >
        <button
          onClick={() => setOpenTokenMetadata(false)}
          className="absolute top-4 right-4 rounded-full p-2 text-gray-500 transition-colors duration-300 hover:bg-gray-700 hover:text-white"
          aria-label="Close modal"
        >
          <LuX size={24} />
        </button>
        {renderContent()}
      </div>
    </div>
  );
};