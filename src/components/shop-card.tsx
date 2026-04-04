'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, Star, ArrowLeft, BadgeCheck } from 'lucide-react';
import type { Service } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

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

function StatusBadge({ status }: { status: Service['status'] }) {
    if (!status) return null;

    const statusMap = {
        available: { text: 'متاح الآن', className: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700' },
        busy: { text: 'مشغول', className: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700' },
        unavailable: { text: 'غير متاح', className: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700' },
    };

    const currentStatus = statusMap[status];

    return <Badge className={currentStatus.className}>{currentStatus.text}</Badge>;
}

export default function ShopCard({ service }: { service: Service }) {
    const { toast } = useToast();
    const isMobile = service.phone.startsWith('01') && service.phone.length === 11;
    const whatsappPhoneNumber = isMobile ? '2' + service.phone : service.phone;
    const whatsappMessage = encodeURIComponent('السلام عليكم، أريد الاستفسار عن خدمة صيانة من دليل فيصل');

    return (
        <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg dark:border-border">
            <CardHeader className='flex-grow'>
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl font-bold text-primary">{service.name}</CardTitle>
                      {service.isFeatured && <BadgeCheck className="h-5 w-5 text-blue-500" title="خدمة موثوقة" />}
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                        <StarRating rating={service.rating} />
                        <StatusBadge status={service.status} />
                    </div>
                </div>
                <CardDescription className="flex items-center gap-2 pt-1 text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span>{service.address}</span>
                </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto flex justify-end gap-2 border-t bg-muted/20 p-3">
                 {isMobile && (
                     <Button 
                        asChild 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 text-white flex-1 md:flex-none"
                        onClick={() => toast({ title: 'جاري التحويل إلى واتساب...' })}
                     >
                        <a href={`https://wa.me/${whatsappPhoneNumber}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                            <WhatsAppIcon className="h-4 w-4"/>
                            <span>واتساب</span>
                        </a>
                    </Button>
                 )}
                 <Button asChild size="sm" variant="outline" className="flex-1 md:flex-none">
                    <Link href={`/${service.regionId}/${service.categoryId}/${service.id}`}>
                        <span>التفاصيل</span>
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
