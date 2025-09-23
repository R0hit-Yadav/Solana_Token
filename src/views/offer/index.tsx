import React, { FC } from 'react';
import { LuPackagePlus, LuSliders, LuTerminalSquare, LuArrowRight } from 'react-icons/lu';

export const OfferView: FC = () => {
  // Array of offers with unique content for clean mapping
  const offers = [
    {
      icon: <LuPackagePlus size={32} />,
      title: 'No-Code Token Minting',
      description: 'Launch your SPL token in minutes with our guided, step-by-step creator. No programming knowledge required.',
      borderColor: 'border-purple-500',
      shadowColor: 'hover:shadow-purple-500/10',
    },
    {
      icon: <LuSliders size={32} />,
      title: 'On-Chain Metadata',
      description: 'Easily manage and update your tokens on-chain data, including name, symbol, and image URI, directly from our dashboard.',
      borderColor: 'border-cyan-500',
      shadowColor: 'hover:shadow-cyan-500/10',
    },
    {
      icon: <LuTerminalSquare size={32} />,
      title: 'Developer-Friendly APIs',
      description: 'Integrate our powerful token creation and management tools directly into your own applications with our robust APIs.',
      borderColor: 'border-teal-500',
      shadowColor: 'hover:shadow-teal-500/10',
    },
  ];

  return (
    <section id="offers" className="relative bg-gray-950 py-20 sm:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(122,_93,_248,_0.15),_transparent_40%)]"></div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            Why Build on Solana With Us?
          </h2>
          <p className="text-lg text-gray-400">
            We provide a suite of powerful, user-friendly tools designed to streamline the entire token lifecycle on the Solana blockchain.
          </p>
        </div>

        {/* Offers Grid - Corrected Layout */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer, index) => (
            <div
              key={index}
              className={`group relative cursor-pointer overflow-hidden rounded-xl border border-gray-700/50 bg-gray-900/50 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${offer.borderColor} border-l-4 ${offer.shadowColor}`}
            >
              <div className="relative z-10">
                {/* Gradient Icon */}
                <div className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">
                  {offer.icon}
                </div>

                <h3 className="mt-6 mb-3 text-2xl font-bold text-white">{offer.title}</h3>
                <p className="text-gray-400">{offer.description}</p>
              </div>

              {/* Interactive Arrow on Hover */}
              <LuArrowRight
                className="absolute top-8 right-8 text-gray-700 transition-all duration-300 group-hover:text-cyan-400 group-hover:translate-x-1"
                size={24}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};