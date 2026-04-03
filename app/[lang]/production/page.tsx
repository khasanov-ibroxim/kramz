import React from 'react';
import ProductionHeader from "@/components/production/production_header";
import ProductionS1 from '@/components/production/production_s1';
import ProductionS2 from "@/components/production/production_s2";
import ProductionS3 from "@/components/production/production_s3";
import ProductionS4 from "@/components/production/production_s4";
import ProductionS5 from "@/components/production/production_s5";
import ProductionS6 from "@/components/production/production_s6";
import HomeS7 from "@/components/home/home_s7";
import {getCommonDictionary, getHomeDictionary, getProductionDictionary} from "@/lib/dictionary";
import {Locale} from "@/i18n-config";

const Page = async ({ params }: { params: Promise<{ lang: string }> }) => {
    const { lang } = await params;
    const dictHome   = await getHomeDictionary(lang as Locale);
    const dict   = await getProductionDictionary(lang as Locale);
    const common = await getCommonDictionary(lang as Locale);
    return (
        <>
            <ProductionHeader dict={dict.header}/>
            <ProductionS1 dict={dict.s1} commonDict={common}/>
            <ProductionS2 dict={dict.s2}/>
            <ProductionS3 dict={dict.s3}/>
            <ProductionS4 dict={dict.s4}/>
            <ProductionS5 dict={dict.s5} commonDict={common}/>
            <ProductionS6 dict={dict.s6}/>
            <HomeS7 dict={dictHome.s7} commonDict={common} lang={lang} />
        </>
    );
};

export default Page;