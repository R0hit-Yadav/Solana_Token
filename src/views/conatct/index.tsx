import React, { FC, useEffect, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { 
  LuX, 
  LuSend, 
  LuLoader2, 
  LuSparkles, 
  LuMail, 
  LuMessageCircle,
  LuUsers,
  LuZap,
  LuHeart,
  LuArrowRight
} from 'react-icons/lu';
import { notify } from '../../utils/notifications';
import Branding from 'components/Branding';

interface ContactViewProps {
  setOpenContact: (open: boolean) => void;
}

export const ContactView: FC<ContactViewProps> = ({ setOpenContact }) => {
  const [state, handleSubmit] = useForm("xldprwga"); // Replace with your Formspree ID
  const modalRef = useRef<HTMLDivElement>(null);

  // Use useEffect to handle success state side-effects
  useEffect(() => {
    if (state.succeeded) {
      notify({
        type: "success",
        message: "Message sent! We'll get back to you soon."
      });
      setOpenContact(false);
    }
  }, [state.succeeded, setOpenContact]);

  // Effect for closing modal with Escape key or outside click
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenContact(false);
    };
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpenContact(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setOpenContact]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md overflow-y-auto p-4">
      <div
        ref={modalRef}
        className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900/95 to-slate-800/90 shadow-2xl shadow-blue-500/10 backdrop-blur-xl"
      >
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] rounded-3xl"></div>
        
        {/* Glowing Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl"></div>

        {/* Close Button */}
        <button
          onClick={() => setOpenContact(false)}
          className="absolute top-6 right-6 z-20 rounded-full p-3 text-slate-500 transition-all duration-300 hover:bg-slate-700/50 hover:text-white group"
          aria-label="Close modal"
        >
          <LuX size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
        
        <div className="grid lg:grid-cols-2 relative z-10">
          {/* Left Column: Enhanced Branding */}
          <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-r border-slate-700/50">
            <div className="space-y-8">
              {/* Header Section */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                  <LuSparkles className="text-blue-400" size={20} />
                  <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    GET IN TOUCH
                  </span>
                </div>
                
                <h3 className="text-4xl font-black tracking-tight mb-4">
                  <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent">
                    Let's Build
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                    Together
                  </span>
                </h3>
                
                <p className="text-lg text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Have a question, project proposal, or just want to say hello? We're here to help!
                </p>
              </div>

              {/* Branding Image */}
              <div className="relative mx-auto">
                <div className="w-64 h-64 rounded-2xl overflow-hidden border-2 border-slate-700/50 shadow-lg shadow-blue-500/20">
                  <Branding
                    image="auth-img"
                    title=""
                    message=""
                  />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/10 to-cyan-500/10"></div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/30">
                    <LuZap className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Quick Response</p>
                    <p className="text-sm text-slate-400">We'll get back to you within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-500/30">
                    <LuUsers className="text-cyan-400" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Expert Team</p>
                    <p className="text-sm text-slate-400">Experienced Solana developers</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="p-3 rounded-xl bg-teal-500/20 border border-teal-500/30">
                    <LuHeart className="text-teal-400" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Community First</p>
                    <p className="text-sm text-slate-400">Building for the Solana ecosystem</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Enhanced Contact Form */}
          <div className="flex flex-col p-8 lg:p-12 space-y-8">
            {/* Header Section */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                <LuMessageCircle className="text-blue-400" size={20} />
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  CONTACT FORM
                </span>
              </div>
              
              <h2 className="mb-3 text-4xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent">
                  Start a Conversation
                </span>
              </h2>
              
              <p className="text-lg text-slate-400 max-w-md">
                We're here to help and answer any questions you might have
              </p>
            </div>

            {/* Mobile Branding (visible on small screens) */}
            <div className="lg:hidden text-center">
              <div className="relative mx-auto mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30 mx-auto">
                  <LuMessageCircle className="text-white" size={28} />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-blue-400 animate-ping opacity-20"></div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="flex flex-grow flex-col space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-base font-medium text-slate-400">
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="block w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-4 text-slate-200 transition-all duration-300 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 backdrop-blur-sm"
                    required
                  />
                  <LuMail className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors duration-300" size={20} />
                </div>
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-sm text-red-400" />
              </div>

              {/* Message Field */}
              <div className="space-y-2 flex-grow">
                <label htmlFor="message" className="block text-base font-medium text-slate-400">
                  Your Message
                </label>
                <div className="relative group">
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Tell us about your project, ask a question, or just say hello..."
                    className="block w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-4 text-slate-200 transition-all duration-300 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 backdrop-blur-sm resize-none"
                    required
                  />
                  <LuMessageCircle className="absolute top-4 right-4 text-slate-500 group-focus-within:text-blue-400 transition-colors duration-300" size={20} />
                </div>
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-sm text-red-400" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={state.submitting}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              >
                {state.submitting ? (
                  <>
                    <LuLoader2 className="animate-spin" size={20} />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <LuSend className="group-hover:scale-110 transition-transform duration-300" />
                    <span>Send Message</span>
                    <LuArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
                
                {/* Animated shine effect */}
                {!state.submitting && (
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                )}
              </button>
            </form>

            {/* Contact Info */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
              <p className="text-sm text-slate-300 text-center leading-relaxed">
                <LuZap className="inline text-blue-400 mr-1" size={16} />
                <strong className="text-blue-400">Fast Response:</strong> We typically respond within 24 hours. 
                For urgent matters, please include "URGENT" in your subject.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};