import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
export const metadata: Metadata = { title: 'SixCode Academy', description: 'Three months of foundations. Two months of track work. Four weeks to build as a team.' };
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><Header /><main>{children}</main><Footer /></body></html>; }
