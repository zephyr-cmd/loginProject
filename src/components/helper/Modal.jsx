import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;
  return (
    <div className={`modal ${isOpen ? "open" : "closed"}`}>
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="bg-black/80 backdrop-blur-sm w-[80%] md:w-[50%] p-5 rounded-lg overflow-hidden">
          <span
            className="close text-3xl flex w-full justify-end"
            onClick={onClose}
          >
            <span className="text-red-800 rounded-full px-2 cursor-pointer hover:bg-white/10">
              &times;
            </span>
          </span>
          {children}
        </div>
      </div>
    </div>
  );
}

export function Modal1({ isOpen, onClose, children }) {
  // Method to handle the print action
  let [showPrintButton, setShowPrintButton] = useState(true);
  const handlePrint = async () => {
    await setShowPrintButton(false);
    await print();
    await setShowPrintButton(true);
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;
  return (
    <div className={`modal ${isOpen ? "open" : "closed"}`}>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white md:w-[100%] h-full w-full">
          <div className="flex justify-evenly items-center">
            {showPrintButton && (
              <Button variant="projectbtn" onClick={handlePrint}>
                Print
              </Button>
            )}
            {showPrintButton && (
              <Button
                variant="destructive"
                className="close text-3xl"
                onClick={onClose}
              >
                &times;
              </Button>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
