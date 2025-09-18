import {defineRouting} from 'next-intl/routing';

// Desteklediği dilleri ve default olark çalışacağı dili buraya tanımlıyoruz
export const routing = defineRouting({
locales: ['en', 'tr'],
defaultLocale: 'en',
});