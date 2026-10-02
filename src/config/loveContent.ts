/**
 * Configuration for Our First Month ♡ — A Romantic Interactive Love Letter
 * 
 * You can easily edit any message, date, code, or hint in this file to personalize
 * your anniversary love letter.
 */

export interface DiaryPageData {
  id: number;
  chapter: string;
  heading: string;
  message: string;
  whisper?: string;
  iconName?: string;
}

export interface LoveCouponItem {
  id: string;
  codeNumber: string;
  title: string;
  description: string;
  validity: string;
  iconType: 'hug' | 'wish' | 'listen' | 'forgive';
}

export interface LoveContentConfig {
  couple: {
    title: string;
    subtitle: string;
    anniversaryDate: string;
  };
  secretCodeConfig: {
    code: string; // Stored as a string to preserve leading zeros!
    hint: string;
    promptMessage: string;
    hintButtonText: string;
    clearButtonText: string;
    errorMessage: string;
    successMessage: string;
  };
  audio: {
    src: string;
    title: string;
    artist: string;
    fallbackDescription: string;
  };
  openingScene: {
    preTitle: string;
    title: string;
    subtitle: string;
    openButtonText: string;
    diaryCoverLabel: string;
    diarySpineDate: string;
  };
  diaryPages: DiaryPageData[];
  mainLetter: {
    badge: string;
    salutation: string;
    openingGreeting: string;
    paragraphs: string[];
    closing: string;
    signature: string;
    date: string;
    rereadButtonText: string;
    foldButtonText: string;
    continueButtonText: string;
  };
  couponsSection: {
    badge: string;
    heading: string;
    subheading: string;
    instruction: string;
    stampLabel: string;
    redeemedNotice: string;
    unredeemLabel: string;
    continueButtonText: string;
    coupons: LoveCouponItem[];
  };
  finalScene: {
    heading: string;
    message: string;
    hugButtonText: string;
    hugResponseText: string;
    hugSubText: string;
    revisitLetterText: string;
    restartText: string;
  };
}

