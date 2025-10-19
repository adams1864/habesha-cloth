export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  itemNumber?: string;
  rating?: number;
  reviewCount?: number;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  images?: string[];
}

export interface BundleProduct extends Product {
  bundleImage: string;
}

export interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  notHelpful: number;
}

export const bundleProducts: BundleProduct[] = [
  {
    id: 1,
    name: "Cozy Bear Onesie",
    price: 25,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDjGEQEaK5og67zlQnzkQNOhC_4QzQs6C0kMj3nfXg69XkgmSjRxA01keWfMJEuL7i3dw3RyKWD6yj8gbg5Ty8pRSxPZwCx0wUq6yglwv-bwNC5cVoH2qbX3nfeRD6fWh1eRocxbyrmMmNHZsopPHuyA-FYPFDeMeWTWb2MUm4HHjxsoM1fsYhQybvgLGz_eUGHan1D9HNuvBVSII19KcZu5Fswjp87my0t7hSHDGE4XQJ-vChuDPJM4dWXEXQ1Sl9aJW0DxuGb4uM",
    bundleImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDjGEQEaK5og67zlQnzkQNOhC_4QzQs6C0kMj3nfXg69XkgmSjRxA01keWfMJEuL7i3dw3RyKWD6yj8gbg5Ty8pRSxPZwCx0wUq6yglwv-bwNC5cVoH2qbX3nfeRD6fWh1eRocxbyrmMmNHZsopPHuyA-FYPFDeMeWTWb2MUm4HHjxsoM1fsYhQybvgLGz_eUGHan1D9HNuvBVSII19KcZu5Fswjp87my0t7hSHDGE4XQJ-vChuDPJM4dWXEXQ1Sl9aJW0DxuGb4uM",
  },
  {
    id: 2,
    name: "Rainbow Romper",
    price: 30,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDipbNP5lT6XBDlqwVrFRAREcup5D_iiWCfP0hpGWU_Kb-unUOl8NqMMY_I3Syqx_gLLhJst0DnevTLJzkufhiQfWS7FxPRGbw90kVaRPi8Hn-wQ73IMFIy7H8Em1vi6lmVm33QaJvfKPyonGmjkbFJnFg1rIQasO5CKJbUqTeCbEFiNJPqCr-O6HLiUNikY5ziO2APC4JRFdVkHWEkN9pD9TKJq5WWftj3QIN78C2D_A4rKGyqggS7MeLdAjB6d4KJWt5-efMPdfc",
    bundleImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDipbNP5lT6XBDlqwVrFRAREcup5D_iiWCfP0hpGWU_Kb-unUOl8NqMMY_I3Syqx_gLLhJst0DnevTLJzkufhiQfWS7FxPRGbw90kVaRPi8Hn-wQ73IMFIy7H8Em1vi6lmVm33QaJvfKPyonGmjkbFJnFg1rIQasO5CKJbUqTeCbEFiNJPqCr-O6HLiUNikY5ziO2APC4JRFdVkHWEkN9pD9TKJq5WWftj3QIN78C2D_A4rKGyqggS7MeLdAjB6d4KJWt5-efMPdfc",
  },
  {
    id: 3,
    name: "Starry Pajamas",
    price: 20,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuASJUujGSEk5iFOf2qzlNDktezjDOTodEqpvt3w3579mfc4dzkyX5in4GXKPGjvF9VnDEevTTH5M0Klj4XTdbeMtZ3HuVNIowfVxrn_pcEAU6bfUW7vIB7Xdu3nnSfMg1dAJQ2bVNSk8na_5pXyiu4T3OzshFsNkb1iwWAipOIGndgMHvWhEGWiC9CmnSC6crc9jlQk3q-00Xh2FP4tziiOemiLtDa3uYAzJkLefOKBRrp9xNJ8B-FrQ0AOEyjeA011nzdM5lAD0-8",
    bundleImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuASJUujGSEk5iFOf2qzlNDktezjDOTodEqpvt3w3579mfc4dzkyX5in4GXKPGjvF9VnDEevTTH5M0Klj4XTdbeMtZ3HuVNIowfVxrn_pcEAU6bfUW7vIB7Xdu3nnSfMg1dAJQ2bVNSk8na_5pXyiu4T3OzshFsNkb1iwWAipOIGndgMHvWhEGWiC9CmnSC6crc9jlQk3q-00Xh2FP4tziiOemiLtDa3uYAzJkLefOKBRrp9xNJ8B-FrQ0AOEyjeA011nzdM5lAD0-8",
  },
  {
    id: 4,
    name: "Sunny Day Outfit",
    price: 35,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgZpMLp25Y15xo9no3c5dcsLoD0xs04q0gQDtWyEdLMO-3c67qILdT7Xpx31WJdZystmccRUnFXpqbu3V8Hu5BeKuOFzoh4MPDMZ5N1kGBUfvCHAv5yxJj0qrcoNIbCiOq4Tv6k6-9ZHIrgH1vvlS9V4iQYuyH2wfN9VayCTxcQgfeyDyGz2A_oHV7ZVGbbmiZqa6Ewd1ZtRQd1Ubz0fJHReAAhPcfFTLna6w_MkLn4EXCErl4TZC8dxJ7TJvhZDA9VAFkNFOXC4g",
    bundleImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgZpMLp25Y15xo9no3c5dcsLoD0xs04q0gQDtWyEdLMO-3c67qILdT7Xpx31WJdZystmccRUnFXpqbu3V8Hu5BeKuOFzoh4MPDMZ5N1kGBUfvCHAv5yxJj0qrcoNIbCiOq4Tv6k6-9ZHIrgH1vvlS9V4iQYuyH2wfN9VayCTxcQgfeyDyGz2A_oHV7ZVGbbmiZqa6Ewd1ZtRQd1Ubz0fJHReAAhPcfFTLna6w_MkLn4EXCErl4TZC8dxJ7TJvhZDA9VAFkNFOXC4g",
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Cozy Bear Onesie",
    price: 25,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDjGEQEaK5og67zlQnzkQNOhC_4QzQs6C0kMj3nfXg69XkgmSjRxA01keWfMJEuL7i3dw3RyKWD6yj8gbg5Ty8pRSxPZwCx0wUq6yglwv-bwNC5cVoH2qbX3nfeRD6fWh1eRocxbyrmMmNHZsopPHuyA-FYPFDeMeWTWb2MUm4HHjxsoM1fsYhQybvgLGz_eUGHan1D9HNuvBVSII19KcZu5Fswjp87my0t7hSHDGE4XQJ-vChuDPJM4dWXEXQ1Sl9aJW0DxuGb4uM",
    description:
      "Wrap your little one in the softest embrace with our Cozy Cloud Onesie. Made from 100% organic cotton, this onesie is gentle on delicate skin and perfect for all-day comfort. Featuring a charming cloud print and snap closures for easy changes, it's a must-have for every baby's wardrobe.",
    itemNumber: "12345",
    rating: 4.8,
    reviewCount: 25,
    sizes: ["0-3 Months", "3-6 Months", "6-12 Months"],
    colors: [
      { name: "Alice Blue", hex: "#f0f8ff" },
      { name: "Lavender", hex: "#e6e6fa" },
      { name: "Lavender Blush", hex: "#fff0f5" },
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAoyXy5E6vO7sK4t_L_NRolXcmbBZiNexpyF1EzKyqNgP2fLI-zN44_yTHv5Vy-zb7XTimQrhCFnYB5LlHeoWJDu2ssxN2Tva8b5m86Wp_cp0t2fEy8S0BltpcGOdQo2LTIWvliOhFMP4xzV5YsWMcwO5slPt37YGtpl7pttgQdw2G3EdYctBNH6Q8J4uGEnp7cjQWTN4JfniGci1bwGsYEB2keiKzNcGGNQ2vPQ2CbRipI7_MorriEINvDyOJA6iUdZG9UtZD9jYA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCaQaeoHOKoA_i1233GHCvk553_sgR6N4XU7jagkPthouVdLDR8bO5_tJ04l2l1pWiUmjC8tNgI7qxeTUJc911I6nq5wFCMonkdaaUCtjI95qSeeF-6yHdd7KNqlJFS7rynLGwIgdAZjklOmKiJ-mg6CfHFoh9xM3AqkiDsrsGID85vieDTySCwZgDFn4-ZvDu2rp_WNszsQ89-p5exRHI9409F2vXSiNIW8LoEjVX2ntOfTC7kna9Y9ljtTvelGNoYOf9dD7jfUmA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD1RybCkBt31k02uXGfSkxUcDfvJxd-0-lSMATQEbfpvQT8ycSE-0ueYE2XFlqqkg0xE8gm25gimEFseF5bstxOqYMXaypXyTDDefmmlOB06tu8--lKR_VIt8GXhY2T7aPEHohIkbNgTUDzjqtClBXTiBGJBFYGyiE7Eg7Qc9SOB2oURP43zCk1KP7HXXyKxsHP-CjSjkWVFg_A_MeoS5vb4xBiRfwZtkgJH4qPFcdUqv3pQIE8KG3rrkXpfiPPU0p5vxzvnLoxamk",
    ],
  },
  {
    id: 2,
    name: "Rainbow Dreams Romper",
    price: 30,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDipbNP5lT6XBDlqwVrFRAREcup5D_iiWCfP0hpGWU_Kb-unUOl8NqMMY_I3Syqx_gLLhJst0DnevTLJzkufhiQfWS7FxPRGbw90kVaRPi8Hn-wQ73IMFIy7H8Em1vi6lmVm33QaJvfKPyonGmjkbFJnFg1rIQasO5CKJbUqTeCbEFiNJPqCr-O6HLiUNikY5ziO2APC4JRFdVkHWEkN9pD9TKJq5WWftj3QIN78C2D_A4rKGyqggS7MeLdAjB6d4KJWt5-efMPdfc",
    description:
      "Brighten up your little one's day with our vibrant Rainbow Dreams Romper! This cheerful one-piece features a beautiful rainbow pattern that sparks joy and imagination. Made from soft, breathable cotton blend, it's perfect for playtime adventures and sunny day outings.",
    itemNumber: "12346",
    rating: 4.6,
    reviewCount: 18,
    sizes: ["6-12 Months", "12-18 Months", "18-24 Months"],
    colors: [
      { name: "Rainbow", hex: "#ff6b6b" },
      { name: "Sky Blue", hex: "#4ecdc4" },
      { name: "Sunshine Yellow", hex: "#ffe66d" },
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDipbNP5lT6XBDlqwVrFRAREcup5D_iiWCfP0hpGWU_Kb-unUOl8NqMMY_I3Syqx_gLLhJst0DnevTLJzkufhiQfWS7FxPRGbw90kVaRPi8Hn-wQ73IMFIy7H8Em1vi6lmVm33QaJvfKPyonGmjkbFJnFg1rIQasO5CKJbUqTeCbEFiNJPqCr-O6HLiUNikY5ziO2APC4JRFdVkHWEkN9pD9TKJq5WWftj3QIN78C2D_A4rKGyqggS7MeLdAjB6d4KJWt5-efMPdfc",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgZpMLp25Y15xo9no3c5dcsLoD0xs04q0gQDtWyEdLMO-3c67qILdT7Xpx31WJdZystmccRUnFXpqbu3V8Hu5BeKuOFzoh4MPDMZ5N1kGBUfvCHAv5yxJj0qrcoNIbCiOq4Tv6k6-9ZHIrgH1vvlS9V4iQYuyH2wfN9VayCTxcQgfeyDyGz2A_oHV7ZVGbbmiZqa6Ewd1ZtRQd1Ubz0fJHReAAhPcfFTLna6w_MkLn4EXCErl4TZC8dxJ7TJvhZDA9VAFkNFOXC4g",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB3Ms-OGG9WqZS7LQqTGS1FCEwF3CjV3SgveiVdEpZrDTAB68fRt0UMXSOn6a8coJpGk2ZuzKoFOcxGcEBE2I12zBwNx-geYi8SQZYmqo3_CudpRBpNSGMIE7ZBW9O9SwiN6HozCpWm0PswM2UNIirWqsed5eQBWJFbqAkm-aWMtPR0xKcFUF1rM_ZBGZb291quPrIOG04MWgyC5n281Ec3rDAd5Tk8M3-PitqSWkFuyVVtdQwQmORuwRRFDJPMdl9DMcFRXirKwBk",
    ],
  },
  {
    id: 3,
    name: "Starry Night Pajamas",
    price: 20,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuASJUujGSEk5iFOf2qzlNDktezjDOTodEqpvt3w3579mfc4dzkyX5in4GXKPGjvF9VnDEevTTH5M0Klj4XTdbeMtZ3HuVNIowfVxrn_pcEAU6bfUW7vIB7Xdu3nnSfMg1dAJQ2bVNSk8na_5pXyiu4T3OzshFsNkb1iwWAipOIGndgMHvWhEGWiC9CmnSC6crc9jlQk3q-00Xh2FP4tziiOemiLtDa3uYAzJkLefOKBRrp9xNJ8B-FrQ0AOEyjeA011nzdM5lAD0-8",
    description:
      "Let your little dreamer drift off to sleep under a starry sky with our cozy Starry Night Pajamas. This adorable two-piece set features twinkling stars and crescent moons on a deep navy background. Made from ultra-soft cotton, it ensures a comfortable night's sleep for your little one.",
    itemNumber: "12347",
    rating: 4.9,
    reviewCount: 32,
    sizes: ["0-3 Months", "3-6 Months", "6-12 Months", "12-18 Months"],
    colors: [
      { name: "Midnight Blue", hex: "#191970" },
      { name: "Deep Purple", hex: "#4b0082" },
      { name: "Navy", hex: "#000080" },
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuASJUujGSEk5iFOf2qzlNDktezjDOTodEqpvt3w3579mfc4dzkyX5in4GXKPGjvF9VnDEevTTH5M0Klj4XTdbeMtZ3HuVNIowfVxrn_pcEAU6bfUW7vIB7Xdu3nnSfMg1dAJQ2bVNSk8na_5pXyiu4T3OzshFsNkb1iwWAipOIGndgMHvWhEGWiC9CmnSC6crc9jlQk3q-00Xh2FP4tziiOemiLtDa3uYAzJkLefOKBRrp9xNJ8B-FrQ0AOEyjeA011nzdM5lAD0-8",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgZpMLp25Y15xo9no3c5dcsLoD0xs04q0gQDtWyEdLMO-3c67qILdT7Xpx31WJdZystmccRUnFXpqbu3V8Hu5BeKuOFzoh4MPDMZ5N1kGBUfvCHAv5yxJj0qrcoNIbCiOq4Tv6k6-9ZHIrgH1vvlS9V4iQYuyH2wfN9VayCTxcQgfeyDyGz2A_oHV7ZVGbbmiZqa6Ewd1ZtRQd1Ubz0fJHReAAhPcfFTLna6w_MkLn4EXCErl4TZC8dxJ7TJvhZDA9VAFkNFOXC4g",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB3Ms-OGG9WqZS7LQqTGS1FCEwF3CjV3SgveiVdEpZrDTAB68fRt0UMXSOn6a8coJpGk2ZuzKoFOcxGcEBE2I12zBwNx-geYi8SQZYmqo3_CudpRBpNSGMIE7ZBW9O9SwiN6HozCpWm0PswM2UNIirWqsed5eQBWJFbqAkm-aWMtPR0xKcFUF1rM_ZBGZb291quPrIOG04MWgyC5n281Ec3rDAd5Tk8M3-PitqSWkFuyVVtdQwQmORuwRRFDJPMdl9DMcFRXirKwBk",
    ],
  },
  {
    id: 4,
    name: "Sunny Day Outfit",
    price: 35,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgZpMLp25Y15xo9no3c5dcsLoD0xs04q0gQDtWyEdLMO-3c67qILdT7Xpx31WJdZystmccRUnFXpqbu3V8Hu5BeKuOFzoh4MPDMZ5N1kGBUfvCHAv5yxJj0qrcoNIbCiOq4Tv6k6-9ZHIrgH1vvlS9V4iQYuyH2wfN9VayCTxcQgfeyDyGz2A_oHV7ZVGbbmiZqa6Ewd1ZtRQd1Ubz0fJHReAAhPcfFTLna6w_MkLn4EXCErl4TZC8dxJ7TJvhZDA9VAFkNFOXC4g",
    description:
      "Perfect for bright, cheerful days! Our Sunny Day Outfit features a delightful sun and cloud pattern that brings warmth and happiness to your little one's wardrobe. This comfortable two-piece set is ideal for outdoor adventures, playdates, and family outings.",
    itemNumber: "12348",
    rating: 4.7,
    reviewCount: 22,
    sizes: ["6-12 Months", "12-18 Months", "18-24 Months", "2T"],
    colors: [
      { name: "Sunshine Yellow", hex: "#ffd700" },
      { name: "Sky Blue", hex: "#87ceeb" },
      { name: "Coral", hex: "#ff7f50" },
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgZpMLp25Y15xo9no3c5dcsLoD0xs04q0gQDtWyEdLMO-3c67qILdT7Xpx31WJdZystmccRUnFXpqbu3V8Hu5BeKuOFzoh4MPDMZ5N1kGBUfvCHAv5yxJj0qrcoNIbCiOq4Tv6k6-9ZHIrgH1vvlS9V4iQYuyH2wfN9VayCTxcQgfeyDyGz2A_oHV7ZVGbbmiZqa6Ewd1ZtRQd1Ubz0fJHReAAhPcfFTLna6w_MkLn4EXCErl4TZC8dxJ7TJvhZDA9VAFkNFOXC4g",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB3Ms-OGG9WqZS7LQqTGS1FCEwF3CjV3SgveiVdEpZrDTAB68fRt0UMXSOn6a8coJpGk2ZuzKoFOcxGcEBE2I12zBwNx-geYi8SQZYmqo3_CudpRBpNSGMIE7ZBW9O9SwiN6HozCpWm0PswM2UNIirWqsed5eQBWJFbqAkm-aWMtPR0xKcFUF1rM_ZBGZb291quPrIOG04MWgyC5n281Ec3rDAd5Tk8M3-PitqSWkFuyVVtdQwQmORuwRRFDJPMdl9DMcFRXirKwBk",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBgxSTG_MAGWnmeuNcoqZo3ZHVfWJO2Rj_6nNhTFaqITzEgU7h6Qux6lrvbdGbjYm7x6R3_uOeqiBb9hXAnXJTxgoflQM7MrYPxsfjCSE2_tbhAl3cO_XZsJuc_x_aU9W2epNbPtDKRTsYJyA-RNxew37qQ3w2bLvB246wofouJdkVO8ysnGhkYS2eZEYHFB5tNHoeNwtlkjL97yVur1T_WdPra38t8qsdHr1r7KG6zHJq3azQxXvC69g9HXmA1xKgjW2u_zS16kh0",
    ],
  },
  {
    id: 5,
    name: "Little Lamb Sweater",
    price: 40,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB3Ms-OGG9WqZS7LQqTGS1FCEwF3CjV3SgveiVdEpZrDTAB68fRt0UMXSOn6a8coJpGk2ZuzKoFOcxGcEBE2I12zBwNx-geYi8SQZYmqo3_CudpRBpNSGMIE7ZBW9O9SwiN6HozCpWm0PswM2UNIirWqsed5eQBWJFbqAkm-aWMtPR0xKcFUF1rM_ZBGZb291quPrIOG04MWgyC5n281Ec3rDAd5Tk8M3-PitqSWkFuyVVtdQwQmORuwRRFDJPMdl9DMcFRXirKwBk",
    description:
      "Keep your little one cozy and adorable with our Little Lamb Sweater! This soft, knitted sweater features an adorable lamb design that's perfect for cooler weather. Made from premium cotton blend, it's gentle on sensitive skin while providing warmth and comfort.",
    itemNumber: "12349",
    rating: 4.5,
    reviewCount: 28,
    sizes: ["6-12 Months", "12-18 Months", "18-24 Months", "2T", "3T"],
    colors: [
      { name: "Cream", hex: "#f5f5dc" },
      { name: "Light Gray", hex: "#d3d3d3" },
      { name: "Soft Pink", hex: "#ffb6c1" },
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB3Ms-OGG9WqZS7LQqTGS1FCEwF3CjV3SgveiVdEpZrDTAB68fRt0UMXSOn6a8coJpGk2ZuzKoFOcxGcEBE2I12zBwNx-geYi8SQZYmqo3_CudpRBpNSGMIE7ZBW9O9SwiN6HozCpWm0PswM2UNIirWqsed5eQBWJFbqAkm-aWMtPR0xKcFUF1rM_ZBGZb291quPrIOG04MWgyC5n281Ec3rDAd5Tk8M3-PitqSWkFuyVVtdQwQmORuwRRFDJPMdl9DMcFRXirKwBk",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBgxSTG_MAGWnmeuNcoqZo3ZHVfWJO2Rj_6nNhTFaqITzEgU7h6Qux6lrvbdGbjYm7x6R3_uOeqiBb9hXAnXJTxgoflQM7MrYPxsfjCSE2_tbhAl3cO_XZsJuc_x_aU9W2epNbPtDKRTsYJyA-RNxew37qQ3w2bLvB246wofouJdkVO8ysnGhkYS2eZEYHFB5tNHoeNwtlkjL97yVur1T_WdPra38t8qsdHr1r7KG6zHJq3azQxXvC69g9HXmA1xKgjW2u_zS16kh0",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDS2ydy-tlTccs0xeR9q24GoU3M0aH1z60SkxjE4ZPMFiArwlAiCF4x0duuHL2uPpw2xYqE_poJUz4IVIM4zeGwx3Ye351cfglR4x4adbqNena1nF2R2qoe9jWcMmwSlHD_QNPI1-qFgZrTs24tKFnGUS90fIGxYyHfqvqzwzb-YkHrBUxBuvh6tQ8MJvqhj6FFdFk-mVqGFp65YjYCqwL33I9jjB2APAutBrwSrC0s_FRXOA75TcvyY2lKxt971rv5-R9nlJjejCk",
    ],
  },
  {
    id: 6,
    name: "Playful Penguin Set",
    price: 28,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBgxSTG_MAGWnmeuNcoqZo3ZHVfWJO2Rj_6nNhTFaqITzEgU7h6Qux6lrvbdGbjYm7x6R3_uOeqiBb9hXAnXJTxgoflQM7MrYPxsfjCSE2_tbhAl3cO_XZsJuc_x_aU9W2epNbPtDKRTsYJyA-RNxew37qQ3w2bLvB246wofouJdkVO8ysnGhkYS2eZEYHFB5tNHoeNwtlkjL97yVur1T_WdPra38t8qsdHr1r7KG6zHJq3azQxXvC69g9HXmA1xKgjW2u_zS16kh0",
    description:
      "Waddle into cuteness with our Playful Penguin Set! This adorable two-piece outfit features charming penguin designs that will make your little one the cutest baby around. Perfect for winter days and photo opportunities, this set combines style with comfort.",
    itemNumber: "12350",
    rating: 4.8,
    reviewCount: 35,
    sizes: ["6-12 Months", "12-18 Months", "18-24 Months", "2T"],
    colors: [
      { name: "Black & White", hex: "#000000" },
      { name: "Navy & White", hex: "#000080" },
      { name: "Gray & White", hex: "#808080" },
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBgxSTG_MAGWnmeuNcoqZo3ZHVfWJO2Rj_6nNhTFaqITzEgU7h6Qux6lrvbdGbjYm7x6R3_uOeqiBb9hXAnXJTxgoflQM7MrYPxsfjCSE2_tbhAl3cO_XZsJuc_x_aU9W2epNbPtDKRTsYJyA-RNxew37qQ3w2bLvB246wofouJdkVO8ysnGhkYS2eZEYHFB5tNHoeNwtlkjL97yVur1T_WdPra38t8qsdHr1r7KG6zHJq3azQxXvC69g9HXmA1xKgjW2u_zS16kh0",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDS2ydy-tlTccs0xeR9q24GoU3M0aH1z60SkxjE4ZPMFiArwlAiCF4x0duuHL2uPpw2xYqE_poJUz4IVIM4zeGwx3Ye351cfglR4x4adbqNena1nF2R2qoe9jWcMmwSlHD_QNPI1-qFgZrTs24tKFnGUS90fIGxYyHfqvqzwzb-YkHrBUxBuvh6tQ8MJvqhj6FFdFk-mVqGFp65YjYCqwL33I9jjB2APAutBrwSrC0s_FRXOA75TcvyY2lKxt971rv5-R9nlJjejCk",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDURUmU1YlZaLAtXBqUYhK_uboZaxVQO6xU0gSDe6BiujWBm2rNhWAuQ5LqMgTk8qj5QrKeKTpQZFZ3MeKHkNIM1zdIpeDmu5PiuJ07iISDzkB_Psnj0KGyVuNz2an-ATEdDYovc7DHOeESM0HpVS48yA0pU2Ujbod0HvlwTA4MvVkSB79F99okx9xNj8vSPv6YDhmirNG82XyFPfxSNV6Uvq45e0-ynB1IlxFphg59LoYQb-xqnzg07YViaPT1-3B-z5ISQuX48fY",
    ],
  },
  {
    id: 7,
    name: "Sweet Pea Dress",
    price: 32,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDS2ydy-tlTccs0xeR9q24GoU3M0aH1z60SkxjE4ZPMFiArwlAiCF4x0duuHL2uPpw2xYqE_poJUz4IVIM4zeGwx3Ye351cfglR4x4adbqNena1nF2R2qoe9jWcMmwSlHD_QNPI1-qFgZrTs24tKFnGUS90fIGxYyHfqvqzwzb-YkHrBUxBuvh6tQ8MJvqhj6FFdFk-mVqGFp65YjYCqwL33I9jjB2APAutBrwSrC0s_FRXOA75TcvyY2lKxt971rv5-R9nlJjejCk",
    description:
      "Dress your little princess in our charming Sweet Pea Dress! This delicate floral dress features tiny pea pod and flower patterns that are perfect for special occasions, family gatherings, or just making everyday moments extra special. Made from soft, breathable fabric.",
    itemNumber: "12351",
    rating: 4.9,
    reviewCount: 41,
    sizes: ["6-12 Months", "12-18 Months", "18-24 Months", "2T", "3T", "4T"],
    colors: [
      { name: "Mint Green", hex: "#98fb98" },
      { name: "Lavender", hex: "#e6e6fa" },
      { name: "Blush Pink", hex: "#ffb6c1" },
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDS2ydy-tlTccs0xeR9q24GoU3M0aH1z60SkxjE4ZPMFiArwlAiCF4x0duuHL2uPpw2xYqE_poJUz4IVIM4zeGwx3Ye351cfglR4x4adbqNena1nF2R2qoe9jWcMmwSlHD_QNPI1-qFgZrTs24tKFnGUS90fIGxYyHfqvqzwzb-YkHrBUxBuvh6tQ8MJvqhj6FFdFk-mVqGFp65YjYCqwL33I9jjB2APAutBrwSrC0s_FRXOA75TcvyY2lKxt971rv5-R9nlJjejCk",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDURUmU1YlZaLAtXBqUYhK_uboZaxVQO6xU0gSDe6BiujWBm2rNhWAuQ5LqMgTk8qj5QrKeKTpQZFZ3MeKHkNIM1zdIpeDmu5PiuJ07iISDzkB_Psnj0KGyVuNz2an-ATEdDYovc7DHOeESM0HpVS48yA0pU2Ujbod0HvlwTA4MvVkSB79F99okx9xNj8vSPv6YDhmirNG82XyFPfxSNV6Uvq45e0-ynB1IlxFphg59LoYQb-xqnzg07YViaPT1-3B-z5ISQuX48fY",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAoyXy5E6vO7sK4t_L_NRolXcmbBZiNexpyF1EzKyqNgP2fLI-zN44_yTHv5Vy-zb7XTimQrhCFnYB5LlHeoWJDu2ssxN2Tva8b5m86Wp_cp0t2fEy8S0BltpcGOdQo2LTIWvliOhFMP4xzV5YsWMcwO5slPt37YGtpl7pttgQdw2G3EdYctBNH6Q8J4uGEnp7cjQWTN4JfniGci1bwGsYEB2keiKzNcGGNQ2vPQ2CbRipI7_MorriEINvDyOJA6iUdZG9UtZD9jYA",
    ],
  },
  {
    id: 8,
    name: "Adventure Awaits Overalls",
    price: 45,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDURUmU1YlZaLAtXBqUYhK_uboZaxVQO6xU0gSDe6BiujWBm2rNhWAuQ5LqMgTk8qj5QrKeKTpQZFZ3MeKHkNIM1zdIpeDmu5PiuJ07iISDzkB_Psnj0KGyVuNz2an-ATEdDYovc7DHOeESM0HpVS48yA0pU2Ujbod0HvlwTA4MvVkSB79F99okx9xNj8vSPv6YDhmirNG82XyFPfxSNV6Uvq45e0-ynB1IlxFphg59LoYQb-xqnzg07YViaPT1-3B-z5ISQuX48fY",
    description:
      "Ready for any adventure that comes your way! Our Adventure Awaits Overalls are perfect for little explorers who love to play, crawl, and discover the world around them. Made from durable, comfortable denim with fun adventure-themed details and easy-snap closures.",
    itemNumber: "12352",
    rating: 4.6,
    reviewCount: 19,
    sizes: ["6-12 Months", "12-18 Months", "18-24 Months", "2T", "3T"],
    colors: [
      { name: "Classic Blue", hex: "#4169e1" },
      { name: "Dark Denim", hex: "#191970" },
      { name: "Light Wash", hex: "#87ceeb" },
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDURUmU1YlZaLAtXBqUYhK_uboZaxVQO6xU0gSDe6BiujWBm2rNhWAuQ5LqMgTk8qj5QrKeKTpQZFZ3MeKHkNIM1zdIpeDmu5PiuJ07iISDzkB_Psnj0KGyVuNz2an-ATEdDYovc7DHOeESM0HpVS48yA0pU2Ujbod0HvlwTA4MvVkSB79F99okx9xNj8vSPv6YDhmirNG82XyFPfxSNV6Uvq45e0-ynB1IlxFphg59LoYQb-xqnzg07YViaPT1-3B-z5ISQuX48fY",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAoyXy5E6vO7sK4t_L_NRolXcmbBZiNexpyF1EzKyqNgP2fLI-zN44_yTHv5Vy-zb7XTimQrhCFnYB5LlHeoWJDu2ssxN2Tva8b5m86Wp_cp0t2fEy8S0BltpcGOdQo2LTIWvliOhFMP4xzV5YsWMcwO5slPt37YGtpl7pttgQdw2G3EdYctBNH6Q8J4uGEnp7cjQWTN4JfniGci1bwGsYEB2keiKzNcGGNQ2vPQ2CbRipI7_MorriEINvDyOJA6iUdZG9UtZD9jYA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCaQaeoHOKoA_i1233GHCvk553_sgR6N4XU7jagkPthouVdLDR8bO5_tJ04l2l1pWiUmjC8tNgI7qxeTUJc911I6nq5wFCMonkdaaUCtjI95qSeeF-6yHdd7KNqlJFS7rynLGwIgdAZjklOmKiJ-mg6CfHFoh9xM3AqkiDsrsGID85vieDTySCwZgDFn4-ZvDu2rp_WNszsQ89-p5exRHI9409F2vXSiNIW8LoEjVX2ntOfTC7kna9Y9ljtTvelGNoYOf9dD7jfUmA",
    ],
  },
];

