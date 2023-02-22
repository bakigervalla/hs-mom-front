import React from "react";

export default function Modal({ title, content, onModalClose }) {
  return (
    <>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none h-full">
        <div className="relative w-auto my-6 mx-auto max-w-3xl w-4/12">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between px-3 pt-2 border-b border-solid border-slate-200 rounded-t">
              <h2 className="text-2xl font-semibold">{title}</h2>
              <span
                className="bg-transparent text-black text-xs block outline-none  cursor-pointer border rounded-full px-1 hover:ring-2"
                onClick={() => onModalClose(0)}
              >
                X
              </span>
            </div>
            {/*body*/}
            <div className="relative px-2 flex-auto">
              <div className="my-4 text-slate-500 text-lg leading-relaxed">
                {content}
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="bg-indigo-500 text-white hover:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => onModalClose(1)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
