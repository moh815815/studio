'use server';

import { AIServiceSearch, type AIServiceSearchInput, type AIServiceSearchOutput } from '@/ai/flows/ai-service-search';
import { z } from 'zod';

// --- SEARCH ---
type SearchState = {
    message: string | null;
    results: AIServiceSearchOutput;
    error: boolean;
}

export async function searchServicesAction(
  prevState: SearchState,
  formData: FormData
): Promise<SearchState> {
  const query = formData.get('query') as string;

  if (!query || query.trim().length < 3) {
    return { message: 'الرجاء إدخال استفسار للبحث (3 أحرف على الأقل).', results: [], error: true };
  }

  try {
    const input: AIServiceSearchInput = { query };
    const results = await AIServiceSearch(input);
    if (results.length === 0) {
        return { message: 'لم يتم العثور على نتائج. حاول البحث بكلمات أخرى.', results: [], error: false };
    }
    return { message: null, results, error: false };
  } catch (error) {
    console.error('AI Service Search Error:', error);
    return { message: 'حدث خطأ أثناء الاتصال بمساعد الذكاء الاصطناعي. الرجاء المحاولة مرة أخرى.', results: [], error: true };
  }
}

// --- ADD SERVICE ---
export type AddServiceState = {
    message: string | null;
    success: boolean;
    error: string | null;
};

const addServiceSchema = z.object({
  name: z.string().min(3, { message: 'اسم المحل يجب أن يكون 3 أحرف على الأقل.' }),
  regionId: z.string({ required_error: 'الرجاء اختيار المنطقة.' }).nonempty({ message: 'الرجاء اختيار المنطقة.' }),
  categoryId: z.string({ required_error: 'الرجاء اختيار التصنيف.' }).nonempty({ message: 'الرجاء اختيار التصنيف.' }),
  address: z.string().min(10, { message: 'العنوان يجب أن يكون 10 أحرف على الأقل.' }),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, { message: 'الرجاء إدخال رقم هاتف مصري صحيح.' }),
  mapUrl: z.string().url({ message: 'الرجاء إدخال رابط خرائط جوجل صحيح.' }).optional().or(z.literal('')),
  productImage: z.string().url({message: 'الرجاء رفع صورة صحيحة.'}).optional().or(z.literal('')),
});

export async function addServiceAction(data: z.infer<typeof addServiceSchema>): Promise<AddServiceState> {
    // The data is already validated by react-hook-form with a zod resolver.
    try {
        // Here you would typically save to a database (e.g., Supabase, Firebase)
        console.log("New Service Submitted:", data);

        // Since we are not saving to a DB, we can't revalidate a path that shows the new data.
        // If we were, we would revalidate the relevant paths:
        // revalidatePath('/');
        // revalidatePath(`/${data.regionId}`);
        // revalidatePath(`/${data.regionId}/${data.categoryId}`);

        return {
            message: "تم استلام طلبك بنجاح! ستتم مراجعته وإضافته قريباً.",
            success: true,
            error: null,
        }
    } catch (e) {
        console.error("Add Service Error:", e);
        return {
            message: null,
            success: false,
            error: "حدث خطأ غير متوقع أثناء إرسال طلبك. الرجاء المحاولة مرة أخرى.",
        }
    }
}
