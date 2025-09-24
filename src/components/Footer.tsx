import React, { FC } from "react";
import { useForm } from "@formspree/react";
import { TiSocialLinkedin, TiSocialTwitter, TiSocialYoutube } from "react-icons/ti";
import { LuHeart, LuSend } from "react-icons/lu";

export const Footer: FC = () => {
  const [state, handleSubmit] = useForm("xldprwga"); // Replace with your Formspree ID

  const usefulLinks = ["About Us", "Documentation", "Solana Explorer", "Terms of Service", "Return Policy"];
  const communityLinks = ["GitHub", "Press Inquiries", "Social Media", "Site Map"];
  const socialLinks = [
    { icon: <TiSocialLinkedin size={20} />, href: "#" },
    { icon: <TiSocialTwitter size={20} />, href: "#" },
    { icon: <TiSocialYoutube size={20} />, href: "#" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-gray-700/50 bg-gray-950/80 backdrop-blur-lg">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      <div className="container relative z-10 py-20 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Column 1: About & Socials */}
          <div className="md:col-span-12 lg:col-span-4">
            <a href="/" className="flex-shrink-0">
              <img src="assets/images/logo1.png" alt="logo" className="h-10" />
            </a>
            <p className="mt-6 text-base text-gray-400">
              Your all-in-one platform to design, mint, and manage SPL tokens on the Solana blockchain with ease.
            </p>
            <ul className="mt-6 flex flex-wrap items-center gap-2">
              {socialLinks.map((social, index) => (
                <li key={index}>
                  <a
                    href={social.href}
                    className="group flex h-10 w-10 items-center justify-center rounded-lg border border-gray-700 text-gray-400 transition-all duration-300 hover:border-purple-500 hover:bg-purple-500 hover:text-white"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Useful Links */}
          <div className="md:col-span-4 lg:col-span-2">
            <h5 className="mb-4 font-semibold text-lg text-white">Useful Links</h5>
            <ul className="flex flex-col gap-3">
              {usefulLinks.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 transition-all hover:text-white hover:translate-x-1">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Community Links */}
          <div className="md:col-span-4 lg:col-span-2">
            <h5 className="mb-4 font-semibold text-lg text-white">Community</h5>
            <ul className="flex flex-col gap-3">
              {communityLinks.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 transition-all hover:text-white hover:translate-x-1">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="md:col-span-4 lg:col-span-4">
            <h5 className="mb-4 font-semibold text-lg text-white">Subscribe to Newsletter</h5>
            <p className="text-gray-400 mb-4">
              Get the latest updates and offers delivered directly to your inbox.
            </p>
            
            {state.succeeded ? (
              <p className="rounded-lg bg-green-500/20 p-4 text-center text-green-400">
                Thanks for subscribing!
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="h-14 w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 pr-32 text-gray-200 transition-all duration-300 placeholder:text-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  required
                />
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="group absolute top-1/2 right-2 -translate-y-1/2 inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-2.5 font-semibold text-white transition-all duration-300 hover:from-purple-700 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.submitting ? 'Submitting...' : 'Subscribe'}
                </button>
              </form> 
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700/50 py-6">
        <div className="container flex flex-wrap items-center justify-center gap-4 text-center md:justify-between lg:px-16">
          <p className="text-base text-gray-500">
            © {new Date().getFullYear()} SolanaAI. Crafted with{" "}
            <LuHeart className="inline h-4 w-4 fill-red-500 text-red-500" /> by RohitYadav
          </p>
          <p className="text-base text-gray-500">
            <a href="#">Terms & Conditions</a>
          </p>
        </div>
      </div>
    </footer>
  );
};