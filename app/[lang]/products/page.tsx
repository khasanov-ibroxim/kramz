import React from 'react';
import { Locale } from "@/i18n-config";
import { generatePageMetadata } from '@/lib/metadata';
import { getProductsDictionary} from "@/lib/dictionary";
import Products from "@/components/products/products";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    return generatePageMetadata('products', lang as Locale);
}

const Page = async ({ params }: { params: Promise<{ lang: string }> }) => {
    const { lang } = await params;
    const dict   = await getProductsDictionary(lang as Locale);

    return (
        <>
         <Products dict={dict}/>
        </>
    );
};

export default Page;