import React from 'react';
import type { ProductionDictionary } from '@/lib/dictionary';

interface ProductionS4Props {
    dict: ProductionDictionary['s4'];
}

const ProductionS4 = ({ dict }: ProductionS4Props) => {
    return (
        <div className={"bg-[#A3C1BE] py-32"}>
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <h3 className={"text-[#2B362D] text-xl md:text-5xl uppercase mb-10 font-semibold"}>{dict.title}</h3>
                        {dict.paragraphs.map((p:string, i:number) => (
                            <React.Fragment key={i}><p>{p}</p>{i < dict.paragraphs.length - 1 && <br />}</React.Fragment>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-white mt-10 md:mt-0">
                        {dict.certificates.map((cert:ProductionDictionary['s4']['certificates'][number]) => (
                            <div key={cert.title} className="w-full min-h-[10rem] bg-[#2B362D] rounded-2xl p-5 flex flex-col justify-between">
                                <div>
                                    <h5 className="text-2xl font-semibold mb-4">{cert.title}</h5>
                                    <p>{cert.subtitle}</p>
                                </div>

                                <button className="flex items-center justify-between gap-2.5 rounded-full border border-white/[0.5] bg-transparent max-w-[150px] py-1 px-3 mt-5 group hover:bg-[#009C89] text-white transition-colors duration-300 text-sm font-medium cursor-pointer">
                                    {dict.downloadButton}
                                    <span className="w-[34px] h-[34px] rounded-full flex items-center justify-center bg-[#009C89] group-hover:bg-white transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right stroke-white group-hover:stroke-[#009C89]">
                        <path d="m9 18 6-6-6-6"/>
                    </svg>
                </span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductionS4;