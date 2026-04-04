'use server';
/**
 * @fileOverview This file implements a Genkit flow to assist users in searching for services
 * in the Faisal area based on natural language queries. It uses a tool to lookup services
 * and returns relevant recommendations.
 *
 * - AIServiceSearch - A function that handles natural language service search.
 * - AIServiceSearchInput - The input type for the AIServiceSearch function.
 * - AIServiceSearchOutput - The return type for the AIServiceSearch function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

/**
 * Defines the input schema for the AI service search flow.
 * The input is a natural language query from the user.
 */
const AIServiceSearchInputSchema = z.object({
  query: z.string().describe('The user\'s natural language query for services.'),
});
export type AIServiceSearchInput = z.infer<typeof AIServiceSearchInputSchema>;

/**
 * Defines the schema for a single service recommendation.
 */
const AIServiceRecommendationSchema = z.object({
  name: z.string().describe('The name of the service.'),
  category: z.string().describe('The category of the service (e.g., صيدليات, سوبر ماركت).'),
  location: z.string().describe('The exact location or address of the service.'),
  region: z.string().describe('The geographical region where the service is located.'),
});

/**
 * Defines the output schema for the AI service search flow.
 * It is an array of service recommendations.
 */
const AIServiceSearchOutputSchema = z.array(AIServiceRecommendationSchema);
export type AIServiceSearchOutput = z.infer<typeof AIServiceSearchOutputSchema>;

// Dummy data for services in Faisal regions.
// In a real application, this data would come from a database or external API.
const sampleServices = [
  { name: 'صيدلية الفتح', category: 'صيدليات', location: 'شارع الهرم, بجوار موقف الطوابق', region: 'الطوابق' },
  { name: 'صيدلية النيل', category: 'صيدليات', location: 'شارع فيصل الرئيسي, المريوطية', region: 'المريوطية' },
  { name: 'صيدلية العشرين', category: 'صيدليات', location: 'شارع العشرين, فيصل', region: 'العشرين' },
  { name: 'سوبر ماركت خير زمان', category: 'سوبر ماركت', location: 'شارع فيصل, الطوابق', region: 'الطوابق' },
  { name: 'سوبر ماركت أولاد رجب', category: 'سوبر ماركت', location: 'شارع الهرم, المريوطية', region: 'المريوطية' },
  { name: 'سوبر ماركت العشرين', category: 'سوبر ماركت', location: 'شارع العشرين, فيصل', region: 'العشرين' },
  { name: 'حلواني العبد', category: 'خدمات', location: 'شارع فيصل, محطة مدكور', region: 'محطة مدكور' },
  { name: 'ملابس سيتي سنتر', category: 'محلات ملابس', location: 'شارع فيصل, المطبعة', region: 'المطبعة' },
  { name: 'مطعم أبو شقرة', category: 'خدمات', location: 'شارع الهرم, حسن محمد', region: 'حسن محمد' },
  { name: 'صيدلية الأمل', category: 'صيدليات', location: 'منطقة الوفاء والأمل، فيصل', region: 'الوفاء والأمل' },
  { name: 'سوبر ماركت الأسرة', category: 'سوبر ماركت', location: 'شارع الطالبية الرئيسي', region: 'الطالبية' },
  { name: 'صيدلية الدواء', category: 'صيدليات', location: 'شارع المريوطية فيصل', region: 'المريوطية' },
  { name: 'محلات زارا', category: 'محلات ملابس', location: 'مول العرب, الطوابق', region: 'الطوابق' },
  { name: 'مركز خدمة السيارات', category: 'خدمات', location: 'طريق المريوطية الرئيسي', region: 'المريوطية' },
];

/**
 * Defines a tool to search for services based on type and optional region.
 * This tool simulates fetching data from a backend service or database.
 */
