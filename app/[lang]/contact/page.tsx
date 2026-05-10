import React from 'react';
import { Locale } from "@/i18n-config";
import { generatePageMetadata } from '@/lib/metadata';
import { getContactDictionary } from '@/lib/dictionary';
import ContactS1 from "@/components/contact/contact_s1";
import ContactS2 from "@/components/contact/contact_s2";
import ContactS3 from "@/components/contact/contact_s3";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    return generatePageMetadata('contact', lang as Locale);
}

const Page = async ({ params }: { params: Promise<{ lang: string }> }) => {
    const { lang } = await params;
    const dict = await getContactDictionary(lang as Locale);

    return (
        <div className="mt-[140px]">
            <ContactS1 dict={dict.s1} />
            <ContactS2 dict={dict.s2} />
            <ContactS3 dict={dict.s3} lang={lang} />
        </div>
    );
};

export default Page;