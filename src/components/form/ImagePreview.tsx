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

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect width='600' height='600' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' fill='%236b7280' font-size='32' text-anchor='middle' font-family='system-ui' dy='.35em'%3ENo Image%3C/text%3E%3C/svg%3E";

function sanitizeImageUrl(input: string | null | undefined): string {
  if (!input) return FALLBACK_IMAGE;
  if (/placehold\.co/i.test(input)) {
    return FALLBACK_IMAGE;
  }
  return input;
}

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
      const sanitized = sanitizeImageUrl(value);
      setUrl(sanitized);
      setLoading(false);
      setShowFallback(!sanitized);
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
            {url && !showFallback && (
              <Box className="border-primary relative h-full border">
                <Image
                  className="object-contain group-hover:opacity-10"
                  fill
                  src={url}
                  alt=""
                  priority
                  onError={() => {
                    setShowFallback(true);
                    setUrl("");
                  }}
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
