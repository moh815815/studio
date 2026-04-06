'use client';

import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function NearbyFinder() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="lg" className="w-full h-14 text-lg">
            <MapPin />
            المحلات القريبة مني (تجريبي)
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>محاكاة البحث عن قرب</AlertDialogTitle>
          <AlertDialogDescription>
            هذه محاكاة لميزة البحث عن الخدمات القريبة. بناءً على أكثر المناطق حيوية في فيصل، نرشح لك استكشاف هذه المناطق:
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-center gap-4 py-4">
            <AlertDialogAction asChild>
                <Link href="/al-eshreen">منطقة العشرين</Link>
            </AlertDialogAction>
            <AlertDialogAction asChild>
                <Link href="/al-tawabek">منطقة الطوابق</Link>
            </AlertDialogAction>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>إغلاق</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
