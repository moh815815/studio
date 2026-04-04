import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddServiceForm from '@/components/add-service-form';

export default function AddServicePage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background">
      <div className="w-full max-w-2xl p-4 md:p-8">
        <header className="relative mb-8 text-center">
          <Button asChild variant="outline" size="icon" className="absolute top-0 start-0">
            <Link href="/">
              <ArrowRight className="h-4 w-4" />
              <span className="sr-only">العودة للرئيسية</span>
            </Link>
          </Button>
          <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">
            أضف خدمتك أو محلك
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            املأ النموذج التالي لإضافة خدمتك إلى دليل فيصل الذكي.
          </p>
        </header>

        <section>
          <AddServiceForm />
        </section>
      </div>
    </main>
  );
}
