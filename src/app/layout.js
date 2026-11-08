import "./globals.css";
import { Prompt } from "next/font/google";
import { Aside } from "@/components/Aside";
import { Search } from "@/components/Search";

export const metadata = {
  title: "Code Connect",
  description: "Uma rede social para desenvolvedores.",
};

const prompt = Prompt({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={prompt.className}>
      <body>
        <div className="app-container">
          <div>
            <Aside />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Search />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
