import React from 'react';
import Image from "next/image";
import home_header from "@/assets/production/production_header/header.jpg";

interface ProductionHeaderProps {
    dict: { title: string };
}

const ProductionHeader = ({dict}:ProductionHeaderProps) => {
    return (
        <>
            <div className={"w-full h-screen relative overflow-hidden"}>
                <div className="w-full h-full absolute top-0 left-0 bottom-0 bg-black/30 z-30"></div>
                <Image src={home_header} alt={"asd"} className={"w-full h-full object-cover absolute top-0 left-0 bottom-0 z-20"}/>
                <div className="container">
                    <div className="px-5 lg:px-0 absolute z-40 w-full h-full flex items-center justify-center sm:justify-start">
                        <h1 className={"text-2xl title_font_bold  md:text-5xl lg:text-6xl text-white uppercase  mt-5"}>
                            {dict.title}
                        </h1>
                    </div>
                </div>

            </div>
        </>
    );
};

export default ProductionHeader;