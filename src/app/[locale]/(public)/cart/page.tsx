"use client";

import { Container, Title, Stack, Grid, Paper, Divider } from "@mantine/core";
import { CartBreadcrumb } from "./_components/CartBreadcrumb";
import { CartItem } from "./_components/CartItem";
import { BundleItem } from "./_components/BundleItem";
import { OrderSummary } from "./_components/OrderSummary";
import { EmptyCart } from "./_components/EmptyCart";

// Mock cart data
const cartItems = [
  {
    id: 1,
    name: "Organic Cotton Romper",
    price: 20.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDVZ5UqMuV6_dY24jnRv4vtu3pzr04gASD-E8u6M--OFTVnU4osomlmQ249AEypeNFdQJgG8vFvELtYw9YuQRor01s1W-x-l6gO7qt_bbJUekKkbPVsWtmYRoALDK937U_nSKqUzakz9-pYT4mEXBJ7o4AzraYz2Waa2u41t-W2pNgVc6hczoObqyKjt5w77Odp3zjLXFn_lAPbY-7pKt1pHjWdpH6E5bybBE_rtrOGqXZlQ8D2GXpNwg0WzKN77WMf2bnK_NkUisE",
    size: "6-12 Months",
    quantity: 1,
  },
];

const bundleItems = [
  {
    id: 2,
    name: '"Newborn Essentials" Custom Giftbox',
    totalPrice: 45.0,
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC5o2sR1eTAx0lhWEX6e0vO4dZIL92KqHs40IgAOAzGIf9d7n_aVl1HokfN6_gf0qM0P0Nn3xC2u0Vwsp_YL4zHXzs5se45Evd5zIi4w3rovG5CNC3seNA-HLMcb-LkV_9Ydo_pQsqO54NwoGHT6pcPx9P14uZ7LqRuMLNFpBK89K1Y3PXqNS23aeRr2z5hHLMb57ttyR2nBCNkGBZfrukDN2YD-tnaSKIq2o_hzDMiw3PzkI8sADa0jU6aWgTBN5P9Djd8vMlsToM",
    quantity: 1,
    products: [
      {
        id: 201,
        name: "Soft Knit Baby Hat",
        price: 15.0,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuC5o2sR1eTAx0lhWEX6e0vO4dZIL92KqHs40IgAOAzGIf9d7n_aVl1HokfN6_gf0qM0P0Nn3xC2u0Vwsp_YL4zHXzs5se45Evd5zIi4w3rovG5CNC3seNA-HLMcb-LkV_9Ydo_pQsqO54NwoGHT6pcPx9P14uZ7LqRuMLNFpBK89K1Y3PXqNS23aeRr2z5hHLMb57ttyR2nBCNkGBZfrukDN2YD-tnaSKIq2o_hzDMiw3PzkI8sADa0jU6aWgTBN5P9Djd8vMlsToM",
        size: "0-3 Months",
      },
      {
        id: 202,
        name: "Cotton Mittens",
        price: 10.0,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBWCgEYXJUJ2F-Srze3O1SYxSSvpWM4q65uWJO169WRCGtthh1pacAQOWseXw80PRw3g4SJU0fl3te8iIq_gLaZksUgpDF0pvm56mSHKyWgktpIb4q1XhztpLr7K1yKfhKvnW2ZKObkBPvUl5zshk2s7QzEFahXygnMuxBCHynyhAH8mfNPT7aRCyGGIpM4fZSMkaPE7Ga_Ft06R8jnIi3hkn6sZoHBqSntzOqIRtz4BjWmkTHd-FlNrwOrov9OQRijqcZ6CPjLpto",
        color: "White",
      },
      {
        id: 203,
        name: "Cozy Fleece Booties",
        price: 20.0,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDANVfNRCFnZi1Jyzzk5gmL5wvbSprMeJMOI4dcIrfQFFgIYPz_IVXSbVd5uB1bh_l90itqP5CiLZdsIB6SdycilXjUVglFIeqgbBpuIAWIb0-6NTNGf1vHedDYq0KnOxbVFYVx1qr490N_puyRIhp5CginKQ7KyhDv8-4GCb8ZlA8jksWjz9XkcdXmXkC3WTlXw3Ri9oW-Nu2phsfhWoqqIC5pi45zGlBCrsmXs-Uwy3w2f94-4QAYaYq_BNHkoePIekB7FBWz4Gc",
        size: "0-6 Months",
      },
    ],
  },
];

export default function CartPage() {
  const subtotal =
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) +
    bundleItems.reduce((acc, item) => acc + item.totalPrice * item.quantity, 0);

  const hasItems = cartItems.length > 0 || bundleItems.length > 0;

  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <div>
          <CartBreadcrumb />
          <Title order={1} size="h1" fw={700} className="text-gray-900 mt-4">
            Your Cart
          </Title>
        </div>

        {!hasItems ? (
          <EmptyCart />
        ) : (
          <Grid gutter="lg">
            <Grid.Col span={{ base: 12, lg: 8 }}>
              <Stack gap="lg">
                <Paper shadow="sm" radius="md" p="lg" className="bg-white">
                  <Stack gap="lg">
                    {cartItems.map((item, index) => (
                      <div key={item.id}>
                        {index > 0 && <Divider />}
                        <CartItem {...item} />
                      </div>
                    ))}

                    {bundleItems.map((bundle) => (
                      <div key={bundle.id}>
                        <Divider />
                        <BundleItem {...bundle} />
                      </div>
                    ))}
                  </Stack>
                </Paper>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, lg: 4 }}>
              <OrderSummary subtotal={subtotal} shipping={0} />
            </Grid.Col>
          </Grid>
        )}
      </Stack>
    </Container>
  );
}
