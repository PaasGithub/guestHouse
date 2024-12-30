// app/(withPadding)/layout.tsx
'use client'
export default function PaddedLayout({  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="pt-16">{children}</div>
}
