"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Map as LeafletMap } from 'leaflet';

const MAP_CENTER: [number, number] = [41.840569, 60.394338];
const MAP_ZOOM = 16;
const MAP_URL = "https://www.google.com/maps/dir/?api=1&destination=41.840569,60.394338";
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(MAP_URL)}`;

const MARKERS = [
    {
        id: 1,
        label: 'Gurlan Global Teks',
        pos: { x: 45, y: 48 },
        popup: {
            title: 'Республика Узбекистан,Хорезмская область,Гурленский район,ул.Мустакиллик,5',
            hours: 'Круглосуточно, без выходных',
        },
    },
];

const mapStyles = `
.leaflet-container { cursor: default !important; }
.leaflet-grab { cursor: default !important; }
.leaflet-control-attribution { display: none !important; }
`;

type ReactLeaflet = typeof import('react-leaflet');

const ContactS2 = () => {
    const [activeMarker, setActiveMarker] = useState<number | null>(null);
    const [LeafletMap, setLeafletMap] = useState<ReactLeaflet | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        import('react-leaflet').then((rl) => {
            import('leaflet').then((L) => {
                delete (L.default.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
                setLeafletMap(rl);
            });
        });
    }, []);

    const handleMapReady = (map: LeafletMap | null) => {
        if (!map) return;
        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();
        if ((map as LeafletMap & { tap?: { disable: () => void } }).tap) {
            (map as LeafletMap & { tap?: { disable: () => void } }).tap?.disable();
        }
    };

    const getPopupStyle = (marker: typeof MARKERS[0]): React.CSSProperties => {
        const isRight = marker.pos.x > 55;
        return {
            top: 'calc(100% + 8px)',
            ...(isRight ? { right: 0 } : { left: '50%', transform: 'translateX(-50%)' }),
        };
    };

    return (
        <div className="container py-16">
            <style>{mapStyles}</style>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

            <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="other_font uppercase font-semibold text-3xl md:text-4xl text-[#2B362D] mb-10"
            >
                Схема проезда
            </motion.h1>

            <div
                ref={containerRef}
                className="relative w-full rounded-2xl overflow-hidden"
                style={{ height: 'clamp(340px, 52vw, 560px)' }}
            >
                {LeafletMap ? (
                    <LeafletMap.MapContainer
                        center={MAP_CENTER}
                        zoom={MAP_ZOOM}
                        style={{ width: '100%', height: '100%' }}
                        zoomControl={false}
                        dragging={false}
                        touchZoom={false}
                        doubleClickZoom={false}
                        scrollWheelZoom={false}
                        boxZoom={false}
                        keyboard={false}
                        ref={(map) => handleMapReady(map)}
                    >
                        <LeafletMap.TileLayer
                            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        />
                    </LeafletMap.MapContainer>
                ) : (
                    <div className="w-full h-full bg-[#e8ede8] flex items-center justify-center">
                        <span className="other_font text-sm text-black/30">Загрузка карты...</span>
                    </div>
                )}

                {/* Markers overlay */}
                <div className="absolute inset-0 z-[400] pointer-events-none">
                    {MARKERS.map((marker) => {
                        const isActive = activeMarker === marker.id;
                        return (
                            <div
                                key={marker.id}
                                className="absolute pointer-events-auto"
                                style={{
                                    left: `${marker.pos.x}%`,
                                    top: `${marker.pos.y}%`,
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: isActive ? 10 : 1,
                                }}
                            >
                                <button
                                    onClick={() => setActiveMarker(isActive ? null : marker.id)}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <span className="hidden md:block other_font text-sm font-medium text-[#2B362D] bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm whitespace-nowrap select-none">
                                        {marker.label}
                                    </span>
                                    <span
                                        className="w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors duration-200 shrink-0"
                                        style={{ background: isActive ? '#50D873' : '#1a1a1a' }}
                                    >
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <path d="M7 1V13M1 7H13" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                                        </svg>
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -6, scale: 0.97 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -6, scale: 0.97 }}
                                            transition={{ duration: 0.22 }}
                                            className="absolute z-20 bg-white rounded-2xl shadow-xl px-4 py-3"
                                            style={{
                                                ...getPopupStyle(marker),
                                                width: 'clamp(220px, 60vw, 300px)',
                                            }}
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <p className="other_font text-sm font-semibold text-[#2B362D] mb-1.5 leading-snug">
                                                        {marker.popup.title}
                                                    </p>
                                                    <p className="other_font text-xs text-black/40 mb-0.5">Режим работы:</p>
                                                    <p className="other_font text-sm text-[#2B362D]">
                                                        {marker.popup.hours}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => setActiveMarker(null)}
                                                    className="w-7 h-7 rounded-full bg-[#50D873] flex items-center justify-center cursor-pointer shrink-0 hover:bg-[#007a6b] transition-colors duration-200 mt-0.5"
                                                >
                                                    <X size={12} className="text-white" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {/* QR Code */}
                <div className="absolute bottom-3 right-3 z-[500] bg-white/95 backdrop-blur-sm rounded-xl p-2.5 md:p-3 flex flex-col items-center gap-1.5 shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={QR_URL}
                        alt="QR маршрут"
                        className="w-20 h-20 md:w-28 md:h-28"
                    />
                    <a
                        href={MAP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="other_font text-[9px] md:text-[11px] font-bold text-[#2B362D] uppercase tracking-wide hover:text-[#50D873] transition-colors duration-200"
                    >
                        Проложить маршрут
                    </a>
                </div>

                {activeMarker !== null && (
                    <div
                        className="absolute inset-0 z-[399]"
                        onClick={() => setActiveMarker(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default ContactS2;