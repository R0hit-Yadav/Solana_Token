import React, { FC, useEffect, useCallback, useState, useRef } from 'react';
import useUserSOLBalanceStore from 'stores/useUserSOLBalanceStore';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionSignature } from '@solana/web3.js';
import { notify } from '../../utils/notifications';
import { LuX, LuSend } from 'react-icons/lu';

import { InputView } from '../input'; // Adjusted path for clarity
import Branding from '../../components/Branding';

interface DonateViewProps {
  setOpenSendTransaction: (open: boolean) => void;
}

export const DonateView: FC<DonateViewProps> = ({ setOpenSendTransaction }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState("0.0");
  const [isSending, setIsSending] = useState(false);
  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();
  
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (publicKey) {
      getUserSOLBalance(publicKey, connection);
    }
  }, [publicKey, connection, getUserSOLBalance]);
  
  // Close modal on escape key press or outside click
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenSendTransaction(false);
    };
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpenSendTransaction(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setOpenSendTransaction]);

  const handleSend = useCallback(async () => {
    if (!publicKey) {
      notify({ type: "error", message: "Wallet not connected!" });
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      notify({ type: "error", message: "Please enter a valid amount." });
      return;
    }

    // Use creator address from environment variable
    const envAddress = process.env.NEXT_PUBLIC_CREATOR_ADDRESS;
    if (!envAddress) {
      notify({ type: "error", message: "Creator address not set in environment!" });
      return;
    }
    const creatorAddress = new PublicKey(envAddress);
    
    setIsSending(true);
    let signature: TransactionSignature = "";
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: creatorAddress,
          lamports: LAMPORTS_PER_SOL * Number(amount),
        })
      );

      signature = await sendTransaction(transaction, connection);
      notify({
        type: "success",
        message: `Successfully sent ${amount} SOL`,
        txid: signature,
      });
      // Refresh balance after successful transaction
      getUserSOLBalance(publicKey, connection);
      setAmount("0.0");
    } catch (error: any) {
      notify({
        type: "error",
        message: 'Transaction Failed!',
        description: error?.message,
        txid: signature,
      });
    } finally {
      setIsSending(false);
    }
  }, [publicKey, amount, sendTransaction, connection, getUserSOLBalance]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div
        ref={modalRef}
        className="relative mx-4 w-full max-w-4xl overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-900/50 shadow-2xl shadow-purple-500/10"
      >
        <button
          onClick={() => setOpenSendTransaction(false)}
          className="absolute top-4 right-4 z-20 rounded-full p-2 text-gray-500 transition-colors duration-300 hover:bg-gray-700 hover:text-white"
          aria-label="Close modal"
        >
          <LuX size={24} />
        </button>
        
        <div className="grid lg:grid-cols-2">
          {/* Left Column: Branding */}
          <div className="hidden lg:block">
            <Branding
              image="auth-img"
              title="Support the Creator"
              message="Your contribution helps keep this platform running and supports the development of new tools for the Solana ecosystem."
            />
          </div>

          {/* Right Column: Form */}
          <div className="flex flex-col p-8 lg:p-10">
            <h2 className="mb-4 text-3xl font-bold text-white">Send a Donation</h2>
            <p className="mb-6 text-gray-400">
              Show your appreciation by sending SOL to the creator. Your current balance is displayed below.
            </p>

            <div className="mb-6 rounded-lg bg-gray-800/50 p-4">
              <p className="text-sm font-medium text-gray-400">Your Balance</p>
              <p className="text-2xl font-bold text-white">
                {(balance || 0).toLocaleString()} SOL
              </p>
            </div>

            <div className="text-left">
              <InputView
                name="Amount (SOL)"
                placeholder="0.0"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <button
                onClick={handleSend}
                disabled={!publicKey || isSending}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3 text-lg font-semibold text-white transition-all duration-300 hover:from-purple-700 hover:to-cyan-600 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              >
                <LuSend/>
                {isSending ? "Sending..." : "Send Donation"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};