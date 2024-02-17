import React from 'react';
interface props{
    setModal:(e:boolean) => void;
}
export default function ModalLanding({setModal}:props) {
  return (
    <div className='h-full w-full fixed top-0 left-0 bg-customBlue bg-opacity-70 md:px-0 px-5 flex items-center justify-center z-[99999999]'>
      <div className='w-full md:w-1/3 h-1/3 bg-customWhite rounded-3xl  flex flex-col p-5 items-center justify-center relative gap-4'>
        <button onClick={() => setModal(false)} className='rounded-full text-2xl px-2 border border-customBlue w-fit  absolute top-5 right-5'>
            X
        </button>
        <h1 className='text-2xl mt-10 font-semibold text-customBlue'>El usuario o contraseña son incorrectos</h1>
      </div>
    </div>
  );
}
