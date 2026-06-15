import { customMetadataGenerator } from "@/utils/helper/Metadata";
import "./[locale]/globals.css";

export async function generateMetadata() {
  return customMetadataGenerator();
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
