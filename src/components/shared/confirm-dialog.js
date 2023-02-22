import React from "react";

export const ConfirmDialog = ({ isOpen, title, content, onClose }) => {
  return (
    <>
      {isOpen ? (
        <main className="flex bg-gray-200 text-gray-900 font-sans overflow-x-hidden">
          <div className="">
            <div className="bg-black opacity-25 w-full h-full absolute z-10 inset-0"></div>
            <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0  z-50 mb-4 mx-4 md:relative">
                <div className="mt-4 md:mt-0 md:ml-6 md:text-left">
                  <p className="font-bold">{title}</p>
                  <p className="text-sm text-gray-700 mt-1">{content}</p>
                </div>
              
              <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                <button
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                  onClick={() => onClose(true)}
                >
                  Ok
                </button>
                <button
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
                  onClick={async () => onClose(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </main>
      ) : null}
    </>
  );
};
