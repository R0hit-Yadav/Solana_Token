import React, { FC, useState, useCallback, useRef, useEffect } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Metadata, PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { 
  LuX, 
  LuSearch, 
  LuLink, 
  LuRefreshCw, 
  LuSparkles, 
  LuCopy, 
  LuCheckCircle,
  LuExternalLink,
  LuDatabase,
  LuFileText
} from "react-icons/lu";
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
  const [copied, setCopied] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenTokenMetadata(false);
      }
    };
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpenTokenMetadata(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setOpenTokenMetadata]);

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
    setCopied(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    notify({ type: "success", message: "Copied to clipboard!" });
  };
  
  const renderContent = () => {
    if (!loaded) {
      // SEARCH VIEW
      return (
        <div className="text-center space-y-6">
          {/* Header Section */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
              <LuSparkles className="text-cyan-400" size={20} />
              <span className="text-sm font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                TOKEN EXPLORER
              </span>
            </div>
            
            <h3 className="mb-3 text-4xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
                Discover Token
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Metadata
              </span>
            </h3>
            
            <p className="text-lg text-slate-400 max-w-sm mx-auto">
              Enter a token mint address to view its complete on-chain and off-chain metadata
            </p>
          </div>

          {/* Search Icon */}
          <div className="relative mx-auto mb-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/30 mx-auto">
              <LuSearch className="text-white" size={36} />
            </div>
          </div>

          {/* Input Field */}
          <div className="relative group">
            <InputView
              name="Token Mint Address"
              placeholder="Enter Solana token mint address..."
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
            />
            <LuDatabase className="absolute top-10 right-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors duration-300" size={20} />
          </div>

          {/* Search Button */}
          <button
            onClick={getMetadata}
            disabled={isLoading || !tokenAddress}
            className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-500 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:from-cyan-700 hover:to-purple-600 hover:shadow-lg hover:shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
          >
            {isLoading ? (
              <>
                <ClipLoader color="#fff" size={20} />
                <span>Fetching Metadata...</span>
              </>
            ) : (
              <>
                <LuSearch className="group-hover:scale-110 transition-transform duration-300" />
                <span>Explore Token</span>
              </>
            )}
            
            {/* Animated shine effect */}
            {!isLoading && (
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
            )}
          </button>
        </div>
      );
    } else {
      // DISPLAY VIEW
      return (
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
              <LuCheckCircle className="text-emerald-400" size={20} />
              <span className="text-sm font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                METADATA FOUND
              </span>
            </div>
            
            <h3 className="text-3xl font-bold bg-gradient-to-r from-white via-emerald-200 to-cyan-300 bg-clip-text text-transparent">
              Token Information
            </h3>
          </div>

          {/* Token Display Card */}
          <div className="relative group">
            <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-6 sm:p-8 border border-slate-700/50 backdrop-blur-sm">
              {/* Animated border */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-emerald-500/20 p-[1px]">
                <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl"></div>
              </div>
              
              {/* Background Glow Effects */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 -left-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -bottom-24 -right-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl opacity-50"></div>
              </div>

              <div className="relative z-10">
                {/* Token Header */}
                <div className="flex flex-col items-center gap-6 sm:flex-row mb-8">
                  <div className="relative">
                    <img 
                      src={logo || '/assets/images/logo1.png'} 
                      alt="Token Logo" 
                      className="h-24 w-24 rounded-2xl border-2 border-slate-600 object-cover shadow-lg group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20"></div>
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-3xl font-bold text-white mb-2">{tokenMetadata?.name}</h2>
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <span className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        {tokenMetadata?.symbol}
                      </span>
                      <div className="px-2 py-1 rounded-lg bg-slate-800/50 border border-slate-700/30">
                        <span className="text-sm text-slate-400">Token</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metadata Details */}
                <div className="space-y-4">
                  {/* Mint Address */}
                  <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/30">
                          <LuDatabase size={18} className="text-cyan-400" />
                        </div>
                        <span className="font-semibold text-slate-300">
                          Mint Address
                        </span>
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="flex-1 sm:flex-initial px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/30">
                          <span className="font-mono text-sm text-slate-200 hidden sm:block">
                            {tokenAddress}
                          </span>
                          <span className="font-mono text-sm text-slate-200 sm:hidden">
                            {tokenAddress.substring(0, 8)}...{tokenAddress.substring(tokenAddress.length - 8)}
                          </span>
                        </div>
                        <button 
                          onClick={() => handleCopy(tokenAddress)}
                          className="p-1.5 rounded-lg border border-slate-700/30 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-200"
                        >
                          {copied ? <LuCheckCircle className="text-emerald-400" size={18} /> : <LuCopy size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Metadata URI */}
                  <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/30">
                          <LuFileText size={18} className="text-purple-400" />
                        </div>
                        <span className="font-semibold text-slate-300">
                          Metadata URI
                        </span>
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <a 
                          href={tokenMetadata?.uri} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-cyan-500/20 hover:from-purple-500/30 hover:to-cyan-500/30 border border-purple-500/30 hover:border-purple-400/50 text-purple-400 hover:text-purple-300 transition-all duration-300"
                        >
                          <span className="text-sm font-medium">View Metadata JSON</span>
                          <LuExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info if available */}
                  {tokenMetadata?.sellerFeeBasisPoints !== undefined && (
                    <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/30">
                            <LuSparkles size={18} className="text-emerald-400" />
                          </div>
                          <span className="font-semibold text-slate-300">Creator Royalty</span>
                        </div>
                        <div className="px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/30">
                          <span className="text-emerald-400 font-semibold">{tokenMetadata.sellerFeeBasisPoints / 100}%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Button */}
          <button
            onClick={resetState}
            className="group relative inline-flex w-full items-center justify-center gap-3 rounded-xl px-8 py-4 text-lg font-semibold text-white transition-all duration-300 overflow-hidden bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-emerald-500/20 hover:from-purple-500/30 hover:via-cyan-500/30 hover:to-emerald-500/30 border border-purple-500/30 hover:border-purple-400/50"
          >
            <LuRefreshCw className="group-hover:rotate-180 transition-transform duration-500" />
            Search Another Token
            {/* Animated shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>
          </button>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md overflow-y-auto p-4">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-900/90 rounded-2xl p-8 border border-cyan-500/20 text-center">
            <ClipLoader color="#06b6d4" size={50} />
            <p className="mt-4 text-white font-medium">Fetching token metadata...</p>
          </div>
        </div>
      )}

      <div
        ref={modalRef}
        className="relative w-full max-w-2xl rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900/95 to-slate-800/90 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl"
      >
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] rounded-3xl"></div>
        
        {/* Glowing Background Elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl"></div>

        {/* Close Button */}
        <button
          onClick={() => setOpenTokenMetadata(false)}
          className="absolute top-4 right-4 rounded-full p-2 text-gray-500 transition-colors duration-300 hover:bg-gray-700 hover:text-white"
          aria-label="Close modal"
        >
          <LuX size={24} />
        </button>

        {/* Main Content */}
        <div className="relative z-10">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};