import { i18n, Locale } from "@/i18n-config";
import { getCommonDictionary } from "@/lib/dictionary";
import { notFound } from "next/navigation";
import PageTransition from "@/components/UI/Pagetransition";
import Navbar from "@/components/UI/navbar";

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function LangLayout({
                                             children,
                                             params
                                         }: {
    children: React.ReactNode,
    params: Promise<{ lang: Locale }>
}) {
    const { lang } = await params;

    if (!i18n.locales.includes(lang)) {
        notFound();
    }

    const dict = await getCommonDictionary(lang);

    return (
        <PageTransition>
            <Navbar lang={lang}/>
            {children}
        </PageTransition>
    );
}