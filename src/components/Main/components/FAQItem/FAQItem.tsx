import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { CiLocationArrow1 } from "react-icons/ci";

import "./FAQItem.css"; // Import your CSS file for styles

type FAQItemProps = {
  id: number;
  question: string;
  mainContent: string;
  additionalContent: string;
};

const FAQItem: React.FC<FAQItemProps> = ({
  id,
  question,
  mainContent,
  additionalContent,
}) => {
  const [isVisibleBody, setIsVisibleBody] = useState(false);

  return (
    <>
      <h3 id={`accordion-flush-body-${id}`}>
        <button
          type="button"
          className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-900 bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          onClick={() => setIsVisibleBody(!isVisibleBody)}
        >
          <span>{question}</span>
          <svg
            className={`w-6 h-6 shrink-0 {
              isVisibleBody ? "rotate" : ""
            }`}
          >
            {isVisibleBody ? <CiLocationArrow1 /> : <IoIosArrowDown />}
          </svg>
        </button>
      </h3>
      <div className={`accordion-body ${isVisibleBody ? "visible" : ""}`}>
        <div className="py-5 border-b border-gray-200 dark:border-gray-700">
          <p className="mb-2 text-gray-500 dark:text-gray-400">{mainContent}</p>
          <p className="text-gray-500 dark:text-gray-400">
            {additionalContent}
          </p>
        </div>
      </div>
    </>
  );
};

export default FAQItem;
