import "./globals.css";

export const metadata = {
  title: "ConsensuAI | Self-Consistency Answer Engine",
  description: "One question, three models, one converged answer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
