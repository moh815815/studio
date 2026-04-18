import Link from 'next/link';
import { ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AddServicePage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
      <div className="w-full max-w-2xl p-4 text-center md:p-8">
        <Info className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 font-headline text-3xl font-bold text-primary md:text-4xl">
            ميزة إضافة الخدمات غير متاحة
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
            هذه الميزة غير مفعلة في النسخة الحالية للموقع.
        </p>
        <Button asChild className="mt-8">
            <Link href="/">
                <ArrowRight className="h-4 w-4" />
                العودة للرئيسية
            </Link>
        </Button>
      </div>
    </main>
  );
}
