'use client';

import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

export default function NearbyFinder() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full h-14 text-lg">
            <MapPin />
            المحلات القريبة مني (تجريبي)
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>محاكاة البحث عن قرب</DialogTitle>
          <DialogDescription>
            هذه محاكاة لميزة البحث عن الخدمات القريبة. بناءً على أكثر المناطق حيوية في فيصل، نرشح لك استكشاف هذه المناطق:
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <DialogClose asChild>
              <Button asChild variant="secondary" size="lg">
                <Link href="/al-eshreen">منطقة العشرين</Link>
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button asChild variant="secondary" size="lg">
                <Link href="/al-tawabek">منطقة الطوابق</Link>
              </Button>
            </DialogClose>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">إغلاق</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
