import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { HomePage } from '@/pages/HomePage';
import { ProjectDetail } from '@/components/ProjectDetail';
import { SmoothScroll } from '@/components/SmoothScroll';
import { CursorFollower } from '@/components/CursorFollower';
import { ScrollProgress } from '@/components/ScrollProgress';
import { AnimatePresence } from 'framer-motion';
import { useThemeStore } from '@/stores/themeStore';
import { useEffect } from 'react';

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    // Initialize theme on app start
    const root = document.documentElement;
    const resolvedTheme = theme === 'system' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
  }, [theme]);

  return (
    <Router>
      <SmoothScroll>
        <CursorFollower />
        <ScrollProgress />
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
            </Routes>
          </AnimatePresence>
        </div>
      </SmoothScroll>
    </Router>
  );
}

export default App;
