/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TextInputProps } from "@mantine/core";
import { ActionIcon, Box, Stack, TextInput } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { IconTextRecognition } from "@tabler/icons-react";
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGE } from "@/utils/locale";
import { cn } from "@/utils/cn";

export type LocaleInputTextProps = TextInputProps & {
  required?: boolean;
  field: string;
  register: any;
  errors?: any;
};

export function LocaleInputText({
  required,
  field,
  register,
  errors,
  ...props
}: LocaleInputTextProps) {
  const [expand, toggle] = useToggle();
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
      <Box className={cn("flex items-center justify-between gap-4")}>
        <TextInput
          withAsterisk={required}
          className={cn("w-full")}
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
        <Stack pl={32} className="mt-2">
          {language.map((key) => (
            <Box className="flex items-center" key={key}>
              <Box w={40}>{key}</Box>
              <TextInput
                className={cn("w-full")}
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
