import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getRegionById, getCategoryById, getServicesForCategory } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2 } from 'lucide-react';
import ShopCard from '@/components/shop-card';
import PaginationControls from '@/components/pagination-controls';

type Props = {
  params: { region: string; category: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function CategoryPage({ params, searchParams }: Props) {
  const region = getRegionById(params.region);
  if (!region) notFound();

  const category = getCategoryById(region, params.category);
  if (!category) notFound();

  const page = typeof searchParams.page === 'string' && Number(searchParams.page) > 0 ? Number(searchParams.page) : 1;
  const { services, totalPages } = getServicesForCategory(params.region, params.category, page, 4);
  const Icon = category.icon;

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background">
      <div className="w-full max-w-4xl p-4 md:p-8">
        <header className="relative mb-8 text-center">
          <Button asChild variant="outline" size="icon" className="absolute top-0 start-0">
            <Link href={`/${region.id}`}>
              <ArrowRight className="h-4 w-4" />
              <span className="sr-only">العودة إلى الفئات</span>
            </Link>
          </Button>
          <div className="flex items-center justify-center gap-3">
            <Icon className="h-10 w-10 text-primary" />
            <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">
              {category.name}
            </h1>
          </div>
          <p className="mt-2 text-lg text-muted-foreground">
            في منطقة {region.name}
          </p>
        </header>

        <section id="services-list">
          {services.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {services.map((service) => (
                  <ShopCard key={service.id} service={service} />
                ))}
              </div>
              <PaginationControls currentPage={page} totalPages={totalPages} />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 p-12 text-center text-muted-foreground">
                <Building2 className="mb-4 h-12 w-12"/>
                <h2 className="text-xl font-semibold">قائمة الخدمات قريباً</h2>
                <p>يتم العمل حالياً على إضافة الخدمات لهذه الفئة.</p>
                {page > 1 && <p className='mt-4'>ربما تحاول الوصول لصفحة غير موجودة.</p>}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
    const { regions } = await import('@/lib/data');
    const params: {region: string, category: string}[] = [];
    
    regions.forEach(region => {
        region.categories.forEach(category => {
            params.push({ region: region.id, category: category.id });
        });
    });

    return params;
}
