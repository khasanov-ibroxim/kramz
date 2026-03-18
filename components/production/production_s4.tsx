import React from 'react';

const ProductionS4 = () => {
    return (
        <div className={"bg-[#A3C1BE] py-32"}>
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="">
                        <h3 className={"text-[#2B362D] text-5xl uppercase mb-10 font-semibold"}>Чистый алюминий</h3>
                        <p>КраМЗ уделяет большое внимание вопросам экологии и стремится свести к минимуму негативное
                            воздействие на окружающую среду. Климатическая повестка является одним из ключевых
                            направлений экологической деятельности КраМЗ и составляет неотъемлемую часть корпоративной
                            культуры компании.</p> <br/>
                        <p>«Углеродный след» ALLOW — один из самых низких в отрасли. Мы продолжаем свою работу в сфере
                            снижения выбросов парниковых газов и поставили перед собой задачу: увеличение объёмов
                            использования ALLOW в выпускаемой продукции компании.
                        </p><br/>
                        <p>Мы поддерживаем стремление наших клиентов к повышению ответственности перед обществом и
                            готовы двигаться в этом направлении вместе!
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-start gap-5 text-white mt-10 md:mt-0">
                        <div
                            className="w-full md:w-[400px] min-h-[13rem] bg-[#2B362D] rounded-2xl p-5 flex flex-col justify-between">
                            <div className="">
                                <h5 className={"text-2xl font-semibold mb-4"}>ISO 9001:2015</h5>
                                <p>Сертификат соответствия</p>
                            </div>
                            <button
                                className="flex items-center justify-between  gap-2.5 rounded-full border border-white/[0.5] bg-transparent max-w-[150px] py-1 px-3 mt-5 group hover:bg-[#009C89] text-white hover:text-white transition-colors duration-300 text-sm font-medium cursor-pointer">
                                Скачать
                                <span
                                    className="w-[34px] h-[34px] rounded-full flex items-center justify-center bg-[#009C89] group-hover:bg-white transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                             strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                             className="lucide lucide-chevron-right stroke-white group-hover:stroke-[#009C89]">
                            <path d="m9 18 6-6-6-6"/>
                        </svg>
                    </span>
                            </button>
                        </div>
                        <div
                            className=" w-full md:w-[400px] min-h-[13rem] bg-[#2B362D] rounded-2xl p-5 flex flex-col justify-between">
                            <div className="">
                                <h5 className={"text-2xl font-semibold mb-4"}>ISO 14001:2015:</h5>
                                <p>Сертификат соответствия</p>
                            </div>
                            <button
                                className="flex items-center justify-between  gap-2.5 rounded-full border border-white/[0.5] bg-transparent max-w-[150px] py-1 px-3 mt-5 group hover:bg-[#009C89] text-white hover:text-white transition-colors duration-300 text-sm font-medium cursor-pointer">
                                Скачать
                                <span
                                    className="w-[34px] h-[34px] rounded-full flex items-center justify-center bg-[#009C89] group-hover:bg-white transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                             strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                             className="lucide lucide-chevron-right stroke-white group-hover:stroke-[#009C89]">
                            <path d="m9 18 6-6-6-6"/>
                        </svg>
                    </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductionS4;