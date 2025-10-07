import React, { FC, useCallback, useState, useRef, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMintInstruction, getMinimumBalanceForRentExemptMint, createAssociatedTokenAccountInstruction, getAssociatedTokenAddress, createMintToInstruction } from "@solana/spl-token";
import { PROGRAM_ID, createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";
import axios from "axios";
import { notify } from "utils/notifications";
import { ClipLoader } from "react-spinners";
import { useNetworkConfiguration } from "contexts/NetworkConfigurationProvider";
import { 
  LuX, 
  LuUploadCloud, 
  LuCheckCircle, 
  LuCopy, 
  LuExternalLink, 
  LuArrowRight, 
  LuArrowLeft, 
  LuRefreshCw,
  LuCoins,
  LuImage,
  LuFileText,
  LuSparkles,
  LuRocket
} from "react-icons/lu";

import { InputView } from "../input";

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
      return <SuccessView token={token} tokenMintAddress={tokenMintAddress} networkConfiguration={networkConfiguration} resetForm={resetForm} />;
    }

    return (
      <div className="relative">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20">
            <LuSparkles className="text-purple-400" size={20} />
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              CREATE TOKEN
            </span>
          </div>
          
          <h2 className="mb-2 text-4xl md:text-5xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-300 bg-clip-text text-transparent">
              Launch Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              SPL Token
            </span>
          </h2>
          
          <p className="text-lg text-slate-400 max-w-md mx-auto">
            Follow the steps to configure and launch your token on Solana blockchain
          </p>
        </div>

        <StepIndicator currentStep={step} />
        
        <div className="mt-8">
          {step === 1 && <StepOne token={token} handleFormFieldChange={handleFormFieldChange} nextStep={nextStep} />}
          {step === 2 && <StepTwo token={token} handleFormFieldChange={handleFormFieldChange} handleImageChange={handleImageChange} isUploading={isUploading} nextStep={nextStep} prevStep={prevStep} />}
          {step === 3 && <StepThree token={token} createToken={createToken} isCreating={isCreating} prevStep={prevStep} />}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md overflow-y-auto p-4">
      {/* Loading Overlay */}
      {(isUploading || isCreating) && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-900/90 rounded-2xl p-8 border border-purple-500/20 text-center">
            <ClipLoader color="#a855f7" size={50} />
            <p className="mt-4 text-white font-medium">
              {isUploading ? "Uploading to IPFS..." : "Creating your token..."}
            </p>
          </div>
        </div>
      )}

      <div
        ref={modalRef}
        className="relative w-full max-w-3xl rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900/95 to-slate-800/90 p-8 shadow-2xl shadow-purple-500/10 backdrop-blur-xl"
      >
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] rounded-3xl"></div>
        
        {/* Glowing Background Elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-600/5 rounded-full blur-3xl"></div>

        {/* Close Button */}
       <button
          onClick={() => setOpenCreateModel(false)}
          className="absolute top-4 right-4 rounded-full p-2 text-gray-500 transition-colors duration-300 hover:bg-gray-700 hover:text-white"
          aria-label="Close modal"
        >
          <LuX size={24} />
        </button>

        {/* Main Content */}
        <div className="relative z-10">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// Enhanced Step Indicator with futuristic design
