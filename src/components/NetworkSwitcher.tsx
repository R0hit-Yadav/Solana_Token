import { FC, useState } from "react";
import dynamic from "next/dynamic";
import { useNetworkConfiguration } from "contexts/NetworkConfigurationProvider";
import NetworkSwitcherSVG from "./SVG/NetworkSwitcherSVG";

const NetworkSwitcher: FC = () => {
  const { networkConfiguration, setNetworkConfiguration } = useNetworkConfiguration();
  const [isOpen, setIsOpen] = useState(false);

  const networks = [
    { value: "mainnet-beta", label: "Mainnet", color: "from-purple-600 to-cyan-500", badge: "🟢" },
    { value: "devnet", label: "Devnet", color: "from-cyan-500 to-purple-600", badge: "🟡" },
    { value: "testnet", label: "Testnet", color: "from-purple-500 to-cyan-600", badge: "🔵" },
  ];

  const currentNetwork = networks.find(n => n.value === networkConfiguration) || networks[1];

  return (
    <div className="relative">
      {/* Desktop Version - Dropdown Style */}
      <div className="hidden sm:block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-md border border-purple-500/30 transition-all duration-300 hover:scale-105 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/30 overflow-hidden"
        >
          {/* Animated background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-r ${currentNetwork.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
          
          {/* Network icon with rotation animation */}
          <div className="relative z-10 w-5 h-5 text-cyan-400 transition-transform duration-500 group-hover:rotate-180 group-hover:text-purple-400">
            <NetworkSwitcherSVG />
          </div>
          
          {/* Current network label */}
          <span className="relative z-10 text-sm font-bold text-white">
            {currentNetwork.label}
          </span>
          
          {/* Status badge */}
          <span className="relative z-10 text-sm animate-pulse">
            {currentNetwork.badge}
          </span>

          {/* Dropdown arrow */}
          <svg 
            className={`relative z-10 w-4 h-4 text-gray-400 transition-all duration-300 group-hover:text-purple-400 ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>

          {/* Outer glow effect */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-52 rounded-xl bg-gradient-to-b from-gray-950/98 to-slate-900/98 backdrop-blur-xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden z-50">
            {/* Decorative top gradient */}
            <div className="h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500"></div>
            
            <div className="p-2 space-y-1">
              {networks.map((network) => (
                <button
                  key={network.value}
                  onClick={() => {
                    setNetworkConfiguration(network.value);
                    setIsOpen(false);
                  }}
                  className={`group/item relative w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 overflow-hidden ${
                    networkConfiguration === network.value
                      ? "bg-gradient-to-r " + network.color + " text-white shadow-lg shadow-purple-500/30"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {/* Selection indicator */}
                  {networkConfiguration === network.value && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full animate-pulse shadow-lg shadow-white/50"></div>
                  )}
                  
                  <span className="relative z-10 text-base">{network.badge}</span>
                  <span className="relative z-10 font-bold text-sm flex-1">{network.label}</span>
                  
                  {networkConfiguration === network.value && (
                    <svg className="relative z-10 w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}

                  {/* Hover glow */}
                  {networkConfiguration !== network.value && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${network.color} opacity-0 group-hover/item:opacity-20 rounded-lg transition-opacity duration-300`}></div>
                  )}
                </button>
              ))}
            </div>
            
            {/* Info footer */}
            <div className="px-4 py-3 border-t border-purple-500/20 bg-gradient-to-r from-purple-500/5 to-cyan-500/5">
              <p className="text-xs text-gray-400 text-center font-semibold">
                Network latency may vary
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Version - Full Width Select */}
      <div className="sm:hidden w-full">
        <div className="relative group overflow-hidden rounded-xl">
          {/* Background glow */}
          <div className={`absolute inset-0 bg-gradient-to-r ${currentNetwork.color} opacity-30 blur-md`}></div>
          
          <div className="relative flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-md border border-purple-500/30 transition-all duration-300 hover:border-purple-400">
            {/* Network icon */}
            <div className="w-5 h-5 text-cyan-400">
              <NetworkSwitcherSVG />
            </div>
            
            {/* Status badge */}
            <span className="text-sm">{currentNetwork.badge}</span>
            
            {/* Select dropdown */}
            <select
              value={networkConfiguration}
              onChange={(e) => setNetworkConfiguration(e.target.value || "devnet")}
              className="flex-1 bg-transparent text-white text-sm font-bold focus:outline-none appearance-none cursor-pointer"
            >
              {networks.map((network) => (
                <option key={network.value} value={network.value} className="bg-gray-950 text-white font-bold py-2">
                  {network.label}
                </option>
              ))}
            </select>

            {/* Dropdown arrow */}
            <svg className="w-4 h-4 text-purple-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(NetworkSwitcher), { ssr: false });