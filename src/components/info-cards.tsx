import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Leaf, Mountain, Siren } from 'lucide-react';

const glassmorphismStyle = "bg-card/30 backdrop-blur-sm border border-white/20 shadow-lg text-white";

const InfoCards = () => {
  const floraImage = PlaceHolderImages.find(img => img.id === 'eco-flora');
  const faunaImage = PlaceHolderImages.find(img => img.id === 'eco-fauna');

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className={glassmorphismStyle}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Leaf className="size-6 text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]" />
            <CardTitle className="text-white">Eco & Nature Awareness</CardTitle>
          </div>
          <CardDescription className="text-white/80">Discover local nature and tips to protect it.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            {floraImage && (
              <div className="w-1/2">
                <Image
                  src={floraImage.imageUrl}
                  alt={floraImage.description}
                  width={400}
                  height={300}
                  className="rounded-md object-cover"
                  data-ai-hint={floraImage.imageHint}
                />
                <p className="text-xs mt-1 text-white/70">Local Flora</p>
              </div>
            )}
            {faunaImage && (
              <div className="w-1/2">
                <Image
                  src={faunaImage.imageUrl}
                  alt={faunaImage.description}
                  width={400}
                  height={300}
                  className="rounded-md object-cover"
                  data-ai-hint={faunaImage.imageHint}
                />
                 <p className="text-xs mt-1 text-white/70">Local Fauna</p>
              </div>
            )}
          </div>
          <p className="text-sm text-white/90">Eco Tip: Remember to leave no trace. Pack out everything you pack in to keep trails beautiful.</p>
        </CardContent>
      </Card>

      <Card className={glassmorphismStyle}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Mountain className="size-6 text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]" />
            <CardTitle className="text-white">Adventure Scoreboard</CardTitle>
          </div>
          <CardDescription className="text-white/80">How well did you plan your adventure?</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
            <p className="text-7xl font-bold text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]">88</p>
            <p className="text-lg font-semibold text-white/90">Weather-Perfect!</p>
            <p className="text-sm text-white/80 mt-2">This is just a placeholder for the real adventure score.</p>
        </CardContent>
      </Card>

      <Alert variant="destructive" className="md:col-span-2 lg:col-span-1 border-2 border-red-500/50 bg-red-900/30 backdrop-blur-sm text-white">
        <Siren className="size-5 text-red-400" />
        <AlertTitle className="text-red-300">Extreme Weather Alert!</AlertTitle>
        <AlertDescription className="text-red-300/90">
          A severe thunderstorm warning is in effect for your selected area. High winds and heavy rain expected. Please exercise caution.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default InfoCards;
