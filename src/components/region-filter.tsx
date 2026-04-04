import Link from 'next/link';
import { regions } from '@/lib/data';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

export default function RegionFilter() {
  return (
    <section id="regions">
        <h2 className="font-headline mb-6 text-center text-3xl font-semibold">
            اختر منطقتك
        </h2>
        <ScrollArea className="w-full whitespace-nowrap rounded-lg border bg-card">
            <div className="flex w-max space-x-2 p-4">
                {regions.map((region) => (
                    <Button asChild key={region.id} variant="outline" size="lg" className="h-auto py-3 px-6 text-base shadow-sm hover:bg-accent hover:shadow-md transition-all">
                        <Link href={`/${region.id}`}>
                            {region.name}
                        </Link>
                    </Button>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    </section>
  );
}
