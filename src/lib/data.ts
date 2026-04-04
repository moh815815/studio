import { type LucideIcon, Hospital, ShoppingCart, Shirt, Wrench, Utensils, School, Bus } from 'lucide-react';

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

export type Service = {
    id: string;
    name: string;
    rating: number; // 1-5
    address: string;
    phone: string;
    mapUrl: string;
    categoryId: string;
    regionId: string;
};

export type PaginatedServices = {
    services: Service[];
    totalPages: number;
    totalCount: number;
}

const commonCategories: Category[] = [
  { id: 'pharmacies', name: 'صيدليات', icon: Hospital, description: 'ابحث عن أقرب صيدلية لك.' },
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

export const services: Service[] = [
    { id: '1', name: 'صيدلية العزبي', rating: 5, address: 'شارع العشرين، بجوار فرع We', phone: '19600', mapUrl: 'https://maps.app.goo.gl/abcdef123456', categoryId: 'pharmacies', regionId: 'al-eshreen' },
    { id: '2', name: 'صيدلية مصر', rating: 4, address: 'شارع الطالبية الرئيسي', phone: '19110', mapUrl: 'https://maps.app.goo.gl/abcdef123456', categoryId: 'pharmacies', regionId: 'al-talbeya' },
    { id: '3', name: 'كشري التحرير', rating: 4, address: 'شارع فيصل الرئيسي، الطوابق', phone: '0233838383', mapUrl: 'https://maps.app.goo.gl/abcdef123456', categoryId: 'restaurants', regionId: 'al-tawabek' },
    { id: '4', name: 'سوبر ماركت أولاد رجب', rating: 3, address: 'شارع الهرم، المريوطية', phone: '19225', mapUrl: 'https://maps.app.goo.gl/abcdef123456', categoryId: 'supermarkets', regionId: 'al-maryotea' },
    { id: '5', name: 'تاون تيم', rating: 4, address: 'شارع العشرين - أمام بركة', phone: '0123456789', mapUrl: 'https://maps.app.goo.gl/abcdef123456', categoryId: 'clothing', regionId: 'al-eshreen' },
    { id: '6', name: 'ورشة الأمانة', rating: 5, address: 'المنطقة الصناعية بالمطبعة', phone: '0112345678', mapUrl: 'https://maps.app.goo.gl/abcdef123456', categoryId: 'services', regionId: 'al-matbaa' },
    { id: '7', name: 'صيدلية الطوابق', rating: 3, address: 'شارع فيصل، الطوابق', phone: '021234567', mapUrl: 'https://maps.app.goo.gl/abcdef123456', categoryId: 'pharmacies', regionId: 'al-tawabek' },
    { id: '8', name: 'مطعم حضرموت', rating: 5, address: 'شارع العشرين، فيصل', phone: '0101234567', mapUrl: 'https://maps.app.goo.gl/abcdef123456', categoryId: 'restaurants', regionId: 'al-eshreen' },
    { id: '9', name: 'صيدلية دلمار وعطالله', rating: 4, address: 'شارع فيصل، محطة مدكور', phone: '19379', mapUrl: 'https://maps.app.goo.gl/abcdef123456', categoryId: 'pharmacies', regionId: 'madkor-station' },
    { id: '10', name: 'صيدلية سيف', rating: 5, address: 'شارع حسن محمد الرئيسي', phone: '19199', mapUrl: 'https://maps.app.goo.gl/abcdef123456', categoryId: 'pharmacies', regionId: 'hassan-mohamed' },
    { id: '11', name: 'مدرسة فضل الحديثة', rating: 4, address: 'شارع فيصل، الطوابق', phone: '0237420223', mapUrl: 'https://maps.app.goo.gl/abcdef123456', categoryId: 'schools', regionId: 'al-tawabek' },
    { id: '12', name: 'مدرسة الأورمان', rating: 3, address: 'شارع فيصل، الطوابق', phone: '0233857501', mapUrl: 'https://maps.app.goo.gl/abcdef123456', categoryId: 'schools', regionId: 'al-tawabek' },
    { id: '13', name: 'مدرسة علوي الخاصة', rating: 4, address: 'شارع فيصل، الطوابق', phone: '0233838383', mapUrl: 'https://maps.app.goo.gl/abcdef123456', categoryId: 'schools', regionId: 'al-tawabek' },
    { id: '14', name: 'مدرسة المستقبل', rating: 5, address: 'شارع فيصل، الطوابق', phone: '0233838383', mapUrl: 'https://maps.app.goo.gl/abcdef123456', categoryId: 'schools', regionId: 'al-tawabek' },
];

export const getRegionById = (id: string): Region | undefined => regions.find(r => r.id === id);

export const getCategoryById = (region: Region, categoryId: string): Category | undefined => region.categories.find(c => c.id === categoryId);

export const getServicesForCategory = (regionId: string, categoryId: string, page: number = 1, pageSize: number = 4): PaginatedServices => {
    const allServices = services.filter(s => s.regionId === regionId && s.categoryId === categoryId);
    const totalCount = allServices.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const paginatedServices = allServices.slice((page - 1) * pageSize, page * pageSize);
    return {
        services: paginatedServices,
        totalPages,
        totalCount
    };
};

export const getServiceById = (id: string): (Service & {regionName: string, categoryName: string}) | undefined => {
    const service = services.find(s => s.id === id);
    if (!service) return undefined;

    const region = regions.find(r => r.id === service.regionId);
    if (!region) return undefined;

    const category = region.categories.find(c => c.id === service.categoryId);
    if (!category) return undefined;

    return {
        ...service,
        regionName: region.name,
        categoryName: category.name,
    };
};
