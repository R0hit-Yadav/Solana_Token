import React, { FC, useState, useEffect, useCallback, useRef } from "react";
import useUserSOLBalanceStore from "stores/useUserSOLBalanceStore";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, TransactionSignature } from "@solana/web3.js";
import { notify } from "utils/notifications";
import { 
  LuX, 
  LuDroplets, 
  LuSparkles, 
  LuWallet, 
  LuCoins,
  LuRefreshCw,
  LuZap
} from "react-icons/lu";
import { ClipLoader } from "react-spinners";

interface AirdropViewProps {
  setOpenAirdrop: (open: boolean) => void;
}

export const AirdropView: FC<AirdropViewProps> = ({ setOpenAirdrop }) => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Fetch balance on mount and when publicKey changes
  useEffect(() => {
    if (publicKey) {
      getUserSOLBalance(publicKey, connection);
    }
  }, [publicKey, connection, getUserSOLBalance]);
  
  // Close modal on escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenAirdrop(false);
      }
    };
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpenAirdrop(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setOpenAirdrop]);

  const handleAirdrop = useCallback(async () => {
    if (!publicKey) {
      notify({ type: "error", message: "Wallet not connected!" });
      return;
    }

    setIsLoading(true);
    let signature: TransactionSignature = "";
    try {
      signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
      
      const latestBlockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature,
      });

      notify({
        type: "success",
        message: "Airdrop of 1 SOL successful!",
        txid: signature,
      });

      getUserSOLBalance(publicKey, connection);
    } catch (error: any) {
      notify({
        type: "error",
        message: "Airdrop failed!",
        description: error?.message,
        txid: signature,
      });
    } finally {
      setIsLoading(false);
    }
  }, [publicKey, connection, getUserSOLBalance]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md overflow-y-auto p-4">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-900/90 rounded-2xl p-8 border border-emerald-500/20 text-center">
            <ClipLoader color="#10b981" size={50} />
            <p className="mt-4 text-white font-medium">Requesting airdrop...</p>
          </div>
        </div>
      )}

      <div
        ref={modalRef}
        className="relative w-full max-w-xl rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900/95 to-slate-800/90 p-8 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl"
      >
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] rounded-3xl"></div>
        
        {/* Glowing Background Elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-600/5 rounded-full blur-3xl"></div>

        {/* Close Button */}
        <button
          onClick={() => setOpenAirdrop(false)}
          className="absolute top-4 right-4 rounded-full p-2 text-gray-500 transition-colors duration-300 hover:bg-gray-700 hover:text-white"
          aria-label="Close modal"
        >
          <LuX size={24} />
        </button>

        {/* Main Content */}
        <div className="relative z-10 text-center space-y-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
              <LuSparkles className="text-emerald-400" size={20} />
              <span className="text-sm font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                DEVNET FAUCET
              </span>
            </div>
            
            <h2 className="mb-3 text-4xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-white via-emerald-200 to-cyan-300 bg-clip-text text-transparent">
                Request SOL
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Airdrop
              </span>
            </h2>
            
            <p className="text-lg text-slate-400 max-w-md mx-auto">
              Get 1 SOL for testing your applications on Solana Devnet
            </p>
          </div>

          {/* Airdrop Icon */}
          <div className="relative mx-auto mb-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/30 mx-auto">
              <LuDroplets className="text-white" size={36} />
            </div>
          </div>

          {/* Balance Card */}
          <div className="relative group">
            <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-6 border border-slate-700/50 backdrop-blur-sm">
              {/* Animated border */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 p-[1px]">
                <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <LuWallet className="text-slate-400" size={24} />
                  <p className="text-lg font-medium text-slate-400">Current Balance</p>
                </div>
                
                <div className="flex items-center justify-center gap-2">
                  <LuCoins className="text-emerald-400" size={32} />
                  <p className="text-4xl font-black bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                    {(balance || 0).toLocaleString()}
                  </p>
                  <span className="text-2xl font-bold text-slate-300">SOL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Airdrop Button */}
          <div className="space-y-4">
            <button
              onClick={handleAirdrop}
              disabled={!publicKey || isLoading}
              className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-500 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:from-emerald-700 hover:to-cyan-600 hover:shadow-lg hover:shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            >
              {isLoading ? (
                <>
                  <ClipLoader color="#fff" size={20} />
                  <span>Requesting Airdrop...</span>
                </>
              ) : (
                <>
                  <LuZap className="group-hover:scale-110 transition-transform duration-300" />
                  <span>Request 1 SOL Airdrop</span>
                </>
              )}
              
              {/* Animated shine effect */}
              {!isLoading && (
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
              )}
            </button>

            {!publicKey && (
              <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
                <LuWallet size={16} />
                Connect your wallet to request airdrop
              </p>
            )}
          </div>

          {/* Info Section */}
          <div className="mt-8 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-emerald-400">Note:</strong> This airdrop works only on Solana Devnet. 
              The SOL received is for testing purposes and has no real value.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};