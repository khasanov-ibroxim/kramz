import React from 'react';
import ProductionHeader from "@/components/production/production_header";
import ProductionS1 from '@/components/production/production_s1';
import ProductionS2 from "@/components/production/production_s2";
import ProductionS3 from "@/components/production/production_s3";
import ProductionS4 from "@/components/production/production_s4";
import ProductionS5 from "@/components/production/production_s5";
import ProductionS6 from "@/components/production/production_s6";
import HomeS7 from "@/components/home/home_s7";

const Page = () => {
    return (
        <>
            <ProductionHeader/>
            <ProductionS1/>
            <ProductionS2/>
            <ProductionS3/>
            <ProductionS4/>
            <ProductionS5/>
            <ProductionS6/>
            <HomeS7/>
        </>
    );
};

export default Page;