const searchServicesTool = ai.defineTool(
  {
    name: 'searchServices',
    description: 'Searches for services (e.g., pharmacies, supermarkets, clothing stores, general services) in a specific region of Faisal.',
    inputSchema: z.object({
      serviceType: z.string().describe('The type of service to search for (e.g., صيدلية, سوبر ماركت, محلات ملابس, خدمات).'),
      region: z.string().optional().describe('The geographical region to search within Faisal (e.g., الطوابق, المريوطية).'),
    }),
    outputSchema: AIServiceSearchOutputSchema,
  },
  async (input) => {
    console.log(`Tool: searchServices called with serviceType: ${input.serviceType}, region: ${input.region || 'Any'}`);

    const normalizedServiceType = input.serviceType.toLowerCase().trim();
    const normalizedRegion = input.region?.toLowerCase().trim();

    const filteredServices = sampleServices.filter(service => {
      let typeMatch = false;
      // Robust matching for common service types
      if (normalizedServiceType.includes('صيدل')) { // matches صيدلية, صيدليات
        typeMatch = service.category === 'صيدليات';
      } else if (normalizedServiceType.includes('سوبر ماركت')) {
        typeMatch = service.category === 'سوبر ماركت';
      } else if (normalizedServiceType.includes('ملابس')) {
        typeMatch = service.category === 'محلات ملابس';
      } else if (normalizedServiceType.includes('خدمات') || normalizedServiceType.includes('خدمة')) {
        typeMatch = service.category === 'خدمات';
      } else {
        // Fallback: direct containment match for other types
        typeMatch = service.category.toLowerCase().includes(normalizedServiceType);
      }

      // Match region if provided
      const regionMatch = normalizedRegion ? service.region.toLowerCase().includes(normalizedRegion) : true;

      return typeMatch && regionMatch;
    });
    return filteredServices;
  }
);

/**
 * Defines the prompt for the AI service search. The prompt instructs the LLM
 * to identify service type and region from the user query and use the searchServices tool.
 */
const serviceSearchPrompt = ai.definePrompt({
  name: 'serviceSearchPrompt',
  input: { schema: AIServiceSearchInputSchema },
  output: { schema: AIServiceSearchOutputSchema },
  tools: [searchServicesTool],
  prompt: `You are an intelligent service assistant for "Faisal Smart Guide" in Egypt.
Your goal is to help users find services in the Faisal area based on their natural language queries.

Here are the available regions in Faisal: الطالبية, الوفاء والأمل, العشرين, الطوابق, المريوطية, المطبعة, محطة مدكور, حسن محمد.
Here are the available service categories: صيدليات (pharmacies), سوبر ماركت (supermarkets), محلات ملابس (clothing stores), خدمات (general services).

When a user asks for a service, carefully identify the 'serviceType' (category) and 'region' from their query.
Then, use the 'searchServices' tool with the identified parameters to find relevant services.

If a specific region is mentioned, use it. If no specific region is mentioned, search across all regions for the specified service type.
If the service type is ambiguous or not directly listed, try to infer the most appropriate category.

User query: {{{query}}}

Respond with a JSON array of service recommendations, ensuring each object contains 'name', 'category', 'location', and 'region'. If the tool returns an empty array, return an empty array.`,
});

/**
 * Defines the main Genkit flow for AI service search.
 * It takes a user query and returns a list of service recommendations.
 */
const aiServiceSearchFlow = ai.defineFlow(
  {
    name: 'aiServiceSearchFlow',
    inputSchema: AIServiceSearchInputSchema,
    outputSchema: AIServiceSearchOutputSchema,
  },
  async (input) => {
    const { output } = await serviceSearchPrompt(input);
    // The LLM is instructed to use the tool and return its output directly if successful.
    // Therefore, `output` directly corresponds to AIServiceSearchOutputSchema.
    return output!;
  }
);

/**
 * Wrapper function to call the AI service search Genkit flow.
 * @param input The user's natural language query.
 * @returns A promise that resolves to an array of service recommendations.
 */
export async function AIServiceSearch(input: AIServiceSearchInput): Promise<AIServiceSearchOutput> {
  return aiServiceSearchFlow(input);
}
