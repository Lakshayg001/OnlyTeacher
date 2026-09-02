import type { AdminStudent, Booking } from '@/types';

export const BOOKINGS: Booking[] = [
 { id: 'BK-4821', student: 'Aarav Krishnan', parent: 'Meera Krishnan', grade: '9', board: 'CBSE', subject: 'Mathematics', country: 'India', flag: 'IN', teacher: 'Rohan Desai', slot: 'Weekday evening', status: 'scheduled', createdAt: '26 Aug 2026' },
 { id: 'BK-4820', student: 'Sophie Carter', parent: 'Helen Carter', grade: '13', board: 'A-Level', subject: 'Physics', country: 'United Kingdom', flag: 'GB', teacher: 'James Whitfield', slot: 'Weekend', status: 'completed', createdAt: '26 Aug 2026' },
 { id: 'BK-4819', student: 'Layla Haddad', parent: 'Omar Haddad', grade: '10', board: 'IGCSE', subject: 'Chemistry', country: 'UAE', flag: 'AE', teacher: 'Fatima Al Mansoori', slot: 'Weekday afternoon', status: 'new', createdAt: '26 Aug 2026' },
 { id: 'BK-4818', student: 'Ethan Lewis', parent: 'Rebecca Lewis', grade: '8', board: 'Australian', subject: 'Science', country: 'Australia', flag: 'AU', teacher: 'Sarah Mitchell', slot: 'Weekday morning', status: 'scheduled', createdAt: '25 Aug 2026' },
 { id: 'BK-4817', student: 'Amelia Whitmore', parent: 'Sarah Whitmore', grade: '11', board: 'IB DP', subject: 'Biology', country: 'United Kingdom', flag: 'GB', teacher: 'Priya Nair', slot: 'Weekend', status: 'completed', createdAt: '25 Aug 2026' },
 { id: 'BK-4816', student: 'Aditi Sharma', parent: 'Rakesh Sharma', grade: '12', board: 'ICSE', subject: 'Computer Science', country: 'India', flag: 'IN', teacher: 'Marcus Reid', slot: 'Weekday evening', status: 'scheduled', createdAt: '25 Aug 2026' },
 { id: 'BK-4815', student: 'Noah Bennett', parent: 'Claire Bennett', grade: '10', board: 'GCSE', subject: 'Mathematics', country: 'United Kingdom', flag: 'GB', teacher: 'Dr. Ananya Rao', slot: 'Weekday afternoon', status: 'new', createdAt: '24 Aug 2026' },
 { id: 'BK-4814', student: 'Zayd Al Rashid', parent: 'Nadia Al Rashid', grade: '7', board: 'CBSE', subject: 'Mathematics', country: 'UAE', flag: 'AE', teacher: 'Daniel Okafor', slot: 'Weekday evening', status: 'cancelled', createdAt: '24 Aug 2026' },
 { id: 'BK-4813', student: 'Ishaan Mehta', parent: 'Priya Mehta', grade: '11', board: 'CBSE', subject: 'Physics', country: 'India', flag: 'IN', teacher: 'Rohan Desai', slot: 'Weekend', status: 'completed', createdAt: '23 Aug 2026' },
 { id: 'BK-4812', student: 'Emily Nguyen', parent: 'Linh Nguyen', grade: '9', board: 'IB MYP', subject: 'Technology', country: 'Australia', flag: 'AU', teacher: 'Marcus Reid', slot: 'Weekday morning', status: 'scheduled', createdAt: '23 Aug 2026' },
 { id: 'BK-4811', student: 'Riya Pillai', parent: 'Sunil Pillai', grade: '6', board: 'ICSE', subject: 'Science', country: 'India', flag: 'IN', teacher: 'Priya Nair', slot: 'Weekday afternoon', status: 'completed', createdAt: '22 Aug 2026' },
 { id: 'BK-4810', student: 'Zara Khalid', parent: 'Rania Khalid', grade: '12', board: 'American AP', subject: 'Mathematics', country: 'UAE', flag: 'AE', teacher: 'Dr. Ananya Rao', slot: 'Weekend', status: 'new', createdAt: '22 Aug 2026' },
];

