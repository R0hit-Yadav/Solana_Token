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
    <section id="home" className="relative overflow-hidden bg-gray-950 pt-20 pb-20 sm:pt-24 lg:pt-32">
      {/* Grid background and radial gradient */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(122,_93,_248,_0.15),_transparent_40%)]"></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Content Column */}
          <div className="text-center lg:text-left">
            {/* Spinning decorative element */}
            <div className="bg-gradient-to-r from-purple-500 to-cyan-400/30 -z-1 start-0 absolute top-0 h-14 w-14 animate-[spin_10s_linear_infinite] rounded-2xl rounded-br-none rounded-tl-none opacity-50"></div>

            <span className="inline-block bg-gradient-to-r from-purple-600 to-cyan-500 rounded-md px-4 py-2 text-sm font-semibold uppercase tracking-wider text-white shadow-lg">
              CREATE SOLANA TOKEN {pkg.version}
            </span>

            <h1 className="my-6 text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:max-w-xl bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
              Create Solana Tokens Instantly, No Code Required
            </h1>
            
            <p className="text-lg text-gray-400 lg:max-w-lg">
              Your all-in-one platform to design, mint, and manage SPL tokens on the Solana blockchain with ease.
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => setOpenCreateModal(true)}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3 text-lg font-semibold text-white transition-all duration-300 hover:from-purple-700 hover:to-cyan-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                <MdGeneratingTokens className="h-6 w-6 transition-transform duration-300 group-hover:rotate-45" />
                Create Token
              </button>
              
              {/* This component comes pre-styled, we just ensure it's aligned */}
              <WalletMultiButton className="!rounded-full !bg-gray-800/80 !backdrop-blur-sm !font-semibold !text-white hover:!bg-gray-700 transition-all duration-300" />
            </div>
          </div>

          {/* Right Image Marquee Column */}
          <div className="relative mx-auto flex h-[550px] w-full max-w-md justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] lg:h-[650px]">
            {/* Column 1 */}
            <div className="marquee flex w-60 flex-col gap-6">
              <div className="marquee-content flex flex-col gap-6">
                {marqueeImages1.map((image, index) => (
                  <img key={`col1-${index}`} src={`/assets/images/${image}.jpg`} alt="" className="aspect-square h-auto w-full rounded-xl object-cover shadow-lg" />
                ))}
              </div>
              <div aria-hidden="true" className="marquee-content flex flex-col gap-6">
                 {marqueeImages1.map((image, index) => (
                  <img key={`col1-clone-${index}`} src={`/assets/images/${image}.jpg`} alt="" className="aspect-square h-auto w-full rounded-xl object-cover shadow-lg" />
                ))}
              </div>
            </div>
            
            {/* Column 2 (Reversed) */}
            <div className="marquee-reverse flex w-60 flex-col gap-6">
               <div className="marquee-content flex flex-col gap-6">
                {marqueeImages2.map((image, index) => (
                  <img key={`col2-${index}`} src={`/assets/images/${image}.jpg`} alt="" className="aspect-square h-auto w-full rounded-xl object-cover shadow-lg" />
                ))}
              </div>
              <div aria-hidden="true" className="marquee-content flex flex-col gap-6">
                 {marqueeImages2.map((image, index) => (
                  <img key={`col2-clone-${index}`} src={`/assets/images/${image}.jpg`} alt="" className="aspect-square h-auto w-full rounded-xl object-cover shadow-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};