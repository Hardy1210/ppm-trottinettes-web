'use client';

import { Header } from '@/components/layout/Header';
import { usePathname } from 'next/navigation';

export default function ConditionalHeader() {
  const pathname = usePathname();
  const isStudio = pathname.startsWith('/studio');

  if (isStudio) return null;

  return <Header />;
}
