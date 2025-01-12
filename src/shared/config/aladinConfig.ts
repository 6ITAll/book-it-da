export const aladinConfig = {
  aladinBaseUrl: import.meta.env.PROD
    ? import.meta.env.VITE_PROD_ALADIN_PROXY_BASEURL
    : '/api',
  aladinApiKey: import.meta.env.VITE_ALADIN_API_KEY,
  itemSearchUrl: import.meta.env.VITE_ALADIN_ITEM_SEARCH_URL,
  itemListUrl: import.meta.env.VITE_ALADIN_ITEM_LIST_URL,
  itemLookUpUrl: import.meta.env.VITE_ALADIN_ITEM_LOOK_UP_URL,
  ttbKey: import.meta.env.VITE_ALADIN_API_KEY,
  version: '20131101',
  defaultOutput: 'js',
};
