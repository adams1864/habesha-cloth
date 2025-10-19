/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Box,
  CheckIcon,
  CloseButton,
  Combobox,
  Group,
  Input,
  InputBase,
  type InputWrapperProps,
  LoadingOverlay,
  Pill,
  PillsInput,
  Text,
  useCombobox,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useState, useTransition } from "react";
import { useDeepCompareEffect } from "react-use";
import { LocaleText } from "@/components/locale/LocaleText";
import type { Locale } from "@/utils/locale";

export type OptionType = {
  id: string;
  name: Locale | string;
  email?: string;
  phone?: string;
};

type InputUnitTypeProps = {
  // biome-ignore lint/suspicious/noExplicitAny: dd
  value: any;
  // biome-ignore lint/suspicious/noExplicitAny: data
  onChange: (value: any) => void;
  // biome-ignore lint/suspicious/noExplicitAny: data
  onBlur?: any;
  getEntity: ({ search }: { search: string }) => Promise<OptionType[]>;
  placeholder?: string;
  variant?: "single" | "multiple";
  disabled?: boolean;
} & InputWrapperProps;

export const SelectRelation = React.forwardRef<
  HTMLInputElement,
  InputUnitTypeProps
>(
  (
    {
      variant = "single",
      value,
      placeholder,
      onChange,
      getEntity,
      disabled,
      ...rest
    }: InputUnitTypeProps,
    ref,
  ) => {
    const [entity, setEntity] = useState<OptionType[]>([]);
    const [searching, startSearching] = useTransition();
    const [search, setSearch] = useState("");
    const [selectValue, setSelectValue] = useState<OptionType[]>(
      variant === "multiple" && Array.isArray(value) ? value : [],
    );
    const t = useTranslations("Common");
    const combobox = useCombobox({
      onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [debounced] = useDebouncedValue(search, 200);

    // biome-ignore lint/correctness/useExhaustiveDependencies: dd
    const getSearch = useCallback(
      (text: string) => {
        startSearching(async () => {
          const result = await getEntity({ search: text });
          setEntity(result ?? []);
        });
      },
      [getEntity, startSearching],
    );

    useDeepCompareEffect(() => {
      getSearch(debounced?.toString() ?? "");
    }, [debounced, getSearch]);

    useEffect(() => {
      if (variant === "multiple" && Array.isArray(value)) {
        const valueIds = value.map((item: OptionType) => item.id).sort();
        const selectValueIds = selectValue.map((item) => item.id).sort();
        const isEqual =
          valueIds.length === selectValueIds.length &&
          valueIds.every((id, index) => id === selectValueIds[index]);

        if (!isEqual) {
          setSelectValue([...value] as OptionType[]);
        }
      }
    }, [value, variant, selectValue]);

    const onOptionSubmit = (val: string) => {
      const selected = entity.find(({ id }) => id === val);
      if (selected) {
        if (variant === "single") {
          onChange(selected);
        } else {
          const isAlreadySelected = selectValue.some(
            (item) => item.id === selected.id,
          );
          const updatedSelectValue = isAlreadySelected
            ? selectValue.filter((item) => item.id !== selected.id)
            : [...selectValue, selected];
          setSelectValue(updatedSelectValue);
          onChange(updatedSelectValue);
        }
      }

      combobox.closeDropdown();
    };

    const handleValueSelect = (val: string) => {
      const selected = entity.find(({ id }) => id === val);
      if (!selected) {
        return;
      }

      const isAlreadySelected = selectValue.some(
        (item) => item.id === selected.id,
      );

      const updatedSelectValue = isAlreadySelected
        ? selectValue.filter((item) => item.id !== selected.id)
        : [...selectValue, selected];

      setSelectValue(updatedSelectValue);
      onChange(updatedSelectValue);
    };

    const handleValueRemove = (item: OptionType) => {
      const alteredList = selectValue.filter((el) => el.id !== item.id);
      setSelectValue(alteredList);
      onChange(alteredList);
    };

    const SelectedValuesDisplay = () => {
      return (
        <>
          {selectValue.map((item) => (
            <Pill
              key={item.id}
              withRemoveButton
              onRemove={() => handleValueRemove(item)}
            >
              {typeof item.name === "string" ? (
                item.name
              ) : (
                <LocaleText text={item.name} />
              )}
            </Pill>
          ))}
        </>
      );
    };

    const options = entity.map((item) => (
      <Combobox.Option value={item.id} key={item.id}>
        <Group gap="sm">
          {variant === "multiple" &&
            selectValue.some((selected) => selected.id === item.id) && (
              <CheckIcon size={12} />
            )}
          {typeof item.name === "string" ? (
            item.name
          ) : (
            <LocaleText text={item.name} />
          )}
          <Text size="sm" c="dimmed">
            {item.email} {item.phone}
          </Text>
        </Group>
      </Combobox.Option>
    ));

    return (
      <Input.Wrapper {...rest} ref={ref}>
        <Combobox
          store={combobox}
          onOptionSubmit={
            variant === "single" ? onOptionSubmit : handleValueSelect
          }
        >
          {variant === "single" ? (
            <Combobox.Target>
              <InputBase
                component="button"
                type="button"
                pointer
                rightSection={
                  value && (value as OptionType).id ? (
                    <CloseButton
                      size="sm"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => {
                        setSelectValue([]);
                        onChange([]);
                      }}
                      aria-label={t("clearValue")}
                    />
                  ) : (
                    <Combobox.Chevron />
                  )
                }
                onClick={() => combobox.toggleDropdown()}
                rightSectionPointerEvents={value === null ? "none" : "all"}
                disabled={disabled}
              >
                {value ? (
                  (() => {
                    if (typeof value.name === "string") {
                      return value.name;
                    }
                    return <LocaleText text={value.name} />;
                  })()
                ) : (
                  <Input.Placeholder>{placeholder}</Input.Placeholder>
                )}
              </InputBase>
            </Combobox.Target>
          ) : (
            <Combobox.DropdownTarget>
              <PillsInput
                onClick={() => combobox.openDropdown()}
                rightSection={
                  selectValue.length > 0 ? (
                    <CloseButton
                      size="sm"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => {
                        setSelectValue([]);
                        onChange(null);
                      }}
                      aria-label={t("clearAll")}
                    />
                  ) : (
                    <Combobox.Chevron />
                  )
                }
              >
                <Pill.Group>
                  {selectValue.length > 0 ? (
                    <SelectedValuesDisplay />
                  ) : (
                    <Input.Placeholder>{placeholder}</Input.Placeholder>
                  )}
                </Pill.Group>
              </PillsInput>
            </Combobox.DropdownTarget>
          )}
          <Combobox.Dropdown>
            <Combobox.Search
              value={search}
              leftSection={<IconSearch size={14} />}
              onChange={(event) => setSearch(event.currentTarget.value)}
              placeholder={t("search")}
              rightSectionPointerEvents={search === "" ? "none" : "all"}
              rightSection={
                search !== "" ? (
                  <CloseButton
                    size="sm"
                    onClick={() => setSearch("")}
                    aria-label={t("clearSearch")}
                  />
                ) : null
              }
            />
            {searching ? (
              <Box className="relative min-h-[100px]">
                <LoadingOverlay
                  visible
                  overlayProps={{ radius: "sm", blur: 2 }}
                />
              </Box>
            ) : (
              <Combobox.Options mah={400} style={{ overflowY: "auto" }}>
                {options.length > 0 ? (
                  options
                ) : (
                  <Combobox.Empty>{t("nothingFound")}</Combobox.Empty>
                )}
              </Combobox.Options>
            )}
          </Combobox.Dropdown>
        </Combobox>
      </Input.Wrapper>
    );
  },
);

SelectRelation.displayName = "SelectRelation";
