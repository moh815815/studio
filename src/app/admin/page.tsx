import { StatsCards } from "@/components/admin/stats-cards";
import { RecentSignups } from "@/components/admin/recent-signups";
import { OverviewChart } from "@/components/admin/overview-chart";

export default function AdminDashboard() {
  return (
    <>
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
