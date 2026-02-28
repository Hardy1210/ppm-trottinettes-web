import Link from 'next/link';

export function Header() {
  return (
    <>
      {/* aqui para que el mix blend funcione bien debo de darle un fondo negro mexclado con el mixblen al padre */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black mix-blend-difference ">
        <nav
          aria-label="Main navigation"
          className="px-6 py-5 flex gap-6 text-white "
        >
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>
    </>
  );
}
