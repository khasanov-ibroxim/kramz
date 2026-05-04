import { i18n, Locale } from "@/i18n-config";
import { getCommonDictionary } from "@/lib/dictionary";
import { generateOrganizationSchema, generateWebSiteSchema, generateManufacturerSchema } from "@/lib/structured-data";
import { notFound } from "next/navigation";
import PageTransition from "@/components/UI/Pagetransition";
import Navbar from "@/components/UI/navbar";
import Footer from "@/components/UI/footer";

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function LangLayout({
                                             children,
                                             params
                                         }: {
    children: React.ReactNode,
    params: Promise<{ lang: string }>
}) {
    const { lang } = await params;

    if (!i18n.locales.includes(lang as Locale)) {
        notFound();
    }

    const dict = await getCommonDictionary(lang as Locale);

    const organizationSchema = generateOrganizationSchema(lang as Locale);
    const websiteSchema = generateWebSiteSchema(lang as Locale);
    const manufacturerSchema = generateManufacturerSchema(lang as Locale);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(manufacturerSchema) }}
            />
            <PageTransition>
                <Navbar lang={lang} />
                {children}
                <Footer dict={dict} lang={lang}/>
            </PageTransition>
        </>
    );
}