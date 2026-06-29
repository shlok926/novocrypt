import { useToastStore } from '../store/toast.store';

export function ToastHost() {
  const items = useToastStore((state) => state.items);
  const dismiss = useToastStore((state) => state.dismiss);

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed bottom-6 right-6 z-[100] flex max-w-sm flex-col gap-2 sm:max-w-md"
      role="region"
      aria-label="Notifications"
    >
      {items.map((item) => (
        <div
          key={item.id}
          className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-lg ${
            item.variant === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
              : item.variant === 'error'
                ? 'border-red-200 bg-red-50 text-red-900'
                : 'border-slate-800 bg-white text-slate-200'
          }`}
        >
          <p className="flex-1 leading-snug">{item.message}</p>
          <button
            type="button"
            onClick={() => dismiss(item.id)}
            className="-mr-1 -mt-1 rounded p-1 text-slate-500 hover:bg-black/5 hover:text-white"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
