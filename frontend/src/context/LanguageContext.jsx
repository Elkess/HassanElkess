import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  fr: {
    nav: {
      gallery: 'Galerie',
      upload: 'Publier',
      dashboard: 'Tableau de bord',
      profile: 'Profil',
      logout: 'Se deconnecter',
      login: 'Connexion',
      register: 'Inscription'
    },
    dashboard: {
      title: 'Tableau de bord',
      subtitle: 'Gestion de votre portfolio artistique',
      uploadNew: 'Ajouter une oeuvre',
      totalArtworks: 'Oeuvres totales',
      totalViews: 'Vues totales',
      forSale: 'En vente',
      noArtworks: 'Aucune oeuvre publiee pour le moment.',
      uploadFirst: 'Publier votre premiere oeuvre',
      artwork: 'Oeuvre',
      category: 'Categorie',
      views: 'Vues',
      status: 'Statut',
      actions: 'Actions',
      forSaleBadge: 'En vente',
      notForSale: 'Non disponible a la vente',
      view: 'Voir',
      delete: 'Supprimer',
      deleteTitle: 'Supprimer cette oeuvre ?',
      deleteText: 'Cette action est definitive.',
      cancel: 'Annuler',
      publishedOn: 'Publie le'
    }
  },
  ar: {
    nav: {
      gallery: 'المعرض',
      upload: 'نشر عمل',
      dashboard: 'لوحة التحكم',
      profile: 'الملف الشخصي',
      logout: 'تسجيل الخروج',
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب'
    },
    dashboard: {
      title: 'لوحة التحكم',
      subtitle: 'إدارة معرض حسن الكَس الفني',
      uploadNew: 'إضافة عمل فني',
      totalArtworks: 'إجمالي الأعمال',
      totalViews: 'إجمالي المشاهدات',
      forSale: 'للبيع',
      noArtworks: 'لا توجد أعمال منشورة حالياً.',
      uploadFirst: 'انشر أول عمل فني',
      artwork: 'العمل الفني',
      category: 'الفئة',
      views: 'المشاهدات',
      status: 'الحالة',
      actions: 'الإجراءات',
      forSaleBadge: 'للبيع',
      notForSale: 'غير معروض للبيع',
      view: 'عرض',
      delete: 'حذف',
      deleteTitle: 'حذف هذا العمل؟',
      deleteText: 'لا يمكن التراجع عن هذا الإجراء.',
      cancel: 'إلغاء',
      publishedOn: 'تاريخ النشر'
    }
  },
  en: {
    nav: {
      gallery: 'Gallery',
      upload: 'Upload',
      dashboard: 'Dashboard',
      profile: 'Profile',
      logout: 'Logout',
      login: 'Login',
      register: 'Register'
    },
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Manage your art portfolio',
      uploadNew: 'Upload New Artwork',
      totalArtworks: 'Total Artworks',
      totalViews: 'Total Views',
      forSale: 'For Sale',
      noArtworks: "You haven't uploaded any artwork yet.",
      uploadFirst: 'Upload Your First Artwork',
      artwork: 'Artwork',
      category: 'Category',
      views: 'Views',
      status: 'Status',
      actions: 'Actions',
      forSaleBadge: 'For Sale',
      notForSale: 'Not for Sale',
      view: 'View',
      delete: 'Delete',
      deleteTitle: 'Delete Artwork?',
      deleteText: 'This action is permanent.',
      cancel: 'Cancel',
      publishedOn: 'Published on'
    }
  }
};

const localeByLanguage = {
  fr: 'fr-MA',
  ar: 'ar-MA',
  en: 'en-US'
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'fr');

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const value = useMemo(() => {
    const t = translations[language] || translations.fr;
    return {
      language,
      setLanguage,
      t,
      locale: localeByLanguage[language] || 'fr-MA'
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
