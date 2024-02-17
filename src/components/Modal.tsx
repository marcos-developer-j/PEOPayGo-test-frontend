import Image from "next/image";
import React from "react";
import { ModalProps } from "../entities/Modal";

export function Modal({
  setModal,
  title,
  img,
  imgHeight,
  imgWidth,
  onClose,
  subTitle,
}: ModalProps) {
  return (
    <div className="h-screen w-full fixed top-0 left-0 bg-customBlue bg-opacity-70 flex items-center justify-center z-[99999999]">
      <div className="w-fit h-fit bg-customWhite rounded-3xl flex flex-col p-5 items-center justify-center relative gap-4">
        <button
          onClick={() => {
            onClose && onClose();
            setModal(false);
          }}
          className="rounded-full text-2xl px-2 border border-customBlue w-fit  absolute top-5 right-5"
        >
          X
        </button>
        {img && imgHeight && imgWidth && (
          <Image src={img} width={imgWidth} height={imgHeight} alt={""} />
        )}
        <h1 className="text-3xl mt-10 font-semibold text-customBlue">
          {title}
        </h1>
        {subTitle !== undefined && subTitle.length > 0 && (
          <p className="text-xl mt-10 font-semibold text-customBlue">
            {subTitle}
          </p>
        )}
      </div>
    </div>
  );
}
