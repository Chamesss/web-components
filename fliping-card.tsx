import { useState } from "react";

export default function FlippingCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div
        className="w-64 h-40 [perspective:1000px] cursor-pointer"
        onClick={handleClick}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          <div className="absolute w-full h-full flex items-center justify-center rounded-lg shadow-md bg-gradient-to-br from-purple-500 to-pink-500 [backface-visibility:hidden]">
            <p className="text-white text-xl font-bold">Front Side</p>
          </div>
          <div className="absolute w-full h-full flex items-center justify-center rounded-lg shadow-md bg-gradient-to-br from-blue-500 to-teal-500 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <p className="text-white text-xl font-bold">Back Side</p>
          </div>
        </div>
      </div>
    </div>
  );
}
