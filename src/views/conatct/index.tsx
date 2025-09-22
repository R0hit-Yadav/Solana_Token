import React,{FC} from 'react';
import {useForm,ValidationError} from '@formspree/react';
import { AiOutlineClose} from "react-icons/ai";
import { notify} from "../../utils/notifications";

import Branding from 'components/Branding';


interface ContactViewProps {
  setOpenContact: (open: boolean) => void;
}

export const ContactView: FC<ContactViewProps> = ({ setOpenContact }) => {

  const [state,handleSubmit] = useForm("xldprwga");
  if(state.succeeded) {
    notify({
      type:"success",
      message:"Thanks for Submiting your message, will get back to you soon!"
    });
    setOpenContact(false);
  }

    const CloseModel = () => (
      <a
        onClick={() => setOpenContact(false)}
        className="gorup mt-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20
        backdrop-blur-2xl resation-all duration-500
        hover:bg-blye-600/60"
        style={{ cursor: 'pointer' }}
      >
        <i className="text-2xl text-white gorup-hover:text-white">
          <AiOutlineClose />
        </i>
      </a>
    );

    return(
      <>
        <section className="flex w-full items-center py-6 px-0 l:h-screen lg:p-10">
          <div className="container">
            <div className="bg-default-950/40 mx-auto max-w-5xl overflow-hidden rounded-2xl backdrop-blur-2xl">
            <div className="grid gap-10 lg:grid-cols-2">
              <Branding
                image ="auth-img"
                title="to build your solana token creator"
                message = " try to create you first eveer solana project and if you went to master blockchain development then check the cources"
              />;
              <div className="lg:ps-0 flex h-full flex-col p-10">
                <div className="pb-10">
                  <a className="flex">
                    <img src ="assets/images/logo1.png" alt="logo" className="h-10"/>
                  </a>
                </div>

                <div className="my-auto pb-6 text-center">
                  <h4 className="mb-4 text-2xl font-bold text-white">
                    Send email to us form more details
                  </h4>
                  <p className="text-default-300 mx-auto mb-5 max-w-sm">
                    Send your message so we can provide you more details
                  </p>

                  <div className="text-start">
                    <form onSubmit={handleSubmit}>
                      <div className='mb-4'>
                        <label htmlFor='email'
                        className='text-base/normal text-deafult-200 mb-2 block font-semibold'>
                          Email
                        </label>
                        <input 
                        type='email'
                        id="email"
                        name='email'
                        className='border-default-200 block w-full rounded border-whote/10 bg-tranparent py-1.5
                        px-3 text-whote/80 focus:border-white/25 focus:ring-transparent'
                        placeholder='email'></input>
                      </div>
                      <ValidationError 
                      prefix='Email'
                      field='email'
                      errors={state.errors}></ValidationError>
                      <textarea name='message' id="message" rows={6} className='border-default-200 relative block w-full rounded border-whote/10 bg-tranparent py-1.5
                        px-3 text-whote/80 focus:border-white/25 focus:ring-transparent' placeholder='message'></textarea>
                        <ValidationError 
                      prefix='Message'
                      field='message'
                      errors={state.errors}></ValidationError>

                  <div className="mb-6 text-center">
                    <button type='submit' disabled={state.submitting}
                      className="bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex 
                      items-center justify-center rounded-lg px-6 py-2 text-white backdrop-blur-2xl
                      transition-all duration-500">
                        <span className="fw-bold">Send Message</span>
                      </button>
                  <CloseModel/>
                  </div>
                  </form>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </section>
    </>
    )

};