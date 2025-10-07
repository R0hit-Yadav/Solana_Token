import { FC, useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

export const FaqView: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is an SPL Token?",
      answer:
        "SPL stands for Solana Program Library. An SPL Token is the standard for creating and managing tokens on the Solana blockchain, similar to ERC-20 tokens on Ethereum. They are incredibly fast and have very low transaction costs, making them ideal for a wide range of applications.",
      gradient: "from-purple-500 to-violet-500",
    },
    {
      question: "Do I need to know how to code to use this tool?",
      answer:
        "Absolutely not! Our platform provides a simple, step-by-step interface that handles all the technical complexity for you. You can create, mint, and manage your own token without writing a single line of code.",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      question: "How much does it cost to create a token on Solana?",
      answer:
        "Creating a token on Solana is very affordable. The network requires a small amount of SOL (typically less than 0.05 SOL) to store the token's data on the blockchain. Our platform may charge a small additional service fee for using the tool.",
      gradient: "from-teal-500 to-emerald-500",
    },
    {
      question: "What information do I need to provide?",
      answer:
        "You will need to provide some basic details for your token: a Token Name (e.g., 'Solana AI Token'), a Symbol (e.g., 'SAT'), a logo/image, the number of decimals, the initial supply, and a short description.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      question: "What are 'decimals' and what number should I choose?",
      answer:
        "Decimals determine the smallest fraction of your token. For example, if you choose 9 decimals, your token can be divided down to 0.000000001. A value of 6 or 9 is standard and recommended for compatibility with most wallets and decentralized exchanges (DEXs).",
      gradient: "from-violet-500 to-purple-500",
    },
    {
      question: "Can I change my token's name or logo after it's created?",
      answer:
        "Yes, you can. The metadata for your token (name, symbol, logo) is mutable by default, meaning that you, as the update authority, can make changes later using our 'Token Metadata' tool.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      question: "Who has control over the token supply?",
      answer:
        "You do. The wallet you use to create the token is assigned the 'Mint Authority.' This gives you the exclusive power to mint new tokens. Our platform never has access to or control over your token's supply.",
      gradient: "from-pink-500 to-purple-500",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 sm:py-32 overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      
      {/* Glowing Background Elements */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20">
            <HelpCircle className="text-cyan-400" size={20} />
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              NEED HELP?
            </span>
          </div>
          
          <h2 className="mb-6 text-5xl md:text-6xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
              Frequently Asked
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          
          <p className="text-xl text-slate-400">
            Have a question? We've got answers. If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>

        {/* Accordion */}
        <div className="mx-auto max-w-4xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-xl transition-all duration-300 hover:border-slate-600/50"
                >
                  {/* Gradient Border Effect on Hover */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${faq.gradient} p-[1px]`}>
                    <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl"></div>
                  </div>

                  {/* Subtle Glow Effect */}
                  <div className={`absolute -inset-1 rounded-2xl opacity-0 ${isOpen ? 'opacity-20' : 'group-hover:opacity-10'} blur-xl transition-opacity duration-500 bg-gradient-to-r ${faq.gradient}`}></div>

                  <div className="relative z-10">
                    {/* Question Button */}
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="group/btn inline-flex w-full items-center justify-between gap-x-4 px-6 py-6 text-left transition-all duration-300 hover:px-7"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        {/* Animated Icon */}
                        <div className={`mt-1 flex-shrink-0 transition-all duration-300 ${isOpen ? `bg-gradient-to-br ${faq.gradient} text-white` : 'text-slate-400 group-hover/btn:text-cyan-400'}`}>
                          <Sparkles size={20} className={`transition-transform duration-300 ${isOpen ? 'scale-110' : ''}`} />
                        </div>
                        
                        <h5 className={`flex text-lg font-bold transition-colors duration-300 ${isOpen ? `bg-gradient-to-r ${faq.gradient} bg-clip-text text-transparent` : 'text-white group-hover/btn:text-cyan-300'}`}>
                          {faq.question}
                        </h5>
                      </div>

                      {/* Chevron Icon */}
                      <div className={`flex-shrink-0 transition-all duration-500 ${isOpen ? `text-cyan-400 rotate-180` : 'text-slate-500 group-hover/btn:text-cyan-400'}`}>
                        <ChevronDown size={24} />
                      </div>
                    </button>

                    {/* Answer Content with Smooth Animation */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 pb-6 pt-0">
                        <div className="pl-9 border-l-2 border-slate-700/50">
                          <p className="text-slate-400 leading-relaxed pl-4">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Gradient Line for Open State */}
                  {isOpen && (
                    <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${faq.gradient} animate-pulse`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <div className="rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/50 p-8 backdrop-blur-xl">
            <h3 className="mb-3 text-2xl font-bold text-white">
              Still have questions?
            </h3>
            <p className="mb-6 text-slate-400">
              Our support team is here to help you get started with your token creation journey.
            </p>
            <button className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105">
              <span className="relative z-10">Contact Support</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};