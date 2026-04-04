import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Users, Building, Wrench } from "lucide-react"

export function StatsCards() {
  // In a real app, you'd fetch this data from a database.
  const totalShops = 14;
  const totalTechnicians = 6;
  const totalVisitors = 12530;

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            إجمالي المحلات
          </CardTitle>
          <Building className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalShops}</div>
          <p className="text-xs text-muted-foreground">
            محل مسجل في الدليل
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            إجمالي الفنيين
          </CardTitle>
          <Wrench className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{totalTechnicians}</div>
          <p className="text-xs text-muted-foreground">
            فني وحرفي مسجل
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">إجمالي الزوار</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalVisitors.toLocaleString('ar-EG')}</div>
          <p className="text-xs text-muted-foreground">
            +15.2% عن الشهر الماضي
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
