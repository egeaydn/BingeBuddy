export interface PageProps {
  params: Promise<{ locale: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export interface MoviePageProps {
  params: Promise<{ locale: string; id: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}