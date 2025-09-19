import React,{FC,useState,useCallback} from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Metadata,PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { AiOutlineClose } from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import { notify } from "../../utils/notifications";

import { InputView } from "../input";
import Branding from "../../components/Branding";
import { set } from "immer/dist/internal";


export const TokenMetadata: FC = ({setOpenTokenMetadata})=> {
  const { connection } = useConnection();
  const [TokenAddress,setTokenAddress] = useState("");
  const [TokenMetadata,setTokenMetadata] = useState("");
  const [logo, setLogo] = useState(null);
  const [loaded,setLoaded] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  const getMetadata = useCallback(async (form)=> {
    setIsLoading(true);

    try {
      const tokenMint= new PublicKey(from);
      const metadataPDA = PublicKey.findProgramAddressSync(
        [Buffer.from("metadata"), PROGRAM_ID.toBuffer(), tokenMint.toBuffer()],PROGRAM_ID
      )[0];

      const metadataAccount = await connection.getAccountInfo(metadataPDA);
      const [metadata,_] = await Metadata.deserialize(metadataAccount.data);

      let logoRes = await fetch(metadata.data.uri);
      let logoJson = await logoRes.json();
      let {image} = logoJson;

      setTokenMetadata({tokenMetadata,...metadata});
      setLogo(image);
      setIsLoading(false);
      setLoaded(true);
      setTokenAddress("");
      notify({type:"success",message:"Token Metadata Fetched Successfully!"});
    }
    catch (error:any)
    {
       notify({type:"error",message:"Failed to Fetch Token Metadata!"});
       setIsLoading(false);
    }
  },[TokenAddress])

  const CloseModel = () => {
    <a
    onClick={()=> setOpenTokenMetadata(false)}
    className="gorup mt-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20
    backdrop-blur-2xl resation-all duration-500
    hover:bg-blye-600/60" 
    >
      <i className="text-2xl text-white gorup-hover:text-white">
        <AiOutlineClose/>
      </i>

    </a>
  }

  return (
     <>
      {isLoading && (
        <div className="absolute top-0 left-0 z-50 flex h-scrrn w-full items-center justify-center 
        bg-black/[.3] backdrop-blur-[10px]">
          <ClipLoader/>
        </div>
      )}

      {!tokenMintAddress ? (
        <section className="flex w-full items-center py-6 px-0 l:h-screen lg:p-10">
          <div className="container">
            <div className="bg-default-950/40 mx-auto max-w-5xl overflow-hidden rounded-2xl backdrop-blur-2xl">
              <div className="grid gap-10 lg:grid-cols-2">
                <div className="ps-4 hidden py-4 pt-10 lg:block">
                  <div className="upload relative w-full overflow-hidden rounded-xl">
                    {token.image ? (
                      <img src={token.image} alt="token" className="w-2/5"></img>
                    ):(
                      <label htmlFor="file" className="custum-file-upload"> 
                      <div className="icon">
                        <CreateSVG/>
                      </div>
                      <div className="text">
                        <span >Click to upload image</span>
                      </div>
                      <input type="file" id="file" onChange={handleImageChange}/>
                      </label>
                    )}
                  </div>
                  <textarea rows={6}
                  onChange={(e) => handleFormFieldChange("description",e)}
                  className="border-default-200 relative mt-48 block w-full rounded border-white/10 bg-transparent py-1.5
                  px-3 text-white/80 focus:border-white/25 focus:ring-transparent"
                  placeholder="Description of Your Token"></textarea>
                </div>

                <div className="lp:ps-0 flex flex-col p-10">
                  <div className="pb-6 my-auto">
                    <h4 className="mb-4 text-2xl font-bold text-white">
                      Solana Token Creator
                    </h4>
                    <p className="text-default-300 mb-8 max-w-sm">
                     kidly provide all the details about your token
                    </p>

                    <div className="text-start">
                      <InputView
                      name="Name"
                      placeholder="name"
                      clickhandle={(e) => handleFormFieldChange("name",e)}
                      />
                       <InputView
                      name="Symbol"
                      placeholder="symbol"
                      clickhandle={(e) => handleFormFieldChange("symbol",e)}
                      />
                       <InputView
                      name="Decimals"
                      placeholder="decimals"
                      clickhandle={(e) => handleFormFieldChange("decimals",e)}
                      />
                       <InputView
                      name="Amount"
                      placeholder="amount"
                      clickhandle={(e) => handleFormFieldChange("amount",e)}
                      />

                      <div className="mb-6 text-center">
                        <button onClick={() => createToken(token)}
                        className="bg-primary-600/90 hover:bg-primary-600 group mt-5
                        inline-flex w-full items-center justify-center rounded-lg px-6 py-2 text-white backdrop-blur-2xl
                        transition-all duration-500" type="submit"
                        >
                          <span className="fw-bold">Create Token</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-center">
                      <ul className="flex flex-wrap item-center justify-center gap-2">
                        <li>
                          <a onClick={() => setOpenCreateModel(false)}
                            className="group inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-2xl
                            transition-all duration-500 hover:bg-blue-600/60">
                              <i className="text-2xl text-white group-hover:text-white">
                                <AiOutlineClose />
                              </i>
                            </a>
                        </li>
                      </ul>
                    </div>
                  </div>


                </div>
              </div>

            </div>
          </div>
        </section>
      )
      :  <section className="flex w-full items-center py-6 px-0 l:h-screen lg:p-10">
          <div className="container">
            <div className="bg-default-950/40 mx-auto max-w-5xl overflow-hidden rounded-2xl backdrop-blur-2xl">
            <div className="grid gap-10 lg:grid-cols-2">
              <Branding
                image ="auth-img"
                title="to build your solana token creator"
                message = " try to create you first eveer solana project and if you went to master blockchain development then check the cources"              
              />

              <div className="lg:ps-0 flex h-full flex-col p-10">
                <div className="pb-10">
                  <a className="flex">
                    <img src ="assets/images/logo1.png" alt="logo" className="h-10"/>
                  </a>
                </div>

                <div className="my-auto pb-6 text-center">
                  <h4 className="mb-4 text-2xl font-bold text-white">
                    Link your new token
                  </h4>
                  <p className="text-default-300 mx-auto mb-5 max-w-sm">
                    Your Solana token is sucessfully created , Check now explorer
                  </p>

                  <div className="flex items-start justify-center">
                    <img src={token.image || "assets/images/logo1.png"} alt="" className="h-40"></img>
                  </div>

                  <div className="mt-5 w-full text-center">
                    <p className="text-default-300 text-base font-medium leading-6">
                      <InputView name={"Token Address"} placeholder = {tokenMintAddress}></InputView>
                      <span className="cursor-pointer" 
                      onClick={() => 
                        navigator.clipboard.writeText(tokenMintAddress)
                      }>Copy</span>
                    </p>

                    <div className="mb-6 text-center">
                      <a 
                       href={`https://explorer.solana.com/address/${tokenMintAddress}?cluster=${networkConfiguration}`}
                       target="_blank"
                       rel="noreferrer"
                       className="bg-primary-600/90 hover:bg-primary-600 group mt-5
                        inline-flex w-full items-center justify-center rounded-lg px-6 py-2 text-white backdrop-blur-2xl
                        transition-all duration-500"
                      >
                        <span className="fw-bold">View on Explorer</span>
                      </a>
                    </div>
                    <div>
                    <div className="text-center">
                      <ul className="flex flex-wrap item-center justify-center gap-2">
                        <li>
                          <a onClick={() => setOpenCreateModel(false)}
                            className="group inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-2xl
                            transition-all duration-500 hover:bg-blue-600/60">
                              <i className="text-2xl text-white group-hover:text-white">
                                <AiOutlineClose />
                              </i>
                            </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </section>
      }
    </>
  )

}