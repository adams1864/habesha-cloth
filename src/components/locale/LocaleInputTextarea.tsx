/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ActionIcon,
  Box,
  Stack,
  Textarea,
  type TextareaProps,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { IconTextRecognition } from "@tabler/icons-react";
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGE } from "@/utils/locale";
import { cn } from "@/utils/cn";

type LocaleInputTextareaProps = TextareaProps & {
  required?: boolean;
  field: string;
  register: any;
  errors: any;
};

export function LocaleInputTextarea({
  required,
  field,
  register,
  errors,
  ...props
}: LocaleInputTextareaProps) {
  const [expand, toggle] = useToggle();

  // Using constants instead of tenant provider
  const defaultLanguage = DEFAULT_LANGUAGE;
  const supportedLanguage = SUPPORTED_LANGUAGE.map(([key]) => key);

  const handleExpand = () => {
    toggle();
  };

  const language = supportedLanguage.filter(
    (key: string) => key !== defaultLanguage,
  );

  return (
    <>
      <Box className="flex items-center justify-between gap-4">
        <Textarea
          withAsterisk={required}
          className={cn("w-full")}
          autosize
          minLength={4}
          minRows={3}
          rightSection={
            language.length !== 0 && (
              <ActionIcon variant="outline" onClick={handleExpand}>
                <IconTextRecognition size={18} />
              </ActionIcon>
            )
          }
          {...register(`${field}.${defaultLanguage}`)}
          error={
            errors?.[field]?.[defaultLanguage]
              ? errors?.[field]?.[defaultLanguage].message?.toString()
              : ""
          }
          {...props}
        />
      </Box>
      {language.length !== 0 && expand && (
        <Stack pl={32}>
          {language.map((key: string) => (
            <Box className="flex items-center" key={key}>
              <Box w={40}>{key}</Box>
              <Textarea
                className="w-full"
                {...register(`${field}.${key}`)}
                error={
                  errors?.[field]?.[key]
                    ? errors?.[field]?.[key].message?.toString()
                    : ""
                }
              />
            </Box>
          ))}
        </Stack>
      )}
    </>
  );
}
