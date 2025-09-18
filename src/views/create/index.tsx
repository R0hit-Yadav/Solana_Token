import React , {FC, useCallback, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { 
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction
} from "@solana/web3.js";
import { 
  MINT_SIZE, 
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  createMintToInstruction,
  getMinimumBalanceForRentExemptAccount,
} from "@solana/spl-token";

import { PROGRAM_ID, createCreateMetadataAccountV3Instruction,
  createCreateMetadataAccountInstruction
 } from "@metaplex-foundation/mpl-token-metadata";

import axios from "axios";
import { notify } from "utils/notifications";
import { ClipLoader } from "react-spinners";
import { useNetworkConfiguration } from "contexts/NetworkConfigurationProvider";


import { AiOutlineClose} from "react-icons/ai";
import CreateSVG from "../../components/Brandings";
import { InputView } from "../index";

export const CreateView: FC = ({ setOpenCreateModel}) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction} = useWallet();
  const { networkConfiguration} = useNetworkConfiguration();


  const [tokenUri, setTokenUri] = useState("");
  const [tokenMintAddress, setTokenMintAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const [token,setToken] = useState({
    name:"",
    symbol:"",
    decimals:"",
    amount:"",
    image:"",
    description:"",
  });

  const handleFormFieldChange = (fieldName,e) => {
    setToken({...token,[fieldName]: e.target.value})
  };

  // CREATE TOKEN FUNCTION 
  const createToken = useCallback(async(token) => {
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const mintKeypair = Keypair.generate();
    const tokenATA = await getAssociatedTokenAddress(mintKeypair.publicKey, publicKey);
  });

  try{
    const metadataUrl = await uploadMetadata(token);
  } catch (error)
  {
    console.log(error);
  }

  // IMAGE  UPLOAD IPFS
  const handleImageChange = async(event) => {
    const file = event.target.files[0];

    if(file)
    {
      const imgUrl = await uploadImagePinata(file);
      setToken({...token, image: imgUrl});
    }
  }

  const uploadImagePinata = async(file) => {
    if(file)
    {
      try{
        const formData = new FormData();
        formData.append("file",file);
        const response = await axios({
          method: "post",
          url:"https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers:{
            pinata_api_key: "",
            pinata_secret_api_key: "",
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        return ImgHash;
      } catch ( error)
      {
        console.log(error);
      }
    }
  }

  const uploadMetadata = async(token) => {
    setIsLoading(true);
    const { name , symbol , description, image} = token;
    if(!name || !symbol || !description || !image)
    {
      return console.log("Data Missing");
    }

    const data = JSON.stringify({
      name: name,
      symbol: symbol,
      description: description,
      image: image,
    });

    try {
       const response = await axios({
          method: "POST",
          url:"https://api.pinata.cloud/pinning/pinJSONToIPFS",
          data: data,
          headers:{
            pinata_api_key: "",
            pinata_secret_api_key: "",
            "Content-Type": "application/json",
          },
        });
        const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        return url;
    }
    catch(error)
    {
      console.log(error);
    }
  }

  
}