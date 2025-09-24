import { FC } from "react";
import { LuChevronDown } from "react-icons/lu";

export const FaqView: FC = ({})=> {

  const faqs = [
  {
    question: "What is an SPL Token?",
    answer:
      "SPL stands for Solana Program Library. An SPL Token is the standard for creating and managing tokens on the Solana blockchain, similar to ERC-20 tokens on Ethereum. They are incredibly fast and have very low transaction costs, making them ideal for a wide range of applications.",
  },
  {
    question: "Do I need to know how to code to use this tool?",
    answer:
      "Absolutely not! Our platform provides a simple, step-by-step interface that handles all the technical complexity for you. You can create, mint, and manage your own token without writing a single line of code.",
  },
  {
    question: "How much does it cost to create a token on Solana?",
    answer:
      "Creating a token on Solana is very affordable. The network requires a small amount of SOL (typically less than 0.05 SOL) to store the token's data on the blockchain. Our platform may charge a small additional service fee for using the tool.",
  },
  {
    question: "What information do I need to provide?",
    answer:
      "You will need to provide some basic details for your token: a Token Name (e.g., 'Solana AI Token'), a Symbol (e.g., 'SAT'), a logo/image, the number of decimals, the initial supply, and a short description.",
  },
  {
    question: "What are 'decimals' and what number should I choose?",
    answer:
      "Decimals determine the smallest fraction of your token. For example, if you choose 9 decimals, your token can be divided down to 0.000000001. A value of 6 or 9 is standard and recommended for compatibility with most wallets and decentralized exchanges (DEXs).",
  },
  {
    question: "Can I change my token's name or logo after it's created?",
    answer:
      "Yes, you can. The metadata for your token (name, symbol, logo) is mutable by default, meaning that you, as the update authority, can make changes later using our 'Token Metadata' tool.",
  },
  {
    question: "Who has control over the token supply?",
    answer:
      "You do. The wallet you use to create the token is assigned the 'Mint Authority.' This gives you the exclusive power to mint new tokens. Our platform never has access to or control over your token's supply.",
  },
];

  return (
    <section id="faq" className="relative bg-gray-950 py-20 sm:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(122,_93,_248,_0.15),_transparent_40%)]"></div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-400">
            Have a question? We've got answers. If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>

        {/* Accordion */}
        <div className="mx-auto max-w-3xl">
          <div className="hs-accordion-group space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="hs-accordion overflow-hidden rounded-xl border border-gray-700/50 bg-gray-900/50 backdrop-blur-lg"
                id={`faq-accordion-item-${index}`}
              >
                <button
                  className="hs-accordion-toggle group inline-flex w-full items-center justify-between gap-x-3 px-6 py-5 text-left text-white transition-colors duration-300 hover:bg-gray-800/40"
                  aria-controls={`faq-accordion-content-${index}`}
                >
                  <h5 className="flex text-lg font-semibold">{faq.question}</h5>
                  <LuChevronDown className="h-5 w-5 transition-transform duration-500 hs-accordion-active:rotate-180" />
                </button>

                <div
                  id={`faq-accordion-content-${index}`}
                  className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                  aria-labelledby={`faq-accordion-item-${index}`}
                >
                  <div className="px-6 pb-5 pt-0">
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};




