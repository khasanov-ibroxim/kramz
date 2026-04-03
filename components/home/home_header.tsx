"use client"
import React from 'react';
import home_header from "@/assets/home/home_header/DSC04122.jpg"
import Image from "next/image";

interface HomeHeaderProps {
    dict: { title: string };
}

const HomeHeader = ({ dict }: HomeHeaderProps) => {
    return (
        <div className={"w-full h-screen relative"}>
            <div className="w-full h-full absolute top-0 left-0 bottom-0 bg-black/40 z-30"></div>
            <Image src={home_header} alt={"header"} className={"w-full h-full object-cover absolute top-0 left-0 bottom-0 z-20"}/>
            <div className="px-5 lg:px-0 absolute z-40 w-full h-full flex items-center justify-center">
                <h1 className={" w-[100%] md:w-[80%] px-1 md:px-5 text-4xl title_font_bold  md:text-5xl lg:text-6xl text-white uppercase  mt-5"}>
                    {dict.title}
                </h1>
            </div>
        </div>
    );
};

export default HomeHeader;