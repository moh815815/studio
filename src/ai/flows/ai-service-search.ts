'use server';
/**
 * @fileOverview This file implements a Genkit flow to assist users in searching for services
 * in the Faisal area based on natural language queries. It uses a tool to lookup services
 * and returns relevant recommendations with a conversational message.
 *
 * - AIServiceSearch - A function that handles natural language service search.
 * - AIServiceSearchInput - The input type for the AIServiceSearch function.
 * - AIServiceSearchOutput - The return type for the AIServiceSearch function.
 * - AIServiceRecommendation - The type for a single service recommendation.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { services, regions } from '@/lib/data';

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
export type AIServiceRecommendation = z.infer<typeof AIServiceRecommendationSchema>;


/**
 * Defines the schema for the tool's output.
 */
const ServiceToolOutputSchema = z.array(AIServiceRecommendationSchema);

/**
 * Defines the final output schema for the entire Genkit flow.
 * It includes the results and a conversational message.
 */
const AIFlowOutputSchema = z.object({
    results: z.array(AIServiceRecommendationSchema).describe("The list of service recommendations found."),
    message: z.string().describe("A friendly, conversational message in Egyptian Arabic to the user summarizing the results. If no results are found, explain why and suggest trying a different search. If results are found, briefly mention what was found."),
});
export type AIServiceSearchOutput = z.infer<typeof AIFlowOutputSchema>;


/**
 * Defines a tool to search for services based on type, name, and optional region.
 * This tool simulates fetching data from a backend service or database.
 */
const searchServicesTool = ai.defineTool(
  {
    name: 'searchServices',
    description: 'Searches for services (e.g., pharmacies, supermarkets, clothing stores, general services, restaurants) in a specific region of Faisal, or by a specific name.',
    inputSchema: z.object({
      serviceType: z.string().optional().describe('The type of service to search for (e.g., صيدلية, سوبر ماركت, محلات ملابس, خدمات).'),
      region: z.string().optional().describe('The geographical region to search within Faisal (e.g., الطوابق, المريوطية).'),
      name: z.string().optional().describe('The specific name of a shop or service.'),
    }),
    outputSchema: ServiceToolOutputSchema,
  },
  async (input) => {
    console.log(`Tool: searchServices called with: ${JSON.stringify(input)}`);

    const normalizedServiceType = input.serviceType?.toLowerCase().trim();
    const normalizedRegion = input.region?.toLowerCase().trim();
    const normalizedName = input.name?.toLowerCase().trim();

    // Join service data with region and category names for easier filtering
    const allServicesWithDetails = services.map(service => {
        const region = regions.find(r => r.id === service.regionId);
        const category = region?.categories.find(c => c.id === service.categoryId);
        return {
            ...service,
            regionName: region?.name,
            categoryName: category?.name,
        };
    });
    
    const filteredServices = allServicesWithDetails.filter(service => {
        if (!service.regionName || !service.categoryName) return false;

        const nameMatch = normalizedName ? service.name.toLowerCase().includes(normalizedName) : true;
        const regionMatch = normalizedRegion ? service.regionName.toLowerCase().includes(normalizedRegion) : true;
        
        let typeMatch = true;
        if (normalizedServiceType) {
            if (normalizedServiceType.includes('صيدل')) {
                typeMatch = service.categoryName === 'صيدليات';
            } else if (normalizedServiceType.includes('سوبر ماركت')) {
                typeMatch = service.categoryName === 'سوبر ماركت';
            } else if (normalizedServiceType.includes('ملابس')) {
                typeMatch = service.categoryName === 'محلات ملابس';
            } else if (normalizedServiceType.includes('خدمات') || normalizedServiceType.includes('خدمة')) {
                typeMatch = service.categoryName === 'خدمات';
            } else if (normalizedServiceType.includes('مطاعم')) {
                typeMatch = service.categoryName === 'مطاعم';
            } else {
                typeMatch = service.categoryName.toLowerCase().includes(normalizedServiceType);
            }
        }

        return nameMatch && regionMatch && typeMatch;
    });
    
    return filteredServices.map(s => ({
        name: s.name,
        category: s.categoryName || 'غير مصنف',
        location: s.address,
        region: s.regionName || 'غير محدد',
    }));
  }
);

/**
 * Defines the prompt for the AI service search. The prompt instructs the LLM
 * to identify service type, name and region from the user query and use the searchServices tool.
 */
const serviceSearchPrompt = ai.definePrompt({
  name: 'serviceSearchPrompt',
  input: { schema: AIServiceSearchInputSchema },
  output: { schema: AIFlowOutputSchema },
  tools: [searchServicesTool],
  prompt: `You are an intelligent and friendly service assistant for "Faisal Smart Guide" in Egypt.
Your goal is to help users find services in the Faisal area based on their natural language queries, and respond in a conversational way.

Here are the available regions in Faisal: ${regions.map(r => r.name).join(', ')}.
Here are the available service categories: صيدليات (pharmacies), سوبر ماركت (supermarkets), محلات ملابس (clothing stores), خدمات (general services), مطاعم (restaurants).

When a user asks for a service, carefully identify the 'serviceType' (category), 'region', and/or the specific 'name' of the shop from their query.
Then, use the 'searchServices' tool with the identified parameters to find relevant services.

User query: {{{query}}}

After getting the results from the tool, formulate a response in JSON format.
1.  The 'results' field should contain the array of services returned by the tool.
2.  The 'message' field should contain a friendly, conversational response in Egyptian Arabic.
    - If you found results, your message could be something like "بالتأكيد! وجدت لك هذه الخدمات في منطقة..." or "تفضل، هذه هي النتائج التي تطابق بحثك:".
    - If no results are found, create a helpful message like "عفواً، لم أجد خدمات تطابق بحثك. هل يمكنك تجربة البحث بكلمات مختلفة أو في منطقة أخرى؟"
    - Be natural, helpful, and friendly. Your message is the main thing the user will read.
`,
});

/**
 * Defines the main Genkit flow for AI service search.
 * It takes a user query and returns a list of service recommendations.
 */
const aiServiceSearchFlow = ai.defineFlow(
  {
    name: 'aiServiceSearchFlow',
    inputSchema: AIServiceSearchInputSchema,
    outputSchema: AIFlowOutputSchema,
  },
  async (input) => {
    const { output } = await serviceSearchPrompt(input);
    return output!;
  }
);

/**
 * Wrapper function to call the AI service search Genkit flow.
 * @param input The user's natural language query.
 * @returns A promise that resolves to an object with results and a message.
 */
export async function AIServiceSearch(input: AIServiceSearchInput): Promise<AIServiceSearchOutput> {
  return aiServiceSearchFlow(input);
}
