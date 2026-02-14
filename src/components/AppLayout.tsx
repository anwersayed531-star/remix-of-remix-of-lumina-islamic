import { ReactNode, useEffect, useState } from 'react';
import BottomNavigation from './BottomNavigation';
import TopBar from './TopBar';
import { NavPosition } from '@/hooks/useTheme';

interface AppLayoutProps {
  children: ReactNode;
  screenName?: string;
}

const AppLayout = ({ children, screenName }: AppLayoutProps) => {
  const [navPosition, setNavPosition] = useState<NavPosition>('bottom');
  const [backgroundStyle, setBackgroundStyle] = useState<string>('pattern');

  useEffect(() => {
    const updateSettings = () => {
      const saved = localStorage.getItem('themeSettings');
      if (saved) {
        const settings = JSON.parse(saved);
        setNavPosition(settings.navPosition || 'bottom');
        setBackgroundStyle(settings.backgroundStyle || 'pattern');
      }
    };
    
    updateSettings();
    window.addEventListener('storage', updateSettings);
    
    // Listen for custom theme changes
    const observer = new MutationObserver(() => {
      updateSettings();
    });
    observer.observe(document.documentElement, { attributes: true });
    
    return () => {
      window.removeEventListener('storage', updateSettings);
      observer.disconnect();
    };
  }, []);

  const getBackgroundClass = () => {
    switch (backgroundStyle) {
      case 'solid': return 'bg-background';
      case 'gradient-subtle': return 'bg-gradient-to-br from-background to-muted';
      case 'pattern-geometric': return 'bg-background pattern-geometric';
      case 'pattern-stars': return 'bg-background pattern-stars';
      case 'pattern-arabesque': return 'bg-background pattern-arabesque';
      case 'pattern-hexagon': return 'bg-background pattern-hexagon';
      case 'pattern-diamonds': return 'bg-background pattern-diamonds';
      case 'pattern-mosaic': return 'bg-background pattern-mosaic';
      case 'pattern-circles': return 'bg-background pattern-circles';
      case 'gradient-sunset': return 'gradient-sunset';
      case 'gradient-ocean': return 'gradient-ocean';
      case 'gradient-forest': return 'gradient-forest';
      case 'gradient-royal': return 'gradient-royal';
      case 'gradient-gold': return 'gradient-gold';
      case 'gradient-rose': return 'gradient-rose';
      case 'pattern':
      default: return 'bg-background islamic-pattern';
    }
  };

  const getMainPadding = () => {
    switch (navPosition) {
      case 'right': return 'pr-20';
      case 'left': return 'pl-20';
      default: return 'pb-24';
    }
  };

  return (
    <div className={`min-h-screen ${getBackgroundClass()}`}>
      <TopBar screenName={screenName} />
      <main className={`${getMainPadding()} min-h-screen`}>
        {children}
      </main>
      <BottomNavigation position={navPosition} />
    </div>
  );
};

export default AppLayout;
