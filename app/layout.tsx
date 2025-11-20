import "./global.css";

export const metadata = {
  title: 'SPA Search',
  description: 'HTML semantic search tool',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
