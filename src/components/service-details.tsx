'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Download,
  MapPin,
  Phone,
  QrCode,
  Star,
  Clock,
  Camera,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import type { Region, Category } from '@/lib/data';
import type { getServiceById } from '@/lib/data';
import placeholderImages from '@/lib/placeholder-images.json';
import Loading from '@/app/loading';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.74.45 3.48 1.34 5l-1.4 4.93 5.05-1.37c1.45.81 3.09 1.24 4.8 1.24h.01c5.46 0 9.9-4.45 9.9-9.9S17.5 2 12.04 2M12.04 3.67c4.53 0 8.23 3.7 8.23 8.23s-3.7 8.23-8.23 8.23c-1.5 0-2.95-.4-4.23-1.15l-.3-.18-3.12.84.86-3.05-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.53 3.7-8.23 8.23-8.23m5.45 10.2c-.28-.14-1.67-.82-1.92-.92-.25-.1-.44-.14-.62.14-.18.28-.72.92-.89 1.1-.16.18-.32.2-.59.06-.28-.14-1.18-.43-2.25-1.38-1.53-1.35-2.04-2.4-2.28-2.8-.24-.4-.03-.62.13-.76.14-.13.28-.32.42-.48.1-.13.14-.22.22-.36.08-.14.04-.28-.02-.42s-.62-1.5-.85-2.04c-.23-.55-.47-.47-.65-.47-.17 0-.36-.04-.55-.04-.18 0-.48.06-.72.34-.25.28-.97.95-1.2 2.3.01 1.02.26 1.95.48 2.58l.02.06.01.01c.24.4.52.82.84 1.24.72.9 1.55 1.65 2.47 2.22.81.5 1.62.77 2.52.92.54.08 1.24.03 1.8-.22.6-.27 1.2-.62 1.6-1.22.4-.6.65-1.2.78-1.9.05-.28.02-.5-.08-.64-.1-.14-.2-.18-.4-.28Z" />
    </svg>
);


