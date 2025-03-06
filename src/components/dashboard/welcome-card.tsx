import StudentAvatar from "@/assets/Student_Avatar.svg";
import Image from "next/image";

interface WelcomeCardProps {
  name: string;
  message: string;
}

export function WelcomeCard({ name, message }: WelcomeCardProps) {
  return (
    <div className="flex bg-purple1 justify-between rounded-lg min-h-[120px] p-4 items-center relative overflow-hidden">
      <div className="text-white ">
        <h2 className="text-xl md:text-2xl font-bold">Welcome back, {name}</h2>
        <p className="max-w-[280px] md:max-w-lg text-sm md:text-base">
          {message}
        </p>
      </div>
      <div className="absolute right-0 top-0 bottom-0 md:flex items-center">
        <Image
          src={StudentAvatar}
          alt="Student Avatar"
          className="h-full w-auto object-contain"
          width={150}
          height={150}
          priority
        />
      </div>
    </div>
  );
}
