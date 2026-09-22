import React from 'react';
import { X, Bell, Trash2, CheckCircle2 } from 'lucide-react';
import { NotificationItem } from '../types';
import { audio } from '../utils/audio';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onClearAll: () => void;
  onMarkRead: (id: string) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onClearAll,
  onMarkRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#FAF6EE] h-full shadow-2xl border-l border-[#EBDDC1] flex flex-col text-[#1B0E07]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#2A1810] to-[#1B0E07] text-[#FAF6EE] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#EAB308]" />
            <h3 className="font-serif text-lg font-bold text-white">
              Canine Notifications
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-stone-400 text-xs">
              No recent barks or alerts. Your sofa is peaceful.
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => onMarkRead(n.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  !n.read
                    ? 'bg-white border-[#CA8A04]/60 shadow-xs'
                    : 'bg-[#FAF6EE] border-[#EBDDC1] opacity-75'
                }`}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-xs text-[#1B0E07] flex items-center gap-1.5">
                    {!n.read && <span className="w-2 h-2 rounded-full bg-[#CA8A04]" />}
                    {n.title}
                  </h4>
                  <span className="text-[10px] text-stone-400">{n.timeAgo}</span>
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {n.description}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-3.5 bg-white border-t border-[#EBDDC1] flex justify-between items-center">
            <span className="text-[11px] text-stone-400">{notifications.length} alerts recorded</span>
            <button
              onClick={onClearAll}
              className="text-xs text-rose-600 hover:underline font-bold flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
