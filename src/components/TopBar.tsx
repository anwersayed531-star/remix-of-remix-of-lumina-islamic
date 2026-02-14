import logo from '@/assets/logo.png';
import { useLanguage } from '@/hooks/useLanguage';

interface TopBarProps {
  screenName?: string;
}

const TopBar = ({ screenName }: TopBarProps) => {
  const { t } = useLanguage();

  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo and App Name */}
        <div className="flex items-center gap-2">
          <img src={logo} alt={t.app.name} className="w-10 h-10 object-contain" />
          <span className="font-amiri font-bold text-lg text-foreground">{t.app.name}</span>
        </div>
        
        {/* Screen Name */}
        {screenName && (
          <span className="font-cairo text-sm text-muted-foreground">
            {screenName}
          </span>
        )}
      </div>
    </div>
  );
};

export default TopBar;
