import { useEffect, useState } from "react";

const CustomLoader = ({ onFinish }: { onFinish: () => void }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Animate loading progress from 0 to 100
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 4; // Increment by 4% each time
      });
    }, 80);

    // Start fade-out after 2s
    setTimeout(() => setFadeOut(true), 2000);

    // Remove after 2.5s
    setTimeout(() => onFinish(), 2500);

    return () => clearInterval(progressInterval);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center bg-cover bg-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple1-darkest/70 to-background/90 z-0"></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with enhanced animation */}
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-purple1/20 animate-pulse"></div>
          <img
            src="/image.svg"
            alt="Logo"
            className="w-36 h-36 mb-6 relative animate-bounce"
            style={{ animationDuration: "2s" }}
          />
        </div>

        {/* Loading text */}
        <h2 className="text-2xl font-iosevka text-white mb-4 tracking-wider">
          <span className="animate-pulse">Loading</span>
          <span className="inline-flex space-x-1 ml-1">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="animate-bounce"
                style={{ animationDelay: `${dot * 0.2}s` }}
              >
                .
              </span>
            ))}
          </span>
        </h2>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-gray-200/30 rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple1 to-base-blue rounded-full transition-all duration-300 ease-out"
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>

        {/* Loader Animation - enhanced */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-purple1 border-t-transparent rounded-full animate-spin"></div>
          <div
            className="absolute inset-1 border-4 border-base-blue border-b-transparent rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CustomLoader;
