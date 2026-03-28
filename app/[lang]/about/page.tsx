import React from 'react';
import AboutHeader from "@/components/about/about_header";
import AboutS2 from "@/components/about/about_s2";
import AboutS1 from "@/components/about/about_s1";
import AboutS3 from "@/components/about/about_s3";
import AboutS4 from "@/components/about/about_s4";
import AboutS5 from "@/components/about/about_s5";
import AboutS6 from "@/components/about/about_s6";
import AboutS7 from "@/components/about/about_s7";
import HomeS7 from "@/components/home/home_s7";
import {getCommonDictionary, getHomeDictionary} from "@/lib/dictionary";
import {Locale} from "@/i18n-config";

const Page = async ({ params }: { params: Promise<{ lang: string }> }) => {
    const { lang } = await params;
    const dictHome   = await getHomeDictionary(lang as Locale);
    const common = await getCommonDictionary(lang as Locale);
    return (
        <>
            <AboutHeader/>
            <AboutS1/>
            <AboutS2/>
            <AboutS3/>
            <AboutS4/>
            <AboutS5/>
            <AboutS6/>
            <AboutS7/>
            <HomeS7       dict={dictHome.s7} commonDict={common} />
        </>
    );
};

export default Page;