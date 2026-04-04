'use client';

import { StatsCards } from "@/components/admin/stats-cards";
import { RecentSignups } from "@/components/admin/recent-signups";
import { OverviewChart } from "@/components/admin/overview-chart";
import { Button } from "@/components/ui/button";
import { Megaphone } from "lucide-react";

export default function AdminDashboard() {
  const handleSendNotification = () => {
    alert('تم إرسال التنبيه بنجاح! (محاكاة)');
  }
  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8 mb-4 md:mb-8">
        <h1 className="text-2xl font-bold">لوحة التحكم الرئيسية</h1>
        <Button onClick={handleSendNotification} className="w-full md:w-auto">
            <Megaphone className="h-4 w-4" />
            إرسال تنبيه بالعروض
        </Button>
      </div>
      <div className="grid w-full gap-4 md:gap-8">
        <StatsCards />
        <div className="grid grid-cols-1 items-start gap-4 md:gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <RecentSignups />
            </div>
            <div className="lg:col-span-2">
              <OverviewChart />
            </div>
        </div>
      </div>
    </>
  );
}
