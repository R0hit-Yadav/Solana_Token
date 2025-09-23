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
      icon: <LuCoins size={24} />,
      description: "Design and mint your own SPL token in minutes.",
      function: setOpenCreateModal,
    },
    {
      name: "Token Metadata",
      icon: <LuSliders size={24} />,
      description: "Update the metadata for an existing SPL token.",
      function: setOpenTokenMetaData,
    },
    {
      name: "Airdrop SOL",
      icon: <LuDroplets size={24} />,
      description: "Get free Devnet SOL to test your applications.",
      function: setOpenAirdrop,
    },
    {
      name: "Send Transaction",
      icon: <LuSend size={24} />,
      description: "Easily send SOL or SPL tokens to any address.",
      function: setOpenSendTransaction,
    },
    {
      name: "Buddy Token",
      icon: <LuSparkles size={24} />,
      description: "Create a memecoin with a fun, unique theme.",
      function: setOpenCreateModal, // Assuming this is the intended function
    },
    {
      name: "Token Swap",
      icon: <LuArrowDownUp size={24} />,
      description: "Exchange one token for another seamlessly.",
      function: setOpenCreateModal, // Placeholder function
    },
    {
      name: "Top Tokens",
      icon: <LuStar size={24} />,
      description: "View the most popular tokens on the network.",
      function: setOpenCreateModal, // Placeholder function
    },
    {
      name: "Contact Us",
      icon: <LuMessagesSquare size={24} />,
      description: "Get in touch with our team for support.",
      function: setOpenContact,
    },
  ];

  // Thematic colors for icon backgrounds
  const iconColors = [
    "bg-purple-600/20 text-purple-400",
    "bg-cyan-600/20 text-cyan-400",
    "bg-teal-600/20 text-teal-400",
    "bg-sky-600/20 text-sky-400",
  ];

  return (
    <section id="tools" className="relative bg-gray-950 py-20 sm:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(122,_93,_248,_0.15),_transparent_40%)]"></div>
      
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            Powerful Solana Tools
          </h2>
          <p className="text-lg text-gray-400">
            Everything you need to launch, manage, and grow your token project on the Solana ecosystem.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, index) => (
            <div
              key={tool.name}
              onClick={() => tool.function(true)}
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-gray-700/50 bg-gray-900/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10"
            >
              <div className="relative z-10">
                <div className="mb-4 flex items-center gap-4">
                  {/* Themed Icon */}
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${iconColors[index % iconColors.length]}`}>
                    {tool.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{tool.name}</h3>
                </div>
                <p className="text-gray-400">{tool.description}</p>
              </div>

              {/* Interactive Arrow on Hover */}
              <LuArrowRight
                className="absolute -right-10 -bottom-10 text-gray-700/50 transition-all duration-300 group-hover:right-4 group-hover:bottom-4 group-hover:text-purple-400"
                size={48}
              />
            </div>
          ))}
        </div>

        {/* "More Tools" CTA Button */}
        <div className="mt-12 flex justify-center">
          <a
            href="#"
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3 text-lg font-semibold text-white transition-all duration-300 hover:from-purple-700 hover:to-cyan-600 hover:scale-105 focus:outline-none"
          >
            Explore All Tools
            <LuCompass className="transition-transform duration-300 group-hover:rotate-12" />
          </a>
        </div>
      </div>
    </section>
  );
};