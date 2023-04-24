import { Accordion } from "flowbite-react";
import React from "react";

const CheckOutStep = ({title, body, id, heading_id}) => {
  return (
    <>
      <h2 id={heading_id} className="mt-4">
        <button
          type="button"
          class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-blue-200 bg-white hover:bg-gray-100 "
          data-accordion-target={"#"+id}
          aria-expanded="true"
          aria-controls={id}
        >
          <span>{title}</span>
          <svg
            data-accordion-icon
            class="w-6 h-6 rotate-180 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </h2>
      <div
        id={id}
        class="hidden"
        className="transition delay-150 duration-600 ease-in-out mb-4"
        aria-labelledby={heading_id}
      >
        <div class="p-5 border border-b-0 border-gray-200">
          {body}
        </div>
      </div>
      
    </>
  );
};

export default CheckOutStep;