export const loveContent: LoveContentConfig = {
  couple: {
    title: "Our First Month ♡",
    subtitle: "บันทึกครบรอบ 1 เดือนของเรา",
    anniversaryDate: "1st Month Anniversary",
  },

  // Secret code configuration (treated as string to preserve leading zero!)
  secretCodeConfig: {
    code: "030969",
    hint: "0309XX",
    promptMessage: "มีจดหมายซ่อนอยู่ในสมุดเล่มนี้… ปลดล็อกด้วยวันพิเศษของเรานะ",
    hintButtonText: "ขอคำใบ้ (Hint)",
    clearButtonText: "ล้างตัวเลข",
    errorMessage: "รหัสยังไม่ถูกต้องนะคนดี ลองกดดูคำใบ้อีกทีนะ ♡",
    successMessage: "เก่งจังเลย มาอ่านจดหมายของเค้ากันนะ ♡",
  },

  // Audio player configuration
  audio: {
    src: "/audio/piano.mp3",
    title: "Romantic Piano Melody",
    artist: "Written for You",
    fallbackDescription: "เสียงเปียโนบรรเลงเบา ๆ เสริมบรรยากาศสุดโรแมนติก",
  },

  // Opening scene
  openingScene: {
    preTitle: "A little letter, written just for you.",
    title: "เค้ามีบางอย่างอยากบอกเธอ…",
    subtitle: "A Little Letter, Written Just for You",
    openButtonText: "เปิดสมุดของเรา ♡",
    diaryCoverLabel: "Our Memories",
    diarySpineDate: "Month 01",
  },

  // 4 Interactive Diary Pages
  diaryPages: [
    {
      id: 1,
      chapter: "หน้า 1 จาก 4",
      heading: "รู้มั้ยว่า…",
      message:
        "เค้าไม่รู้เหมือนกันว่าตั้งแต่ตอนไหนที่รอยยิ้มของเธอกลายเป็นหนึ่งในสิ่งที่ทำให้เค้ามีความสุขได้มากขนาดนี้ ♡",
      whisper: "ทุกครั้งที่เห็นเธอหัวเราะ โลกของเค้าก็สดใสขึ้นเสมอ",
    },
    {
      id: 2,
      chapter: "หน้า 2 จาก 4",
      heading: "สิ่งเล็ก ๆ ที่เค้าชอบในตัวเธอ",
      message:
        "เค้าชอบเวลาที่ได้คุยกับเธอ ชอบเวลาที่เธอเล่าเรื่องต่าง ๆ ให้ฟัง แล้วก็ชอบความรู้สึกธรรมดา ๆ ที่เกิดขึ้นทุกครั้งที่มีเธออยู่ในวันของเค้า",
      whisper: "เรื่องธรรมดาที่ไม่ธรรมดา เมื่อมีเธอร่วมทาง",
    },
    {
      id: 3,
      chapter: "หน้า 3 จาก 4",
      heading: "ขอบคุณที่เข้ามาในชีวิตเค้านะ",
      message:
        "ขอบคุณที่ทำให้วันธรรมดาของเค้ามีอะไรให้ยิ้มได้มากขึ้น ขอบคุณทุกบทสนทนา ทุกช่วงเวลาที่เราได้ใช้ด้วยกัน และขอบคุณที่เป็นเธอในแบบที่เธอเป็น",
      whisper: "การได้เจอเธอคือของขวัญที่ดีที่สุด",
    },
    {
      id: 4,
      chapter: "หน้า 4 จาก 4",
      heading: "สุขสันต์วันครบรอบหนึ่งเดือนนะ",
      message:
        "หนึ่งเดือนของเราอาจเป็นเพียงจุดเริ่มต้น แต่เค้าก็ดีใจมาก ๆ ที่ได้เริ่มต้นเรื่องราวนี้ไปพร้อมกับเธอ เค้าอยากมีโอกาสสร้างความทรงจำดี ๆ กับเธออีกเยอะเลย",
      whisper: "และยังมีจดหมายพิเศษอีกฉบับที่เค้าตั้งใจเขียนให้เธอ…",
    },
  ],

  // Main Love Letter Section
  mainLetter: {
    badge: "Letter from the Heart",
    salutation: "ถึงเธอคนเก่งของเค้า,",
    openingGreeting: "สุขสันต์วันครบรอบหนึ่งเดือนนะเธอ ♡",
    paragraphs: [
      "เค้าอยากใช้โอกาสนี้บอกเธอว่า เค้าดีใจมากแค่ไหนที่มีเธอเข้ามาเป็นส่วนหนึ่งในชีวิตของเค้า ขอบคุณที่ทำให้เค้ามีเรื่องเล็ก ๆ ให้ยิ้มได้ในแต่ละวัน และทำให้ช่วงเวลาธรรมดากลายเป็นช่วงเวลาที่มีความหมายมากขึ้น",
      "เค้าอาจไม่ได้ทำทุกอย่างได้ดีเสมอไป บางครั้งอาจมีเรื่องที่ยังต้องเรียนรู้และปรับตัว แต่เค้าอยากตั้งใจดูแลความสัมพันธ์ของเรา อยากรับฟังเธอให้มากขึ้น และอยากให้เราสามารถเป็นตัวเองต่อกันได้อย่างสบายใจ",
      "เค้าไม่จำเป็นต้องรู้คำตอบของอนาคตทั้งหมดในวันนี้ก็ได้ แค่ได้ค่อย ๆ เรียนรู้กัน เติบโตไปด้วยกัน และมีโอกาสสร้างเรื่องราวดี ๆ ระหว่างทาง เค้าก็รู้สึกมีความสุขแล้ว",
      "ขอบคุณที่เป็นเธอนะ ขอบคุณสำหรับหนึ่งเดือนแรกของเรา และหวังว่าเราจะได้เปิดสมุดบันทึกเล่มนี้ไปด้วยกันอีกหลาย ๆ หน้าเลย",
    ],
    closing: "รักเธอนะ ♡",
    signature: "จากเค้า",
    date: "1 Month Anniversary & Forever",
    rereadButtonText: "อ่านจดหมายอีกครั้ง",
    foldButtonText: "พับเก็บจดหมาย",
    continueButtonText: "ไปรับคูปองพิเศษของเรา ♡",
  },

  // Romantic Love Coupons Section
  couponsSection: {
    badge: "Exclusive Love Tickets",
    heading: "คูปองรักพิเศษสำหรับเธอคนเดียว ♡",
    subheading: "ของขวัญครบรอบ 1 เดือนที่เธอสามารถหยิบมาใช้กับเค้าได้จริง ๆ ตลอดไป",
    instruction: "แตะที่คูปองเพื่อประทับตราใช้งาน (Redeem) ได้เลยนะ ♡",
    stampLabel: "REDEEMED ♡",
    redeemedNotice: "ประทับตราใช้คูปองแล้ว! เค้าสัญญาว่าจะทำตามนี้แน่นอน",
    unredeemLabel: "ยกเลิกการประทับตรา",
    continueButtonText: "ไปยังบทส่งท้ายของเรา ♡",
    coupons: [
      {
        id: "coupon-hug",
        codeNumber: "LOVE-01",
        title: "คูปองกอดแน่น ๆ ฟรี ไม่มีวันหมดอายุ",
        description: "ใช้ได้ทุกเวลา ทุกสถานที่ เมื่อไหร่ที่ต้องการกำลังใจ เหนื่อย หรือแค่อยากซบ ยื่นคูปองนี้แล้วเค้าจะกอดแน่น ๆ ทันที",
        validity: "ไม่มีวันหมดอายุ (ใช้ซ้ำได้ตลอดชีพ)",
        iconType: "hug",
      },
      {
        id: "coupon-wish",
        codeNumber: "LOVE-02",
        title: "คูปองตามใจหนึ่งวัน",
        description: "วันนี้เธอเป็นหัวหน้า! อยากกินอะไร ไปเที่ยวที่ไหน หรืออยากทำกิจกรรมอะไร เค้าตามใจเธอทุกอย่างโดยไม่มีข้อแม้",
        validity: "สิทธิ์พิเศษสำหรับคนเก่ง 1 วันเต็ม",
        iconType: "wish",
      },
      {
        id: "coupon-listen",
        codeNumber: "LOVE-03",
        title: "คูปองนั่งฟังเธอเล่าเรื่องเรื่อยเปื่อยจนหลับ",
        description: "เปิดหูและหัวใจเพื่อรับฟังทุกเรื่องราว ไม่ว่าจะเรื่องงาน เรื่องเพื่อน หรือเรื่องเล็กน้อยแค่ไหน เค้าพร้อมฟังด้วยรอยยิ้มจนเธอหลับฝันดี",
        validity: "ใช้ได้ทั้งวันและคืน",
        iconType: "listen",
      },
      {
        id: "coupon-forgive",
        codeNumber: "LOVE-04",
        title: "คูปองให้อภัยทันทีเมื่อเค้างอแง",
        description: "ถ้าวันไหนเค้าอาจจะเผลอเข้าใจยาก ดื้อ หรืองอแงใส่ ยื่นคูปองนี้ให้เค้า เค้าจะรีบขอโทษ ง้อเธอทันที และกอดเธออย่างอ่อนโยน",
        validity: "การันตีการง้อและให้อภัยทันที",
        iconType: "forgive",
      },
    ],
  },

  // Final Scene
  finalScene: {
    heading: "หนึ่งเดือนของเรา และอีกหลายหน้าที่รอให้เราเขียนด้วยกัน ♡",
    message:
      "เค้าไม่รู้ว่าระหว่างทางจะมีเรื่องราวแบบไหนรอเราอยู่บ้าง แต่เค้าอยากตั้งใจทำวันนี้ให้ดี อยากดูแลความรู้สึกของเธอ และอยากมีโอกาสรักเธอให้ดีขึ้นในทุก ๆ วัน",
    hugButtonText: "ส่งกอดให้เธอ ♡",
    hugResponseText: "กอดแน่น ๆ เลยนะคนเก่งของเค้า ♡",
    hugSubText: "อบอุ่นหัวใจเสมอที่มีเธออยู่ข้าง ๆ นะ",
    revisitLetterText: "กลับไปอ่านจดหมาย",
    restartText: "เปิดสมุดใหม่อีกครั้ง",
  },
};
