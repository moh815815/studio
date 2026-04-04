import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, Star } from 'lucide-react';
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
        <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg dark:border-border">
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
                 <Button asChild size="sm" variant="outline">
                    <a href={service.mapUrl} target="_blank" rel="noopener noreferrer">
                        <MapPin />
                        <span>الموقع</span>
                    </a>
                </Button>
                <Button asChild size="sm">
                    <a href={`tel:${service.phone}`}>
                        <Phone />
                        <span>اتصال</span>
                    </a>
                </Button>
            </CardFooter>
        </Card>
    );
}
