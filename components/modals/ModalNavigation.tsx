import { ChevronLeft, ChevronRight } from "lucide-react";

interface ModalNavigationProps {
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function ModalNavigation({
  onNext,
  onPrevious,
  isFirst,
  isLast,
}: ModalNavigationProps) {
  return (
    <div className="absolute bottom-20 lg:flex justify-center gap-6 w-full z-20 hidden">
      <button
        onClick={onPrevious}
        className="p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isFirst}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={onNext}
        className="p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLast}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
