'use client';

import { useState } from 'react';
import { Megaphone, X } from 'lucide-react';
import { Button } from './ui/button';

export default function NotificationBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 dark:bg-gray-800/50">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm leading-6 text-gray-900 dark:text-gray-100">
          <Megaphone className="inline h-5 w-5 me-2 text-primary" />
          <strong className="font-semibold">عروض خاصة!</strong>
          <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
            <circle cx={1} cy={1} r={1} />
          </svg>
          خصومات تصل إلى 30% لدى محلات الملابس المشاركة في دليل فيصل.
        </p>
        <a
          href="#"
          className="flex-none rounded-full bg-primary px-3.5 py-1 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          اكتشف الآن <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
      <div className="flex flex-1 justify-end">
        <Button size="icon" variant="ghost" className="-m-3 h-7 w-7" onClick={() => setIsVisible(false)}>
          <span className="sr-only">إغلاق</span>
          <X className="h-5 w-5 text-gray-900 dark:text-gray-100" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
