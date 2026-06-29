"use client";

import { useState } from "react";
import {
  formatBytes,
  useFileUpload,
  type FileMetadata,
  type FileWithPreview,
} from "@/hooks/use-file-upload";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { ImageIcon, UploadIcon, XIcon, ZoomInIcon } from "lucide-react";
import Image from "next/image";

interface GalleryUploadProps {
  maxFiles?: number;
  maxSize?: number;
  accept?: string;
  multiple?: boolean;
  className?: string;
  onFilesChange?: (files: FileWithPreview[]) => void;
}

export function UploadOneOrMoreImages({
  maxFiles = 10,
  maxSize = 5 * 1024 * 1024,
  accept = "image/*",
  multiple = false,
  className,
  onFilesChange,
}: GalleryUploadProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({});
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  const [
    { files, isDragging },
    {
      removeFile,
      clearFiles,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      getInputProps,
    },
  ] = useFileUpload({
    maxFiles,
    maxSize,
    accept,
    multiple,
    initialFiles: [],
    onFilesChange,
  });

  const isImage = (file: File | FileMetadata) => {
    const type = file instanceof File ? file.type : file.type;
    return type.startsWith("image/");
  };

  return (
    <div className={cn("w-full max-w-4xl", className)}>
      <div
        className={cn(
          "rounded-lg relative border border-dashed p-8 text-center transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50",
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input type="file" accept="image/*" {...getInputProps()} className="sr-only" />

        <div className="flex flex-col items-center gap-4">
          <div
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-full",
              isDragging ? "bg-primary/10" : "bg-muted",
            )}
          >
            <ImageIcon
              className={`cn(
                h-5 w-5,
                ${isDragging ? "text-primary" : "text-muted-foreground"})`}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              {multiple ? "Upload images to gallery" : "Upload an image to gallery"}
            </h3>
            <p className="text-muted-foreground text-sm">
              Drag and drop images here or click to browse
            </p>
            <p className="text-muted-foreground text-xs">
              {multiple
                ? `You can upload up to ${maxFiles} images. Each image must be less than ${formatBytes(
                    maxSize,
                  )}.`
                : `You can upload one image. The image must be less than ${formatBytes(maxSize)}.`}
            </p>
          </div>

          <Button type="button" onClick={openFileDialog}>
            <UploadIcon className="h-4 w-4" />
            {multiple ? "Upload Images" : "Upload Image"}
          </Button>
        </div>
      </div>

      {multiple && files.length > 0 ? (
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h4 className="text-sm font-medium">
              Gallery ({files.length}/{maxFiles})
            </h4>
            <div className="text-muted-foreground text-xs">
              Total: {formatBytes(files.reduce((acc, file) => acc + file.file.size, 0))}
            </div>
          </div>
          <Button onClick={clearFiles} variant="outline" size="sm">
            Clear all
          </Button>
        </div>
      ) : (
        files.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <h4 className="text-sm font-medium">Selected Image</h4>
            <div className="text-muted-foreground text-xs">
              Size: {formatBytes(files[0].file.size)}
            </div>
          </div>
        )
      )}

      {files.length > 0 && (
        <div
          className={`mt-4 grid gap-4 ${multiple ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4" : "grid-cols-1 h-48 relative"}`}
        >
          {files.map((fileItem) => (
            <div
              key={fileItem.id}
              className={cn(
                "group/item relative overflow-hidden",
                multiple ? "aspect-square" : "h-48 w-full",
              )}
            >
              {isImage(fileItem.file) && fileItem.preview ? (
                <>
                  {loadingImages[fileItem.id] !== false && (
                    <div className="bg-muted/50 rounded-lg absolute inset-0 flex items-center justify-center border">
                      <Spinner className="text-muted-foreground size-6" />
                    </div>
                  )}
                  <Image
                    src={fileItem.preview}
                    alt={fileItem.file.name}
                    fill
                    onLoad={() =>
                      setLoadingImages((prev) => ({
                        ...prev,
                        [fileItem.id]: false,
                      }))
                    }
                    className={cn(
                      "rounded-lg object-contain transition-all group-hover/item:scale-105",
                      loadingImages[fileItem.id] !== false ? "opacity-0" : "opacity-100",
                    )}
                  />
                </>
              ) : (
                <div className="bg-muted rounded-lg flex h-full w-full items-center justify-center border">
                  <ImageIcon className="text-muted-foreground h-8 w-8" />
                </div>
              )}

              {/* Overlay */}
              <div className="bg-black/50 absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover/item:opacity-100">
                {/* View Button */}
                {fileItem.preview && (
                  <Button
                    onClick={() => {
                      setSelectedImage(fileItem.preview!);
                      setIsPreviewLoading(true);
                    }}
                    variant="secondary"
                    size="icon"
                    className="size-7"
                  >
                    <ZoomInIcon className="opacity-100/80" />
                  </Button>
                )}

                {/* Remove Button */}
                <Button
                  onClick={() => removeFile(fileItem.id)}
                  variant="secondary"
                  size="icon"
                  className="size-7"
                >
                  <XIcon className="opacity-100/8" />
                </Button>
              </div>

              {/* File Info */}
              <div className="rounded-b-lg absolute right-0 bottom-0 left-0 bg-black/70 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100">
                <p className="truncate text-xs font-medium">{fileItem.file.name}</p>
                <p className="text-xs text-gray-300">{formatBytes(fileItem.file.size)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog
        open={!!selectedImage}
        onOpenChange={(open: boolean) => !open && setSelectedImage(null)}
      >
        <DialogContent className="**:data-[slot=dialog-close]:text-muted-foreground **:data-[slot=dialog-close]:hover:text-foreground **:data-[slot=dialog-close]:bg-background w-full border-none bg-transparent p-0 shadow-none sm:max-w-xl **:data-[slot=dialog-close]:-inset-e-7 **:data[slot=dialog-close]:-top-7 **:data[slot=dialog-close]:size-7 **:data-[slot=dialog-close]:rounded-full">
          <DialogHeader className="sr-only">
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center">
            {selectedImage && (
              <>
                {isPreviewLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Spinner className="size-8 text-white" />
                  </div>
                )}
                <Image
                  src={selectedImage}
                  alt="Preview"
                  width={1000}
                  height={1000}
                  onLoad={() => setIsPreviewLoading(false)}
                  className={cn(
                    "rounded-lg h-full w-auto object-contain transition-opacity duration-300",
                    isPreviewLoading ? "opacity-0" : "opacity-100",
                  )}
                />
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