export const STUDENTS: AdminStudent[] = [
 { id: 'ST-2201', name: 'Aarav Krishnan', grade: '9', board: 'CBSE', country: 'India', flag: 'IN', teacher: 'Rohan Desai', subjects: ['Mathematics'], attendance: 96, progress: 78, status: 'active', joined: 'Mar 2026' },
 { id: 'ST-2202', name: 'Sophie Carter', grade: '13', board: 'A-Level', country: 'United Kingdom', flag: 'GB', teacher: 'James Whitfield', subjects: ['Physics', 'Maths'], attendance: 100, progress: 91, status: 'active', joined: 'Jan 2026' },
 { id: 'ST-2203', name: 'Layla Haddad', grade: '10', board: 'IGCSE', country: 'UAE', flag: 'AE', teacher: 'Fatima Al Mansoori', subjects: ['Chemistry'], attendance: 88, progress: 64, status: 'trial', joined: 'Aug 2026' },
 { id: 'ST-2204', name: 'Ethan Lewis', grade: '8', board: 'Australian', country: 'Australia', flag: 'AU', teacher: 'Sarah Mitchell', subjects: ['Science', 'English'], attendance: 92, progress: 71, status: 'active', joined: 'May 2026' },
 { id: 'ST-2205', name: 'Amelia Whitmore', grade: '11', board: 'IB DP', country: 'United Kingdom', flag: 'GB', teacher: 'Priya Nair', subjects: ['Biology'], attendance: 97, progress: 85, status: 'active', joined: 'Feb 2026' },
 { id: 'ST-2206', name: 'Aditi Sharma', grade: '12', board: 'ICSE', country: 'India', flag: 'IN', teacher: 'Marcus Reid', subjects: ['Computer Science'], attendance: 94, progress: 88, status: 'active', joined: 'Nov 2025' },
 { id: 'ST-2207', name: 'Noah Bennett', grade: '10', board: 'GCSE', country: 'United Kingdom', flag: 'GB', teacher: 'Dr. Ananya Rao', subjects: ['Mathematics'], attendance: 81, progress: 58, status: 'paused', joined: 'Apr 2026' },
 { id: 'ST-2208', name: 'Ishaan Mehta', grade: '11', board: 'CBSE', country: 'India', flag: 'IN', teacher: 'Rohan Desai', subjects: ['Physics', 'Maths'], attendance: 99, progress: 82, status: 'active', joined: 'Jun 2026' },
];

/** Demo bookings per month, last 12 months. */
export const BOOKING_TREND = [
 { m: 'Sep', v: 210 }, { m: 'Oct', v: 248 }, { m: 'Nov', v: 232 }, { m: 'Dec', v: 190 },
 { m: 'Jan', v: 305 }, { m: 'Feb', v: 342 }, { m: 'Mar', v: 388 }, { m: 'Apr', v: 361 },
 { m: 'May', v: 420 }, { m: 'Jun', v: 468 }, { m: 'Jul', v: 512 }, { m: 'Aug', v: 574 },
];

export const COUNTRY_SPLIT = [
 { label: 'India', value: 6400, flag: 'IN', color: '#FF9B25' },
 { label: 'UAE', value: 2300, flag: 'AE', color: '#478A58' },
 { label: 'United Kingdom', value: 1900, flag: 'GB', color: '#1B2E54' },
 { label: 'Australia', value: 1100, flag: 'AU', color: '#8B7BE8' },
];

export const BOARD_SPLIT = [
 { label: 'CBSE', value: 34 },
 { label: 'IGCSE', value: 19 },
 { label: 'IB', value: 16 },
 { label: 'ICSE', value: 13 },
 { label: 'GCSE', value: 10 },
 { label: 'A-Level', value: 8 },
];

export const ACTIVITY = [
 { who: 'Fatima Al Mansoori', what: 'completed a demo lesson with Layla Haddad', when: '12 min ago', tone: 'forest' as const },
 { who: 'System', what: 'matched 3 new teachers to CBSE Grade 9 Mathematics', when: '48 min ago', tone: 'navy' as const },
 { who: 'Helen Carter', what: 'left a 5-star review for James Whitfield', when: '2 hours ago', tone: 'amber' as const },
 { who: 'Marcus Reid', what: 'published a new Computer Science module', when: '5 hours ago', tone: 'navy' as const },
 { who: 'Rohan Desai', what: 'rescheduled Ishaan Mehta to the weekend slot', when: 'Yesterday', tone: 'forest' as const },
];
