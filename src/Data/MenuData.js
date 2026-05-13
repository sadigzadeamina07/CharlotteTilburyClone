export const MENU_DATA = {
  MAIN: {
    id: "MAIN",
    title: "Main Menu",
    items: [
      { id: "pillow-talk", label: "Pillow Talk Collection", icon: "star" },
      { id: "new-in", label: "New In" },
      { id: "makeup", label: "Makeup", hasSubMenu: true, targetId: "MAKEUP" },
      { id: "skincare", label: "Skincare", hasSubMenu: true, targetId: "SKINCARE" },
      { id: "fragrance", label: "Fragrance" },
    ],
  },
  MAKEUP: {
    id: "MAKEUP",
    title: "Makeup",
    items: [
      { id: "makeup-kit", label: "10% Off Build Your Own Kit" },
      { id: "makeup-face", label: "Face", hasSubMenu: true, targetId: "FACE" },
      { id: "makeup-cheek", label: "Cheek" },
      { id: "makeup-eyes", label: "Eyes" },
      { id: "makeup-lips", label: "Lips", hasSubMenu: true, targetId: "LIPS" },
      { id: "makeup-wedding", label: "Wedding Makeup" },
    ],
  },
  FACE: {
    id: "FACE",
    title: "Face",
    items: [
      { id: "face-foundation", label: "Foundation" },
      { id: "face-primer", label: "Primer" },
      { id: "face-concealer", label: "Concealer" },
      { id: "face-powder", label: "Powder" },
    ],
  },
  LIPS: {
    id: "LIPS",
    title: "Lips",
    items: [
      { id: "lips-lipstick", label: "Lipstick" },
      { id: "lips-gloss", label: "Lip Gloss" },
      { id: "lips-liner", label: "Lip Liner" },
    ],
    promos: [
      {
        id: "promo-lipstick",
        title: "Lipstick Finder",
        image: "https://via.placeholder.com/400x200/f3f4f6/333333?text=Lipstick+Finder",
        alt: "Lipstick Finder Tool",
      },
    ],
  },
  SKINCARE: {
    id: "SKINCARE",
    title: "Skincare",
    items: [
      { id: "skin-moisturiser", label: "Moisturiser" },
      { id: "skin-cleanser", label: "Cleanser" },
      { id: "skin-serum", label: "Serum" },
      { id: "skin-eye", label: "Eye Care" },
    ],
    promos: [
      {
        id: "promo-skin",
        title: "Pro Skin Analysis Tool",
        image: "https://via.placeholder.com/400x200/f3f4f6/333333?text=Skin+Analysis",
        alt: "Pro Skin Analysis Tool",
      },
    ],
  },
};
