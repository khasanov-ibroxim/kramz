"use client"
import React from 'react';
import home_header from "@/assets/home/home_header/home_header.jpg"
import Image from "next/image";

const HomeHeader = () => {
    return (
        <div className={"w-full h-screen relative"}>
            <div className="w-full h-full absolute top-0 left-0 bottom-0 bg-black/40 z-30"></div>
            <Image src={home_header} alt={"asd"} className={"w-full h-full object-cover absolute top-0 left-0 bottom-0 z-20"}/>
            <div className="px-5 lg:px-0 absolute z-40 w-full h-full flex items-center justify-center">
             <h1 className={"text-2xl title_font_bold  md:text-5xl lg:text-6xl text-white uppercase  mt-5"}>Профессионалы в области <br/>
                 алюминиевых <br/>
                 продуктов и решений</h1>
            </div>
        </div>
    );
};

export default HomeHeader;