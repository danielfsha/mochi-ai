import Image from "next/image";
import WaitlistModal from "../blocks/waitlist-modal";

export default function Header() {
  return (
    <header className="p-2 px-4 w-full max-w-screen-lg mx-auto flex items-center justify-between">
      <Image src="/logo-dark.svg" alt="Moshi Logo" width={100} height={40} />
    </header>
  );
}
