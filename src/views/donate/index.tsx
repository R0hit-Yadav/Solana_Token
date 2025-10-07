import React, { FC, useEffect, useCallback, useState, useRef } from 'react';
import useUserSOLBalanceStore from 'stores/useUserSOLBalanceStore';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionSignature } from '@solana/web3.js';
import { notify } from '../../utils/notifications';
import { 
  LuX, 
  LuSend, 
  LuSparkles, 
  LuHeart, 
  LuWallet, 
  LuCoins,
  LuGift,
  LuZap
} from 'react-icons/lu';
import { ClipLoader } from 'react-spinners';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md overflow-y-auto p-4">
      {/* Loading Overlay */}
      {isSending && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-900/90 rounded-2xl p-8 border border-pink-500/20 text-center">
            <ClipLoader color="#ec4899" size={50} />
            <p className="mt-4 text-white font-medium">Sending donation...</p>
          </div>
        </div>
      )}

      <div
        ref={modalRef}
        className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900/95 to-slate-800/90 shadow-2xl shadow-pink-500/10 backdrop-blur-xl"
      >
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] rounded-3xl"></div>
        
        {/* Glowing Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>

        {/* Close Button */}
        <button
          onClick={() => setOpenSendTransaction(false)}
          className="absolute top-6 right-6 z-20 rounded-full p-3 text-slate-500 transition-all duration-300 hover:bg-slate-700/50 hover:text-white group"
          aria-label="Close modal"
        >
          <LuX size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
        
        <div className="grid lg:grid-cols-2 relative z-10">
          {/* Left Column: Enhanced Branding */}
          <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-r border-slate-700/50">
            <div className="text-center space-y-6">
              {/* Heart Icon with Animation */}
              <div className="relative mx-auto">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 shadow-lg shadow-pink-500/30 mx-auto">
                  <LuHeart className="text-white animate-pulse" size={40} />
                </div>
              </div>

              {/* Header */}
              <div>
                <h3 className="text-4xl font-black tracking-tight mb-3">
                  <span className="bg-gradient-to-r from-white via-pink-200 to-purple-300 bg-clip-text text-transparent">
                    Support the
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                    Creator
                  </span>
                </h3>
                
                <p className="text-lg text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Your contribution helps keep this platform running and supports the development of new tools for the Solana ecosystem.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 pt-6">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="p-2 rounded-lg bg-pink-500/20">
                    <LuZap className="text-pink-400" size={16} />
                  </div>
                  <span className="text-sm">Lightning-fast transactions</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <LuGift className="text-purple-400" size={16} />
                  </div>
                  <span className="text-sm">Support open-source development</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="p-2 rounded-lg bg-violet-500/20">
                    <LuSparkles className="text-violet-400" size={16} />
                  </div>
                  <span className="text-sm">Help improve the ecosystem</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Enhanced Form */}
          <div className="flex flex-col p-8 lg:p-12 space-y-8">
            {/* Header Section */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20">
                <LuSparkles className="text-pink-400" size={20} />
                <span className="text-sm font-semibold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  SEND DONATION
                </span>
              </div>
              
              <h2 className="mb-3 text-4xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-white via-pink-200 to-purple-300 bg-clip-text text-transparent">
                  Show Your Love
                </span>
              </h2>
              
              <p className="text-lg text-slate-400 max-w-md">
                Send SOL to support the creator and help build amazing tools for the Solana community
              </p>
            </div>

            {/* Mobile Branding (visible on small screens) */}
            <div className="lg:hidden text-center">
              <div className="relative mx-auto mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 shadow-lg shadow-pink-500/30 mx-auto">
                  <LuHeart className="text-white animate-pulse" size={28} />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-pink-400 animate-ping opacity-20"></div>
              </div>
            </div>

            {/* Balance Card */}
            <div className="relative group">
              <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-6 border border-slate-700/50 backdrop-blur-sm">
                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-pink-500/20 to-purple-500/20 p-[1px]">
                  <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl"></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <LuWallet className="text-slate-400" size={20} />
                    <p className="text-base font-medium text-slate-400">Your Balance</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <LuCoins className="text-pink-400" size={28} />
                    <p className="text-3xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                      {(balance || 0).toLocaleString()}
                    </p>
                    <span className="text-xl font-bold text-slate-300">SOL</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <label className="block text-base font-medium text-slate-400">
                Donation Amount (SOL)
              </label>
              <div className="relative group">
                <input
                  type="number"
                  placeholder="0.1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="block w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-4 text-slate-200 transition-all duration-300 placeholder:text-slate-500 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/30 backdrop-blur-sm text-lg"
                />
                <LuCoins className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-500 group-focus-within:text-pink-400 transition-colors duration-300" size={20} />
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-400">Quick amounts:</p>
              <div className="grid grid-cols-4 gap-2">
                {['0.1', '0.5', '1.0', '2.0'].map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => setAmount(quickAmount)}
                    className="px-3 py-2 rounded-lg border border-slate-600 text-slate-300 hover:border-pink-500/50 hover:text-pink-400 hover:bg-pink-500/5 transition-all duration-300 text-sm font-medium"
                  >
                    {quickAmount} SOL
                  </button>
                ))}
              </div>
            </div>

            {/* Send Button */}
            <div className="space-y-4">
              <button
                onClick={handleSend}
                disabled={!publicKey || isSending || !amount || parseFloat(amount) <= 0}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-500 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:from-pink-700 hover:to-purple-600 hover:shadow-lg hover:shadow-pink-500/30 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              >
                {isSending ? (
                  <>
                    <ClipLoader color="#fff" size={20} />
                    <span>Sending Donation...</span>
                  </>
                ) : (
                  <>
                    <LuSend className="group-hover:scale-110 transition-transform duration-300" />
                    <span>Send with Love</span>
                    <LuHeart className="group-hover:scale-110 transition-transform duration-300" />
                  </>
                )}
                
                {/* Animated shine effect */}
                {!isSending && (
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                )}
              </button>

              {!publicKey && (
                <p className="text-sm text-slate-500 text-center flex items-center justify-center gap-2">
                  <LuWallet size={16} />
                  Connect your wallet to send donation
                </p>
              )}
            </div>

            {/* Thank You Message */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20">
              <p className="text-sm text-slate-300 text-center leading-relaxed">
                <LuHeart className="inline text-pink-400 mr-1" size={16} />
                <strong className="text-pink-400">Thank you</strong> for supporting open-source development! 
                Every contribution helps make the Solana ecosystem better for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};