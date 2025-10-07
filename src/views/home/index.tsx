import { FC } from 'react';
import { MdGeneratingTokens } from 'react-icons/md';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import pkg from '../../../package.json';

// Data for the image marquees
const marqueeImages1 = ["img-9", "img-14", "img-21", "img-22", "img-10"];
const marqueeImages2 = ["img-6", "img-10", "img-11", "img-12", "img-13"];

interface HomeViewProps {
  setOpenCreateModal: (open: boolean) => void;
}

export const HomeView: FC<HomeViewProps> = ({ setOpenCreateModal }) => {
  return (
    <section id="home" className="relative overflow-hidden bg-[#0a0a0f] pt-20 pb-20 sm:pt-24 lg:pt-32">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#14F195]/5 via-[#9945FF]/5 to-[#14F195]/5 animate-gradient-shift"></div>
      
      {/* Grid overlay with Solana colors */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
      
      {/* Multiple radial gradients for depth */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#9945FF] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#14F195] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-[#00D4FF] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000"></div>

      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 border-2 border-[#9945FF]/30 rounded-lg rotate-45 animate-float-slow"></div>
      <div className="absolute bottom-40 right-20 w-16 h-16 border-2 border-[#14F195]/30 rounded-full animate-float-reverse"></div>
      <div className="absolute top-1/2 right-10 w-12 h-12 bg-gradient-to-br from-[#9945FF]/20 to-[#14F195]/20 rotate-12 animate-pulse-slow"></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Content Column */}
          <div className="text-center lg:text-left space-y-8">
            {/* Animated corner element */}
            <div className="bg-gradient-to-r from-[#9945FF] via-[#14F195] to-[#00D4FF] -z-1 start-0 absolute top-0 h-16 w-16 animate-spin-slow rounded-2xl rounded-br-none rounded-tl-none opacity-30 blur-sm"></div>

            {/* Badge with pulse animation */}
            <div className="inline-flex items-center">
              <span className="relative inline-block bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-[#9945FF]/50 animate-pulse-glow">
                <span className="relative z-10">Create Solana Token {pkg.version}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full blur-md opacity-50 animate-pulse"></div>
              </span>
            </div>

            {/* Main heading with advanced gradient */}
            <h1 className="relative text-4xl font-black text-white sm:text-5xl md:text-6xl lg:max-w-xl leading-tight">
              <span className="inline-block bg-gradient-to-r from-white via-[#14F195] to-[#9945FF] bg-clip-text text-transparent animate-gradient-x">
                Create Solana Tokens
              </span>
              <br />
              <span className="inline-block bg-gradient-to-r from-[#9945FF] via-[#00D4FF] to-[#14F195] bg-clip-text text-transparent animate-gradient-x-reverse">
                Instantly, No Code
              </span>
              <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full animate-slide-in"></div>
            </h1>
            
            {/* Description with better styling */}
            <p className="text-lg text-gray-300 lg:max-w-lg leading-relaxed font-light">
              Your all-in-one platform to design, mint, and manage{' '}
              <span className="text-[#14F195] font-semibold">SPL tokens</span> on the{' '}
              <span className="text-[#9945FF] font-semibold">Solana blockchain</span> with ease.
            </p>

            {/* Action Buttons with enhanced styling */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
              <button
                onClick={() => setOpenCreateModal(true)}
                className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#9945FF]/50 focus:outline-none focus:ring-4 focus:ring-[#9945FF]/50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#14F195] to-[#9945FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <MdGeneratingTokens className="relative z-10 h-6 w-6 transition-transform duration-300 group-hover:rotate-180" />
                <span className="relative z-10">Create Token</span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#9945FF] to-[#14F195] blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              </button>
              
              <WalletMultiButton className="!rounded-full !bg-white/5 !backdrop-blur-md !border !border-white/10 !font-bold !text-white hover:!bg-white/10 hover:!border-[#14F195]/50 hover:!shadow-lg hover:!shadow-[#14F195]/25 transition-all duration-300 !px-6 !py-4" />
            </div>

            {/* Stats or features row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-8 border-t border-white/5">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">10K+</div>
                <div className="text-sm text-gray-400">Tokens Created</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold bg-gradient-to-r from-[#14F195] to-[#00D4FF] bg-clip-text text-transparent">Lightning</div>
                <div className="text-sm text-gray-400">Fast Minting</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#9945FF] bg-clip-text text-transparent">Secure</div>
                <div className="text-sm text-gray-400">On-Chain</div>
              </div>
            </div>
          </div>

          {/* Right Image Marquee Column with enhancements */}
          <div className="relative mx-auto flex h-[550px] w-full max-w-md justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] lg:h-[650px]">
            {/* Glow effect behind marquee */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#9945FF]/10 via-transparent to-[#14F195]/10 blur-3xl"></div>
            
            {/* Column 1 */}
            <div className="marquee flex w-60 flex-col gap-6">
              <div className="marquee-content flex flex-col gap-6">
                {marqueeImages1.map((image, index) => (
                  <div key={`col1-${index}`} className="group relative overflow-hidden rounded-2xl">
                    <img 
                      src={`/assets/images/ai/${image}.jpg`} 
                      alt="" 
                      className="aspect-square h-auto w-full object-cover shadow-2xl shadow-[#9945FF]/20 transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#9945FF]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl"></div>
                  </div>
                ))}
              </div>
              <div aria-hidden="true" className="marquee-content flex flex-col gap-6">
                {marqueeImages1.map((image, index) => (
                  <div key={`col1-clone-${index}`} className="group relative overflow-hidden rounded-2xl">
                    <img 
                      src={`/assets/images/ai/${image}.jpg`} 
                      alt="" 
                      className="aspect-square h-auto w-full object-cover shadow-2xl shadow-[#9945FF]/20 transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#9945FF]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl"></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Column 2 (Reversed) */}
            <div className="marquee-reverse flex w-60 flex-col gap-6">
              <div className="marquee-content flex flex-col gap-6">
                {marqueeImages2.map((image, index) => (
                  <div key={`col2-${index}`} className="group relative overflow-hidden rounded-2xl">
                    <img 
                      src={`/assets/images/ai/${image}.jpg`} 
                      alt="" 
                      className="aspect-square h-auto w-full object-cover shadow-2xl shadow-[#14F195]/20 transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14F195]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl"></div>
                  </div>
                ))}
              </div>
              <div aria-hidden="true" className="marquee-content flex flex-col gap-6">
                {marqueeImages2.map((image, index) => (
                  <div key={`col2-clone-${index}`} className="group relative overflow-hidden rounded-2xl">
                    <img 
                      src={`/assets/images/ai/${image}.jpg`} 
                      alt="" 
                      className="aspect-square h-auto w-full object-cover shadow-2xl shadow-[#14F195]/20 transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14F195]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};