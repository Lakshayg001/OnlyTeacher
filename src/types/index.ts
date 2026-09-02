export type ClayIconName =
 | 'math'
 | 'science'
 | 'physics'
 | 'biology'
 | 'chemistry'
 | 'technology'
 | 'engineering'
 | 'globe'
 | 'teacher'
 | 'student'
 | 'book'
 | 'rocket'
 | 'trophy'
 | 'bulb'
 | 'support'
 | 'shield'
 | 'heart'
 | 'calendar'
 | 'chat'
 | 'graduation'
 | 'laptop'
 | 'puzzle'
 | 'target'
 | 'clock';

export interface NavItem {
 label: string;
 href: string;
 children?: { label: string; href: string; desc?: string; icon?: ClayIconName }[];
}

export interface Stat {
 value: number;
 suffix?: string;
 prefix?: string;
 label: string;
 icon: ClayIconName;
 accent: 'amber' | 'forest' | 'navy';
}

export interface Country {
 code: string;
 name: string;
 flag: string;
 lat: number;
 lng: number;
 curricula: string[];
 blurb: string;
 timezone: string;
 students: string;
}

export interface Course {
 id: string;
 title: string;
 subject: string;
 grade: string;
 track: TrackId;
 image: string;
 icon: ClayIconName;
 blurb: string;
 boards: string[];
 modules: number;
 hours: number;
 rating: number;
 accent: 'amber' | 'forest' | 'navy';
}

export type TrackId = 'primary' | 'middle' | 'secondary' | 'senior';

export interface Track {
 id: TrackId;
 label: string;
 grades: string;
 icon: ClayIconName;
}

export interface Board {
 id: string;
 name: string;
 full: string;
 region: string;
 color: 'amber' | 'forest' | 'navy';
 icon: ClayIconName;
 subjects: number;
 grades: string;
}

export interface Teacher {
 id: string;
 name: string;
 photo: string;
 headline: string;
 subjects: string[];
 boards: string[];
 grades: string;
 experience: number;
 rating: number;
 reviews: number;
 languages: string[];
 country: string;
 flag: string;
 verified: boolean;
 accent: 'amber' | 'forest' | 'navy';
}

export interface Testimonial {
 id: string;
 quote: string;
 name: string;
 role: string;
 avatar: string;
 country: string;
 flag: string;
 curriculum: string;
 subject: string;
 rating: number;
}

export interface Faq {
 q: string;
 a: string;
 icon: ClayIconName;
}

export interface Post {
 id: string;
 title: string;
 excerpt: string;
 category: string;
 date: string;
 readTime: number;
 image: string;
 accent: 'amber' | 'forest' | 'navy';
 author: string;
}

export interface Spec {
 title: string;
 desc: string;
 icon: ClayIconName;
 accent: 'amber' | 'forest' | 'navy';
}

/* ---------------------------------- Admin --------------------------------- */

export type BookingStatus = 'new' | 'scheduled' | 'completed' | 'cancelled';

export interface Booking {
 id: string;
 student: string;
 parent: string;
 grade: string;
 board: string;
 subject: string;
 country: string;
 flag: string;
 teacher: string;
 slot: string;
 status: BookingStatus;
 createdAt: string;
}

export interface AdminStudent {
 id: string;
 name: string;
 grade: string;
 board: string;
 country: string;
 flag: string;
 teacher: string;
 subjects: string[];
 attendance: number;
 progress: number;
 status: 'active' | 'trial' | 'paused';
 joined: string;
}
