export type Gender = "femme" | "homme" | "mixte" | "enfants";
export type Tier = "standard" | "luxe" | "luxury";

export interface ChoganPrice {
  label: string;
  price: number;
}

export interface ChoganProduct {
  code: string;
  name: string;
  brand?: string;
  gender: Gender;
  tier: Tier;
  prices: ChoganPrice[];
  hasGelDouche?: boolean;
}

// ─── Price presets ───────────────────────────────────────────────────────────
const STD: ChoganPrice[] = [
  { label: "70 ml", price: 35 },
  { label: "30 ml", price: 18 },
  { label: "Recharge 15 ml", price: 11.9 },
];

const LA: ChoganPrice[] = [
  { label: "15 ml", price: 17.9 },
  { label: "30 ml", price: 29.5 },
  { label: "70 ml", price: 57 },
];
const LB: ChoganPrice[] = [
  { label: "15 ml", price: 14.9 },
  { label: "30 ml", price: 25.5 },
  { label: "70 ml", price: 48 },
];
const LC: ChoganPrice[] = [
  { label: "15 ml", price: 13.9 },
  { label: "30 ml", price: 23.5 },
  { label: "70 ml", price: 45 },
];

const LX: ChoganPrice[] = [{ label: "15 ml", price: 19.9 }];
const LX_MED: ChoganPrice[] = [
  { label: "15 ml", price: 22.9 },
  { label: "50 ml", price: 65 },
];
const LX_50: ChoganPrice[] = [
  { label: "15 ml", price: 19.9 },
  { label: "50 ml", price: 52 },
];

const ENF: ChoganPrice[] = [{ label: "30 ml", price: 29 }];

