import { type LucideIcon, Pill, ShoppingCart, Shirt, Wrench, Utensils, School, Bus } from 'lucide-react';

export type Category = {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
};

export type Region = {
  id: string;
  name: string;
  description: string;
  categories: Category[];
};

const commonCategories: Category[] = [
  { id: 'pharmacies', name: 'صيدليات', icon: Pill, description: 'ابحث عن أقرب صيدلية لك.' },
  { id: 'supermarkets', name: 'سوبر ماركت', icon: ShoppingCart, description: 'تسوق احتياجاتك اليومية بسهولة.' },
  { id: 'clothing', name: 'محلات ملابس', icon: Shirt, description: 'أحدث صيحات الموضة للجميع.' },
  { id: 'services', name: 'خدمات', icon: Wrench, description: 'خدمات متنوعة لإصلاح وصيانة.' },
  { id: 'restaurants', name: 'مطاعم', icon: Utensils, description: 'أشهى المأكولات والمطاعم.' },
];

export const regions: Region[] = [
  {
    id: 'al-talbeya',
    name: 'الطالبية',
    description: 'منطقة حيوية ومليئة بالخدمات المتنوعة.',
    categories: commonCategories,
  },
  {
    id: 'al-wafaa-wal-amal',
    name: 'الوفاء والأمل',
    description: 'منطقة هادئة مع خدمات أساسية.',
    categories: commonCategories.filter(c => ['pharmacies', 'supermarkets'].includes(c.id)),
  },
  {
    id: 'al-eshreen',
    name: 'العشرين',
    description: 'شارع تجاري رئيسي يشتهر بمحلات الملابس.',
    categories: commonCategories,
  },
  {
    id: 'al-tawabek',
    name: 'الطوابق',
    description: 'تجمع سكني كبير مع جميع الخدمات.',
    categories: [
      ...commonCategories,
      { id: 'schools', name: 'مدارس', icon: School, description: 'مؤسسات تعليمية لجميع المراحل.' },
    ],
  },
  {
    id: 'al-maryotea',
    name: 'المريوطية',
    description: 'تمتد على طول ترعة المريوطية وتتميز بمطاعمها.',
    categories: commonCategories,
  },
  {
    id: 'al-matbaa',
    name: 'المطبعة',
    description: 'منطقة صناعية وتجارية.',
    categories: commonCategories.filter(c => ['services', 'supermarkets'].includes(c.id)),
  },
  {
    id: 'madkor-station',
    name: 'محطة مدكور',
    description: 'نقطة مواصلات هامة ومركز تجاري.',
    categories: [
        ...commonCategories,
        { id: 'transportation', name: 'مواصلات', icon: Bus, description: 'محطات وخطوط مواصلات رئيسية.' },
    ],
  },
  {
    id: 'hassan-mohamed',
    name: 'حسن محمد',
    description: 'منطقة سكنية وتجارية متكاملة.',
    categories: commonCategories,
  },
  {
    id: 'kaabesh',
    name: 'كعبيش',
    description: 'تجمع سكني يتميز بالهدوء النسبي.',
    categories: commonCategories.filter(c => ['pharmacies', 'supermarkets', 'services'].includes(c.id)),
  },
  {
    id: 'omiya',
    name: 'أمية',
    description: 'منطقة تاريخية وسكنية.',
    categories: commonCategories,
  }
];

export const getRegionById = (id: string): Region | undefined => regions.find(r => r.id === id);

export const getCategoryById = (region: Region, categoryId: string): Category | undefined => region.categories.find(c => c.id === categoryId);
