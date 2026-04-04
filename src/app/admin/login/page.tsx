import { Building, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  return (
    <html lang="ar" dir="rtl">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;700&display=swap" rel="stylesheet" />
        </head>
        <body className="font-body admin-dashboard">
            <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
                <div className="w-full max-w-sm">
                    <Card>
                        <CardHeader className="text-center">
                            <div className="mb-4 flex justify-center">
                                <Building className="h-10 w-10 text-primary"/>
                            </div>
                            <CardTitle className="text-2xl font-bold">لوحة تحكم دليل فيصل</CardTitle>
                            <CardDescription>
                                الرجاء تسجيل الدخول للمتابعة
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">البريد الإلكتروني</Label>
                                    <Input id="email" type="email" placeholder="admin@example.com" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">كلمة المرور</Label>
                                    <Input id="password" type="password" required />
                                </div>
                                <Button asChild className="w-full">
                                    <Link href="/admin">تسجيل الدخول</Link>
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                    <div className="mt-4 text-center text-sm">
                        <Button variant="link" asChild>
                            <Link href="/">
                                <ArrowLeft className="h-4 w-4" />
                                العودة للموقع الرئيسي
                            </Link>
                        </Button>
                    </div>
                </div>
            </main>
        </body>
    </html>
  );
}
