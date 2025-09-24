import React, { useEffect, useState } from "react";
import { LuCheckCircle, LuInfo, LuXCircle, LuX, LuExternalLink } from "react-icons/lu";
import useNotificationStore from "stores/useNotificationStore";
import { useNetworkConfiguration } from "contexts/NetworkConfigurationProvider";

const NotificationList = () => {
  const { notifications, set: setNotificationStore } = useNotificationStore((s) => s);

  type NotificationItem = {
    id: string;
    type: string;
    message: string;
    description?: string;
    txid?: string;
  };

  const reversedNotifications = [...(notifications as NotificationItem[])].reverse();

  const handleHide = (id: string) => {
    setNotificationStore((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex w-full max-w-sm flex-col items-end gap-3">
      {reversedNotifications.map((n) => (
        <Notification
          key={n.id}
          type={n.type as 'success' | 'info' | 'error'}
          message={n.message}
          description={n.description}
          txid={n.txid}
          onHide={() => handleHide(n.id)}
        />
      ))}
    </div>
  );
};

// Add a unique ID to notifications when you call `notify()` for robust removal
// e.g., notify({ ..., id: Date.now().toString() })
interface NotificationProps {
  type: 'success' | 'info' | 'error';
  message: string;
  description?: string;
  txid?: string;
  onHide: () => void;
}

const Notification: React.FC<NotificationProps> = ({ type, message, description, txid, onHide }) => {
  const { networkConfiguration } = useNetworkConfiguration();

  // Auto-hide after 8 seconds
  useEffect(() => {
    const id = setTimeout(() => onHide(), 8000);
    return () => clearTimeout(id);
  }, [onHide]);

  const Icon = {
    success: <LuCheckCircle className="h-7 w-7 text-green-400" />,
    info: <LuInfo className="h-7 w-7 text-sky-400" />,
    error: <LuXCircle className="h-7 w-7 text-red-400" />,
  }[type];

  return (
    <div className="pointer-events-auto w-full overflow-hidden rounded-xl border border-gray-700/50 bg-gray-900/80 shadow-lg shadow-purple-500/10 backdrop-blur-lg animate-slide-in-from-right">
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">{Icon}</div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="font-semibold text-white">{message}</p>
            {description && <p className="mt-1 text-sm text-gray-400">{description}</p>}
            {txid && (
              <a
                href={`https://explorer.solana.com/tx/${txid}?cluster=${networkConfiguration}`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 group inline-flex items-center gap-2 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
              >
                <span className="font-mono">
                  {txid.slice(0, 8)}...{txid.slice(txid.length - 8)}
                </span>
                <LuExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            )}
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              onClick={onHide}
              className="inline-flex rounded-md p-1 text-gray-500 transition-colors hover:bg-gray-700 hover:text-white focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <LuX className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-white/10">
        <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-progress"></div>
      </div>
    </div>
  );
};

export default NotificationList;