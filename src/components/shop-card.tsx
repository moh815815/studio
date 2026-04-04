import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Phone, MapPin, Star, ArrowLeft } from 'lucide-react';
import type { Service } from '@/lib/data';

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-1 text-yellow-400">
        {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < rating ? 'fill-current' : 'text-muted-foreground/30'}`} />
        ))}
        </div>
    );
}

export default function ShopCard({ service }: { service: Service }) {
    return (
        <Link href={`/${service.regionId}/${service.categoryId}/${service.id}`} className="group block">
            <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:border-border">
                <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-xl font-bold text-primary">{service.name}</CardTitle>
                        <StarRating rating={service.rating} />
                    </div>
                    <CardDescription className="flex items-center gap-2 pt-1 text-muted-foreground">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <span>{service.address}</span>
                    </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto flex justify-end gap-2 border-t bg-muted/20 p-3">
                     <span className="text-sm font-semibold text-primary">عرض التفاصيل</span>
                     <ArrowLeft className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-[-4px]" />
                </CardFooter>
            </Card>
        </Link>
    );
}
