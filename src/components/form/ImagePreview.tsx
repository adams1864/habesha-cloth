import { ActionIcon, Box, Skeleton } from "@mantine/core";
import { IconPhotoOff, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

type ImagePreviewProps = {
  aspectRatio?: "square" | "video";
  value?: string | File | null;
  onRemove?: () => void;
  avatar?: boolean;
};

export function ImagePreview({
  aspectRatio,
  value,
  onRemove,
  avatar = false,
}: ImagePreviewProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (value instanceof File) {
      const fileUrl = URL.createObjectURL(value);
      setUrl(fileUrl);
      setLoading(false);
      setShowFallback(false);
    } else if (typeof value === "string" && value) {
      setUrl(value);
      setLoading(false);
      setShowFallback(false);
    } else {
      setShowFallback(true);
    }
  }, [value]);

  if (!value) {
    return null;
  }

  return (
    <Box
      className={cn(
        `cursor-pointer rounded-md border`,
        avatar ? "h-[280px] w-[280px]" : "",
        aspectRatio === "square" ? "aspect-square" : "aspect-video",
      )}
    >
      <Box className={`group relative h-full w-full overflow-clip rounded-md`}>
        {showFallback ? (
          <Box className="grid h-full w-full place-content-center">
            <IconPhotoOff
              size={60}
              color="var(--primary-color-2)"
              stroke={1.5}
            />
          </Box>
        ) : (
          <>
            {loading && <Skeleton className="h-full w-full" />}
            {url && (
              <Box className="border-primary relative h-full border">
                <Image
                  className="object-contain group-hover:opacity-10"
                  fill
                  src={url}
                  alt=""
                  priority
                  onError={() => setShowFallback(true)}
                  onLoad={() => setLoading(false)}
                />
              </Box>
            )}
          </>
        )}
        <Box className="invisible absolute inset-0 flex cursor-pointer items-center justify-center group-hover:visible">
          <ActionIcon
            variant="subtle"
            color="red"
            aria-label="Remove"
            onClick={onRemove}
          >
            <IconTrash stroke={1.5} />
          </ActionIcon>
        </Box>
      </Box>
    </Box>
  );
}
