'use client';

import { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

interface FlashSaleProps {
  endsAt: string;
  title: string;
}

const calculateTimeLeft = (endsAt: string) => {
  const difference = +new Date(endsAt) - +new Date();
  let timeLeft = {
    total: difference,
    hours: '00',
    minutes: '00',
    seconds: '00'
  };

  if (difference > 0) {
    timeLeft = {
      total: difference,
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
      minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
    };
  }

  return timeLeft;
};

export default function FlashSale({ endsAt, title }: FlashSaleProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endsAt));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(endsAt));
    }, 1000);

    return () => clearTimeout(timer);
  });

  const isExpired = timeLeft.total <= 0;

  return (
    <div className="rounded-lg border border-primary/50 bg-primary/10 p-4 text-center">
        <h3 className="font-headline text-xl font-bold text-primary">{title}</h3>
        {isExpired ? (
            <p className="mt-2 text-lg font-semibold text-destructive">انتهى العرض!</p>
        ) : (
            <div className="mt-2 flex items-center justify-center gap-4">
                <Timer className="h-6 w-6 text-primary" />
                <p className="text-lg font-semibold tabular-nums tracking-widest text-primary">
                    {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
                </p>
                <span className="text-sm text-primary/80">متبقي لانتهاء العرض</span>
            </div>
        )}
    </div>
  );
}
