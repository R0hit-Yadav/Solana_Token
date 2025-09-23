import React, { FC } from 'react';
import { LuCombine, LuDroplets, LuSendHorizonal, LuSliders, LuArrowRight } from 'react-icons/lu';

// Define the component's props interface for type safety
interface FeatureViewProps {
  setOpenAirdrop: (open: boolean) => void;
  setOpenContact: (open: boolean) => void;
  setOpenCreateModal: (open: boolean) => void;
  setOpenSendTransaction: (open: boolean) => void;
  setOpenTokenMetaData: (open: boolean) => void;
}

export const FeatureView: FC<FeatureViewProps> = ({
  setOpenAirdrop,
  setOpenCreateModal,
  setOpenSendTransaction,
  setOpenTokenMetaData,
}) => {
  // Updated features array with unique descriptions and consistent icons
  const features = [
    {
      name: 'Token Generator',
      icon: <LuCombine size={32} />,
      description: 'Use our intuitive wizard to create, mint, and deploy your custom SPL token without writing a single line of code.',
      function: setOpenCreateModal,
    },
    {
      name: 'Get Airdrop',
      icon: <LuDroplets size={32} />,
      description: 'Instantly fund your devnet wallet with free SOL to test your new tokens and applications effortlessly.',
      function: setOpenAirdrop,
    },
    {
      name: 'Transfer SOL',
      icon: <LuSendHorizonal size={32} />,
      description: 'A simple and secure interface to send SOL or any SPL token to another wallet on the Solana network.',
      function: setOpenSendTransaction,
    },
    {
      name: 'Token Metadata',
      icon: <LuSliders size={32} />,
      description: 'Easily view or update the on-chain metadata for any token you own, including name, symbol, and URI.',
      function: setOpenTokenMetaData,
    },
  ];

  const iconColors = [
    'bg-purple-600/20 text-purple-400',
    'bg-cyan-600/20 text-cyan-400',
    'bg-teal-600/20 text-teal-400',
    'bg-sky-600/20 text-sky-400',
  ];

  return (
    <section id="features" className="relative bg-gray-950 py-20 sm:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(122,_93,_248,_0.15),_transparent_40%)]"></div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            An All-in-One Toolkit for Solana
          </h2>
          <p className="text-lg text-gray-400">
            From creation to distribution, our platform provides the essential tools you need to manage your token projects.
          </p>
        </div>

        {/* Features Grid */}
        <div className="overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-900/50 backdrop-blur-lg">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {features.map((feature, index) => (
              <div
                key={feature.name}
                onClick={() => feature.function(true)}
                className="group relative cursor-pointer p-8 transition-colors duration-300 hover:bg-gray-800/40
                           border-t border-gray-700/50
                           md:[&:nth-child(1)]:border-t-0 md:[&:nth-child(2)]:border-t-0
                           md:[&:nth-child(odd)]:border-r md:[&:nth-child(odd)]:border-gray-700/50"
              >
                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-xl ${iconColors[index % iconColors.length]}`}
                >
                  {feature.icon}
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">{feature.name}</h3>
                <p className="text-gray-400">{feature.description}</p>
                <LuArrowRight className="absolute top-8 right-8 text-gray-700 transition-all duration-300 group-hover:text-purple-400 group-hover:translate-x-1" size={24} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};