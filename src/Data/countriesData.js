// src/Data/countriesData.js

export const countriesList = {
  EUROPE: [
    { name: "Austria", currency: "EUR €" },
    { name: "Belgium", currency: "EUR €" },
    { name: "France - English", currency: "EUR €" },
    { name: "Germany - English", currency: "EUR €" },
    { name: "United Kingdom", currency: "GBP £" },
  ],
  AMERICAS: [
    { name: "United States", currency: "USD $" },
    { name: "Canada", currency: "CAD $" },
  ],
  "MIDDLE EAST": [
    { name: "UAE", currency: "AED د.إ" },
    { name: "Saudi Arabia", currency: "SAR ﷼" },
  ],
  "ASIA PACIFIC": [
    { name: "Australia", currency: "AUD $" },
    { name: "Japan", currency: "JPY ¥" },
    { name: "South Korea", currency: "KRW ₩" },
  ],
}

export const exchangeRates = {
  "EUR €": 1.17,
  "GBP £": 1.0,
  "USD $": 1.25,
  "CAD $": 1.7,
  "AED د.إ": 4.6,
  "SAR ﷼": 4.7,
  "AUD $": 1.9,
  "JPY ¥": 190.0,
  "KRW ₩": 1700.0,
}
