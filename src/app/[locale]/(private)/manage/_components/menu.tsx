import { SideMenu } from "@/components/side-menu/SideMenu";
import type { MenuTree } from "@/components/side-menu/side-menu.type";
import {
  IconBrandProducthunt,
  IconDiscount,
  IconHomeBolt,
  IconPackage,
  IconReorder,
  IconShoppingCart,
} from "@tabler/icons-react";

export async function ManageMenu() {
  // const user$ = {
  //   role: "admin",
  // };
  // const translation$ = getTranslations("Common");
  // const locale = await getLocale();

  // const [user, t] = await Promise.all([user$, translation$]);

  // if (!user) {
  //   redirect({ href: "/auth/login", locale });
  // }

  const menu = [
    {
      label: "dashboard",
      icon: <IconHomeBolt stroke={1.4} size={18} />,
      link: "/manage/dashboard",
      permission: ["admin"],
    },
    {
      label: "Products",
      icon: <IconBrandProducthunt stroke={1.4} size={18} />,
      link: "/manage/product",
      // permission: ['admin'],
    },
    {
      label: "Bundles",
      icon: <IconPackage stroke={1.4} size={18} />,
      link: "/manage/bundle",
      //  permission: ['admin'],
    },
    {
      label: "Orders",
      icon: <IconReorder stroke={1.4} size={18} />,
      link: "/manage/orders",
    },
    {
      label: "leads",
      icon: <IconShoppingCart stroke={1.4} size={18} />,
      link: "/manage/leads",
      // permission: [ROLE.ADMIN],
    },
    {
      label: "Discount",
      icon: <IconDiscount stroke={1.4} size={18} />,
      link: "/manage/discount",
    },
  ];
  return <SideMenu menu={menu as MenuTree[]} />;
}
