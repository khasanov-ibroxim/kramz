

// ===== REUSABLE TYPES =====
export interface Stat {
    value: string;
    label: string;
    title:string
}

export interface Phone {
    number: string;
    label: string;
}

// ===== SECTIONS =====
export interface HomeS2 {
    title: string;
    texts: string[];
    stats: Stat[];
}

export interface HomeS3Item {
    title: string;
    desc: string;
}

export interface HomeS3 {
    title: string;
    subtitle: string;
    tabs: string[];
    byType: HomeS3Item[];
    solutions: HomeS3Item[];
}

export interface HomeS4 {
    title: string;
    text: string;
    stats: Stat[];
}

export interface HomeS5 {
    title: string;
    text: string;
    tabs: string[];
    popup: {
        year: string;
        area: string;
        materials: string;
    };
}

export interface HomeS6 {
    title: string;
    text: string;
    button: string;
}

export interface HomeS7 {
    title: string;
    buttons: {
        feedback: string;
        directions: string;
    };
    phones: Phone[];
}

// ===== MAIN DICTIONARY =====
export interface HomeDictionary {
    header: {
        title: string;
    };
    s2: HomeS2;
    s3: HomeS3;
    s4: HomeS4;
    s5: HomeS5;
    s6: HomeS6;
    s7: HomeS7;
}