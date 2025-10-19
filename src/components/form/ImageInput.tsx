"use client";

import { Box, Button, Flex, Input, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconPhoto, IconUser } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { ACCEPTED_IMAGE_TYPES } from "@/constants/file";
import { cn } from "@/utils/cn";
import { ImagePreview } from "./ImagePreview";

export type ImageInputProps = {
  label: React.ReactElement | string;
  value?: string | File | null;
  error?: string;
  accept?: string[];
  avatar?: boolean;
  aspectRatio?: "square" | "video";
  onChange: (file?: File) => void;
  onRemove: () => void;
  className: string;
};

export function ImageInput({
  label,
  accept = ACCEPTED_IMAGE_TYPES,
  aspectRatio,
  value: propValue,
  error,
  onChange,
  onRemove,
  className,
  avatar = false,
}: ImageInputProps) {
  const t = useTranslations("Common");
  const [value, setValue] = useState(propValue);
  const [hidePreview, setHidePreview] = useState(!value);

  const openRef = useRef<() => void>(null);

  const handleFile = (files: File[]) => {
    setValue(files[0]);
    onChange(files[0]);

    setHidePreview(false);
  };

  const handleRemove = () => {
    onRemove();

    setValue(undefined);
    setHidePreview(true);
  };

  useEffect(() => {
    setValue(propValue);
    setHidePreview(!propValue);
  }, [propValue]);

  return (
    <Input.Wrapper
      error={error}
      label={label}
      className={cn(className, avatar ? "" : "w-full min-w-[150px]")}
    >
      {hidePreview && (
        <Dropzone
          openRef={openRef}
          accept={accept}
          multiple={false}
          onDrop={handleFile}
          classNames={{
            root: "flex items-center justify-center",
          }}
          radius="md"
          style={
            avatar
              ? { borderRadius: "100%", height: "270px", width: "270px" }
              : {}
          }
        >
          <Box
            className={cn(
              "cursor-pointer",
              aspectRatio === "square" ? "aspect-square" : "aspect-video",
            )}
          >
            <Flex
              gap={"xs"}
              direction={"column"}
              justify={"center"}
              align={"center"}
            >
              {avatar ? (
                <IconUser
                  size={60}
                  stroke={1.5}
                  color="var(--primary-color-2)"
                />
              ) : (
                <IconPhoto
                  size={60}
                  stroke={1.5}
                  color="var(--primary-color-2)"
                />
              )}
              <Text c="var(--mantine-color-dimmed)" className="text-center">
                {t("clickHereOrDragImageToAdd")}
              </Text>
              <Button variant="outline" size="xs">
                {t("SelectFile")}
              </Button>
            </Flex>
          </Box>
        </Dropzone>
      )}

      {!hidePreview && (
        <Box
          className={
            avatar ? "h-[280px] w-[280px] overflow-clip rounded-full" : ""
          }
        >
          <ImagePreview avatar={avatar} value={value} onRemove={handleRemove} />
        </Box>
      )}
    </Input.Wrapper>
  );
}
