/**
 * Curated education / teaching / student photography.
 * Every consumer renders these through <SmartImage/>, which falls back to a
 * branded clay illustration if a remote asset is unavailable.
 */
const U = 'https://images.unsplash.com/photo-';

const q = (id: string, w = 1200, h = 900) =>
 `${U}${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const IMG = {
 /* Hero + lifestyle */
 heroStudent: q('1588072432836-e10032774350', 1100, 1200),
 heroTutor: q('1522202176988-66273c2fd55f', 900, 900),
 heroClass: q('1524178232363-1fb2b075b655', 900, 700),
 heroLaptop: q('1584697964358-3e14ca57658b', 900, 700),
 girlStudy: q('1544717297-fa95b6ee9643', 800, 1000),
 kidOnline: q('1596495578065-6e0763fa1178', 900, 700),
 studyDesk: q('1503676260728-1c00da094a0b', 1000, 750),
 library: q('1481627834876-b7833e8f5570', 1000, 750),
 groupStudy: q('1523240795612-9a054b0db644', 1000, 750),
 chalkboard: q('1509062522246-3755977927d7', 1000, 750),
 notebook: q('1497633762265-9d179a990aa6', 1000, 750),
 schoolKids: q('1580582932707-520aed937b7b', 1000, 750),
 onlineLesson: q('1610484826967-09c5720778c7', 1000, 750),
 raiseHand: q('1571260899304-425eee4c7efc', 900, 900),
 campus: q('1562774053-701939374585', 1200, 800),

 /* Subject imagery */
 math: q('1509228468518-180dd4864904', 900, 700),
 mathBoard: q('1635070041078-e363dbe005cb', 900, 700),
 science: q('1532094349884-543bc11b234d', 900, 700),
 chemistry: q('1567427017947-545c5f8d16ad', 900, 700),
 physics: q('1636466497217-26a8cbeaf0aa', 900, 700),
 biology: q('1530026186672-2cd00ffc50fe', 900, 700),
 technology: q('1526628953301-3e589a6a8b74', 900, 700),
 coding: q('1516321318423-f06f85e504b3', 900, 700),
 engineering: q('1581092160562-40aa08e78837', 900, 700),
 robotics: q('1581092918056-0c4c3acd3789', 900, 700),
 english: q('1457369804613-52c61a468e7d', 900, 700),
 globeDesk: q('1451187580459-43490279c0fa', 900, 700),
 exam: q('1434030216411-0b793f4b4173', 900, 700),

 /* People teachers */
 t1: q('1573497019940-1c28c88b4f3e', 500, 500),
 t2: q('1507003211169-0a1dd7228f2d', 500, 500),
 t3: q('1580489944761-15a19d654956', 500, 500),
 t4: q('1568602471122-7832951cc4c5', 500, 500),
 t5: q('1494790108377-be9c29b29330', 500, 500),
 t6: q('1531123897727-8f129e1688ce', 500, 500),
 t7: q('1544005313-94ddf0286df2', 500, 500),
 t8: q('1519085360753-af0119f7cbe7', 500, 500),

 /* People parents & students (testimonials) */
 p1: q('1438761681033-6461ffad8d80', 300, 300),
 p2: q('1500648767791-00dcc994a43e', 300, 300),
 p3: q('1554151228-14d9def656e4', 300, 300),
 p4: q('1517841905240-472988babdf9', 300, 300),
 p5: q('1502685104226-ee32379fefbe', 300, 300),
 p6: q('1463453091185-61582044d556', 300, 300),

 /* Blog */
 blog1: q('1596495578065-6e0763fa1178', 900, 620),
 blog2: q('1628595351029-c2bf17511435', 900, 620),
 blog3: q('1434030216411-0b793f4b4173', 900, 620),
 blog4: q('1503676260728-1c00da094a0b', 900, 620),
 blog5: q('1516321318423-f06f85e504b3', 900, 620),
 blog6: q('1497633762265-9d179a990aa6', 900, 620),
} as const;

export type ImageKey = keyof typeof IMG;
