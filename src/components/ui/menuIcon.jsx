import { useState } from "react";

const MenuIcon = ({ sendDataToParent }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    sendDataToParent(isOpen);
  };

  return (
    <div
      className={`flex items-center hover:rounded-lg hover:bg-gray-200/90 p-2.5 gap-2 cursor-pointer ${
        isOpen ? "change" : ""
      }`}
      onClick={toggleMenu}
    >
      <div>
        <div
          className={`w-7 h-1 bg-gray-800 my-1 transition-transform duration-700 ${
            isOpen ? "transform translate-y-2.1 rotate-[-45deg]" : ""
          }`}
        ></div>
        <div
          className={`w-7 h-1 bg-gray-800 my-1 transition-opacity duration-1000 ${
            isOpen ? "opacity-0" : ""
          }`}
        ></div>
        <div
          className={`w-7 h-1 bg-gray-800 my-1 transition-transform duration-1000 ${
            isOpen ? "transform -translate-y-4 rotate-[45deg]" : ""
          }`}
        ></div>
      </div>
    </div>
  );
};

export default MenuIcon;
