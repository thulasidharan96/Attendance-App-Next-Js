import { useEffect, useState } from "react";
import Image from "next/image";

const CustomLoader = ({ onFinish }: { onFinish: () => void }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => (prev >= 100 ? 100 : prev + 4));
    }, 80);

    setTimeout(() => setFadeOut(true), 2000);
    setTimeout(() => onFinish(), 2500);

    return () => clearInterval(progressInterval);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center bg-cover bg-center transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/70 to-gray-900/90 z-0"></div>

      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-4">
        <div className="relative mb-8">
          {/* Glow effect behind logo */}
          <div className="absolute -inset-4 rounded-full bg-purple-500/30 animate-pulse"></div>

          {/* Logo container with proper aspect ratio */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden">
            <div className="absolute inset-0 animate-[spin_15s_linear_infinite]">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/40 to-transparent animate-pulse"></div>
            </div>

            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src="/image.png"
                alt="Logo"
                width={120}
                height={120}
                className="object-contain max-w-full max-h-full"
                priority
              />
            </div>
          </div>
        </div>

        {/* Progress bar with enhanced styling */}
        <div className="w-full sm:w-64 h-3 bg-gray-300/20 rounded-full mb-6 overflow-hidden shadow-[0_0_10px_rgba(168,85,247,0.5)]">
          <div
            className="h-full bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CustomLoader;
