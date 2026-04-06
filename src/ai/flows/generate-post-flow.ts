'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating social media posts for services.
 *
 * - generatePost - A function that calls the Genkit flow to generate a post.
 * - GeneratePostInput - The input type for the generation flow.
 * - GeneratePostOutput - The output type for the generation flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GeneratePostInputSchema = z.object({
  serviceName: z.string().describe('The name of the service or shop.'),
  categoryName: z.string().describe('The category of the service (e.g., صيانة تكييفات, مطاعم).'),
  regionName: z.string().describe('The region where the service is located (e.g., الطوابق, العشرين).'),
  address: z.string().describe('The detailed address of the service.'),
  phone: z.string().describe('The contact phone number for the service.'),
  pageUrl: z.string().describe("The URL of the service's page on the directory."),
  offerTitle: z.string().optional().describe('The title of any special offer, if available.'),
  offerDiscount: z.number().optional().describe('The discount percentage of the offer, if available.'),
});
export type GeneratePostInput = z.infer<typeof GeneratePostInputSchema>;

const GeneratePostOutputSchema = z.object({
  postText: z.string().describe('The generated social media post text.'),
});
export type GeneratePostOutput = z.infer<typeof GeneratePostOutputSchema>;


export async function generatePost(input: GeneratePostInput): Promise<GeneratePostOutput> {
  return generatePostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePostPrompt',
  input: { schema: GeneratePostInputSchema },
  output: { schema: GeneratePostOutputSchema },
  prompt: `أنت خبير تسويق رقمي ومسؤول عن كتابة منشورات جذابة لصفحة "دليل فيصل الذكي" على فيسبوك.
مهمتك هي إنشاء منشور احترافي باللغة العربية (اللهجة المصرية) للإعلان عن خدمة أو محل تجاري.

استخدم الأسلوب المناسب بناءً على نوع الخدمة والعرض المتاح. كن مبدعاً!

البيانات المتاحة:
- اسم المحل: {{{serviceName}}}
- التصنيف: {{{categoryName}}}
- المنطقة: {{{regionName}}}
- العنوان: {{{address}}}
- الهاتف: {{{phone}}}
- رابط الصفحة: {{{pageUrl}}}

{{#if offerTitle}}
- يوجد عرض خاص:
- عنوان العرض: {{{offerTitle}}}
- نسبة الخصم: {{{offerDiscount}}}%
{{/if}}

إليك بعض الأفكار للأساليب التي يمكنك استخدامها:
- **للمطاعم:** استخدم كلمات تثير الشهية مثل "طعم حكاية", "أكل يفتح النفس".
- **للخدمات (سباكة، كهرباء..):** ركز على الثقة والسرعة مثل "صنايعي شاطر ومضمون", "خدمة سريعة في مكانك".
- **للملابس:** تحدث عن الأناقة والموضة مثل "خليك على الموضة", "أشيك لبس في فيصل".
- **للعروض الخاصة:** ابدأ بالعرض والخصم لجذب الانتباه فوراً. استخدم الرموز التعبيرية (emojis) مثل 🎉🔥💰.

التعليمات:
1.  اكتب منشوراً قصيراً وجذاباً.
2.  قم بتضمين أهم التفاصيل (الاسم، الخدمة، المنطقة).
3.  أضف دعوة للعمل (Call to Action) واضحة، مثل "تواصلوا معنا الآن" أو "زورونا اليوم".
4.  أضف رابط الصفحة {{{pageUrl}}} في نهاية المنشور.
5.  استخدم وسوم (hashtags) مناسبة مثل #دليل_فيصل, #{{{regionName}}}, #{{{categoryName}}}.

المطلوب:
- حقل postText: النص النهائي للمنشور.
`,
});

const generatePostFlow = ai.defineFlow(
  {
    name: 'generatePostFlow',
    inputSchema: GeneratePostInputSchema,
    outputSchema: GeneratePostOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
