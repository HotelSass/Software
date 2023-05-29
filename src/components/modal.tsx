import React from "react";
import { BiX } from "react-icons/bi";
type ModalProps = {
  open: boolean;
  width:number;
  setOpen:React.Dispatch<React.SetStateAction<boolean>>
};
const Modal = ({
  children,
  open,
  width,
  setOpen
}: { children: React.ReactNode } & ModalProps) => {
  if (open == false) {
    return null;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-white rounded-md p-4" style={{width:width}}>
        <div className="w-full">
          <button className="w-full flex justify-end p-3" onClick={()=>setOpen(false)}>
            <BiX size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
