'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addServiceAction } from '@/app/actions';
import { regions, type Category } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LoaderCircle, Send } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(3, { message: 'اسم المحل يجب أن يكون 3 أحرف على الأقل.' }),
  regionId: z.string({ required_error: 'الرجاء اختيار المنطقة.' }).nonempty({ message: 'الرجاء اختيار المنطقة.' }),
  categoryId: z.string({ required_error: 'الرجاء اختيار التصنيف.' }).nonempty({ message: 'الرجاء اختيار التصنيف.' }),
  address: z.string().min(10, { message: 'العنوان يجب أن يكون 10 أحرف على الأقل.' }),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, { message: 'الرجاء إدخال رقم هاتف مصري صحيح.' }),
  mapUrl: z.string().url({ message: 'الرجاء إدخال رابط خرائط جوجل صحيح.' }).optional().or(z.literal('')),
});

type FormSchema = z.infer<typeof formSchema>;

export default function AddServiceForm() {
  const [isPending, startTransition] = useTransition();
  const [categories, setCategories] = useState<Category[]>([]);
  const { toast } = useToast();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      regionId: '',
      categoryId: '',
      address: '',
      phone: '',
      mapUrl: '',
    },
  });

  const selectedRegion = form.watch('regionId');

  useEffect(() => {
    const region = regions.find(r => r.id === selectedRegion);
    setCategories(region ? region.categories : []);
    form.setValue('categoryId', '');
  }, [selectedRegion, form]);

  const onSubmit = (data: FormSchema) => {
    startTransition(async () => {
      const result = await addServiceAction(data);
      if (result.success) {
        toast({
          title: "تم بنجاح!",
          description: result.message,
        });
        form.reset();
        setCategories([]);
      } else if (result.error) {
        toast({
          variant: "destructive",
          title: "حدث خطأ",
          description: result.error,
        });
      }
    });
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                            <FormLabel>اسم المحل/الخدمة</FormLabel>
                            <FormControl>
                                <Input placeholder="مثال: صيدلية الشفاء" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="regionId"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>المنطقة</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="اختر منطقة من فيصل" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {regions.map(region => (
                                    <SelectItem key={region.id} value={region.id}>{region.name}</SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>التصنيف</FormLabel>
                             <Select onValueChange={field.onChange} value={field.value} disabled={!selectedRegion}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="اختر تصنيف الخدمة" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {categories.map(cat => (
                                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                            <FormLabel>العنوان بالتفصيل</FormLabel>
                            <FormControl>
                                <Textarea placeholder="اكتب العنوان هنا مع ذكر علامة مميزة..." {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>رقم الهاتف</FormLabel>
                            <FormControl>
                                <Input placeholder="01xxxxxxxxx" dir="ltr" className="text-right" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="mapUrl"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>رابط الموقع على جوجل ماب (اختياري)</FormLabel>
                            <FormControl>
                                <Input placeholder="https://maps.app.goo.gl/..." dir="ltr" className="text-right" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </CardContent>
            <CardFooter className="flex justify-end p-6 border-t">
                <Button type="submit" disabled={isPending} size="lg">
                    {isPending ? <LoaderCircle className="animate-spin" /> : <Send />}
                    إرسال الطلب
                </Button>
            </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
