// TypeScript ambient module declarations for Next.js

declare module 'next/types/global.d' {
  export interface PageProps {
    params: Promise<Record<string, string | string[]>>
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
  }
}

// Override Next.js route parameter types to handle case-insensitive filesystem
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

export {}