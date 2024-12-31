export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="jp">
      <body
        style={{
          margin: 0,
        }}
      >
        {children}
      </body>
    </html>
  );
}
