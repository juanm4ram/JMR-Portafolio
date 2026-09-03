import type { Metadata } from "next";
import {
  exposeRegular,
  exposeBold,
  exposeBlack,
  clashGroteskRegular,
  clashGroteskSemibold,
  clashGroteskBold,
  panchangRegular,
  panchangBold,
  panchangExtrabold,
} from "./fonts";
import { BottomNav } from "@/components/BottomNav";
import LenisProvider from "@/components/lenis-provider";
import Footer from "@/components/footer";

import { TooltipProvider } from "@/components/tooltip";
import { InlineScript } from "@/components/inline-script";
import Preloader from "@/components/preloader";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: "Juan Manuel Ramos — Software Developer",
  description:
    "Portafolio de Juan Manuel Ramos, software developer orientado a backend: automatización, bots de Telegram e integración de APIs.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${exposeRegular.variable} ${exposeBold.variable} ${exposeBlack.variable} ${clashGroteskRegular.variable} ${clashGroteskSemibold.variable} ${clashGroteskBold.variable} ${panchangRegular.variable} ${panchangBold.variable} ${panchangExtrabold.variable} h-full antialiased overflow-x-hidden overflow-y-scroll`}
    >
      <head>
        <link rel="icon" href="/favicon.png" />
        <InlineScript
          html={`(function(){try{var mq=window.matchMedia('(prefers-color-scheme: dark)');if(mq.matches){document.documentElement.classList.add('dark')}mq.addEventListener('change',function(e){document.documentElement.classList.toggle('dark',e.matches)})}catch(e){}})()`}
        />
      </head>
      <body className="flex min-h-dvh flex-col overflow-x-hidden">
        <Preloader />
        <LanguageProvider>
          <LenisProvider>
            <div className="flex-1 px-[3%] max-sm:px-0 max-lg:px-0">
              {children}
            </div>
            <Footer />
          </LenisProvider>
          <div className="fixed inset-x-0 bottom-6 z-[1200] flex items-center justify-center gap-4 px-4 max-sm:bottom-2 max-sm:gap-2 max-lg:bottom-2 max-lg:gap-3">
            <TooltipProvider delayDuration={0}>
              <BottomNav />
            </TooltipProvider>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
