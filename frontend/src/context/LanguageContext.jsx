import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  fr: {
    nav: {
      gallery: 'Galerie',
      upload: 'Publier',
      dashboard: 'Tableau de bord',
      profile: 'Profil',
      logout: 'Se déconnecter',
      login: 'Se connecter',
      register: 'S inscrire'
    },
    dashboard: {
      title: 'Tableau de bord',
      subtitle: "Gérez votre portfolio d'art",
      uploadNew: 'Ajouter une œuvre',
      totalArtworks: 'Total des œuvres',
      totalViews: 'Total des vues',
      forSale: 'À vendre',
      noArtworks: "Vous n'avez pas encore publié d'œuvres.",
      uploadFirst: 'Publiez votre première œuvre',
      artwork: 'Œuvre',
      category: 'Catégorie',
      views: 'Vues',
      status: 'Statut',
      actions: 'Actions',
      forSaleBadge: 'À vendre',
      notForSale: 'Non à vendre',
      view: 'Voir',
      delete: 'Supprimer',
      deleteTitle: 'Supprimer cette œuvre ?',
      deleteText: 'Cette action est irréversible.',
      cancel: 'Annuler',
      publishedOn: 'Publié le'
    },
    common: {
      loading: 'Chargement...',
      requiredFields: 'Le titre et l image sont obligatoires',
      by: 'par',
      contactArtist: "Contacter l'artiste",
      artworkNotFound: "Œuvre introuvable",
      moreFromArtist: 'Plus de cet artiste'
    },
    home: {
      tag: 'Le portfolio officiel',
      heroTitleLine1: 'HASSAN',
      heroTitleLine2: 'ELKESS',
      heroDesc: "Une vitrine personnelle centrée sur la peinture Khat Arabi, où forme, rythme et couleur se rencontrent.",
      exploreGallery: 'Explorer la galerie',
      viewFullCollection: 'Voir la collection complète',
      uploadNewWork: 'Publier une nouvelle œuvre',
      browseCollection: 'Parcourir la collection',
      managePortfolio: 'Gérer le portfolio',
      artisticPhilosophy: 'Philosophie artistique',
      features: {
        digitalMastery: 'Maîtrise numérique',
        khatArabi: 'Peinture Khat Arabi',
        creativeVision: 'Vision créative'
      },
      stats: {
        specialty: 'Spécialité',
        portfolioType: 'Type de portfolio',
        base: 'Base',
        workStatus: 'Statut de l œuvre'
      }
    },
    art: {
      category: 'Catégorie',
      views: 'Vues',
      price: 'Prix',
      tags: 'Tags',
      description: 'Description',
      contactArtist: "Contacter l'artiste",
      moreFromArtist: 'Plus de cet artiste',
      notFound: "Œuvre introuvable"
    },
    artist: {
      pastShowcasesTitle: 'Expositions passées',
      upcomingShowcasesTitle: 'Expositions à venir',
      noPastShowcases: 'Aucune exposition passée ajoutée.',
      noUpcomingShowcases: 'Aucune exposition à venir annoncée.',
      artworksTitle: 'Œuvres',
      noArtworks: "Cet artiste n'a pas encore téléchargé d'œuvres.",
      notFound: "Auteur introuvable"
    },
    gallery: {
      title: 'Galerie d art',
      noArtworksFound: 'Aucune œuvre trouvée'
    },
    profile: {
      editProfile: 'Modifier le profil',
      socialLinks: 'Liens sociaux',
      showcasesTitle: 'Expositions & Présentations',
      profilePicture: 'Photo de profil',
      artistName: "Nom de l'artiste",
      bio: 'Biographie',
      pastShowcasesPlaceholder: 'Casablanca Art Week 2024 - Khat Arabi Collection',
      upcomingShowcasesPlaceholder: 'Rabat Contemporary Art Salon 2026 - New Khat Arabi Series',
      saveChanges: 'Enregistrer les modifications',
      saving: 'Enregistrement...',
      updateSuccess: 'Profil mis à jour avec succès !',
      updateFailed: 'Échec de la mise à jour du profil'
    },
    upload: {
      uploadArtworkTitle: 'Télécharger votre œuvre',
      clickChangeImage: "Cliquez pour changer l'image",
      clickUploadOrDrag: 'Cliquez pour télécharger ou glisser-déposer',
      acceptedFormats: 'PNG, JPG, GIF, WebP jusqu à 50MB'
    },
    auth: {
      welcomeBack: 'Bon retour',
      loginDesc: "Connectez-vous à votre studio d'artiste.",
      emailAddress: 'Adresse e-mail',
      password: 'Mot de passe',
      loggingIn: 'Connexion en cours...',
      signIn: 'Se connecter',
      noAccount: "Vous n'avez pas de compte ?",
      registerForFree: "S'inscrire gratuitement",
      placeholderEmail: 'hello@example.com',
      placeholderPassword: '••••••'
    },
    register: {
      createAccount: 'Créer un compte',
      joinCommunity: "Rejoignez notre communauté d'artistes aujourd'hui.",
      creatingAccount: 'Création du compte...',
      getStarted: 'Commencer',
      alreadyHaveAccount: 'Vous avez déjà un compte ?',
      logIn: 'Se connecter'
    },
    pagination: {
      previous: 'Précédent',
      next: 'Suivant',
      pageOf: 'Page {page} sur {total}'
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
    },
    common: {
      loading: 'تحميل...',
      requiredFields: 'العنوان والصورة مطلوبان',
      by: 'بواسطة',
      contactArtist: 'تواصل مع الفنان',
      artworkNotFound: 'لم يتم العثور على العمل الفني',
      moreFromArtist: 'المزيد من هذا الفنان'
    },
    home: {
      tag: 'المحفظة الرسمية',
      heroTitleLine1: 'HASSAN',
      heroTitleLine2: 'ELKESS',
      heroDesc: 'واجهة شخصية تركز على الرسم Khat Arabi، حيث تتلاقى الأشكال والإيقاع واللون.',
      exploreGallery: 'استعرض المعرض',
      viewFullCollection: 'عرض المجموعة الكاملة',
      uploadNewWork: 'نشر عمل جديد',
      browseCollection: 'تصفح المجموعة',
      managePortfolio: 'إدارة المحفظة',
      artisticPhilosophy: 'الفلسفة الفنية',
      features: {
        digitalMastery: 'إتقان رقمي',
        khatArabi: 'رسم Khat Arabi',
        creativeVision: 'رؤية إبداعية'
      },
      stats: {
        specialty: 'التخصص',
        portfolioType: 'نوع المحفظة',
        base: 'القاعدة',
        workStatus: 'الحالة'
      }
    },
    art: {
      category: 'الفئة',
      views: 'المشاهدات',
      price: 'السعر',
      tags: 'الكلمات المفتاحية',
      description: 'الوصف',
      contactArtist: 'تواصل مع الفنان',
      moreFromArtist: 'المزيد من هذا الفنان',
      notFound: 'لم يتم العثور على العمل الفني'
    },
    artist: {
      pastShowcasesTitle: 'معارض سابقة',
      upcomingShowcasesTitle: 'معارض قادمة',
      noPastShowcases: 'لا توجد معارض سابقة.',
      noUpcomingShowcases: 'لا توجد معارض قادمة.',
      artworksTitle: 'الأعمال',
      noArtworks: 'لم ينشر هذا الفنان أي عمل بعد.',
      notFound: 'المؤلف غير موجود'
    },
    gallery: {
      title: 'المعرض',
      noArtworksFound: 'لم يتم العثور على أعمال'
    },
    profile: {
      editProfile: 'تعديل الملف الشخصي',
      socialLinks: 'روابط التواصل',
      showcasesTitle: 'المعارض & العروض',
      profilePicture: 'صورة الملف الشخصي',
      artistName: 'اسم الفنان',
      bio: 'السيرة',
      pastShowcasesPlaceholder: 'Casablanca Art Week 2024 - Khat Arabi Collection',
      upcomingShowcasesPlaceholder: 'Rabat Contemporary Art Salon 2026 - New Khat Arabi Series',
      saveChanges: 'حفظ التغييرات',
      saving: 'جارٍ الحفظ',
      updateSuccess: 'تم تحديث الملف الشخصي بنجاح!',
      updateFailed: 'فشل في تحديث الملف الشخصي'
    },
    upload: {
      uploadArtworkTitle: 'تحميل عملك',
      clickChangeImage: 'انقر لتغيير الصورة',
      clickUploadOrDrag: 'انقر للتحميل أو اسحبها هنا',
      acceptedFormats: 'PNG, JPG, GIF, WebP حتى 50MB'
    },
    auth: {
      welcomeBack: 'مرحباً بعودتك',
      loginDesc: 'سجل الدخول إلى مساحة الفنان الخاصة بك.',
      emailAddress: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      loggingIn: 'جاري تسجيل الدخول...',
      signIn: 'تسجيل الدخول',
      noAccount: 'هل ليس لديك حساب؟',
      registerForFree: 'سجل مجاناً',
      placeholderEmail: 'hello@example.com',
      placeholderPassword: '••••••'
    },
    register: {
      createAccount: 'إنشاء حساب',
      joinCommunity: 'انضم إلى مجتمعنا الفني اليوم.',
      creatingAccount: 'جاري إنشاء الحساب...',
      getStarted: 'ابدأ',
      alreadyHaveAccount: 'هل لديك حساب بالفعل؟',
      logIn: 'تسجيل الدخول'
    },
    pagination: {
      previous: 'السابق',
      next: 'التالي',
      pageOf: 'الصفحة {page} من {total}'
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
    },
    common: {
      loading: 'Loading...',
      requiredFields: 'Title and image are required',
      by: 'by',
      contactArtist: 'Contact Artist',
      artworkNotFound: 'Artwork not found',
      moreFromArtist: 'More from this Artist'
    },
    home: {
      tag: 'The Official Portfolio',
      heroTitleLine1: 'HASSAN',
      heroTitleLine2: 'ELKESS',
      heroDesc: 'A personal showcase centered on Khat Arabi painting, where form, rhythm, and color meet.',
      exploreGallery: 'Explore Gallery',
      viewFullCollection: 'View Full Collection',
      uploadNewWork: 'Upload New Work',
      browseCollection: 'Browse the Collection',
      managePortfolio: 'Manage Portfolio',
      artisticPhilosophy: 'Artistic Philosophy',
      features: {
        digitalMastery: 'Digital Mastery',
        khatArabi: 'Khat Arabi Painting',
        creativeVision: 'Creative Vision'
      },
      stats: {
        specialty: 'Specialty',
        portfolioType: 'Portfolio Type',
        base: 'Base',
        workStatus: 'Work Status'
      }
    },
    art: {
      category: 'Category',
      views: 'Views',
      price: 'Price',
      tags: 'Tags',
      description: 'Description',
      contactArtist: 'Contact Artist',
      moreFromArtist: 'More from this Artist',
      notFound: 'Artwork not found'
    },
    artist: {
      pastShowcasesTitle: 'Past Showcases',
      upcomingShowcasesTitle: 'Upcoming Showcases',
      noPastShowcases: 'No past showcases added.',
      noUpcomingShowcases: 'No upcoming showcases announced.',
      artworksTitle: 'Artworks',
      noArtworks: "This artist hasn't uploaded any artwork yet.",
      notFound: 'Artist not found'
    },
    gallery: {
      title: 'Art Gallery',
      noArtworksFound: 'No artworks found'
    },
    profile: {
      editProfile: 'Edit Profile',
      socialLinks: 'Social Links',
      showcasesTitle: 'Showcases & Exhibitions',
      profilePicture: 'Profile Picture',
      artistName: 'Artist Name',
      bio: 'Bio',
      pastShowcasesPlaceholder: 'Casablanca Art Week 2024 - Khat Arabi Collection',
      upcomingShowcasesPlaceholder: 'Rabat Contemporary Art Salon 2026 - New Khat Arabi Series',
      saveChanges: 'Save Changes',
      saving: 'Saving...',
      updateSuccess: 'Profile updated successfully!',
      updateFailed: 'Failed to update profile'
    },
    upload: {
      uploadArtworkTitle: 'Upload Your Artwork',
      clickChangeImage: 'Click to change image',
      clickUploadOrDrag: 'Click to upload or drag and drop',
      acceptedFormats: 'PNG, JPG, GIF, WebP up to 50MB'
    },
    auth: {
      welcomeBack: 'Welcome Back',
      loginDesc: 'Log into your artist studio.',
      emailAddress: 'Email Address',
      password: 'Password',
      loggingIn: 'Logging in...',
      signIn: 'Sign In',
      noAccount: "Don't have an account?",
      registerForFree: 'Register for free',
      placeholderEmail: 'hello@example.com',
      placeholderPassword: '••••••'
    },
    register: {
      createAccount: 'Create Account',
      joinCommunity: 'Join our artistic community today.',
      creatingAccount: 'Creating Account...',
      getStarted: 'Get Started',
      alreadyHaveAccount: 'Already have an account?',
      logIn: 'Log in'
    },
    pagination: {
      previous: 'Previous',
      next: 'Next',
      pageOf: 'Page {page} of {total}'
    }
  }
};

const localeByLanguage = {
  fr: 'fr-MA',
  ar: 'ar-MA',
  en: 'en-US'
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      const l = localStorage.getItem('language');
      return l && translations[l] ? l : 'fr';
    } catch (e) {
      return 'fr';
    }
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const value = useMemo(() => {
    const base = translations.fr || {};
    const sel = translations[language] || {};
    const mergeDeep = (a, b) => {
      const out = { ...a };
      Object.keys(b).forEach((k) => {
        if (typeof b[k] === 'object' && b[k] !== null && !Array.isArray(b[k])) {
          out[k] = mergeDeep(a[k] || {}, b[k]);
        } else {
          out[k] = b[k];
        }
      });
      return out;
    };

    const t = mergeDeep(base, sel);

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
