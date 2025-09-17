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
      </div>
    </section>
  )
};
