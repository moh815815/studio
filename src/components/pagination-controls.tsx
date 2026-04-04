'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';

type PaginationControlsProps = {
  totalPages: number;
  currentPage: number;
};

export default function PaginationControls({ totalPages, currentPage }: PaginationControlsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <Button asChild variant="outline" disabled={!hasPrevPage}>
        <Link href={createPageURL(currentPage - 1)}>
          <ArrowRight className="h-4 w-4" />
          السابق
        </Link>
      </Button>
      
      <span className="text-sm font-medium text-muted-foreground">
        صفحة {currentPage} من {totalPages}
      </span>

      <Button asChild variant="outline" disabled={!hasNextPage}>
        <Link href={createPageURL(currentPage + 1)}>
          التالي
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
