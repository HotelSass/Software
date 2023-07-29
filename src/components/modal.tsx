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
  if (open == false) {
    return null;
  }
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 ">
        <div className="bg-white rounded-md p-4 " style={{ width: width, height: height == null ? 'auto' : height, overflowY: height == null ? 'auto' : 'scroll' }}>
          <div className="w-full">
            <button className="w-full flex justify-end p-3 " onClick={() => setOpen(false)}>
              <BiX size={24} />
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
