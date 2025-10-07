import React, { FC } from 'react';
import { Package, Sliders, Terminal, ArrowRight, Sparkles } from 'lucide-react';

export const OfferView: FC = () => {
  const offers = [
    {
      icon: <Package size={36} />,
      title: 'No-Code Token Minting',
      description: 'Launch your SPL token in minutes with our guided, step-by-step creator. No programming knowledge required.',
      gradient: 'from-purple-500 via-violet-500 to-purple-600',
      accentColor: 'text-purple-400',
      glowColor: 'shadow-purple-500/30',
    },
    {
      icon: <Sliders size={36} />,
      title: 'On-Chain Metadata',
      description: 'Easily manage and update your tokens on-chain data, including name, symbol, and image URI, directly from our dashboard.',
      gradient: 'from-cyan-500 via-blue-500 to-cyan-600',
      accentColor: 'text-cyan-400',
      glowColor: 'shadow-cyan-500/30',
    },
    {
      icon: <Terminal size={36} />,
      title: 'Developer-Friendly APIs',
      description: 'Integrate our powerful token creation and management tools directly into your own applications with our robust APIs.',
      gradient: 'from-teal-500 via-emerald-500 to-teal-600',
      accentColor: 'text-teal-400',
      glowColor: 'shadow-teal-500/30',
    },
  ];

  return (
    <section id="offers" className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 sm:py-32 overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      
      {/* Glowing Background Elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20">
            <Sparkles className="text-teal-400" size={20} />
            <span className="text-sm font-semibold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              WHY CHOOSE US
            </span>
          </div>
          
          <h2 className="mb-6 text-5xl md:text-6xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-teal-300 bg-clip-text text-transparent">
              Why Build on Solana
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
              With Us?
            </span>
          </h2>
          
          <p className="text-xl text-slate-400">
            We provide a suite of powerful, user-friendly tools designed to streamline the entire token lifecycle on the Solana blockchain.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/50 p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl border border-slate-700/50 backdrop-blur-xl"
            >
              {/* Animated Border Gradient */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${offer.gradient} p-[2px]`}>
                <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl"></div>
              </div>

              {/* Glow Effect */}
              <div className={`absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500 bg-gradient-to-br ${offer.gradient}`}></div>

              <div className="relative z-10">
                {/* Icon with Gradient Background */}
                <div className={`mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br ${offer.gradient} shadow-lg group-hover:shadow-2xl ${offer.glowColor} transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                  <div className="text-white">
                    {offer.icon}
                  </div>
                </div>

                <h3 className={`mb-4 text-2xl font-bold text-white group-hover:${offer.accentColor} transition-colors duration-300`}>
                  {offer.title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed">
                  {offer.description}
                </p>

                {/* Arrow with Matching Color */}
                <div className={`absolute top-8 right-8 text-slate-700 transition-all duration-300 group-hover:${offer.accentColor} group-hover:translate-x-2 group-hover:scale-125`}>
                  <ArrowRight size={24} />
                </div>
              </div>

              {/* Animated Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>

              {/* Corner Accent */}
              <div className={`absolute bottom-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-tl ${offer.gradient} rounded-tl-full`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};