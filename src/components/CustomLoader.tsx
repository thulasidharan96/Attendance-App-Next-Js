import { useEffect, useState } from "react";
import Image from "next/image";

const CustomLoader = ({ onFinish }: { onFinish: () => void }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const progressInterval = setInterval(() => {}, 100); // Slower progress update

    setTimeout(() => setFadeOut(true), 3000); // Start fade-out after 3 seconds
    setTimeout(() => onFinish(), 3500); // Ensure a smooth transition

    return () => clearInterval(progressInterval);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40">
        {/* Smooth & Slower Spinning Loader */}
        <div className="absolute w-full h-full rounded-full border-8 border-purple1 border-t-transparent animate-spin-slow"></div>

        {/* Center Logo - Ensuring Visibility */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white flex items-center justify-center shadow-lg">
          <Image
            src="/image.png"
            alt="Logo"
            width={100}
            height={100}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default CustomLoader;
