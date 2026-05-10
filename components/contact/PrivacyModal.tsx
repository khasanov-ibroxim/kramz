"use client"
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface PrivacyModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'consent' | 'policy';
    lang: string;
}

const PrivacyModal = ({ isOpen, onClose, type, lang }: PrivacyModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEscape);
        }
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    const content = {
        consent: {
            ru: {
                title: 'Согласие на обработку персональных данных',
                sections: [
                    {
                        title: '1. Общие положения',
                        text: 'Настоящим я, свободно, своей волей и в своем интересе даю согласие ООО "Gurlan Global Teks" (далее – Компания) на обработку моих персональных данных.'
                    },
                    {
                        title: '2. Перечень персональных данных',
                        text: 'Я даю согласие на обработку следующих персональных данных:\n• Фамилия, имя, отчество\n• Контактный телефон\n• Адрес электронной почты\n• Название организации\n• Содержание обращения'
                    },
                    {
                        title: '3. Цели обработки',
                        text: 'Персональные данные обрабатываются в следующих целях:\n• Обработка обращений и запросов\n• Предоставление информации о продукции и услугах\n• Заключение и исполнение договоров\n• Информирование о новых продуктах и услугах'
                    },
                    {
                        title: '4. Способы обработки',
                        text: 'Обработка персональных данных осуществляется с использованием средств автоматизации и без использования таких средств.'
                    },
                    {
                        title: '5. Срок действия согласия',
                        text: 'Настоящее согласие действует с момента его предоставления до момента его отзыва путем направления письменного заявления в Компанию.'
                    },
                    {
                        title: '6. Права субъекта персональных данных',
                        text: 'Я проинформирован о том, что имею право:\n• Получать информацию, касающуюся обработки моих персональных данных\n• Требовать уточнения, блокирования или уничтожения персональных данных\n• Отозвать настоящее согласие в любой момент'
                    }
                ]
            },
            en: {
                title: 'Consent to Personal Data Processing',
                sections: [
                    {
                        title: '1. General Provisions',
                        text: 'I hereby freely, of my own will and in my own interest, give consent to Gurlan Global Teks LLC (hereinafter referred to as the Company) to process my personal data.'
                    },
                    {
                        title: '2. List of Personal Data',
                        text: 'I consent to the processing of the following personal data:\n• Last name, first name, patronymic\n• Contact phone number\n• Email address\n• Organization name\n• Content of the inquiry'
                    },
                    {
                        title: '3. Processing Purposes',
                        text: 'Personal data is processed for the following purposes:\n• Processing inquiries and requests\n• Providing information about products and services\n• Conclusion and execution of contracts\n• Informing about new products and services'
                    },
                    {
                        title: '4. Processing Methods',
                        text: 'Personal data is processed using automated means and without the use of such means.'
                    },
                    {
                        title: '5. Consent Validity Period',
                        text: 'This consent is valid from the moment of its provision until the moment of its withdrawal by sending a written application to the Company.'
                    },
                    {
                        title: '6. Rights of the Personal Data Subject',
                        text: 'I am informed that I have the right to:\n• Receive information regarding the processing of my personal data\n• Request clarification, blocking or destruction of personal data\n• Withdraw this consent at any time'
                    }
                ]
            }
        },
        policy: {
            ru: {
                title: 'Политика обработки персональных данных',
                sections: [
                    {
                        title: '1. Общие положения',
                        text: 'Настоящая Политика определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных в ООО "Gurlan Global Teks" (далее – Компания) в соответствии с Законом Республики Узбекистан «О персональных данных» от 02.07.2019 г. № ЗРУ-547.'
                    },
                    {
                        title: '2. Основные понятия',
                        text: 'Персональные данные – любая информация, относящаяся к прямо или косвенно определенному или определяемому физическому лицу.\n\nОбработка персональных данных – любое действие или совокупность действий, совершаемых с персональными данными.'
                    },
                    {
                        title: '3. Принципы обработки персональных данных',
                        text: 'Компания при обработке персональных данных руководствуется следующими принципами:\n• Законность и справедливость\n• Ограничение обработки достижением конкретных целей\n• Недопустимость объединения баз данных\n• Обеспечение точности и актуальности данных\n• Обеспечение безопасности персональных данных'
                    },
                    {
                        title: '4. Цели обработки персональных данных',
                        text: 'Компания обрабатывает персональные данные в следующих целях:\n• Исполнение договорных обязательств\n• Предоставление информации о продукции и услугах\n• Проведение маркетинговых исследований\n• Улучшение качества обслуживания'
                    },
                    {
                        title: '5. Меры по обеспечению безопасности',
                        text: 'Компания принимает необходимые правовые, организационные и технические меры для защиты персональных данных от неправомерного доступа, уничтожения, изменения, блокирования, копирования, распространения.'
                    },
                    {
                        title: '6. Права субъектов персональных данных',
                        text: 'Субъекты персональных данных имеют право:\n• На получение информации об обработке их персональных данных\n• На уточнение, блокирование или уничтожение персональных данных\n• На отзыв согласия на обработку персональных данных\n• На обжалование действий или бездействия Компании'
                    },
                    {
                        title: '7. Контактная информация',
                        text: 'По всем вопросам, связанным с обработкой персональных данных, вы можете обращаться:\n\nEmail: gurlanglobal@gmail.com\nТелефон: +998 97 857 00 05\nАдрес: Республика Узбекистан, Хорезмская область, Гурленский район, ул. Мустакиллик, 5'
                    }
                ]
            },
            en: {
                title: 'Personal Data Processing Policy',
                sections: [
                    {
                        title: '1. General Provisions',
                        text: 'This Policy defines the procedure for processing personal data and measures to ensure the security of personal data at Gurlan Global Teks LLC (hereinafter referred to as the Company) in accordance with the Law of the Republic of Uzbekistan "On Personal Data" dated 02.07.2019 No. ZRU-547.'
                    },
                    {
                        title: '2. Basic Concepts',
                        text: 'Personal data – any information relating to a directly or indirectly identified or identifiable individual.\n\nProcessing of personal data – any action or set of actions performed with personal data.'
                    },
                    {
                        title: '3. Principles of Personal Data Processing',
                        text: 'The Company is guided by the following principles when processing personal data:\n• Legality and fairness\n• Limitation of processing to the achievement of specific goals\n• Inadmissibility of combining databases\n• Ensuring accuracy and relevance of data\n• Ensuring the security of personal data'
                    },
                    {
                        title: '4. Purposes of Personal Data Processing',
                        text: 'The Company processes personal data for the following purposes:\n• Fulfillment of contractual obligations\n• Providing information about products and services\n• Conducting marketing research\n• Improving service quality'
                    },
                    {
                        title: '5. Security Measures',
                        text: 'The Company takes the necessary legal, organizational and technical measures to protect personal data from unauthorized access, destruction, modification, blocking, copying, distribution.'
                    },
                    {
                        title: '6. Rights of Personal Data Subjects',
                        text: 'Personal data subjects have the right to:\n• Receive information about the processing of their personal data\n• Request clarification, blocking or destruction of personal data\n• Withdraw consent to the processing of personal data\n• Appeal against actions or inaction of the Company'
                    },
                    {
                        title: '7. Contact Information',
                        text: 'For all questions related to the processing of personal data, you can contact:\n\nEmail: gurlanglobal@gmail.com\nPhone: +998 97 857 00 05\nAddress: Republic of Uzbekistan, Khorezm Region, Gurlan District, Mustaqillik Street, 5'
                    }
                ]
            }
        }
    };

    const currentContent = content[type][lang as 'ru' | 'en'];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl my-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="sticky top-0 z-10 bg-white border-b border-black/10 rounded-t-2xl px-6 md:px-8 py-5 flex items-center justify-between">
                                <h2 className="other_font text-xl md:text-2xl font-bold text-[#2B362D] pr-8">
                                    {currentContent.title}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="absolute top-5 right-6 w-10 h-10 rounded-full bg-[#F4F8F7] hover:bg-[#50D873] flex items-center justify-center transition-colors duration-200 group"
                                >
                                    <X size={20} className="text-[#2B362D] group-hover:text-white transition-colors duration-200" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="px-6 md:px-8 py-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                                {currentContent.sections.map((section, index) => (
                                    <div key={index} className="mb-6 last:mb-0">
                                        <h3 className="other_font text-base md:text-lg font-semibold text-[#2B362D] mb-3">
                                            {section.title}
                                        </h3>
                                        <p className="other_font text-sm md:text-base text-black/70 leading-relaxed whitespace-pre-line">
                                            {section.text}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="sticky bottom-0 bg-white border-t border-black/10 rounded-b-2xl px-6 md:px-8 py-4 flex justify-end">
                                <button
                                    onClick={onClose}
                                    className="other_font px-6 py-2.5 bg-[#50D873] hover:bg-[#3ec45f] text-white rounded-full font-medium transition-colors duration-200"
                                >
                                    {lang === 'ru' ? 'Закрыть' : 'Close'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default PrivacyModal;
