import Navbar from "@/components/web/Navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <section> {children} </section>
    </>
  );
}
