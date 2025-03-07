import { useEffect } from "react";
import ScaleLoader from "@/components/loader/ScaleLoader";
import { validate } from "@/components/services/auth";

const index = () => {
  useEffect(() => {
    validate();
  }, []);

  return (
    <div className="flex min-h-screen justify-center items-center bg-black">
      <ScaleLoader className="text-purple1" />
    </div>
  );
};

export default index;
