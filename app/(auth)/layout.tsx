export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("Auth Layout");
  return <section className="relative h-screen w-full mx-auto">{children}</section>;
}
