import { FC } from "react";
import dynamic from "next/dynamic";

import { useNetworkConfiguration } from "contexts/NetworkConfigurationProvider";
import NetworkSwitcherSVG from "./SVG/NetworkSwitcherSVG";

const NetworkSwitcher: FC = () => 
{
  const { networkConfiguration, setNetworkConfiguration } = useNetworkConfiguration();

  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-gradient-to-r from-purple-600/20 to-cyan-500/20 shadow-sm">
      <div className="w-5 h-5 text-purple-500 flex items-center justify-center">
        <NetworkSwitcherSVG />
      </div>
      <select
        value={networkConfiguration}
        onChange={(e) => setNetworkConfiguration(e.target.value || "devnet")}
        className="px-2 py-1 rounded-md bg-gray-900 text-white text-sm border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        <option value="mainnet-beta">Mainnet</option>
        <option value="devnet">Devnet</option>
        <option value="testnet">Testnet</option>
      </select>
    </div>
  );
};

export default dynamic(()=> Promise.resolve(NetworkSwitcher), { ssr: false });