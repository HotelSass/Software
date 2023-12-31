import React from "react";
import { BiX } from "react-icons/bi";
type ModalProps = {
  open: boolean;
  width: number;
  height: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};
function Modal({
  children,
  open,
  width,
  height,
  setOpen
}: { children: React.ReactNode } & ModalProps) {

  return (
    <>
      {open == false ? null :
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 ">
          <div className="bg-white rounded p-4" style={{ width: width, height: 'auto' }}>
            <div className="w-full flex flex-row">
              <div className="flex-1"></div>
              <button className=" flex justify-end p-5 " onClick={() => { setOpen(false) }}>
                <BiX size={24} />
              </button>
            </div>
            {children}
          </div>
        </div>
      }
    </>
  );
};

export default Modal;