// ─── Catalogue ───────────────────────────────────────────────────────────────
export const CATALOGUE: ChoganProduct[] = [
  // ── FEMME STANDARD ──────────────────────────────────────────────────────
  { code: "006W", name: "OPIUM", brand: "YSL", gender: "femme", tier: "standard", prices: STD },
  { code: "007W", name: "J'ADORE", brand: "DIOR", gender: "femme", tier: "standard", prices: STD, hasGelDouche: true },
  { code: "010W", name: "ALIEN", brand: "D&G", gender: "femme", tier: "standard", prices: STD, hasGelDouche: true },
  { code: "011W", name: "LIGHT BLUE", brand: "YSL", gender: "femme", tier: "standard", prices: STD },
  { code: "014W", name: "MANIFESTO", brand: "PACO RABANNE", gender: "femme", tier: "standard", prices: STD },
  { code: "019W", name: "LADY MILLION", brand: "DIOR", gender: "femme", tier: "standard", prices: STD },
  { code: "023W", name: "HYPNOTIC POISON", brand: "DIOR", gender: "femme", tier: "standard", prices: STD, hasGelDouche: true },
  { code: "024W", name: "CHANEL N°5", brand: "CHANEL", gender: "femme", tier: "standard", prices: STD },
  { code: "025W", name: "FOR HER", brand: "NARCISO RODRIGUEZ", gender: "femme", tier: "standard", prices: STD },
  { code: "026W", name: "FLOWER", brand: "KENZO", gender: "femme", tier: "standard", prices: STD },
  { code: "027W", name: "TRÉSOR", brand: "LANCOME", gender: "femme", tier: "standard", prices: STD },
  { code: "028W", name: "ANGEL", brand: "THIERRY MUGLER", gender: "femme", tier: "standard", prices: STD },
  { code: "029W", name: "L'EAU D'ISSEY", brand: "ISSEY MIYAKE", gender: "femme", tier: "standard", prices: STD },
  { code: "039W", name: "MISS DIOR CHÉRIE", brand: "DIOR", gender: "femme", tier: "standard", prices: STD },
  { code: "040W", name: "HYPNOSE", brand: "LANCOME", gender: "femme", tier: "standard", prices: STD },
  { code: "042W", name: "LA VIE EST BELLE", brand: "LANCOME", gender: "femme", tier: "standard", prices: STD, hasGelDouche: true },
  { code: "047W", name: "CRYSTAL NOIR", brand: "VERSACE", gender: "femme", tier: "standard", prices: STD },
  { code: "049W", name: "DOLCE", brand: "D&G", gender: "femme", tier: "standard", prices: STD },
  { code: "051W", name: "COCO MADEMOISELLE", brand: "CHANEL", gender: "femme", tier: "standard", prices: STD, hasGelDouche: true },
  { code: "053W", name: "NARCISO", brand: "NARCISO RODRIGUEZ", gender: "femme", tier: "standard", prices: STD },
  { code: "055W", name: "BLACK OPIUM", brand: "YSL", gender: "femme", tier: "standard", prices: STD, hasGelDouche: true },
  { code: "056W", name: "ANGE OU DÉMON", brand: "GIVENCHY", gender: "femme", tier: "standard", prices: STD },
  { code: "057W", name: "OMNIA AMÉTHYSTE", brand: "BVLGARI", gender: "femme", tier: "standard", prices: STD },
  { code: "064W", name: "OMNIA INDIAN GARNET", brand: "BVLGARI", gender: "femme", tier: "standard", prices: STD },
  { code: "067W", name: "OLYMPEA", brand: "PACO RABANNE", gender: "femme", tier: "standard", prices: STD },
  { code: "070W", name: "THE ONE", brand: "D&G", gender: "femme", tier: "standard", prices: STD },
  { code: "071W", name: "ALLURE", brand: "CHANEL", gender: "femme", tier: "standard", prices: STD },
  { code: "076W", name: "ACQUA DI GIOIA", brand: "ARMANI", gender: "femme", tier: "standard", prices: STD },
  { code: "080W", name: "SI", brand: "ARMANI", gender: "femme", tier: "standard", prices: STD, hasGelDouche: true },
  { code: "081W", name: "CLASSIQUE ESSENCE", brand: "JEAN PAUL GAULTIER", gender: "femme", tier: "standard", prices: STD },
  { code: "082W", name: "SIGNORINA", brand: "SALVATORE FERRAGAMO", gender: "femme", tier: "standard", prices: STD },
  { code: "085W", name: "CHANCE", brand: "CHANEL", gender: "femme", tier: "standard", prices: STD },
  { code: "089W", name: "MON PARIS", brand: "YSL", gender: "femme", tier: "standard", prices: STD },
  { code: "090W", name: "POISON GIRL", brand: "DIOR", gender: "femme", tier: "standard", prices: STD },
  { code: "096W", name: "GABRIELLE", brand: "CHANEL", gender: "femme", tier: "standard", prices: STD },
  { code: "097W", name: "AMO", brand: "SALVATORE FERRAGAMO", gender: "femme", tier: "standard", prices: STD },
  { code: "098W", name: "JOY", brand: "DIOR", gender: "femme", tier: "standard", prices: STD },
  { code: "115W", name: "IDOLE", brand: "LANCOME", gender: "femme", tier: "standard", prices: STD },
  { code: "116W", name: "YES I AM", brand: "CACHAREL", gender: "femme", tier: "standard", prices: STD },
  { code: "119W", name: "SCANDAL", brand: "JEAN PAUL GAULTIER", gender: "femme", tier: "standard", prices: STD, hasGelDouche: true },
  { code: "120W", name: "LA PETITE ROBE NOIRE", brand: "GUERLAIN", gender: "femme", tier: "standard", prices: STD, hasGelDouche: true },
  { code: "121W", name: "L'INTERDIT", brand: "GIVENCHY", gender: "femme", tier: "standard", prices: STD, hasGelDouche: true },
  { code: "133W", name: "PRADA PARADOXE", brand: "PRADA", gender: "femme", tier: "standard", prices: STD },
  { code: "145W", name: "DÉVOTION", brand: "D&G", gender: "femme", tier: "standard", prices: STD },
  { code: "148W", name: "GODDESS", brand: "BURBERRY", gender: "femme", tier: "standard", prices: STD },
  { code: "151W", name: "GUILTY", brand: "GUCCI", gender: "femme", tier: "standard", prices: STD },
  { code: "153W", name: "CHLOÉ", brand: "CHLOÉ", gender: "femme", tier: "standard", prices: STD },
  { code: "154W", name: "LOVE CHLOÉ", brand: "CHLOÉ", gender: "femme", tier: "standard", prices: STD },
  { code: "156W", name: "HUGO", brand: "HUGO BOSS", gender: "femme", tier: "standard", prices: STD },
  { code: "158W", name: "FLORA", brand: "GUCCI", gender: "femme", tier: "standard", prices: STD },
  { code: "159W", name: "BURBERRY WOMEN", brand: "BURBERRY", gender: "femme", tier: "standard", prices: STD },
  { code: "161W", name: "BORN IN ROMA INTENSE", brand: "VALENTINO", gender: "femme", tier: "standard", prices: STD },

  // ── HOMME STANDARD ──────────────────────────────────────────────────────
  { code: "001M", name: "ONE MILLION", brand: "PACO RABANNE", gender: "homme", tier: "standard", prices: STD, hasGelDouche: true },
  { code: "002M", name: "ACQUA DI GIO", brand: "ARMANI", gender: "homme", tier: "standard", prices: STD },
  { code: "003M", name: "FAHRENHEIT", brand: "DIOR", gender: "homme", tier: "standard", prices: STD, hasGelDouche: true },
  { code: "004M", name: "THE ONE", brand: "D&G", gender: "homme", tier: "standard", prices: STD },
  { code: "012M", name: "EAU SAUVAGE", brand: "DIOR", gender: "homme", tier: "standard", prices: STD },
  { code: "015M", name: "ROMA UOMO", brand: "LAURA BIAGIOTTI", gender: "homme", tier: "standard", prices: STD },
  { code: "016M", name: "LE MÂLE", brand: "JEAN PAUL GAULTIER", gender: "homme", tier: "standard", prices: STD, hasGelDouche: true },
  { code: "018M", name: "DÉCLARATION", brand: "CARTIER", gender: "homme", tier: "standard", prices: STD },
  { code: "020M", name: "LA NUIT DE L'HOMME", brand: "YSL", gender: "homme", tier: "standard", prices: STD, hasGelDouche: true },
  { code: "021M", name: "LIGHT BLUE", brand: "D&G", gender: "homme", tier: "standard", prices: STD },
  { code: "022M", name: "TERRE D'HERMÈS", brand: "HERMÈS", gender: "homme", tier: "standard", prices: STD },
  { code: "030M", name: "BLACK XS", brand: "PACO RABANNE", gender: "homme", tier: "standard", prices: STD },
  { code: "032M", name: "SPICE BOMB", brand: "VIKTOR & ROLF", gender: "homme", tier: "standard", prices: STD },
  { code: "033M", name: "BLACK CODE", brand: "ARMANI", gender: "homme", tier: "standard", prices: STD, hasGelDouche: true },
  { code: "037M", name: "MAN", brand: "BVLGARI", gender: "homme", tier: "standard", prices: STD },
  { code: "038M", name: "BLEU", brand: "CHANEL", gender: "homme", tier: "standard", prices: STD },
  { code: "048M", name: "ALLURE HOMME", brand: "CHANEL", gender: "homme", tier: "standard", prices: STD },
  { code: "052M", name: "PASHA 150", brand: "CARTIER", gender: "homme", tier: "standard", prices: STD },
  { code: "061M", name: "INVICTUS", brand: "PACO RABANNE", gender: "homme", tier: "standard", prices: STD, hasGelDouche: true },
  { code: "062M", name: "INTENSO", brand: "D&G", gender: "homme", tier: "standard", prices: STD },
  { code: "069M", name: "ACQUA DI SALE", brand: "PROFUMUM ROMA", gender: "homme", tier: "standard", prices: STD },
  { code: "079M", name: "MYSLF", brand: "YSL", gender: "homme", tier: "standard", prices: STD },
  { code: "084M", name: "DYLAN BLUE", brand: "VERSACE", gender: "homme", tier: "standard", prices: STD },
  { code: "086M", name: "LEGEND", brand: "MONT BLANC", gender: "homme", tier: "standard", prices: STD },
  { code: "087M", name: "WANTED", brand: "AZZARO", gender: "homme", tier: "standard", prices: STD },
  { code: "088M", name: "MAN IN BLACK", brand: "BVLGARI", gender: "homme", tier: "standard", prices: STD },
  { code: "091M", name: "CHROME", brand: "AZZARO", gender: "homme", tier: "standard", prices: STD },
  { code: "140M", name: "ÉROS", brand: "VERSACE", gender: "homme", tier: "standard", prices: STD },
  { code: "147M", name: "BOSS BOTTLED ABSOLU", brand: "HUGO BOSS", gender: "homme", tier: "standard", prices: STD },
  { code: "150M", name: "HUGO", brand: "HUGO BOSS", gender: "homme", tier: "standard", prices: STD, hasGelDouche: true },
  { code: "152M", name: "GUILTY", brand: "GUCCI", gender: "homme", tier: "standard", prices: STD },
  { code: "157M", name: "THE SCENT", brand: "HUGO BOSS", gender: "homme", tier: "standard", prices: STD },
  { code: "160M", name: "BURBERRY FOR MEN", brand: "BURBERRY", gender: "homme", tier: "standard", prices: STD },
  { code: "162M", name: "BORN IN ROMA INTENSE", brand: "VALENTINO", gender: "homme", tier: "standard", prices: STD },

  // ── MIXTE STANDARD ──────────────────────────────────────────────────────
  { code: "054U", name: "BLACK ORCHID", brand: "TOM FORD", gender: "mixte", tier: "standard", prices: STD },
  { code: "072U", name: "PATCHOULI", brand: "REMINISCENCE", gender: "mixte", tier: "standard", prices: STD },
  { code: "100U", name: "WHITE AOUD", brand: "MONTALE", gender: "mixte", tier: "standard", prices: STD },
  { code: "105U", name: "INTENSE CAFÉ", brand: "MONTALE", gender: "mixte", tier: "standard", prices: STD, hasGelDouche: true },
  { code: "155U", name: "CK ONE", brand: "CALVIN KLEIN", gender: "mixte", tier: "standard", prices: STD },

  // ── FEMME LUXE ──────────────────────────────────────────────────────────
  { code: "093W", name: "AVENTUS FOR HER", brand: "CREED", gender: "femme", tier: "luxe", prices: LA },
  { code: "122W", name: "LIBRE", brand: "YSL", gender: "femme", tier: "luxe", prices: LB },
  { code: "131W", name: "GOOD GIRL", brand: "CAROLINA HERRERA", gender: "femme", tier: "luxe", prices: LB },
  { code: "132W", name: "MY WAY", brand: "ARMANI", gender: "femme", tier: "luxe", prices: LC },

  // ── HOMME LUXE ──────────────────────────────────────────────────────────
  { code: "068M", name: "AVENTUS", brand: "CREED", gender: "homme", tier: "luxe", prices: LA },
  { code: "094M", name: "SAUVAGE", brand: "DIOR", gender: "homme", tier: "luxe", prices: LB },
  { code: "113M", name: "SUR LA ROUTE", brand: "LOUIS VUITTON", gender: "homme", tier: "luxe", prices: LA },
  { code: "136M", name: "DIOR HOMME INTENSE", brand: "DIOR", gender: "homme", tier: "luxe", prices: LC },

  // ── MIXTE LUXE ──────────────────────────────────────────────────────────
  { code: "044U", name: "SILVER MOUNTAIN", brand: "CREED", gender: "mixte", tier: "luxe", prices: LB },
  { code: "073U", name: "HIMALAYA", brand: "CREED", gender: "mixte", tier: "luxe", prices: LB },
  { code: "099U", name: "MANDARINO DI AMALFI", brand: "TOM FORD", gender: "mixte", tier: "luxe", prices: LB },
  { code: "110U", name: "KIRKÉ", brand: "TIZIANA TERENZI", gender: "mixte", tier: "luxe", prices: LC },
  { code: "114U", name: "OMBRE NOMADE", brand: "LOUIS VUITTON", gender: "mixte", tier: "luxe", prices: LB },
  { code: "135U", name: "BOIS D'ARGENT", brand: "DIOR", gender: "mixte", tier: "luxe", prices: LA },
  { code: "142U", name: "OMBRE LEATHER", brand: "TOM FORD", gender: "mixte", tier: "luxe", prices: LA },

  // ── LUXURY FEMME ────────────────────────────────────────────────────────
  { code: "109W", name: "J'ADORE L'OR", brand: "DIOR", gender: "femme", tier: "luxury", prices: LX },
  { code: "123W", name: "GOOD GIRL GONE BAD", brand: "KILIAN", gender: "femme", tier: "luxury", prices: LX },

  // ── LUXURY HOMME ────────────────────────────────────────────────────────
  { code: "074M", name: "BLACK AFGANO", brand: "NASOMATTO", gender: "homme", tier: "luxury", prices: LX },
  { code: "075M", name: "X FOR MEN", brand: "CLIVE CHRISTIAN", gender: "homme", tier: "luxury", prices: LX },

  // ── LUXURY MIXTE ────────────────────────────────────────────────────────
  { code: "101U", name: "VELVET AMBER SKIN", brand: "D&G", gender: "mixte", tier: "luxury", prices: LX },
  { code: "102U", name: "VELVET AMBER SUN", brand: "D&G", gender: "mixte", tier: "luxury", prices: LX },
  { code: "106U", name: "FUCKING FABULOUS", brand: "TOM FORD", gender: "mixte", tier: "luxury", prices: LX_50 },
  { code: "111U", name: "LOST CHERRY", brand: "TOM FORD", gender: "mixte", tier: "luxury", prices: LX },
  { code: "112U", name: "NÉROLI PORTOFINO", brand: "TOM FORD", gender: "mixte", tier: "luxury", prices: LX },
  { code: "117U", name: "TOBACCO VANILLE", brand: "TOM FORD", gender: "mixte", tier: "luxury", prices: LX },
  { code: "118U", name: "BACCARAT ROUGE 540", brand: "MAISON FRANCIS KURKDJIAN", gender: "mixte", tier: "luxury", prices: LX },
  { code: "124U", name: "ZETA", brand: "MORPH", gender: "mixte", tier: "luxury", prices: LX },
  { code: "125U", name: "SOLE DI POSITANO ACQUA", brand: "TOM FORD", gender: "mixte", tier: "luxury", prices: LX },
  { code: "126U", name: "SOLEIL BLANC", brand: "TOM FORD", gender: "mixte", tier: "luxury", prices: LX },
  { code: "127U", name: "OUD WOOD", brand: "TOM FORD", gender: "mixte", tier: "luxury", prices: LX_50 },
  { code: "128U", name: "VANILLE FATALE", brand: "TOM FORD", gender: "mixte", tier: "luxury", prices: LX },
  { code: "129U", name: "ERBA PURA", brand: "XERJOFF", gender: "mixte", tier: "luxury", prices: LX },
  { code: "130U", name: "MEGAMARE", brand: "ORTO PARISI", gender: "mixte", tier: "luxury", prices: LX_MED },
  { code: "134U", name: "BITTER PEACH", brand: "TOM FORD", gender: "mixte", tier: "luxury", prices: LX },
  { code: "137U", name: "XJ 1861 NAXOS", brand: "XERJOFF", gender: "mixte", tier: "luxury", prices: LX },
  { code: "138U", name: "WOOD WHISPER", brand: "OJAR", gender: "mixte", tier: "luxury", prices: LX },
  { code: "139U", name: "LES SABLES ROSES", brand: "LOUIS VUITTON", gender: "mixte", tier: "luxury", prices: LX_MED },
  { code: "141U", name: "TURATH", brand: "THE SPIRIT OF DUBAÏ", gender: "mixte", tier: "luxury", prices: LX_MED },
  { code: "143U", name: "VANILLA POWDER", brand: "MATIÈRE PREMIÈRE", gender: "mixte", tier: "luxury", prices: LX },
  { code: "144U", name: "BIANCO LATTE", brand: "GIARDINI DI TOSCANA", gender: "mixte", tier: "luxury", prices: LX },
  { code: "146U", name: "ROUGE", brand: "PIERRE BALMAIN", gender: "mixte", tier: "luxury", prices: LX },

  // ── ENFANTS ─────────────────────────────────────────────────────────────
  { code: "045", name: "GARÇON", gender: "enfants", tier: "standard", prices: ENF },
  { code: "058", name: "FILLE", gender: "enfants", tier: "standard", prices: ENF },
  { code: "059", name: "BÉBÉ", gender: "enfants", tier: "standard", prices: ENF },
];
