import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getRegionById } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

type Props = {
  params: { region: string };
};

export default function RegionPage({ params }: Props) {
  const region = getRegionById(params.region);

  if (!region) {
    notFound();
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background">
      <div className="w-full max-w-4xl p-4 md:p-8">
        <header className="relative mb-8 text-center">
            <Button asChild variant="outline" size="icon" className="absolute top-0 start-0">
                <Link href="/">
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">العودة</span>
                </Link>
            </Button>
            <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">
              {region.name}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              اختر فئة الخدمة التي تبحث عنها
            </p>
        </header>

        <section id="categories">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {region.categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link href={`/${region.id}/${category.id}`} key={category.id} className="group">
                  <Card className="h-full transform transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:border-accent">
                    <CardHeader className="items-center text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-primary transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                           <Icon className="h-8 w-8" />
                        </div>
                      <CardTitle className="font-headline text-xl">{category.name}</CardTitle>
                      <CardDescription className="pt-1">{category.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
    const { regions } = await import('@/lib/data');
    return regions.map((region) => ({
        region: region.id,
    }));
}
