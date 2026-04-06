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
import { services, getRegionById } from "@/lib/data"
import { Trash2, Pin, PinOff, Star } from "lucide-react"

export function ServicesTable() {
    const handleToggleFeatured = (id: string, isFeatured?: boolean) => {
        alert(`تم ${isFeatured ? 'إلغاء تثبيت' : 'تثبيت'} الخدمة رقم ${id} كخدمة مميزة.`);
    }
    const handleDelete = (id: string) => {
        alert(`تم حذف الخدمة رقم ${id}`);
    }

    const allServices = services.map(service => {
        const region = getRegionById(service.regionId);
        const category = region?.categories.find(c => c.id === service.categoryId);
        return {
            ...service,
            regionName: region?.name ?? 'N/A',
            categoryName: category?.name ?? 'N/A',
        };
    })

  return (
    <Card>
      <CardHeader>
        <CardTitle>قائمة الخدمات</CardTitle>
        <CardDescription>
          عرض وإدارة جميع الخدمات والمحلات المسجلة في الدليل.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>اسم المحل/الفني</TableHead>
              <TableHead>التصنيف</TableHead>
              <TableHead className="hidden md:table-cell">المنطقة</TableHead>
              <TableHead className="hidden sm:table-cell">التقييم</TableHead>
              <TableHead className="hidden lg:table-cell">الحالة</TableHead>
              <TableHead>
                <span className="sr-only">الإجراءات</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allServices.map((service) => (
                <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>
                        <Badge variant="outline">{service.categoryName}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{service.regionName}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                        <div className="flex items-center gap-1">
                            {service.rating} <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                        {service.isFeatured ? <Badge>مميز</Badge> : <Badge variant="secondary">عادي</Badge>}
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center justify-end gap-2">
                             <Button variant="ghost" size="icon" onClick={() => handleToggleFeatured(service.id, service.isFeatured)}>
                                {service.isFeatured ? <PinOff className="h-4 w-4 text-gray-400" /> : <Pin className="h-4 w-4 text-primary" />}
                                <span className="sr-only">{service.isFeatured ? 'إلغاء التثبيت' : 'تثبيت'}</span>
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
