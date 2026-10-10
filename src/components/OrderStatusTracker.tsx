import { useState, useEffect } from 'react';
import { CheckCircle2, Clock, Coffee, Sparkles, MapPin, Check, ChevronRight, X, Bell } from 'lucide-react';
import { BUSINESS_INFO } from '../data/cafeData';

export interface ActiveOrder {
  orderId: string;
  status: 'preparing' | 'ready' | 'completed';
  itemsCount: number;
  itemsSummary: string[];
  totalPaid: number;
  orderType: 'pickup' | 'table';
  tableNumber?: string;
  customerName: string;
  customerPhone: string;
  createdAt: number;
  prepDurationSeconds: number;
  readyAt: number;
}

interface OrderStatusTrackerProps {
  order: ActiveOrder;
  onUpdateStatus: (newStatus: 'preparing' | 'ready' | 'completed') => void;
  onDismiss: () => void;
  compact?: boolean;
  onOpenFullView?: () => void;
}

export function OrderStatusTracker({
  order,
  onUpdateStatus,
  onDismiss,
  compact = false,
  onOpenFullView,
}: OrderStatusTrackerProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(() => {
    const elapsed = Math.floor((Date.now() - order.createdAt) / 1000);
    return Math.max(0, order.prepDurationSeconds - elapsed);
  });

  useEffect(() => {
    if (order.status !== 'preparing') return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - order.createdAt) / 1000);
      const remaining = Math.max(0, order.prepDurationSeconds - elapsed);
      setSecondsRemaining(remaining);

      if (remaining === 0 && order.status === 'preparing') {
        onUpdateStatus('ready');
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [order.createdAt, order.prepDurationSeconds, order.status, onUpdateStatus]);

  const percentComplete =
    order.status === 'ready' || order.status === 'completed'
      ? 100
      : Math.min(95, Math.max(15, Math.round(((order.prepDurationSeconds - secondsRemaining) / order.prepDurationSeconds) * 100)));

  // Compact floating toast bar (bottom of the screen)
  if (compact) {
    return (
      <aside
        aria-label="Active Order Status"
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-40 bg-[#FAF7F0] border border-[#DECFBE] rounded-xl shadow-xl overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
      >
        {/* Progress bar line */}
        <div className="w-full bg-[#EBE3D0] h-1.5 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ease-out ${
              order.status === 'ready' ? 'bg-[#5F7A61]' : 'bg-[#4A2E18]'
            }`}
            style={{ width: `${percentComplete}%` }}
          />
        </div>

        <div className="p-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`p-2 rounded-lg shrink-0 ${
                order.status === 'ready'
                  ? 'bg-[#EBF2EC] text-[#3D5440]'
                  : 'bg-[#F3EBE1] text-[#4A2E18]'
              }`}
            >
              {order.status === 'ready' ? (
                <Bell className="w-4 h-4 animate-bounce text-[#3D5440]" />
              ) : (
                <Coffee className="w-4 h-4 animate-pulse text-[#4A2E18]" />
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#382210]">
                  #{order.orderId}
                </span>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.2 rounded ${
                    order.status === 'ready'
                      ? 'bg-[#5F7A61] text-white'
                      : 'bg-[#DECFBE] text-[#382210]'
                  }`}
                >
                  {order.status === 'ready'
                    ? order.orderType === 'table' ? 'Served at Table' : 'Ready for Pickup!'
                    : 'Preparing...'}
                </span>
              </div>
              <p className="text-[11px] text-[#6B533F] truncate mt-0.5">
                {order.status === 'ready'
                  ? 'Collect now at the counter'
                  : `Est. ${secondsRemaining}s remaining`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {onOpenFullView && (
              <button
                type="button"
                onClick={onOpenFullView}
                className="px-2.5 py-1 text-xs font-medium text-[#4A2E18] bg-[#F5EBE1] hover:bg-[#EBE0D2] rounded border border-[#DECFBE] transition-colors"
              >
                Track
              </button>
            )}
            <button
              type="button"
              onClick={onDismiss}
              className="p-1 text-[#8C7460] hover:text-[#382210] rounded"
              aria-label="Dismiss tracking bar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    );
  }

  // Full detailed status tracker view (inside Cart confirmation or standalone Modal)
  return (
    <div className="bg-[#FAF7F0] border border-[#DECFBE] rounded-2xl p-5 sm:p-6 space-y-6">
      {/* Header with Order Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EBE3D0]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[#8C7460] font-semibold">
              Live Order Tracker
            </span>
            <span className="font-mono font-bold text-xs text-[#382210] bg-[#EFE8DC] px-2 py-0.5 rounded">
              #{order.orderId}
            </span>
          </div>
          <h4 className="text-xl font-serif font-bold text-[#382210] mt-1">
            {order.status === 'ready'
              ? order.orderType === 'table' ? 'Your Order is on the Table!' : 'Your Order is Ready for Pickup!'
              : 'Our Barista & Bakers Are Preparing Your Order'}
          </h4>
        </div>

        <div className="shrink-0">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${
              order.status === 'ready'
                ? 'bg-[#5F7A61] text-white shadow-xs'
                : 'bg-[#4A2E18] text-white'
            }`}
          >
            {order.status === 'ready' ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Ready for Pickup</span>
              </>
            ) : (
              <>
                <Clock className="w-3.5 h-3.5 animate-spin" />
                <span>Preparing ({secondsRemaining}s)</span>
              </>
            )}
          </span>
        </div>
      </div>

      {/* Visual Step Tracker Progress */}
      <div className="space-y-3">
        {/* Progress Bar */}
        <div className="w-full bg-[#E5DDCF] h-2 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-700 ease-out rounded-full ${
              order.status === 'ready' ? 'bg-[#5F7A61]' : 'bg-[#4A2E18]'
            }`}
            style={{ width: `${percentComplete}%` }}
          />
        </div>

        {/* 3 Step Icons with Captions */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
          {/* Step 1: Placed */}
          <div className="flex flex-col items-center space-y-1">
            <div className="w-7 h-7 rounded-full bg-[#EBF2EC] text-[#3D5440] flex items-center justify-center font-bold text-xs">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-[#382210]">Order Placed</span>
            <span className="text-[10px] text-[#8C7460]">Received & Queued</span>
          </div>

          {/* Step 2: Preparing */}
          <div className="flex flex-col items-center space-y-1">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                order.status === 'preparing'
                  ? 'bg-[#4A2E18] text-white animate-pulse'
                  : 'bg-[#EBF2EC] text-[#3D5440]'
              }`}
            >
              {order.status === 'preparing' ? (
                <Coffee className="w-3.5 h-3.5" />
              ) : (
                <Check className="w-3.5 h-3.5" />
              )}
            </div>
            <span className="font-semibold text-[#382210]">Preparing</span>
            <span className="text-[10px] text-[#8C7460]">
              {order.status === 'preparing' ? `${secondsRemaining}s left` : 'Completed'}
            </span>
          </div>

          {/* Step 3: Ready for Pickup */}
          <div className="flex flex-col items-center space-y-1">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                order.status === 'ready'
                  ? 'bg-[#5F7A61] text-white ring-4 ring-[#EBF2EC]'
                  : 'bg-[#EBE3D0] text-[#9D8471]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <span
              className={`font-semibold ${
                order.status === 'ready' ? 'text-[#3D5440]' : 'text-[#8C7460]'
              }`}
            >
              Ready for Pickup
            </span>
            <span className="text-[10px] text-[#8C7460]">
              {order.status === 'ready' ? 'At Main Counter' : 'Up Next'}
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Status Detail Card */}
      <div
        className={`p-4 rounded-xl border transition-all ${
          order.status === 'ready'
            ? 'bg-[#EBF2EC]/80 border-[#5F7A61]/40'
            : 'bg-[#FAF5EE] border-[#DECFBE]'
        }`}
      >
        {order.status === 'ready' ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#29382B] font-semibold text-xs">
              <Sparkles className="w-4 h-4 text-[#5F7A61]" />
              <span>
                {order.orderType === 'table'
                  ? `Delivered to Table #${order.tableNumber}`
                  : 'Freshly Brewed & Ready at the Counter!'}
              </span>
            </div>
            <p className="text-xs text-[#3D5440] leading-relaxed">
              {order.orderType === 'table'
                ? `Enjoy your meal, ${order.customerName}! If you need extra sugar or napkins, please wave to our floor team.`
                : `Please head to the pickup counter at 24 Market Street and display token #${order.orderId}. Your items are hot, crispy, and packaged to perfection.`}
            </p>
          </div>
        ) : (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-[#382210]">
              <span>In the Oven & Espresso Bar</span>
              <span className="font-mono text-[#4A2E18]">{secondsRemaining} seconds</span>
            </div>
            <p className="text-xs text-[#6B533F] leading-relaxed">
              Single-origin shots are pulling, milk is steaming to 65°C, and pastries are being lightly crisped.
            </p>
          </div>
        )}
      </div>

      {/* Order Itemized Snapshot */}
      <div className="text-xs space-y-2 pt-2 border-t border-[#EBE3D0]">
        <div className="flex justify-between text-[#8C7460]">
          <span>Customer</span>
          <span className="font-medium text-[#382210]">{order.customerName} ({order.customerPhone})</span>
        </div>
        <div className="flex justify-between text-[#8C7460]">
          <span>Service Mode</span>
          <span className="font-medium text-[#382210]">
            {order.orderType === 'pickup' ? 'Express Counter Pickup' : `Table #${order.tableNumber}`}
          </span>
        </div>
        <div className="flex justify-between text-[#8C7460]">
          <span>Items</span>
          <span className="font-medium text-[#382210]">{order.itemsSummary.join(', ')}</span>
        </div>
        <div className="flex justify-between text-[#382210] font-bold pt-1 border-t border-[#EBE3D0]/60">
          <span>Amount Paid</span>
          <span className="font-mono">₹{order.totalPaid}</span>
        </div>
      </div>

      {/* Fast-forward simulation control (allows user to immediately test "Ready for Pickup" or reset) */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
        {order.status === 'preparing' ? (
          <button
            type="button"
            onClick={() => onUpdateStatus('ready')}
            className="text-xs text-[#5F7A61] hover:text-[#3D5440] font-medium underline flex items-center gap-1"
          >
            <span>Fast-Forward: Mark as Ready Now</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onUpdateStatus('completed')}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#5F7A61] hover:bg-[#4E6B52] rounded-md transition-colors"
          >
            Mark as Picked Up / Complete
          </button>
        )}

        <button
          type="button"
          onClick={onDismiss}
          className="text-xs text-[#8C7460] hover:text-[#382210] ml-auto"
        >
          Close View
        </button>
      </div>
    </div>
  );
}
