import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import ProjectsGrid from "@/components/ProjectsGrid";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import BlogFeed from "@/components/BlogFeed";
import DemoModal from "@/components/DemoModal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Ambient background layers */}
      <div className="ambient-bg" />

      {/* Structural layout layers */}
      <Navbar />
      <Hero />
      <TechMarquee />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">
        <section id="projects">
          <ProjectsGrid />
        </section>

        <section id="experience">
          <ExperienceTimeline />
        </section>

        <section id="blog">
          <BlogFeed />
        </section>
      </div>

      <Footer />

      {/* Global Application Overlays */}
      <DemoModal />
    </main>
  );
}
