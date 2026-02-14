import { NavLink } from 'react-router-dom';
import { Home, BookOpen, MessageSquareText, Scale, Volume2, Settings } from 'lucide-react';
import { NavPosition } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';

interface BottomNavigationProps {
  position?: NavPosition;
}

const BottomNavigation = ({ position = 'bottom' }: BottomNavigationProps) => {
  const { t } = useLanguage();
  const isVertical = position === 'right' || position === 'left';
  
  const navItems = [
    { to: '/', icon: Home, label: t.nav.home },
    { to: '/quran', icon: BookOpen, label: t.nav.quran },
    { to: '/hadith', icon: MessageSquareText, label: t.nav.hadith },
    { to: '/rulings', icon: Scale, label: t.nav.rulings },
    { to: '/sound', icon: Volume2, label: t.nav.sound },
    { to: '/counters', icon: Settings, label: t.nav.counters },
  ];

  const getPositionClasses = () => {
    switch (position) {
      case 'right':
        return 'fixed top-0 right-0 bottom-0 w-16 flex-col pt-16';
      case 'left':
        return 'fixed top-0 left-0 bottom-0 w-16 flex-col pt-16';
      default:
        return 'fixed bottom-0 left-0 right-0';
    }
  };

  return (
    <nav className={`bg-background/95 backdrop-blur-md border-border shadow-2xl z-50 ${getPositionClasses()} ${isVertical ? 'border-l' : 'border-t'}`}>
      <div className={`flex items-center justify-around ${isVertical ? 'flex-col py-4 h-full' : 'py-2 px-4 max-w-lg mx-auto'}`}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex ${isVertical ? 'flex-col' : 'flex-col'} items-center gap-1 p-2 rounded-xl transition-all duration-300 ${isVertical ? 'min-h-[60px]' : 'min-w-[60px]'} ${
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon 
                  className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} 
                />
                <span className={`text-xs font-cairo font-medium ${isVertical ? 'hidden' : ''}`}>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
      {/* Safe area for mobile devices */}
      {!isVertical && <div className="h-safe-area-inset-bottom bg-background" />}
    </nav>
  );
};

export default BottomNavigation;
