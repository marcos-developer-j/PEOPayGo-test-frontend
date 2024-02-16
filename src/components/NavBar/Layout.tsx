import Index from './Index';

export default function Layout({ children }) {
  return (
    <>
      <Index />
      <main className='pl-0 xl:pl-[250px] md:pl-[200px] w-full'>{children}</main>
    </>
  );
}