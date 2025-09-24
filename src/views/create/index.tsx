import React, { FC, useCallback, useState, useRef, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMintInstruction, getMinimumBalanceForRentExemptMint, createAssociatedTokenAccountInstruction, getAssociatedTokenAddress, createMintToInstruction } from "@solana/spl-token";
import { PROGRAM_ID, createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";
import axios from "axios";
import { notify } from "utils/notifications";
import { ClipLoader } from "react-spinners";
import { useNetworkConfiguration } from "contexts/NetworkConfigurationProvider";
import { LuX, LuUploadCloud, LuCheckCircle, LuCopy, LuExternalLink, LuArrowRight, LuArrowLeft, LuRefreshCw } from "react-icons/lu";

import { InputView } from "../input"; // Make sure this path is correct

interface CreateViewProps {
  setOpenCreateModel: (open: boolean) => void;
}

export const CreateView: FC<CreateViewProps> = ({ setOpenCreateModel }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { networkConfiguration } = useNetworkConfiguration();

  const [step, setStep] = useState(1);
  const [token, setToken] = useState({
    name: "", symbol: "", decimals: "9", amount: "", image: "", description: ""
  });
  const [tokenMintAddress, setTokenMintAddress] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  
  const modalRef = useRef<HTMLDivElement>(null);

  // Modal close logic
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpenCreateModel(false);
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) setOpenCreateModel(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setOpenCreateModel]);

  const handleFormFieldChange = (fieldName: string, value: string) => {
    setToken({ ...token, [fieldName]: value });
  };

  const uploadImagePinata = async (file: File) => {
    if (!file) return null;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
          "Content-Type": "multipart/form-data",
        },
      });
      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch (error) {
      notify({ type: "error", message: "Image upload failed!" });
      return null;
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imgUrl = await uploadImagePinata(file);
      if (imgUrl) setToken({ ...token, image: imgUrl });
    }
  };

  const uploadMetadata = async (tokenData: typeof token) => {
    const { name, symbol, description, image } = tokenData;
    if (!name || !symbol || !description || !image) {
      notify({ type: "error", message: "Please fill all fields." });
      return null;
    }
    const data = JSON.stringify({ name, symbol, description, image });
    try {
      const response = await axios({
        method: "POST",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data,
        headers: {
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
          "Content-Type": "application/json",
        },
      });
      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch (error) {
      notify({ type: "error", message: "Metadata upload failed!" });
      return null;
    }
  };

  const createToken = useCallback(async () => {
    if (!publicKey) {
      notify({ type: "error", message: "Wallet not connected!" });
      return;
    }
    setIsCreating(true);
    try {
      const metadataUrl = await uploadMetadata(token);
      if (!metadataUrl) throw new Error("Metadata upload failed");

      const lamports = await getMinimumBalanceForRentExemptMint(connection);
      const mintKeypair = Keypair.generate();
      const tokenATA = await getAssociatedTokenAddress(mintKeypair.publicKey, publicKey);

      const createMetadataInstruction = createCreateMetadataAccountV3Instruction({
        metadata: PublicKey.findProgramAddressSync([Buffer.from("metadata"), PROGRAM_ID.toBuffer(), mintKeypair.publicKey.toBuffer()], PROGRAM_ID)[0],
        mint: mintKeypair.publicKey,
        mintAuthority: publicKey,
        payer: publicKey,
        updateAuthority: publicKey,
      }, {
        createMetadataAccountArgsV3: {
          data: {
            name: token.name,
            symbol: token.symbol,
            uri: metadataUrl,
            creators: null,
            sellerFeeBasisPoints: 0,
            collection: null,
            uses: null,
          },
          isMutable: false,
          collectionDetails: null,
        }
      });

      const createTokenTx = new Transaction().add(
        SystemProgram.createAccount({ fromPubkey: publicKey, newAccountPubkey: mintKeypair.publicKey, space: MINT_SIZE, lamports, programId: TOKEN_PROGRAM_ID }),
        createInitializeMintInstruction(mintKeypair.publicKey, Number(token.decimals), publicKey, publicKey, TOKEN_PROGRAM_ID),
        createAssociatedTokenAccountInstruction(publicKey, tokenATA, publicKey, mintKeypair.publicKey),
        createMintToInstruction(mintKeypair.publicKey, tokenATA, publicKey, Number(token.amount) * Math.pow(10, Number(token.decimals))),
        createMetadataInstruction
      );

      const signature = await sendTransaction(createTokenTx, connection, { signers: [mintKeypair] });
      setTokenMintAddress(mintKeypair.publicKey.toString());
      notify({ type: "success", message: "Token created successfully!", txid: signature });
    } catch (error: any) {
      notify({ type: "error", message: `Token creation failed: ${error?.message}` });
    } finally {
      setIsCreating(false);
    }
  }, [publicKey, connection, sendTransaction, token]);

  const resetForm = () => {
    setToken({ name: "", symbol: "", decimals: "9", amount: "", image: "", description: "" });
    setTokenMintAddress("");
    setStep(1);
  };
  
  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const renderContent = () => {
    if (tokenMintAddress) {
      // SUCCESS VIEW
      return <SuccessView token={token} tokenMintAddress={tokenMintAddress} networkConfiguration={networkConfiguration} resetForm={resetForm} />;
    }

    // MULTI-STEP FORM VIEW
    return (
      <>
        <h2 className="mb-2 text-3xl font-bold text-white">Create New SPL Token</h2>
        <p className="mb-6 text-gray-400">Follow the steps to configure and launch your token.</p>
        <StepIndicator currentStep={step} />
        
        <div className="mt-8">
          {step === 1 && <StepOne token={token} handleFormFieldChange={handleFormFieldChange} nextStep={nextStep} />}
          {step === 2 && <StepTwo token={token} handleFormFieldChange={handleFormFieldChange} handleImageChange={handleImageChange} isUploading={isUploading} nextStep={nextStep} prevStep={prevStep} />}
          {step === 3 && <StepThree token={token} createToken={createToken} isCreating={isCreating} prevStep={prevStep} />}
        </div>
      </>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
       {(isUploading || isCreating) && <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50"><ClipLoader color="#9333ea" size={50} /></div>}
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl rounded-2xl border border-gray-700/50 bg-gray-900/80 p-8 shadow-2xl shadow-purple-500/10"
      >
        <button
          onClick={() => setOpenCreateModel(false)}
          className="absolute top-4 right-4 rounded-full p-2 text-gray-500 transition-colors duration-300 hover:bg-gray-700 hover:text-white"
          aria-label="Close modal"
        >
          <LuX size={24} />
        </button>
        {renderContent()}
      </div>
    </div>
  );
};

// Helper components for steps and success view
const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = ["Details", "Supply & Media", "Review & Create"];
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center text-center">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${currentStep > index ? 'border-purple-500 bg-purple-500' : currentStep === index + 1 ? 'border-purple-500 text-purple-400' : 'border-gray-600 text-gray-500'}`}>
              {currentStep > index ? <LuCheckCircle /> : index + 1}
            </div>
            <p className={`mt-2 text-sm ${currentStep >= index + 1 ? 'text-white' : 'text-gray-500'}`}>{step}</p>
          </div>
          {index < steps.length - 1 && <div className={`h-1 flex-1 ${currentStep > index + 1 ? 'bg-purple-500' : 'bg-gray-700'}`} />}
        </React.Fragment>
      ))}
    </div>
  );
};