function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`h-5 w-5 ${i < rating ? 'fill-current' : 'text-muted-foreground/30'}`} />
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: ServiceDetailsProps['service']['status'] }) {
    if (!status) return null;

    const statusMap = {
        available: { text: 'متاح الآن', className: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700' },
        busy: { text: 'مشغول', className: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700' },
        unavailable: { text: 'غير متاح', className: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700' },
    };

    const currentStatus = statusMap[status];

    return <Badge className={currentStatus.className}><Clock className="h-3 w-3 me-1.5"/>{currentStatus.text}</Badge>;
}

type ServiceDetailsProps = {
  service: NonNullable<ReturnType<typeof getServiceById>>,
  region: Region,
  category: Category,
};

export default function ServiceDetails({ service, region, category }: ServiceDetailsProps) {
  const [pageUrl, setPageUrl] = useState('');
  
  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const shareText = `مرحبا، أود مشاركة تفاصيل هذا المحل معك:\n\n*${service.name}*\n\n*العنوان:* ${service.address}\n*المنطقة:* ${service.regionName}\n\n*رابط على دليل فيصل الذكي:*\n${pageUrl}`;
  const whatsappMessage = encodeURIComponent('السلام عليكم، أريد الاستفسار عن خدمة صيانة من دليل فيصل');
  const isMobile = service.phone.startsWith('01') && service.phone.length === 11;
  const whatsappPhoneNumber = isMobile ? '2' + service.phone : service.phone;

  const handleDownloadQr = async () => {
    if (!pageUrl) return;
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=${encodeURIComponent(pageUrl)}`;
    
    try {
        const response = await fetch(qrApiUrl);
        if (!response.ok) throw new Error('Network response was not ok.');
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `${service.name}-QRCode.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error("QR Download failed:", error);
        window.open(qrApiUrl, '_blank');
    }
  };
  
  if (!pageUrl) {
    return <Loading />;
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background">
      <div className="w-full max-w-3xl p-4 md:p-8">
        <header className="relative mb-6">
          <Button asChild variant="outline" className="absolute top-0 start-0">
            <Link href={`/${region.id}/${category.id}`}>
              <ArrowRight className="h-4 w-4" />
              <span>العودة إلى {category.name}</span>
            </Link>
          </Button>
          <div className="pt-12 text-center">
            <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">
              {service.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                <p className="text-lg text-muted-foreground">{category.name} في {region.name}</p>
                <StarRating rating={service.rating} />
                <StatusBadge status={service.status} />
            </div>
          </div>
        </header>

        <Card className="overflow-hidden">
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-grow">
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><MapPin className="text-primary"/> العنوان</h3>
                                <p className="text-muted-foreground ms-8">{service.address}</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><Phone className="text-primary"/> للتواصل</h3>
                                <a href={`tel:${service.phone}`} className="text-muted-foreground ms-8 text-lg tracking-wider font-semibold hover:text-primary" dir="ltr">{service.phone}</a>
                            </div>
                        </div>
                    </div>
                     <div className="flex flex-col gap-3 justify-center shrink-0 w-full md:w-48">
                        {service.mapUrl && service.mapUrl !== '#' && (
                            <Button asChild className="w-full">
                                <a href={service.mapUrl} target="_blank" rel="noopener noreferrer">
                                    <MapPin />
                                    <span>الموقع على الخريطة</span>
                                </a>
                            </Button>
                        )}
                        <Button asChild variant="outline" className="w-full">
                           <a href={`tel:${service.phone}`}>
                                <Phone />
                                <span>اتصال</span>
                            </a>
                        </Button>
                        {isMobile && (
                            <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white">
                               <a href={`https://wa.me/${whatsappPhoneNumber}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                                    <WhatsAppIcon />
                                    <span>تواصل واتساب</span>
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>

        {service.gallery && service.gallery.length > 0 && (
            <section className="mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl flex items-center gap-2">
                            <Camera />
                            معرض الأعمال
                        </CardTitle>
                        <CardDescription>صور من أعمالنا السابقة لضمان جودة الخدمة</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                                direction: 'rtl',
                            }}
                            className="w-full"
                        >
                            <CarouselContent>
                                {service.gallery.map((imgRef, index) => {
                                    const imgData = placeholderImages.find(p => p.id === imgRef.id);
                                    if (!imgData) return null;
                                    const imageUrl = `https://picsum.photos/seed/${imgData.seed}/${imgData.width}/${imgData.height}`;
                                    return (
                                        <CarouselItem key={index} className="md:basis-1/2">
                                            <div className="p-1">
                                                <Card className="overflow-hidden">
                                                    <CardContent className="flex aspect-[4/3] items-center justify-center p-0">
                                                        <Image
                                                            src={imageUrl}
                                                            alt={`${service.name} - ${imgRef.hint}`}
                                                            width={imgData.width}
                                                            height={imgData.height}
                                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                                            data-ai-hint={imgRef.hint}
                                                        />
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    );
                                })}
                            </CarouselContent>
                            <div className="hidden md:block">
                                <CarouselPrevious className="absolute start-2 top-1/2 -translate-y-1/2" />
                                <CarouselNext className="absolute end-2 top-1/2 -translate-y-1/2" />
                            </div>
                        </Carousel>
                    </CardContent>
                </Card>
            </section>
        )}

        <section className="mt-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">أدوات صاحب المحل</CardTitle>
                    <CardDescription>شارك محلك أو حمّل كود QR الخاص به.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="lg" className="w-full h-auto py-4 flex flex-col items-center justify-center gap-2">
                                <QrCode className="h-8 w-8"/>
                                <span>توليد كود QR</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>كود QR الخاص بـِ "{service.name}"</DialogTitle>
                            </DialogHeader>
                            <div className="flex items-center justify-center p-4 bg-white rounded-lg">
                                {pageUrl && <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(pageUrl)}`} alt={`QR code for ${service.name}`} width={256} height={256} />}
                            </div>
                            <DialogFooter className="sm:justify-center">
                                <Button type="button" onClick={handleDownloadQr}>
                                    <Download/>
                                    تحميل (PNG)
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Button asChild size="lg" className="w-full h-auto py-4 flex flex-col items-center justify-center gap-2">
                        <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer">
                            <WhatsAppIcon className="h-8 w-8"/>
                           <span>مشاركة على واتساب</span>
                        </a>
                    </Button>
                </CardContent>
            </Card>
        </section>
      </div>
    </main>
  );
}
