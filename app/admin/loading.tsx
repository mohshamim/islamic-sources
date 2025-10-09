import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
        <p className="text-neutral-600 dark:text-neutral-400">Loading...</p>
      </div>
    </div>
  );
}
