import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import PageTransition from "./components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <main className="flex min-h-screen flex-col">
        <Header />
        <HeroSection />
      </main>
    </PageTransition>
  );
}
