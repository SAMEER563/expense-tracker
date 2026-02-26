export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-100">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-gold-light border-t-gold rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );
}
