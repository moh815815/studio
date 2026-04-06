'use client';

import { useState } from 'react';
import Image from 'next/image';
import { removeBackground } from '@imgly/background-remover';
import { Upload, Sparkles, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Input } from './ui/input';

interface AIImageUploaderProps {
  onImageProcessed: (dataUrl: string) => void;
}

export default function AIImageUploader({ onImageProcessed }: AIImageUploaderProps) {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset state for new upload
    setOriginalImage(null);
    setProcessedImage(null);
    setIsLoading(true);

    // Show toast for processing
    const { id: toastId } = toast({
      title: "جاري المعالجة...",
      description: "يقوم الذكاء الاصطناعي بإزالة الخلفية.",
    });

    try {
      // Use a smaller version for preview to speed up display
      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        setOriginalImage(dataUrl);

        const blob = await removeBackground(dataUrl);
        const processedUrl = URL.createObjectURL(blob);
        
        const readerForForm = new FileReader();
        readerForForm.readAsDataURL(blob);
        readerForForm.onloadend = function() {
            const base64data = readerForForm.result;
            if (typeof base64data === 'string') {
                onImageProcessed(base64data);
            }
        }
        
        setProcessedImage(processedUrl);

        toast({
          id: toastId,
          variant: "default",
          title: "نجاح!",
          description: "تمت إزالة خلفية الصورة بنجاح.",
        });
      };
      reader.readAsDataURL(file);

    } catch (error) {
      console.error("Background removal failed:", error);
      toast({
        id: toastId,
        variant: "destructive",
        title: "حدث خطأ",
        description: "لم نتمكن من إزالة خلفية الصورة. الرجاء المحاولة بصورة أخرى.",
      });
      setOriginalImage(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Upload Area */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 text-center h-full aspect-square">
            <Upload className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">اسحب وأفلت الصورة هنا، أو اضغط للاختيار</p>
            <Button asChild variant="outline" className="mt-4">
              <label htmlFor="image-upload" className="cursor-pointer">
                اختر صورة المنتج
                <Input id="image-upload" type="file" className="sr-only" accept="image/png, image/jpeg" onChange={handleImageUpload} disabled={isLoading} />
              </label>
            </Button>
            <p className="mt-2 text-xs text-muted-foreground">سيتم إزالة الخلفية تلقائياً</p>
          </div>

          {/* Preview Area */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col items-center">
              <h4 className="text-sm font-medium mb-2">الأصلية</h4>
              <div className="aspect-square w-full rounded-md bg-muted flex items-center justify-center overflow-hidden">
                {originalImage ? <Image src={originalImage} alt="Original" width={200} height={200} className="object-contain" /> : <div className="text-muted-foreground text-xs p-2 text-center">معاينة الصورة الأصلية</div>}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-1"><Sparkles className="h-4 w-4 text-primary"/> المعالَجة</h4>
              <div className="aspect-square w-full rounded-md bg-muted flex items-center justify-center overflow-hidden">
                {isLoading && <LoaderCircle className="animate-spin" />}
                {!isLoading && processedImage && <Image src={processedImage} alt="Processed" width={200} height={200} className="object-contain" />}
                {!isLoading && !processedImage && <div className="text-muted-foreground text-xs p-2 text-center">معاينة الصورة بعد إزالة الخلفية</div>}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
