'use client';

import { useFormStatus } from 'react-dom';
import { searchServicesAction } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, LoaderCircle, Frown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { useActionState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  message: null,
  results: [],
  error: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="absolute start-1 top-1 h-8 px-3">
      {pending ? <LoaderCircle className="animate-spin" /> : <Search />}
      <span className="sr-only">بحث</span>
    </Button>
  );
}

export default function AiSearch() {
  const [state, formAction] = useActionState(searchServicesAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error && state.message) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: state.message,
      })
    }
  }, [state, toast]);


  return (
    <Card className="bg-card/80 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">مساعد الخدمات الذكي</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="relative">
            <Input
              name="query"
              type="text"
              placeholder="مثال: أين أجد صيدلية في منطقة الطوابق؟"
              className="h-10 pe-4 ps-14 text-base"
              aria-label="بحث عن خدمة"
              required
            />
            <SubmitButton />
          </div>
        </form>
        
        <div className="mt-6">
          {state.message && !state.results.length && !state.error && (
             <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 p-8 text-center text-muted-foreground">
                <Frown className="mb-2 h-10 w-10"/>
                <p>{state.message}</p>
             </div>
          )}
          {state.results && state.results.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-headline text-lg font-medium">نتائج البحث:</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {state.results.map((service, index) => (
                  <div key={index} className="rounded-lg border bg-background/50 p-4 transition-colors hover:bg-secondary">
                    <h4 className="font-bold text-primary">{service.name}</h4>
                    <p className="text-sm text-muted-foreground">{service.location}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="secondary">{service.category}</Badge>
                      <Badge variant="outline">{service.region}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
