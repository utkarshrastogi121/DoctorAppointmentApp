import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

function FaqItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="p-3 lg:p-4 rounded-[10px] border border-[#D9DCE2] mb-3 cursor-pointer transition-all duration-300"
      onClick={() => setIsOpen(!isOpen)}
      role="button"
      aria-expanded={isOpen}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-[14px] lg:text-[16px] leading-6 text-headingColor font-medium">
          {item.question}
        </h4>

        <div
          className={`w-6 h-6 lg:w-7 lg:h-7 border border-[#141F21] rounded flex items-center justify-center transition-colors duration-300
            ${isOpen ? 'bg-primaryColor text-white border-none' : ''}`}
        >
          {isOpen ? <AiOutlineMinus size={14} /> : <AiOutlinePlus size={14} />}
        </div>
      </div>

      {/* Content */}
      {isOpen && (
        <div className="mt-2 text-[13px] lg:text-[14px] leading-5 text-textColor">
          <p>{item.content}</p>
        </div>
      )}
    </div>
  );
}

export default FaqItem;
