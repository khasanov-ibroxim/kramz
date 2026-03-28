import React from 'react';
import { Locale } from '@/i18n-config';
import { getHomeDictionary, getCommonDictionary } from '@/lib/dictionary';

import HomeHeader from "@/components/home/home_header";
import HomeS2 from "@/components/home/home_s2";
import HomeS3 from "@/components/home/home_s3";
import HomeS4 from "@/components/home/home_s4";
import HomeS5 from "@/components/home/home_s5";
import HomeS6 from "@/components/home/home_s6";
import HomeS7 from "@/components/home/home_s7";

const Page = async ({ params }: { params: Promise<{ lang: string }> }) => {
    const { lang } = await params;
    const dict   = await getHomeDictionary(lang as Locale);
    const common = await getCommonDictionary(lang as Locale);

    return (
        <div>
            <HomeHeader   dict={dict.header} />
            <HomeS2       dict={dict.s2} />
            <HomeS3       dict={dict.s3} />
            <HomeS4       dict={dict.s4} />
            <HomeS5       dict={dict.s5} lang={lang} />
            <HomeS6       dict={dict.s6} />
            <HomeS7       dict={dict.s7} commonDict={common} />
        </div>
    );
};

export default Page;