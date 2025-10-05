import { Rocket } from 'lucide-react';

const Header = () => {
  return (
    <header className="container mx-auto flex items-center justify-center py-6 px-4 md:justify-start">
      <div className="flex items-center gap-3">
        <Rocket className="size-8 text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]" />
        <h1 className="text-3xl font-bold tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">
          AstroWeather
        </h1>
      </div>
    </header>
  );
};

export default Header;
