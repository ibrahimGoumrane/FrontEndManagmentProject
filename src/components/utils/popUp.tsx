import { useEffect, useState, useMemo } from "react";
import { PopUpType } from "../../models/utils";

interface PopUpProps {
  type?: PopUpType;
  message: string;
  duration?: number;
  setSuccess: (value: React.SetStateAction<boolean>) => void;
}

function PopUp({
  type = PopUpType.Default,
  message,
  duration = 2000,
  setSuccess,
}: PopUpProps) {
  const [show, setShow] = useState(true);
  const color = useMemo(() => {
    switch (type) {
      case PopUpType.Success:
        return "bg-green-500/90";
      case PopUpType.Failed:
        return "bg-red-500/90";
      default:
        return "bg-purple-500/90";
    }
  }, [type]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setSuccess(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    show && (
      <div
        className={
          "px-5 py-3  rounded-md fixed bottom-0 right-0 z-50 -translate-x-2 -translate-y-3 text-white " +
          color
        }
      >
        <span className="font-bold pr-2">Info !</span>
        {message}
      </div>
    )
  );
}

export default PopUp;
