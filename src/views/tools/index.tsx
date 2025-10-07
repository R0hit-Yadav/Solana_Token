import React, { FC } from "react";
import {
  LuCoins,
  LuSliders,
  LuMessagesSquare,
  LuDroplets,
  LuSend,
  LuSparkles,
  LuStar,
  LuCompass,
  LuArrowRight,
  LuArrowDownUp,
  LuZap,
} from "react-icons/lu";

interface ToolViewProps {
  setOpenAirdrop: (open: boolean) => void;
  setOpenContact: (open: boolean) => void;
  setOpenCreateModal: (open: boolean) => void;
  setOpenSendTransaction: (open: boolean) => void;
  setOpenTokenMetaData: (open: boolean) => void;
}

export const ToolView: FC<ToolViewProps> = ({
  setOpenAirdrop,
  setOpenContact,
  setOpenCreateModal,
  setOpenSendTransaction,
  setOpenTokenMetaData,
}) => {
  // Enhanced tools array with unique icons and descriptions
  const tools = [
    {
      name: "Create Token",
      icon: <LuCoins size={28} />,
      description: "Design and mint your own SPL token in minutes.",
      function: setOpenCreateModal,
      gradient: "from-[#9945FF] to-[#14F195]",
      shadowColor: "shadow-[#9945FF]/20",
      iconBg: "from-[#9945FF]/20 to-[#9945FF]/5",
    },
    {
      name: "Token Metadata",
      icon: <LuSliders size={28} />,
      description: "Update the metadata for an existing SPL token.",
      function: setOpenTokenMetaData,
      gradient: "from-[#14F195] to-[#00D4FF]",
      shadowColor: "shadow-[#14F195]/20",
      iconBg: "from-[#14F195]/20 to-[#14F195]/5",
    },
    {
      name: "Airdrop SOL",
      icon: <LuDroplets size={28} />,
      description: "Get free Devnet SOL to test your applications.",
      function: setOpenAirdrop,
      gradient: "from-[#00D4FF] to-[#9945FF]",
      shadowColor: "shadow-[#00D4FF]/20",
      iconBg: "from-[#00D4FF]/20 to-[#00D4FF]/5",
    },
    {
      name: "Send Transaction",
      icon: <LuSend size={28} />,
      description: "Easily send SOL or SPL tokens to any address.",
      function: setOpenSendTransaction,
      gradient: "from-[#9945FF] via-[#00D4FF] to-[#14F195]",
      shadowColor: "shadow-[#9945FF]/20",
      iconBg: "from-[#9945FF]/20 to-[#14F195]/5",
    },
    {
      name: "Buddy Token",
      icon: <LuSparkles size={28} />,
      description: "Create a memecoin with a fun, unique theme.",
      function: setOpenCreateModal,
      gradient: "from-[#14F195] to-[#9945FF]",
      shadowColor: "shadow-[#14F195]/20",
      iconBg: "from-[#14F195]/20 to-[#9945FF]/5",
    },
    {
      name: "Token Swap",
      icon: <LuArrowDownUp size={28} />,
      description: "Exchange one token for another seamlessly.",
      function: setOpenCreateModal,
      gradient: "from-[#00D4FF] to-[#14F195]",
      shadowColor: "shadow-[#00D4FF]/20",
      iconBg: "from-[#00D4FF]/20 to-[#14F195]/5",
    },
    {
      name: "Top Tokens",
      icon: <LuStar size={28} />,
      description: "View the most popular tokens on the network.",
      function: setOpenCreateModal,
      gradient: "from-[#9945FF] to-[#00D4FF]",
      shadowColor: "shadow-[#9945FF]/20",
      iconBg: "from-[#9945FF]/20 to-[#00D4FF]/5",
    },
    {
      name: "Contact Us",
      icon: <LuMessagesSquare size={28} />,
      description: "Get in touch with our team for support.",
      function: setOpenContact,
      gradient: "from-[#14F195] via-[#00D4FF] to-[#9945FF]",
      shadowColor: "shadow-[#14F195]/20",
      iconBg: "from-[#14F195]/20 to-[#9945FF]/5",
    },
  ];

  return (
    <section id="tools" className="relative overflow-hidden bg-[#0a0a0f] py-20 sm:py-24 lg:py-32">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#14F195]/5 via-[#9945FF]/5 to-[#14F195]/5 animate-gradient-shift"></div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
      
      {/* Multiple radial gradients for depth */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#9945FF] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#14F195] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute top-20 right-20 w-16 h-16 border-2 border-[#14F195]/30 rounded-lg rotate-45 animate-float-slow"></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 border-2 border-[#9945FF]/30 rounded-full animate-float-reverse"></div>

      <div className="container relative z-10">
        {/* Section Header with enhanced styling */}
        <div className="mx-auto mb-16 max-w-3xl text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2">
            <span className="relative inline-block bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full px-5 py-2 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-[#9945FF]/50 animate-pulse-glow">
              <span className="relative z-10 flex items-center gap-2">
                <LuZap className="w-4 h-4" />
                Tools Suite
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full blur-md opacity-50 animate-pulse"></div>
            </span>
          </div>

          {/* Main heading with gradient animation */}
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            <span className="inline-block bg-gradient-to-r from-white via-[#14F195] to-[#9945FF] bg-clip-text text-transparent animate-gradient-x">
              Powerful Solana Tools
            </span>
          </h2>
          
          <p className="text-lg text-gray-300 leading-relaxed font-light max-w-2xl mx-auto">
            Everything you need to launch, manage, and grow your token project on the{' '}
            <span className="text-[#9945FF] font-semibold">Solana ecosystem</span>.
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#9945FF]"></div>
            <div className="h-1 w-1 rounded-full bg-[#14F195] animate-pulse"></div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#14F195]"></div>
          </div>
        </div>

        {/* Tools Grid with enhanced styling */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, index) => (
            <div
              key={tool.name}
              onClick={() => tool.function(true)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-500 hover:-translate-y-2 hover:border-white/20"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Glow effect */}
              <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${tool.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}></div>

              {/* Content */}
              <div className="relative z-10 space-y-4">
                {/* Icon with gradient background */}
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${tool.iconBg} border border-white/10 text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:border-white/30`}>
                  {tool.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-[#14F195] transition-all duration-300">
                  {tool.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {tool.description}
                </p>
              </div>

              {/* Interactive Arrow on Hover */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                <div className={`p-2 rounded-full bg-gradient-to-r ${tool.gradient}`}>
                  <LuArrowRight className="text-white" size={20} />
                </div>
              </div>

              {/* Border glow effect */}
              <div className={`absolute inset-0 rounded-2xl ${tool.shadowColor} shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="mt-16 flex flex-col items-center gap-6">
          {/* "More Tools" CTA Button */}
          <button className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#9945FF]/50 focus:outline-none focus:ring-4 focus:ring-[#9945FF]/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#14F195] to-[#9945FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">Explore All Tools</span>
            <LuCompass className="relative z-10 transition-transform duration-300 group-hover:rotate-180" size={24} />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#9945FF] to-[#14F195] blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
          </button>

          {/* Additional info text */}
          <p className="text-sm text-gray-400 text-center">
            Need a custom solution?{' '}
            <button 
              onClick={() => setOpenContact(true)}
              className="text-[#14F195] font-semibold hover:text-[#9945FF] transition-colors duration-300 underline decoration-dotted underline-offset-4"
            >
              Contact our team
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};