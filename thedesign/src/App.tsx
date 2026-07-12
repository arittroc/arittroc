import { useCallback, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectsGrid from './components/ProjectsGrid';
import ExperienceTimeline from './components/ExperienceTimeline';
import BlogFeed from './components/BlogFeed';
import DemoModal from './components/DemoModal';
import Footer from './components/Footer';

export default function App() {
  const [demoOpen, setDemoOpen] = useState(false);
  const openDemo = useCallback(() => setDemoOpen(true), []);
  const closeDemo = useCallback(() => setDemoOpen(false), []);

  return (
    <>
      {/* ambient layers */}
      <div className="mesh-bg" aria-hidden />
      <div className="noise-overlay" aria-hidden />

      <Navbar onBookDemo={openDemo} />

      <main>
        <Hero onBookDemo={openDemo} />
        <ProjectsGrid />
        <ExperienceTimeline />
        <BlogFeed />
      </main>

      <Footer />

      <DemoModal open={demoOpen} onClose={closeDemo} />
    </>
  );
}
