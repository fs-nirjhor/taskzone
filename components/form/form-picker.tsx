"use client";
import { defaultImages } from "@/constants/images";
import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { FormErrors } from "./form-errors";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages);
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
        //setImages([]);
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
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedimageId === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
              readOnly
            />
            <Image
              src={image.urls.thumb}
              alt="Unsplash"
              className="object-cover rounded-sm"
              priority={selectedimageId === image.id}
              fill
            />
            {selectedimageId === image.id && (
              <div className="size-full absolute top-0 left-0 bg-black/50 flex items-center justify-center">
                <Check className="size-4 text-white" />
              </div>
            )}
            <Link
              href={image.links.html}
              target="_blank"
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline bg-black/30 text-center"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id={id} errors={errors} />
    </div>
  );
};