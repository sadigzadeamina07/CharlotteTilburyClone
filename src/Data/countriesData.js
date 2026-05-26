// src/Data/countriesData.js

export const countriesList = {
  EUROPE: [
    { name: 'Austria',           currency: 'EUR €' },
    { name: 'Belgium',           currency: 'EUR €' },
    { name: 'France - English',  currency: 'EUR €' },
    { name: 'Germany - English', currency: 'EUR €' },
    { name: 'United Kingdom',    currency: 'GBP £' },
  ],
  AMERICAS: [
    { name: 'United States', currency: 'USD $' },
    { name: 'Canada',        currency: 'CAD $' },
  ],
  'MIDDLE EAST': [
    { name: 'UAE',          currency: 'AED د.إ' },
    { name: 'Saudi Arabia', currency: 'SAR ﷼'  },
  ],
  'ASIA PACIFIC': [
    { name: 'Australia',  currency: 'AUD $'  },
    { name: 'Japan',      currency: 'JPY ¥'  },
    { name: 'South Korea',currency: 'KRW ₩'  },
  ],
};

export const exchangeRates = {
  'EUR €':   1.17,
  'GBP £':   1.00,
  'USD $':   1.25,
  'CAD $':   1.70,
  'AED د.إ': 4.60,
  'SAR ﷼':   4.70,
  'AUD $':   1.90,
  'JPY ¥':   190.00,
  'KRW ₩':   1700.00,
};
