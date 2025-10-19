"use client";

import NavigationLink from "@/components/link/NavigationLink";
import { usePathname } from "@/i18n/routing";
import { cn } from "@/utils/cn";
import { ActionIcon, Card, ScrollArea } from "@mantine/core";
import { IconLayoutSidebar } from "@tabler/icons-react";
import { useMemo } from "react";
import { useToggle } from "react-use";
import classes from "./SideMenu.module.css";
import type { MenuTree } from "./side-menu.type";

type MenuItemProps = {
  data: MenuTree;
  level?: number;
};

type MenuLabelProps = {
  link?: string;
  icon?: React.ReactNode;
  label: string;
  level?: number;
  pathMatch?: number;
};

const startsWith = (str: string, prefix: string) => str.startsWith(prefix);

function haveSameParentAtLevel(
  path1: string,
  path2: string,
  pathMatch: number,
): boolean {
  const getParentAtLevel = (path: string, level: number): string | undefined =>
    path.split("/").filter(Boolean)[level - 1];

  const parent1 = getParentAtLevel(path1, pathMatch);
  const parent2 = getParentAtLevel(path2, pathMatch);

  return parent1 !== undefined && parent1 === parent2;
}

const findActiveSubMenu = (data: MenuTree[], pathname: string): string[] => {
  let activeMenus: string[] = [];

  for (const item of data) {
    if (item.link && pathname.startsWith(item.link)) {
      activeMenus.push(item.label);
      if (item.children) {
        const childActiveMenus = findActiveSubMenu(item.children, pathname);
        activeMenus = activeMenus.concat(childActiveMenus);
      }
    } else if (item.children) {
      const childActiveMenus = findActiveSubMenu(item.children, pathname);
      activeMenus = activeMenus.concat(childActiveMenus);
    }
  }

  return activeMenus;
};

const MenuLabel = ({
  icon,
  link,
  label,
  pathMatch = 3,
  level = 0,
}: MenuLabelProps) => {
  const pathname = usePathname();

  const active =
    link &&
    (startsWith(pathname, link) ||
      haveSameParentAtLevel(pathname, link, pathMatch));

  const paddingLeft = 20 * level;

  return (
    <div
      className={cn(
        classes.menuItem,
        "text-primary-text flex cursor-pointer items-center rounded-md px-2 py-1 transition duration-300 ease-in-out",
        active ? classes.active : "",
      )}
      style={{ paddingLeft: paddingLeft <= 0 ? 20 : paddingLeft }}
    >
      <div
        className={cn(
          classes.activeIndicator,
          active ? "bg-primary-color-5" : "",
        )}
      ></div>
      <div className={classes.labelIcon}>{icon}</div>
      <span className="ml-2 truncate">{label}</span>
    </div>
  );
};
const MenuItem = ({ data, level = 0 }: MenuItemProps) => {
  const {
    isGroup,
    label,
    link,
    icon,
    children,
    permission,
    pathMatch: compare,
  } = data;
  const pathname = usePathname();

  const [open, toggle] = useToggle(false);

  const isActiveChildren = useMemo(() => {
    if (children && children.length > 0) {
      const foundActiveMenus = findActiveSubMenu(children, pathname);
      return foundActiveMenus.length > 0;
    }
    return false;
  }, [pathname, children]);

  const left = 20 * level + 10;
  const hasChildren = children && children.length > 0;
  const showChildren = (isGroup || open || isActiveChildren) && hasChildren;

  return (
    <li className={cn("relative", isGroup ? "mt-2" : "mt-1")}>
      {isGroup && <span className={classes.groupLabel}>{label}</span>}

      {!isGroup && (
        <>
          {link ? (
            <NavigationLink href={link} onClick={toggle}>
              <MenuLabel
                icon={icon}
                label={label}
                level={level}
                link={link}
                pathMatch={compare}
              />
            </NavigationLink>
          ) : (
            <button type="button" className="block w-full" onClick={toggle}>
              <MenuLabel
                icon={icon}
                label={label}
                level={level}
                pathMatch={compare}
              />
            </button>
          )}
        </>
      )}

      {showChildren && (
        <ul className={cn("relative", isGroup ? "mt-1" : "")}>
          <div
            className={cn(open ? classes.menuItemContainer : "")}
            style={{ left: left }}
          ></div>
          {children.map((child, index) => (
            <MenuItem
              data={child}
              level={level + 1}
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export function SideMenu({ menu }: { menu: MenuTree[] }) {
  const [open, toggle] = useToggle(true);
  // const t = useTranslations("Common");
  return (
    <Card className="h-[100%]">
      <Card.Section
        withBorder
        inheritPadding
        py="xs"
        px={open ? "" : "xs"}
        className="flex justify-between font-semibold"
      >
        {open && <span> {"Menu"}</span>}
        <ActionIcon variant="subtle" onClick={toggle}>
          <IconLayoutSidebar
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>
      </Card.Section>
      {open && (
        <ScrollArea className="w-[250px] py-4" scrollHideDelay={500}>
          <ul>
            {menu.map((group, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <MenuItem data={group} key={index} />
            ))}
          </ul>
        </ScrollArea>
      )}
    </Card>
  );
}
