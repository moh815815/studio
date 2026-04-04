'use server';

import { AIServiceSearch, type AIServiceSearchInput, type AIServiceSearchOutput } from '@/ai/flows/ai-service-search';

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
