export interface Author {
  id: string;
  name: string;
  credentials: {
    fr: string;
    en?: string;
    ar?: string;
  };
  bio: {
    fr: string;
    en?: string;
    ar?: string;
  };
  linkedinUrl: string;
}

export const primaryAuthor: Author = {
  id: 'erh-pro-expert',
  name: 'Expert ERH Pro',
  credentials: {
    fr: 'Expert en droit du travail & ressources humaines, Maroc',
    en: 'Labor Law & Human Resources Expert, Morocco',
    ar: 'خبير في قانون الشغل والموارد البشرية، المغرب',
  },
  bio: {
    fr: "Spécialiste du droit du travail marocain avec plus de 10 ans d'expérience en gestion des ressources humaines et en conseil juridique pour les entreprises marocaines. Ses guides et analyses sont publiés sur e-RH Pro, la référence RH au Maroc.",
    en: "Moroccan labor law specialist with over 10 years of experience in human resources management and legal consulting for Moroccan companies.",
    ar: "متخصص في قانون الشغل المغربي مع خبرة تزيد عن 10 سنوات في إدارة الموارد البشرية والاستشارات القانونية للشركات المغربية.",
  },
  linkedinUrl: 'https://www.linkedin.com/company/erh-pro/',
};
