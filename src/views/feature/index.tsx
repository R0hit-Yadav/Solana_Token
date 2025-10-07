import React, { FC } from 'react';
import { Combine, Droplets, Send, Sliders, ArrowRight, Sparkles } from 'lucide-react';

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
  const features = [
    {
      name: 'Token Generator',
      icon: <Combine size={32} />,
      description: 'Use our intuitive wizard to create, mint, and deploy your custom SPL token without writing a single line of code.',
      function: setOpenCreateModal,
      gradient: 'from-purple-500 via-purple-400 to-cyan-400',
      glowColor: 'shadow-purple-500/50',
    },
    {
      name: 'Get Airdrop',
      icon: <Droplets size={32} />,
      description: 'Instantly fund your devnet wallet with free SOL to test your new tokens and applications effortlessly.',
      function: setOpenAirdrop,
      gradient: 'from-cyan-500 via-teal-400 to-green-400',
      glowColor: 'shadow-cyan-500/50',
    },
    {
      name: 'Transfer SOL',
      icon: <Send size={32} />,
      description: 'A simple and secure interface to send SOL or any SPL token to another wallet on the Solana network.',
      function: setOpenSendTransaction,
      gradient: 'from-teal-500 via-emerald-400 to-cyan-400',
      glowColor: 'shadow-teal-500/50',
    },
    {
      name: 'Token Metadata',
      icon: <Sliders size={32} />,
      description: 'Easily view or update the on-chain metadata for any token you own, including name, symbol, and URI.',
      function: setOpenTokenMetaData,
      gradient: 'from-blue-500 via-cyan-400 to-teal-400',
      glowColor: 'shadow-blue-500/50',
    },
  ];

  return (
    <section id="features" className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 sm:py-32 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20">
            <Sparkles className="text-cyan-400" size={20} />
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              POWERFUL FEATURES
            </span>
          </div>
          
          <h2 className="mb-6 text-5xl md:text-6xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
              An All-in-One Toolkit
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              for Solana
            </span>
          </h2>
          
          <p className="text-xl text-slate-400">
            From creation to distribution, our platform provides the essential tools you need to manage your token projects.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              onClick={() => feature.function(true)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/50 p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-slate-700/50 backdrop-blur-xl"
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${feature.gradient} p-[2px]`}>
                <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl"></div>
              </div>

              {/* Glow Effect */}
              <div className={`absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 bg-gradient-to-r ${feature.gradient}`}></div>

              <div className="relative z-10">
                {/* Icon with Gradient */}
                <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:shadow-2xl ${feature.glowColor} transition-all duration-500 group-hover:scale-110`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>

                <h3 className="mb-4 text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-300 group-hover:bg-clip-text transition-all duration-300">
                  {feature.name}
                </h3>
                
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Arrow Icon */}
                <div className="absolute top-8 right-8 text-slate-700 transition-all duration-300 group-hover:text-cyan-400 group-hover:translate-x-2 group-hover:scale-125">
                  <ArrowRight size={24} />
                </div>
              </div>

              {/* Animated Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};