import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  let locale = routing.defaultLocale;
  
  if (requestLocale) {
    const requested = await requestLocale;
    if (requested && routing.locales.includes(requested as any)) {
      locale = requested as any;
    }
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});