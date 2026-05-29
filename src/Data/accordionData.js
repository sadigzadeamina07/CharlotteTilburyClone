// src/Data/accordionData.js

const productDetailsItems = [
  { label: "Size", value: "10g" },
  { label: "Skin Type", value: "All skin types" },
  { label: "Finish", value: "Matte / Soft-focus" },
]

const magicItems = [
  { label: "Benefit", value: "Minimizes pores and shine" },
  { label: "Formula", value: "Airbrush-effect powder" },
]

const ingredientItems = [
  { label: "Key Ingredients", value: "Silica, Talc, Mica" },
]

const applyItems = [
  { label: "Step 1", value: "Apply with a brush in circular motions" },
  { label: "Step 2", value: "Build coverage as needed" },
]

const shippingItems = [
  { label: "Standard Delivery", value: "3-5 business days" },
  { label: "Express Delivery", value: "1-2 business days" },
  { label: "Free Delivery", value: "On orders over £49" },
]

export const allAccordionSections = [
  { key: "details", title: "PRODUCT DETAILS", items: productDetailsItems },
  { key: "magic", title: "WHAT MAKES IT MAGIC?", items: magicItems },
  { key: "ingr", title: "INGREDIENTS", items: ingredientItems },
  { key: "apply", title: "HOW TO APPLY", items: applyItems },
  {
    key: "shipping",
    title: "SHIPPING & DELIVERY INFORMATION",
    items: shippingItems,
  },
]
