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
import { CheckCircle, Trash2, Pin } from "lucide-react"

export function RecentSignups() {
    // In a real app, this would be a server action or API call
    const handleApprove = (id: string) => {
        alert(`تم تفعيل الطلب رقم ${id}`);
    }
    const handleDelete = (id: string) => {
        alert(`تم حذف الطلب رقم ${id}`);
    }
    const handlePin = (id: string) => {
        alert(`تم تثبيت الخدمة رقم ${id} كخدمة مميزة.`);
    }
  return (
    <Card>
      <CardHeader>
        <CardTitle>إدارة الخدمات والطلبات</CardTitle>
        <CardDescription>
          مراجعة وتفعيل الطلبات، وإدارة الخدمات المميزة.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>اسم المحل/الفني</TableHead>
              <TableHead>التصنيف</TableHead>
              <TableHead className="hidden md:table-cell">المنطقة</TableHead>
              <TableHead className="hidden md:table-cell">الحالة</TableHead>
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
                    <TableCell className="hidden md:table-cell">
                        <Badge variant="secondary">طلب جديد</Badge>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center justify-end gap-2">
                             <Button variant="ghost" size="icon" onClick={() => handlePin(service.id)}>
                                <Pin className="h-4 w-4 text-gray-400" />
                                <span className="sr-only">تثبيت</span>
                            </Button>
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