const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { title: "Token Details", icon: <LuFileText size={16} /> },
    { title: "Supply & Media", icon: <LuImage size={16} /> },
    { title: "Review & Launch", icon: <LuRocket size={16} /> }
  ];

  return (
    <div className="relative mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center text-center relative group">
              <div className={`
                relative flex h-14 w-14 items-center justify-center rounded-xl border-2 transition-all duration-500
                ${currentStep > index + 1 
                  ? 'border-emerald-500 bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30' 
                  : currentStep === index + 1 
                  ? 'border-purple-500 bg-gradient-to-br from-purple-600 to-cyan-500 shadow-lg shadow-purple-500/30' 
                  : 'border-slate-600 bg-slate-800/50 text-slate-500'
                }
              `}>
                {currentStep > index + 1 ? (
                  <LuCheckCircle className="text-white" size={20} />
                ) : currentStep === index + 1 ? (
                  <div className="text-white">{step.icon}</div>
                ) : (
                  <span className="text-sm font-bold">{index + 1}</span>
                )}
                
                {/* Animated pulse for current step */}
                {currentStep === index + 1 && (
                  <div className="absolute inset-0 rounded-xl border-2 border-purple-400 animate-pulse"></div>
                )}
              </div>
              
              <p className={`
                mt-3 text-sm font-medium transition-all duration-300
                ${currentStep >= index + 1 ? 'text-white' : 'text-slate-500'}
              `}>
                {step.title}
              </p>
            </div>
            
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4">
                <div className={`
                  h-2 rounded-full transition-all duration-500 relative overflow-hidden
                  ${currentStep > index + 1 ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-slate-700'}
                `}>
                  {currentStep === index + 2 && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 animate-pulse"></div>
                  )}
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Enhanced Step Components with futuristic styling
const StepOne = ({ token, handleFormFieldChange, nextStep }) => {
  const isFormValid = token.name && token.symbol && token.description;

  return (
    <div className="space-y-6">
      {/* Form Fields */}
      <div className="space-y-5">
        <div className="relative group">
          <InputView 
            name="Token Name" 
            placeholder="e.g., Solana AI Token" 
            value={token.name} 
            onChange={(e) => handleFormFieldChange("name", e.target.value)} 
          />
          <LuCoins className="absolute top-10 right-4 text-slate-500 group-focus-within:text-purple-400 transition-colors duration-300" size={20} />
        </div>

        <div className="relative group">
          <InputView 
            name="Token Symbol" 
            placeholder="e.g., SAT" 
            value={token.symbol} 
            onChange={(e) => handleFormFieldChange("symbol", e.target.value)} 
          />
        </div>

        <div className="relative group">
          <label htmlFor="description" className="mb-2 block text-base font-medium text-slate-400">
            Token Description
          </label>
          <textarea 
            id="description" 
            rows={4} 
            placeholder="Describe your token's purpose and utility..." 
            value={token.description} 
            onChange={(e) => handleFormFieldChange("description", e.target.value)} 
            className="block w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-4 text-slate-200 transition-all duration-300 placeholder:text-slate-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 resize-none backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Next Button */}
      <button 
        onClick={nextStep} 
        disabled={!isFormValid}
        className="group mt-8 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:from-purple-700 hover:to-cyan-600 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
      >
        <span className="relative z-10">Continue to Media</span>
        <LuArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
        
        {/* Animated shine effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
      </button>
    </div>
  );
};

const StepTwo = ({ token, handleFormFieldChange, handleImageChange, isUploading, nextStep, prevStep }) => {
  const isFormValid = token.image && token.decimals && token.amount;

  return (
    <div className="space-y-6">
      {/* Image Upload Section */}
      <div className="space-y-3">
        <label className="block text-base font-medium text-slate-400">Token Image</label>
        <div className="relative group">
          <div className="relative flex h-56 w-full items-center justify-center rounded-xl border-2 border-dashed border-slate-600 bg-slate-800/30 p-6 text-center transition-all duration-300 hover:border-slate-500 hover:bg-slate-800/50 group-hover:shadow-lg group-hover:shadow-purple-500/10">
            {isUploading ? (
              <div className="flex flex-col items-center gap-4">
                <ClipLoader color="#a855f7" size={40} />
                <p className="text-slate-400">Uploading to IPFS...</p>
              </div>
            ) : token.image ? (
              <div className="relative group">
                <img 
                  src={token.image} 
                  alt="Token Preview" 
                  className="h-full max-h-40 w-auto rounded-lg object-contain shadow-lg" 
                />
                <button 
                  onClick={() => handleFormFieldChange("image", "")} 
                  className="absolute -top-2 -right-2 rounded-full bg-red-500/80 p-2 text-white hover:bg-red-600 transition-colors duration-200"
                >
                  <LuX size={16} />
                </button>
              </div>
            ) : (
              <div className="text-slate-400">
                <LuUploadCloud size={48} className="mx-auto mb-4 text-slate-500 group-hover:text-purple-400 transition-colors duration-300" />
                <p className="text-lg font-medium">
                  Drop your image here or{" "}
                  <span className="font-semibold text-purple-400">click to browse</span>
                </p>
                <p className="text-sm text-slate-500 mt-2">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
            <input 
              type="file" 
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0" 
              onChange={handleImageChange} 
              accept="image/png, image/jpeg, image/gif" 
            />
          </div>
        </div>
      </div>

      {/* Supply Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InputView 
          name="Decimals" 
          placeholder="e.g., 9" 
          type="number" 
          value={token.decimals} 
          onChange={(e) => handleFormFieldChange("decimals", e.target.value)} 
        />
        <InputView 
          name="Total Supply" 
          placeholder="e.g., 1,000,000" 
          type="number" 
          value={token.amount} 
          onChange={(e) => handleFormFieldChange("amount", e.target.value)} 
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-8">
        <button 
          onClick={prevStep} 
          className="inline-flex w-full justify-center items-center gap-2 rounded-xl border-2 border-slate-600 px-6 py-4 font-semibold text-slate-300 transition-all duration-300 hover:border-slate-500 hover:text-white hover:bg-slate-800/50"
        >
          <LuArrowLeft size={20} />
          Back
        </button>
        <button 
          onClick={nextStep} 
          disabled={!isFormValid}
          className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-4 font-semibold text-white transition-all duration-300 hover:from-purple-700 hover:to-cyan-600 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
        >
          <span className="relative z-10">Review & Launch</span>
          <LuArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          
          {/* Animated shine effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
        </button>
      </div>
    </div>
  );
};

const StepThree = ({ token, createToken, isCreating, prevStep }) => (
  <div className="space-y-6">
    <div className="text-center mb-6">
      <h3 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-300 bg-clip-text text-transparent mb-2">
        Review Your Token
      </h3>
      <p className="text-slate-400">Double-check your configuration before launching</p>
    </div>

    {/* Token Preview Card */}
    <div className="relative group">
      <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-8 border border-slate-700/50 backdrop-blur-sm">
        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 p-[1px]">
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl"></div>
        </div>

        <div className="relative z-10 space-y-6">
          {/* Token Header */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <img 
                src={token.image} 
                alt="Token" 
                className="h-20 w-20 rounded-2xl border-2 border-slate-600 shadow-lg" 
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-cyan-500/20"></div>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-white mb-1">{token.name}</h4>
              <p className="text-slate-400 text-lg font-mono">${token.symbol}</p>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <p className="text-slate-300 leading-relaxed">{token.description}</p>
          </div>

          {/* Token Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20">
              <p className="text-slate-400 text-sm font-medium mb-1">Total Supply</p>
              <p className="text-2xl font-bold text-white">{Number(token.amount).toLocaleString()}</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20">
              <p className="text-slate-400 text-sm font-medium mb-1">Decimals</p>
              <p className="text-2xl font-bold text-white">{token.decimals}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex gap-4 mt-8">
      <button 
        onClick={prevStep} 
        disabled={isCreating}
        className="inline-flex w-full justify-center items-center gap-2 rounded-xl border-2 border-slate-600 px-6 py-4 font-semibold text-slate-300 transition-all duration-300 hover:border-slate-500 hover:text-white hover:bg-slate-800/50 disabled:opacity-50"
      >
        <LuArrowLeft size={20} />
        Back
      </button>
      <button 
        onClick={createToken} 
        disabled={isCreating}
        className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-4 font-semibold text-white transition-all duration-300 hover:from-purple-700 hover:to-cyan-600 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
      >
        {isCreating ? (
          <>
            <ClipLoader color="#fff" size={20} />
            <span>Creating Token...</span>
          </>
        ) : (
          <>
            <LuRocket className="group-hover:scale-110 transition-transform duration-300" />
            <span>Launch Token</span>
          </>
        )}
        
        {/* Animated shine effect */}
        {!isCreating && (
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
        )}
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
    <div className="text-center space-y-8">
      {/* Success Icon */}
      <div className="relative">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30">
          <LuCheckCircle size={40} className="text-white" />
        </div>
        <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-20"></div>
      </div>

      {/* Success Message */}
      <div>
        <h2 className="text-4xl font-black tracking-tight mb-3">
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Token Created Successfully!
          </span>
        </h2>
        <p className="text-xl text-slate-400">
          Congratulations! <span className="font-bold text-white">{token.name}</span> is now live on Solana
        </p>
      </div>

      {/* Token Info Card */}
      <div className="relative group">
        <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-6 border border-slate-700/50 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-4">
            <img src={token.image} alt="Token" className="h-16 w-16 rounded-full border-2 border-emerald-500/50" />
            <div>
              <p className="text-xl font-bold text-white">{token.name}</p>
              <p className="text-slate-400 font-mono">${token.symbol}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-400">Token Mint Address</p>
            <div className="relative">
              <p className="font-mono text-sm text-white bg-slate-800/50 rounded-lg p-3 pr-12 break-all">
                {tokenMintAddress}
              </p>
              <button 
                onClick={handleCopy} 
                className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
              >
                {copied ? <LuCheckCircle className="text-emerald-400" size={20} /> : <LuCopy size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <a 
          href={`https://explorer.solana.com/address/${tokenMintAddress}?cluster=${networkConfiguration}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:from-purple-700 hover:to-cyan-600 hover:shadow-lg hover:shadow-purple-500/30 relative overflow-hidden"
        >
          <span className="relative z-10">View on Solana Explorer</span>
          <LuExternalLink className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
          
          {/* Animated shine effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
        </a>
        
        <button 
          onClick={resetForm} 
          className="group inline-flex w-full items-center justify-center gap-3 rounded-xl border-2 border-slate-600 px-8 py-4 text-lg font-semibold text-slate-300 transition-all duration-300 hover:border-slate-500 hover:text-white hover:bg-slate-800/50"
        >
          <LuRefreshCw className="group-hover:rotate-180 transition-transform duration-500" />
          Create Another Token
        </button>
      </div>
    </div>
  );
};