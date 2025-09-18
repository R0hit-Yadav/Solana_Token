import React ,{FC} from 'react'
import { LuArrowRightFromLine } from 'react-icons/lu'
import { MdGeneratingTokens, MdToken } from 'react-icons/md'
import { RiTokenSwapFill } from 'react-icons/ri'
import { RxTokens} from 'react-icons/rx'

export const FeatureView = ({  setOpenAirdrop,
  setOpenContact,
  setOpenCreateModal,
  setOpenSendTransaction,
  setOpenTokenMetaData
}) => {

  const features = [
    {
      name:"Token Generator",
      icon: <MdGeneratingTokens/>,
      description: "Start working with solana token creator, It Allow you to create solana token by creating , deploying , airdrop, trandfering and updating token", 
      function: setOpenCreateModal,
    },
    {
      name:"Get Airdop",
      icon: <MdToken/>,
      description: "Start working with solana token creator, It Allow you to create solana token by creating , deploying , airdrop, trandfering and updating token",
      function: setOpenAirdrop,
    },
    {
      name:"Transfer Sol",
      icon: <RiTokenSwapFill/>,
      description: "Start working with solana token creator, It Allow you to create solana token by creating , deploying , airdrop, trandfering and updating token",
      function: setOpenSendTransaction,
    },
     {
      name:"Token Metadata",
      icon: <RxTokens/>,
      description: "Start working with solana token creator, It Allow you to create solana token by creating , deploying , airdrop, trandfering and updating token",
      function: setOpenTokenMetaData,
    }
  ];

  return (
    <section className='py-20'>
      <div className='container'>
        <div className='mb-10 flex items-end justify-between'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='mb-4 text-3xl font-medium capitalize text-white'>
              Choose Solana Blockchain Generator
            </h2>
            <p className='text-default-200 text-sm font-medium'>
              Now You can create solana token <br /> to withour code intantly
            </p>
          </div>
        </div>

      <div className='bg-default-950/40 flex flex-wrap items-center rounded-3xl backdrop-blur-3xl'>
      {features.map((feature, index) => (
        <div key={index} className={`w-auto grow border-b border-white/10 md:w-1/2 ${
        index == 0 ? 'md:border-e'
         :index == 1
         ?""
         :index == 2 
         ? "md:border-e md:border-b-0"
         :""
        }`}>
          <div className='p-8 sm:p-10'>
            <div className='bg-primary/10 ext-primary mb-10 inline-flex h-16 w-16 items-center justify-center
            rounded-xl'>
              <i data-lucide = "farmer">{feature.icon}</i>
            </div>
            <h2 className='mb-4 text-2xl font-medium text-white'>{feature.name}</h2>
            <p className='text-default-200 mb-6 text-base'>{feature.description}</p>
             <a onClick={() => feature.function(true)} className='hover:bg-primary
             inline-flex items-center justify-center gap-2 rounded-full order border-whote/10
             px-6 py-2 text-white trasition-all duration-300'>
              Use Tools
             </a>
             <i>
              <LuArrowRightFromLine/>
             </i>
          </div>
        </div>
      ))}
      </div>
      </div>
    </section>
  )
};
