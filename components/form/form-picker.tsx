"use client";
import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [selectedimageId, setSelectedimageId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { pending } = useFormStatus();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317809"], // well suited collection for wallpaper
          count: 9,
        });
        if (result.errors) {
          toast.error(result.errors[0]);
        } else if (result && result.response) {
          const randomImages = result.response as Array<Record<string, any>>;
          setImages(randomImages);
        } else {
          toast.error("Failed to get images from Unplash");
        }
      } catch (error: any) {
        console.error(error);
        toast.error(error?.message as string);
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="size-6 text-sky-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
            onClick={() => {
              if (pending) return;
              setSelectedimageId(image.id);
            }}
          >
            <Image
              src={image.urls.thumb}
              alt="Unsplash"
              className="object-cover rounded-sm"
              priority={selectedimageId === image.id}
              fill
            />
          </div>
        ))}
      </div>
    </div>
  );
};
