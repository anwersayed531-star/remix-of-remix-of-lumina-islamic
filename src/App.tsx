import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./hooks/useLanguage";
import AppLayout from "./components/AppLayout";
import Index from "./pages/Index";
import QuranPage from "./pages/QuranPage";
import HadithPage from "./pages/HadithPage";
import RulingsPage from "./pages/RulingsPage";
import SoundPage from "./pages/SoundPage";
import CountersPage from "./pages/CountersPage";
import DhikrPage from "./pages/DhikrPage";
import DhikrSelectionPage from "./pages/DhikrSelectionPage";
import TasbeehPage from "./pages/TasbeehPage";
import PreparationsPage from "./pages/PreparationsPage";
import HijriCalendarPage from "./pages/HijriCalendarPage";
import IslamicEventPage from "./pages/IslamicEventPage";
import PrayerDetailPage from "./pages/PrayerDetailPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout><Index /></AppLayout>} />
            <Route path="/quran" element={<AppLayout><QuranPage /></AppLayout>} />
            <Route path="/hadith" element={<AppLayout><HadithPage /></AppLayout>} />
            <Route path="/rulings" element={<AppLayout><RulingsPage /></AppLayout>} />
            <Route path="/sound" element={<AppLayout><SoundPage /></AppLayout>} />
            <Route path="/counters" element={<AppLayout><CountersPage /></AppLayout>} />
            <Route path="/dhikr-selection" element={<AppLayout><DhikrSelectionPage /></AppLayout>} />
            <Route path="/dhikr/:dhikrId" element={<AppLayout><DhikrPage /></AppLayout>} />
            <Route path="/tasbeeh" element={<AppLayout><TasbeehPage /></AppLayout>} />
            <Route path="/preparations" element={<AppLayout><PreparationsPage /></AppLayout>} />
            <Route path="/hijri-calendar" element={<AppLayout><HijriCalendarPage /></AppLayout>} />
            <Route path="/islamic-event/:eventId" element={<AppLayout><IslamicEventPage /></AppLayout>} />
            <Route path="/prayer/:prayerId" element={<AppLayout><PrayerDetailPage /></AppLayout>} />
            <Route path="/settings" element={<AppLayout><SettingsPage /></AppLayout>} />
            <Route path="*" element={<AppLayout><NotFound /></AppLayout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
