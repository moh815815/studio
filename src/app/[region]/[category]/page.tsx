// تأكيد أن الصفحة ثابتة ومتوافقة مع كلاود فلير
export const dynamic = 'force-static';

// تحديد المسارات التي سيتم بناؤها مسبقاً
export async function generateStaticParams() {
  return [
    { region: 'faisal', category: 'pharmacies' },
    { region: 'giza', category: 'shops' },
  ];
}

export default function Page({ params }: { params: { region: string; category: string } }) {
  const { region, category } = params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold text-blue-600">
        دليل {category === 'pharmacies' ? 'الصيدليات' : category} في {region}
      </h1>
      <p className="mt-4 text-lg text-gray-700">
        هذه الصفحة تم بناؤها بنجاح وهي تعمل الآن على Cloudflare Pages.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 w-full max-w-2xl">
        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <h2 className="font-semibold">خدمة رقم 1</h2>
          <p className="text-sm text-gray-500">وصف الخدمة هنا...</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <h2 className="font-semibold">خدمة رقم 2</h2>
          <p className="text-sm text-gray-500">وصف الخدمة هنا...</p>
        </div>
      </div>
    </div>
  );
}
