import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-white text-black font-sans h-screen w-screen overflow-hidden">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
