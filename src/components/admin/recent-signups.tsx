'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { pendingServices } from "@/lib/data"
import { CheckCircle, Trash2 } from "lucide-react"

export function RecentSignups() {
    // In a real app, this would be a server action or API call
    const handleApprove = (id: string) => {
        alert(`تم تفعيل الطلب رقم ${id}`);
    }
    const handleDelete = (id: string) => {
        alert(`تم حذف الطلب رقم ${id}`);
    }
  return (
    <Card>
      <CardHeader>
        <CardTitle>طلبات التسجيل الجديدة</CardTitle>
        <CardDescription>
          مراجعة وتفعيل الطلبات المرسلة من أصحاب المحلات والفنيين.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>اسم المحل/الفني</TableHead>
              <TableHead>التصنيف</TableHead>
              <TableHead className="hidden md:table-cell">المنطقة</TableHead>
              <TableHead className="hidden md:table-cell">رقم الهاتف</TableHead>
              <TableHead>
                <span className="sr-only">الإجراءات</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingServices.map((service) => (
                <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>
                        <Badge variant="outline">{service.categoryName}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{service.regionName}</TableCell>
                    <TableCell className="hidden md:table-cell" dir="ltr">{service.phone}</TableCell>
                    <TableCell>
                        <div className="flex items-center justify-end gap-2">
                            <Button variant="outline" size="icon" onClick={() => handleApprove(service.id)}>
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="sr-only">تفعيل</span>
                            </Button>
                             <Button variant="destructive" size="icon" onClick={() => handleDelete(service.id)}>
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">حذف</span>
                            </Button>
                        </div>
                    </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