export const reviews: Review[] = [
  {
    id: 1,
    author: "Sophia M.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBePb65NCL_mZWCMrRhkFfN9_xdxiuky8oFIz71rSkw7JcEZ6lLv2aGd8LTtoBMO96LYnz18Cx_sXKIU0Je1t3_TLIG13akJj5ICs9g22ngbFDz0iM4FoltEO28P92GgGKXKthKiAsdauatliyolYY2tQKPcSVOTi5F1iyeeHSVX0iDr4mVOHDa-RTpfUytp44MxHmt0tbAVNEWHAdV4ETIpHoUfF_wclLUqZHFH8oyIjZ6jCspDeqOHozmf_8IJn5J9zGZ5E4XYzM",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Absolutely love this onesie! The fabric is incredibly soft and the cloud print is adorable. It fits my baby perfectly and washes well without losing its shape or softness.",
    helpful: 12,
    notHelpful: 1,
  },
  {
    id: 2,
    author: "Liam K.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDkl7Ai3lVo64thECybbtZGHC7rCkkVAMsflCegi-Tf4D8AwbeUfYiugTyYH4-3hKq-DiLCSjcVW5iWkkUwOeSxd6s34efJHRFsvxMyLYNbjNHGBIH2CUKjehneYV2mZVAA3RKbI5oCZeoUjudgucgfOcU3Tpevku4tdUekgbh3WoKJuSVW5KCR0P7GsxVeI_yzKB_sMPZHhLrT5uYqaHia9icaJhDGZymUExHFyT-sm_kOPTHKhMe_5dyP_u5NfWODc-v0FqBABII",
    rating: 4,
    date: "1 month ago",
    comment:
      "Great quality and cute design. The snaps make it easy to put on and take off. My only minor issue is that the sizing runs a bit small, so I'd recommend sizing up.",
    helpful: 8,
    notHelpful: 2,
  },
  {
    id: 3,
    author: "Olivia R.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCZt1iurbVirENMrzDDpWdCPKyfU3NUmf1RoAx0_S1P2lJEmtsjI1WnGyB-DdI7bvEdA1bc3sJRUqRoLKKOGqrHQVHkOVOZUedFhdhz0IWk4JHm4R2pJhtJK23le8cKSyXQicLuwmtzW92kewwLDMvgZcLc7TBdD_3mr6kieaJ8OsHRHrRTtAbd3lkE6Vsquz6IyCLiUlg5udxg57VY9aW6rrXxKBc1Fj98oANnCCTMqezgPDQgtNa5PNk2P9RCCHuZVhJaP0op9gI",
    rating: 5,
    date: "2 months ago",
    comment:
      "This is the best onesie I've bought for my baby. The organic cotton is so gentle on her skin, and she seems very comfortable in it. I've already ordered another one in a different size!",
    helpful: 15,
    notHelpful: 0,
  },
];
