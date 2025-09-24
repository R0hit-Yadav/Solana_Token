import React, { FC, useState, useEffect, useCallback, useRef } from "react";
import useUserSOLBalanceStore from "stores/useUserSOLBalanceStore";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, TransactionSignature } from "@solana/web3.js";
import { notify } from "utils/notifications";
import { LuX, LuDroplets } from "react-icons/lu";

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
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setOpenAirdrop]);

  // Close modal on outside click
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setOpenAirdrop(false);
    }
  };

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md rounded-2xl border border-gray-700/50 bg-gray-900/80 p-8 shadow-2xl shadow-purple-500/10"
      >
        <button
          onClick={() => setOpenAirdrop(false)}
          className="absolute top-4 right-4 rounded-full p-2 text-gray-500 transition-colors duration-300 hover:bg-gray-700 hover:text-white"
          aria-label="Close modal"
        >
          <LuX size={24} />
        </button>

        <div className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
            <LuDroplets size={32} />
          </div>
          <h2 className="mb-2 text-3xl font-bold text-white">Request Airdrop</h2>
          <p className="mb-6 text-gray-400">
            Get 1 SOL for testing on the Devnet. Your current balance is displayed below.
          </p>

          <div className="mb-6 rounded-lg bg-gray-800/50 p-4">
            <p className="text-sm font-medium text-gray-400">Current Balance</p>
            <p className="text-2xl font-bold text-white">
              {(balance || 0).toLocaleString()} SOL
            </p>
          </div>

          <button
            onClick={handleAirdrop}
            disabled={!publicKey || isLoading}
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3 text-lg font-semibold text-white transition-all duration-300 hover:from-purple-700 hover:to-cyan-600 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            {isLoading ? "Requesting..." : "Airdrop 1 SOL"}
          </button>
        </div>
      </div>
    </div>
  );
};