const StepOne = ({ token, handleFormFieldChange, nextStep }) => (
  <div>
    <InputView name="Token Name" placeholder="e.g., Solana AI Token" value={token.name} onChange={(e) => handleFormFieldChange("name", e.target.value)} />
    <InputView name="Token Symbol" placeholder="e.g., SAT" value={token.symbol} onChange={(e) => handleFormFieldChange("symbol", e.target.value)} />
    <div>
      <label htmlFor="description" className="mb-2 block text-base font-medium text-gray-400">Description</label>
      <textarea id="description" rows={4} placeholder="A short description of your token..." value={token.description} onChange={(e) => handleFormFieldChange("description", e.target.value)} className="block w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3 text-gray-200 transition-all duration-300 placeholder:text-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30" />
    </div>
    <button onClick={nextStep} className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3 text-lg font-semibold text-white transition-all duration-300 hover:from-purple-700 hover:to-cyan-600">
      Next Step <LuArrowRight />
    </button>
  </div>
);

const StepTwo = ({ token, handleFormFieldChange, handleImageChange, isUploading, nextStep, prevStep }) => (
  <div>
    <div className="mb-5">
      <label className="mb-2 block text-base font-medium text-gray-400">Token Image</label>
      <div className="relative flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-600 bg-gray-800/50 p-4 text-center hover:border-gray-500">
        {isUploading ? <ClipLoader color="#9333ea" size={40} /> : token.image ? (
          <>
            <img src={token.image} alt="Token Preview" className="h-full max-h-36 w-auto rounded-lg object-contain" />
            <button onClick={() => handleFormFieldChange("image", "")} className="absolute top-2 right-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/80"><LuX size={16} /></button>
          </>
        ) : (
          <div className="text-gray-400">
            <LuUploadCloud size={40} className="mx-auto mb-2" />
            <p>Drag & drop or <span className="font-semibold text-purple-400">click to upload</span></p>
            <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
        <input type="file" className="absolute inset-0 h-full w-full cursor-pointer opacity-0" onChange={handleImageChange} accept="image/png, image/jpeg, image/gif" />
      </div>
    </div>
    <InputView name="Decimals" placeholder="e.g., 9" type="number" value={token.decimals} onChange={(e) => handleFormFieldChange("decimals", e.target.value)} />
    <InputView name="Amount to Mint" placeholder="e.g., 1,000,000" type="number" value={token.amount} onChange={(e) => handleFormFieldChange("amount", e.target.value)} />
    <div className="mt-6 flex gap-4">
      <button onClick={prevStep} className="inline-flex w-full justify-center rounded-full border-2 border-gray-600 px-6 py-3 font-semibold text-gray-300 transition-all hover:border-gray-500 hover:text-white">
        <LuArrowLeft /> Back
      </button>
      <button onClick={nextStep} className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-purple-700 hover:to-cyan-600">
        Next Step <LuArrowRight />
      </button>
    </div>
  </div>
);

const StepThree = ({ token, createToken, isCreating, prevStep }) => (
  <div className="text-left">
    <h3 className="mb-4 text-2xl font-bold text-white">Review Your Token</h3>
    <div className="space-y-4 rounded-lg bg-gray-800/50 p-6">
      <div className="flex items-center gap-4">
        <img src={token.image} alt="Token" className="h-16 w-16 rounded-full border-2 border-gray-700" />
        <div>
          <p className="text-xl font-bold text-white">{token.name}</p>
          <p className="text-gray-400">{token.symbol}</p>
        </div>
      </div>
      <div className="text-sm text-gray-300">{token.description}</div>
      <div className="grid grid-cols-2 gap-4 border-t border-gray-700 pt-4">
        <div><p className="text-gray-500">Total Supply</p><p className="font-semibold text-white">{Number(token.amount).toLocaleString()}</p></div>
        <div><p className="text-gray-500">Decimals</p><p className="font-semibold text-white">{token.decimals}</p></div>
      </div>
    </div>
    <div className="mt-6 flex gap-4">
      <button onClick={prevStep} disabled={isCreating} className="inline-flex w-full justify-center rounded-full border-2 border-gray-600 px-6 py-3 font-semibold text-gray-300 transition-all hover:border-gray-500 hover:text-white disabled:opacity-50">
        <LuArrowLeft /> Back
      </button>
      <button onClick={createToken} disabled={isCreating} className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-purple-700 hover:to-cyan-600 disabled:opacity-50">
        {isCreating ? <><ClipLoader color="#fff" size={20} /> Creating...</> : "Confirm & Create Token"}
      </button>
    </div>
  </div>
);

const SuccessView = ({ token, tokenMintAddress, networkConfiguration, resetForm }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(tokenMintAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-400">
        <LuCheckCircle size={32} />
      </div>
      <h2 className="mb-2 text-3xl font-bold text-white">Token Created Successfully!</h2>
      <p className="mb-6 text-gray-400">Congratulations! Your new token <span className="font-bold text-white">{token.name}</span> is live on the blockchain.</p>
      
      <div className="relative mb-4 rounded-lg bg-gray-800/50 p-4 text-left">
        <p className="text-sm font-medium text-gray-400">Token Mint Address</p>
        <p className="truncate font-mono text-sm text-white">{tokenMintAddress}</p>
        <button onClick={handleCopy} className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-white">
          {copied ? <LuCheckCircle className="text-green-400" /> : <LuCopy />}
        </button>
      </div>

      <a href={`https://explorer.solana.com/address/${tokenMintAddress}?cluster=${networkConfiguration}`} target="_blank" rel="noopener noreferrer"
        className="group mt-4 inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3 text-lg font-semibold text-white transition-all duration-300 hover:from-purple-700 hover:to-cyan-600">
        View on Explorer <LuExternalLink />
      </a>
      <button onClick={resetForm} className="group mt-4 inline-flex w-full items-center justify-center gap-3 rounded-full border-2 border-gray-600 px-6 py-3 text-lg font-semibold text-gray-300 transition-all duration-300 hover:border-gray-500 hover:text-white">
        <LuRefreshCw /> Create Another Token
      </button>
    </div>
  );
};