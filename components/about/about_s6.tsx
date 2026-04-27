import React from 'react';
import bg from "@/assets/about/about_s6/abu.photographer-84.jpg"
import Image from "next/image";
import type { AboutDictionary, CommonDictionary } from '@/lib/dictionary';

interface AboutS6Props {
    dict: AboutDictionary['s6'];
    commonDict: CommonDictionary;
}

const AboutS6 = ({ dict, commonDict }: AboutS6Props) => {
    return (
        <div className="relative w-full h-[80vh] overflow-hidden ">
            <Image src={bg} alt="sustainable" className="absolute w-full h-full z-10 object-cover"/>
            <div className="container">
                <div className=" absolute z-20 flex flex-col w-full h-full justify-start top-24 items-start overflow-hidden">
                    <h1 className="mt-10 other_font font-semibold text-xl md:text-5xl uppercase text-[#fff] mb-5">{dict.title}</h1>
                    <p className="w-[90%] md:w-1/3 text-base md:text-lg text-white">{dict.text}</p>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px 10px 22px', borderRadius: 100, border: '1.5px solid rgba(255,255,255,0.30)', cursor: 'pointer', fontSize: 14, fontWeight: 500 }}
                            className="bg-transparent mt-5 group hover:bg-[#fff] hover:text-black text-white max-w-[200px] transition-colors duration-300">
                        {commonDict.buttons.details}
                        <span style={{ width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="bg-[#50D873] transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right stroke-white"><path d="m9 18 6-6-6-6" /></svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutS6;