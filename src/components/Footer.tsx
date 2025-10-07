import React, { FC } from "react";
import { useForm } from "@formspree/react";
import { TiSocialLinkedin, TiSocialTwitter, TiSocialYoutube } from "react-icons/ti";
import { LuHeart, LuSend } from "react-icons/lu";

export const Footer: FC = () => {
  const [state, handleSubmit] = useForm("xldprwga");

  const usefulLinks = ["About Us", "Documentation", "Solana Explorer", "Terms of Service", "Return Policy"];
  const communityLinks = ["GitHub", "Press Inquiries", "Social Media", "Site Map"];
  const socialLinks = [
    { icon: <TiSocialLinkedin size={20} />, href: "#" },
    { icon: <TiSocialTwitter size={20} />, href: "#" },
    { icon: <TiSocialYoutube size={20} />, href: "#" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-purple-500/20 bg-gradient-to-b from-gray-950 via-slate-900 to-gray-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="container relative z-10 py-20 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          
          <div className="md:col-span-12 lg:col-span-4">
            <a href="/" className="flex-shrink-0 group">
              <img src="assets/images/logo1.png" alt="logo" className="h-20 transition-transform duration-300 group-hover:scale-105" />
            </a>
            <p className="mt-6 text-base leading-relaxed text-gray-300">
              Your all-in-one platform to design, mint, and manage SPL tokens on the Solana blockchain with ease.
            </p>
            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-purple-400">Connect With Us</p>
              <ul className="flex flex-wrap items-center gap-3">
                {socialLinks.map((social, index) => (
                  <li key={index}>
                    <a
                      href={social.href}
                      className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 text-gray-300 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/50"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">{social.icon}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-4 lg:col-span-2">
            <h5 className="mb-6 font-bold text-lg text-white flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-purple-500"></span>
              Useful Links
            </h5>
            <ul className="flex flex-col gap-4">
              {usefulLinks.map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="group relative inline-flex items-center text-gray-300 transition-all duration-300 hover:text-purple-400"
                  >
                    <span className="absolute -left-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-left-2">→</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-2">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-4 lg:col-span-2">
            <h5 className="mb-6 font-bold text-lg text-white flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-cyan-500"></span>
              Community
            </h5>
            <ul className="flex flex-col gap-4">
              {communityLinks.map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="group relative inline-flex items-center text-gray-300 transition-all duration-300 hover:text-cyan-400"
                  >
                    <span className="absolute -left-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-left-2">→</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-2">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 lg:col-span-4">
            <h5 className="mb-6 font-bold text-lg text-white flex items-center gap-2">
              <LuSend className="h-5 w-5 text-purple-400" />
              Subscribe to SOLmate
            </h5>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Get the latest updates and offers delivered directly to your inbox.
            </p>
            
            {state.succeeded ? (
              <div className="rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-6 text-center border border-green-500/30 backdrop-blur-sm">
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
                  <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-green-400 font-semibold">Thanks for subscribing!</p>
                <p className="text-green-300/70 text-sm mt-1">We'll keep you updated</p>
              </div>
            ) : (
              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="h-14 w-full rounded-xl border border-purple-500/30 bg-gray-900/50 px-5 pr-36 text-gray-200 backdrop-blur-sm transition-all duration-300 placeholder:text-gray-500 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:bg-gray-900/70"
                  required
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget.closest('div').querySelector('input');
                    if (form && form.value) {
                      handleSubmit({ email: form.value });
                    }
                  }}
                  disabled={state.submitting}
                  className="absolute top-1/2 right-2 -translate-y-1/2 group/btn inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 px-5 py-2.5 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {state.submitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Subscribe
                      <LuSend className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-purple-500/20 bg-gray-950/50 backdrop-blur-sm py-6">
        <div className="container flex flex-wrap items-center justify-center gap-4 text-center md:justify-between lg:px-16">
          <p className="text-sm text-gray-400 flex items-center gap-2 flex-wrap justify-center">
            <span>© {new Date().getFullYear()} SolanaAI. Crafted with</span>
            <LuHeart className="inline h-4 w-4 fill-red-500 text-red-500 animate-pulse" />
            <span>by <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">RohitYadav</span></span>
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-gray-400 transition-colors duration-300 hover:text-purple-400">
              Privacy Policy
            </a>
            <span className="text-gray-600">•</span>
            <a href="#" className="text-sm text-gray-400 transition-colors duration-300 hover:text-purple-400">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};