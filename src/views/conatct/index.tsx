import React, { FC, useEffect, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { LuX, LuSend, LuLoader2 } from 'react-icons/lu';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div
        ref={modalRef}
        className="relative mx-4 w-full max-w-4xl overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-900/50 shadow-2xl shadow-purple-500/10"
      >
        <button
          onClick={() => setOpenContact(false)}
          className="absolute top-4 right-4 z-20 rounded-full p-2 text-gray-500 transition-colors duration-300 hover:bg-gray-700 hover:text-white"
          aria-label="Close modal"
        >
          <LuX size={24} />
        </button>
        
        <div className="grid lg:grid-cols-2">
          {/* Left Column: Branding with Animation */}
          <div className="hidden lg:block">
            <Branding
              image="auth-img"
              title="Let's build together"
              message="Have a question, a project proposal, or just want to say hello? Drop us a line and we'll get back to you as soon as possible."
              // Add a className to the Branding component's image for the animation
              // Example: <img className={props.imageClassName} ... />
              // imageClassName="animate-float" 
            />
          </div>

          {/* Right Column: Contact Form */}
          <div className="flex flex-col p-8 lg:p-10">
            <h2 className="mb-2 text-3xl font-bold text-white">Get in Touch</h2>
            <p className="mb-6 text-gray-400">
              We're here to help and answer any question you might have.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-grow flex-col">
              <div className="mb-4">
                <label htmlFor="email" className="mb-2 block text-base font-medium text-gray-400">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="block w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3 text-gray-200 transition-all duration-300 placeholder:text-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  required
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="mt-1 text-sm text-red-400" />
              </div>

              <div className="mb-6 flex-grow">
                <label htmlFor="message" className="mb-2 block text-base font-medium text-gray-400">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Your message..."
                  className="block w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3 text-gray-200 transition-all duration-300 placeholder:text-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  required
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="mt-1 text-sm text-red-400" />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3 text-lg font-semibold text-white transition-all duration-300 hover:from-purple-700 hover:to-cyan-600 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              >
                {state.submitting ? (
                  <>
                    <LuLoader2 className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <LuSend />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};