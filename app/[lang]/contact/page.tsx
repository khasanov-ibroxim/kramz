import React from 'react';
import { Locale } from "@/i18n-config";
import { generatePageMetadata } from '@/lib/metadata';
import ContactS1 from "@/components/contact/contact_s1";
import ContactS2 from "@/components/contact/contact_s2";
import ContactS3 from "@/components/contact/contact_s3";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    return generatePageMetadata('contact', lang as Locale);
}

const Page = async () => {
    return (
        <div className="mt-[140px]">
            <ContactS1/>
            <ContactS2/>
            <ContactS3/>
        </div>
    );
};

export default Page;