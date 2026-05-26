export default {
  sidebar: { discover: 'Découvrir', myLibrary: 'Ma Bibliothèque', overview: 'Aperçu', books: 'Livres', categories: 'Catégories', loans: 'Emprunts', users: 'Utilisateurs', administration: 'Administration', settings: 'Paramètres', admin: 'Admin', feedback: 'Feedback' },
  navbar: { 
    searchPlaceholder: 'Rechercher des livres, auteurs...', 
    myAccount: 'Mon Compte', 
    myLoans: 'Mes Emprunts', 
    manageBooks: 'Gérer les Livres', 
    manageLoans: 'Emprunts', 
    newBook: 'Nouveau Livre', 
    logout: 'Déconnexion', 
    login: 'Connexion', 
    register: 'S\'inscrire', 
    adminMenu: 'Administration', 
    docs: 'Documentation', 
    notifications: 'Notifications', 
    loading: 'Chargement...', 
    all: 'Tout',
    home: 'Accueil',
    settings: 'Paramètres'
  },
  landing: {
    badge: 'Bibliothèque Numérique',
    title: 'École Secondaire Tomás Cabreira',
    subtitle: 'Bienvenue sur le portail numérique de notre bibliothèque. Explorez notre vaste catalogue de livres, thèses et ressources éducatives.',
    exploreBtn: 'Explorer le Catalogue',
    ctaTitle: 'Prêt à emprunter un livre ?',
    ctaDesc: 'Créez votre compte maintenant et explorez le catalogue numérique de la bibliothèque.',
    aboutTitle: 'À propos de notre Bibliothèque',
    aboutDesc: 'La bibliothèque de l\'école secondaire Tomás Cabreira est un espace d\'apprentissage, de découverte et de partage. Désormais, avec notre version numérique, vous pouvez vérifier la disponibilité des livres et gérer vos demandes de n\'importe où.',
    features: {
      search: 'Recherche Intelligente',
      searchDesc: 'Trouvez facilement ce que vous cherchez par titre, auteur ou catégorie.',
      manage: 'Gestion en Ligne',
      manageDesc: 'Suivez vos emprunts et recevez des notifications de retour.',
      access: 'Accès Facile',
      accessDesc: 'Disponible sur n\'importe quel appareil pour toute la communauté scolaire.'
    }
  },
  settings: { title: 'Paramètres', subtitle: 'Gérez votre compte et vos préférences', profile: 'Profil', name: 'Nom', email: 'E-mail', appearance: 'Apparence', theme: 'Thème', light: 'Clair', dark: 'Sombre', languageSection: 'Langue', languageDesc: 'Choisissez votre langue préférée', administration: 'Administration', adminActive: 'Session Admin Active', adminDesc: 'Vous êtes connecté en tant qu\'administrateur', adminLogout: 'Déconnexion Admin', account: 'Compte', signOutTitle: 'Déconnexion', signOutDesc: 'Vous serez redirigé vers la page de connexion', logoutBtn: 'Déconnexion', feedback: { title: 'Envoyer un Avis', question: 'Problèmes ou Suggestions ?', questionDesc: 'Aidez-nous à améliorer la plateforme en décrivant votre expérience.', writeBtn: 'Écrire', viewTitle: 'Voir les Avis Reçus', viewDesc: 'Consultez les suggestions et problèmes signalés par les utilisateurs.', viewBtn: 'Voir les Avis', placeholder: 'Décrivez le problème rencontré ou votre suggestion d\'amélioration...', cancelBtn: 'Annuler', sendBtn: 'Envoyer', errorToast: 'Erreur lors de l\'envoi', successToast: 'Merci pour votre avis !' } },
  routes: { login: '/login', signup: '/signup', adminLogin: '/console/login', book: '/book/:id', myLoans: '/my-loans', settings: '/settings', notifications: '/notifications', adminBooks: '/console/books', adminCategories: '/console/categories', adminLoans: '/console/loans', adminBooksNew: '/console/books/new', adminBooksEdit: '/console/books/edit/:id' },
  admin: {
    dashboard: { totalBooks: 'TOTAL LIVRES', activeLoans: 'EMPRUNTS ACTIFS', pendingRequests: 'DEMANDES EN ATTENTE', overdue: 'EN RETARD', recentActivity: 'Activité Récente', viewAll: 'Voir Tout', quickActions: 'Actions Rapides', addNewBook: 'Nouveau Livre', updateCatalog: 'METTRE À JOUR', manageBooks: 'Gérer les Livres', editOrRemove: 'MODIFIER OU SUPPRIMER', manageLoans: 'Gérer les Emprunts', approveReject: 'APPROUVER / REJETER' },
    login: { title: 'Console d\'Administration', subtitle: 'Portail d\'accès restreint', backToLibrary: 'Retour à la Bibliothèque', authorize: 'Autoriser', secureDb: 'Authentification Sécurisée', accessDenied: 'Accès refusé.' },
    common: { approve: 'Approuver', reject: 'Rejeter', rejectBtn: 'Rejeter', returnBtn: 'Rendre', loadingRequests: 'Chargement des demandes...', fetchingCollection: 'Chargement du catalogue...', noRequests: 'Aucune demande d\'emprunt trouvée', noBooks: 'Aucun livre trouvé', saveOrder: 'Enregistrer l\'ordre', orderSaved: 'Ordre enregistré !', orderError: 'Erreur lors de l\'enregistrement de l\'ordre.', select: { placeholder: 'Sélectionnez une option...', noOptions: 'Aucune option' } },
    books: { searchPlaceholder: 'Rechercher par titre, auteur ou ISBN...', allCategories: 'Toutes les Catégories', id: 'ID', bookInfo: 'INFO', inventory: 'INVENTAIRE', featured: 'VEDETTE', actions: 'ACTIONS', available: 'DISPONIBLE', outOfStock: 'EN RUPTURE', noCover: 'SANS COUVERTURE', filterPlaceholder: 'SÉLECTIONNER GENRE...', toastSaved: 'Livre mis à jour avec succès !', toastAdded: 'Livre ajouté avec succès !', toastDeleted: 'Livre supprimé avec succès.', toastDeleteError: 'Erreur lors de la suppression du livre.', deleteTitle: 'Supprimer le Livre', deleteMsg: 'Voulez-vous vraiment supprimer ce livre de façon permanente ?', deleteBtn: 'Supprimer' },
    categories: { title: 'Catégories', subtitle: 'Gérer les catégories du catalogue.', addPlaceholder: 'Nouveau nom de catégorie...', searchPlaceholder: 'Rechercher des catégories...', addBtn: 'Ajouter', dragToReorder: 'Faites glisser les icônes pour réorganiser', deleteTitle: 'Supprimer la Catégorie', deleteMsg: 'Voulez-vous vraiment supprimer cette catégorie ? Cela peut affecter les livres associés.', deleteBtn: 'Oui, Supprimer' },
    loans: { title: 'Gestion des Emprunts', subtitle: 'Gérer et suivre les emprunts', searchPlaceholder: 'Rechercher par livre, auteur ou email...', all: 'TOUT', pending: 'EN ATTENTE', active: 'ACTIF', returned: 'RENDU', rejected: 'REJETÉ', overdue: 'EN RETARD', id: 'ID', user: 'UTILISATEUR', bookDetails: 'DÉTAILS DU LIVRE', status: 'STATUT', actions: 'ACTIONS', libMember: 'MEMBRE', borrowedDate: 'EMPRUNTÉ', returnedDate: 'DATE DE RETOUR', dueDate: 'DATE LIMITE', approvedDate: 'APPROUVÉ LE' },
    users: { title: 'Utilisateurs', subtitle: 'Gérer l\'accès au système et les rôles', searchPlaceholder: 'Rechercher un nom ou un email...', nameDetails: 'DÉTAILS DE L\'UTILISATEUR', role: 'RÔLE', joined: 'DATE D\'INSCRIPTION', updateSuccess: 'Rôle mis à jour', updateError: 'Erreur lors de la mise à jour', noUsers: 'Aucun utilisateur trouvé' },
    roles: { admin: 'Administrateur', professor: 'Professeur', aluno: 'Élève', student: 'Élève', membro: 'Membre' },
    editBook: { newBookTitle: 'Ajouter un Nouveau Livre', editBookTitle: 'Modifier les Détails du Livre', newBookSubtitle: 'Ajoutez un nouveau livre au catalogue', editBookSubtitle: 'Mettre à jour les informations', fullTitle: 'TITRE COMPLET', authorName: 'NOM DE L\'AUTEUR', isbnReference: 'RÉFÉRENCE ISBN', primaryCategory: 'CATÉGORIE PRINCIPALE', publisher: 'ÉDITEUR', inventoryQuantity: 'QUANTITÉ', guidelines: 'DIRECTIVES', guideline1: 'Images haute résolution préférées', guideline2: 'Ratio recommandé : 3:4', guideline3: 'Taille maximale : 5 Mo (JPG, PNG)', addBookBtn: 'AJOUTER LE LIVRE', updateBookBtn: 'METTRE À JOUR LE LIVRE', uploadImage: 'Cliquez pour télécharger', imageFormats: 'SVG, PNG, JPG (max. 800x400)', titlePlaceholder: 'Gatsby le Magnifique', authorPlaceholder: 'F. Scott Fitzgerald', isbnPlaceholder: '978-0-...', publisherPlaceholder: "Scribner's Sons" }
  },
  bookDetails: {
    backToCatalog: 'Retour au catalogue',
    backToStart: 'Retour au début',
    bookNotFound: 'Livre non trouvé',
    requestedSuccess: 'Demandé avec succès',
    requestBook: 'Demander le Livre',
    outOfStock: 'Épuisé',
    availableOf: '{available} sur {total} disponibles',
    aboutBook: 'À propos de ce livre',
    aiSummary: 'IA',
    generateAiSummary: 'Générer résumé IA',
    generatingAiSummary: 'Génération du résumé...',
    noDescription: 'Aucune description disponible pour ce livre.',
    bookMetadata: 'Détails du Livre',
    isbn: 'ISBN',
    publisher: 'Éditeur',
    yearEdition: 'Année d\'Édition',
    reviewsTitle: 'Avis & Commentaires',
    writeReview: 'Rédiger un Avis',
    editReview: 'Modifier votre Avis',
    submitReview: 'Soumettre l\'Avis',
    cancelReview: 'Annuler',
    noReviews: 'Aucun avis pour l\'instant. Soyez le premier à évaluer ce livre!',
    ratingLabel: 'Évaluation',
    commentLabel: 'Commentaire (facultatif)',
    averageRating: 'Évaluation Moyenne',
    reviewSuccess: 'Avis soumis avec succès!',
    reviewError: 'Échec de la soumission de l\'avis. Veuillez réessayer.',
    youReviewed: 'Vous avez évalué ce livre',
    catalog: 'Catalogue',
    availability: 'Disponibilité',
    availableForRequest: 'Disponible pour emprunt',
    alreadyRequested: 'Déjà Demandé',
    waitingApproval: 'En attente de l\'approbation de l\'administrateur',
    review: 'évaluation',
    reviews: 'évaluations',
    deleteReviewTitle: 'Supprimer l\'Évaluation',
    deleteReviewConfirm: 'Êtes-vous sûr de vouloir supprimer cette évaluation ?',
    deleteReviewSuccess: 'Évaluation supprimée avec succès.',
    deleteReviewError: 'Erreur lors de la suppression de l\'évaluation.',
    anonymousUser: 'Utilisateur',
    requestError: 'Erreur lors de la demande du livre',
    processError: 'Erreur lors du traitement de votre demande.',
    featuredError: 'Erreur lors de la mise à jour de la vedette',
    featuredAdded: 'Livre marqué comme vedette ⭐',
    featuredRemoved: 'Vedette supprimée',
    emailSubject: 'Réservation Enregistrée',
    emailMessage: 'Votre demande de réservation pour le livre "{title}" a été reçue et est en attente d\'approbation. Vous disposerez de 12 heures pour récupérer le livre à la bibliothèque avant l\'expiration automatique de la réservation.',
    emailButtonText: 'Voir mes emprunts'
  },
  docs: {
    badge: 'Documentation Officielle',
    title: 'Documentation de la Bibliothèque',
    subtitle: 'Tout ce que vous devez savoir pour utiliser la Bibliothèque Numérique efficacement.',
    borrow: {
      title: '1. Comment Emprunter un Livre',
      desc: 'Parcourez le catalogue, choisissez un ouvrage et cliquez sur "Demander le Livre". Après la demande, vous aurez une fenêtre de 12 heures pour récupérer le livre à la bibliothèque physique avant que la réservation soit annulée automatiquement.',
    },
    pin: {
      title: '2. PIN de Retour (4 Chiffres)',
      desc: 'Lors du retrait, un code unique de 4 chiffres sera associé à votre demande. Vous pouvez consulter ce PIN dans le menu "Mes Emprunts". Vous devrez le fournir à l\'administrateur pour effectuer le retour.',
    },
    duration: {
      title: '3. Durée de l\'Emprunt',
      desc: 'La durée standard d\'emprunt pour tout livre de notre catalogue est de 14 jours. Vous serez notifié un jour avant la date limite par e-mail et par notifications sur la plateforme.',
    },
    ai: {
      title: '4. Résumés par IA',
      desc: 'Notre plateforme utilise l\'Intelligence Artificielle pour lire les métadonnées des ouvrages et générer des descriptions automatiques et des résumés captivants, vous aidant à décider si le livre est ce que vous recherchez.',
    },
    fine: {
      title: '5. Amende pour Retard',
      desc: 'Pour assurer la rotation du catalogue, les retours effectués après la date limite sont soumis à une amende unique de 5,00€.',
    },
    feedback: {
      title: '6. Avis et Support',
      desc: 'Si vous rencontrez une erreur sur le site, avez des questions sur son fonctionnement ou souhaitez suggérer des améliorations, utilisez le bouton "Envoyer un Avis" dans vos Paramètres.',
    },
    privacy: {
      title: 'Politique de Confidentialité',
      content: `
        <h3>1. Responsable du Traitement</h3>
        <p>L'Agrupamento de Escolas Tomás Cabreira, situé à Faro, au Portugal, est le responsable du traitement des données personnelles collectées via cette plateforme de bibliothèque numérique.</p>

        <h3>2. Données Collectées</h3>
        <p>Nous collectons uniquement les données strictement nécessaires à la fourniture du service :</p>
        <ul>
          <li>Nom complet et adresse e-mail (pour l'identification et la communication) ;</li>
          <li>Historique des emprunts et des retours (pour la gestion des emprunts) ;</li>
          <li>Données techniques d'accès, telles que l'adresse IP et le type de navigateur (pour la sécurité et le diagnostic).</li>
        </ul>

        <h3>3. Finalité du Traitement</h3>
        <p>Les données collectées sont utilisées exclusivement pour :</p>
        <ul>
          <li>La gestion des comptes et l'authentification des utilisateurs ;</li>
          <li>Le traitement et le suivi des demandes d'emprunt ;</li>
          <li>L'envoi de notifications liées à votre compte (approbations, délais, retours) ;</li>
          <li>L'amélioration continue de nos services.</li>
        </ul>

        <h3>4. Partage des Données</h3>
        <p>Vos données personnelles ne sont pas vendues, louées ou partagées avec des tiers à des fins commerciales. Elles ne peuvent être partagées avec les autorités compétentes que lorsque la loi ou une décision de justice l'exige.</p>

        <h3>5. Sécurité</h3>
        <p>We implement appropriate technical and organisational measures to protect your data against unauthorised access, loss, or destruction, including encryption and access controls.</p>

        <h3>6. Vos Droits</h3>
        <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression ou de limitation du traitement de vos données. Pour exercer ces droits, contactez-nous via le bouton "Envoyer un Avis" dans les Paramètres.</p>

        <h3>7. Conservation des Données</h3>
        <p>Les données sont conservées tant que le compte est actif ou pendant la durée nécessaire au respect des obligations légales. Après une demande de suppression, les données sont supprimées dans un délai maximum de 30 jours.</p>

        <h3>8. Cookies</h3>
        <p>Nous utilisons uniquement des cookies techniques essentiels au fonctionnement de la plateforme (session d'authentification). Nous n'utilisons pas de cookies de suivi ou publicitaires.</p>

        <p><em>Dernière mise à jour : 25/05/2026</em></p>
      `
    },
    terms: {
      title: 'Conditions Générales d\'Utilisation',
      content: `
        <h3>1. Acceptation des Conditions</h3>
        <p>En vous inscrivant et en utilisant la plateforme de bibliothèque numérique de l'Agrupamento de Escolas Tomás Cabreira, vous déclarez avoir lu, compris et accepté les présentes Conditions Générales d'Utilisation.</p>

        <h3>2. Éligibilité</h3>
        <p>Le service est destiné exclusivement aux élèves, enseignants et membres du personnel de l'Agrupamento de Escolas Tomás Cabreira. L'inscription avec de fausses informations ou par des utilisateurs non autorisés sera immédiatement annulée.</p>

        <h3>3. Emprunt de Livres</h3>
        <ul>
          <li>Chaque utilisateur peut avoir jusqu'à un (1) emprunt actif à la fois ;</li>
          <li>Après approbation, l'utilisateur dispose de <strong>12 heures</strong> pour récupérer le livre à la bibliothèque physique ;</li>
          <li>La durée maximale d'emprunt est de <strong>14 jours calendaires</strong> à compter de la date de retrait ;</li>
          <li>Le PIN à 4 chiffres attribué est personnel et non transférable, et est requis pour effectuer le retour.</li>
        </ul>

        <h3>4. Retours et Amendes</h3>
        <p>Le retour d'un livre après la date limite entraîne une amende unique de <strong>5,00€</strong>. Le paiement doit être effectué en personne à la bibliothèque. Tant que des amendes restent impayées, l'utilisateur ne peut pas soumettre de nouvelles demandes d'emprunt.</p>

        <h3>5. Responsabilité de l'Utilisateur</h3>
        <p>L'utilisateur est responsable de la conservation du livre pendant la période d'emprunt. Les dommages, pertes ou détériorations du livre peuvent entraîner le paiement de la valeur de remplacement de l'ouvrage.</p>

        <h3>6. Propriété Intellectuelle</h3>
        <p>Tout le contenu disponible sur la plateforme, y compris les textes, les images et les métadonnées, est protégé par le droit d'auteur. La reproduction, la distribution ou l'utilisation commerciale sans autorisation expresse est strictement interdite.</p>

        <h3>7. Suspension de Compte</h3>
        <p>L'administration se réserve le droit de suspendre ou de supprimer des comptes en cas d'utilisation abusive de la plateforme, de violation des présentes conditions ou de comportement préjudiciable à la communauté scolaire.</p>

        <h3>8. Limitation de Responsabilité</h3>
        <p>Le groupement scolaire n'est pas responsable des interruptions temporaires de service, de la perte de données due à une défaillance technique ou des dommages indirects découlant de l'utilisation de la plateforme.</p>

        <h3>9. Modifications des Conditions</h3>
        <p>Nous nous réservons le droit de mettre à jour ces conditions à tout moment. Les utilisateurs seront informés des changements importants. L'utilisation continue de la plateforme après notification constitue l'acceptation des nouvelles conditions.</p>

        <p><em>Dernière mise à jour : 25/05/2026</em></p>
      `
    },
  },
  home: {
    recommended: 'Recommandés',
    catalog: 'Catalogue',
    catalogSub: 'Explorez tous les livres disponibles dans notre bibliothèque',
    errorLoad: 'Impossible de charger les livres.',
    errorCheckNet: 'Vérifiez votre connexion internet.',
    retryBtn: 'Réessayer',
    noBooksFound: 'Aucun livre ne correspond à votre recherche.',
    searchNoResults: 'Essayez différents mots-clés ou effacez vos filtres.',
    paginationLabel: 'Pagination du catalogue',
    page: 'Page {page}',
    prevPage: 'Page précédente',
    nextPage: 'Page suivante'
  },
  myLoans: {
    title: 'Mes Emprunts',
    subtitle: 'Historique complet de vos demandes',
    emptyTitle: 'Aucun emprunt',
    emptyDesc: 'Vous n\'avez pas encore demandé de livre du catalogue.',
    exploreCatalog: 'Explorer le Catalogue',
    status: {
      active: 'Actif',
      pending: 'En attente',
      rejected: 'Rejeté',
      returned: 'Rendu'
    },
    requestLabel: 'Demande'
  },
  auth: {
    loginTitle: 'Content de vous revoir',
    loginSubtitle: 'Connectez-vous pour accéder à la bibliothèque',
    emailLabel: 'Adresse e-mail',
    emailPlaceholder: 'votre@email.com',
    passwordLabel: 'Mot de passe',
    passwordPlaceholder: '••••••••',
    signInBtn: 'Se connecter',
    or: 'ou',
    googleBtn: 'Continuer avec Google',
    noAccount: 'Pas de compte ?',
    registerLink: 'S\'inscrire',
    signupTitle: 'Créer un Compte',
    signupSubtitle: 'Rejoignez notre bibliothèque',
    nameLabel: 'Nom complet',
    namePlaceholder: 'Jean Dupont',
    signUpBtn: 'Créer le compte',
    hasAccount: 'Vous avez déjà un compte ?',
    loginLink: 'Se connecter'
  },
  notifications: {
    title: 'Notifications',
    subtitle: 'Restez informé des mises à jour de votre bibliothèque',
    emptyTitle: 'Tout est à jour !',
    emptyDesc: 'Vous n\'avez pas encore de notifications. Tous les avis sur les emprunts ou les nouveaux livres apparaîtront ici.',
    exploreCatalog: 'Explorer le Catalogue',
    markAllAsRead: 'Tout marquer comme lu',
    templates: {
      approvedTitle: 'Emprunt Approuvé',
      approvedMsg: 'Votre demande d\'emprunt pour le livre "{book}" a été approuvée. Le livre est disponible pour le retrait.',
      rejectedTitle: 'Emprunt Rejeté',
      rejectedMsg: 'Votre demande d\'emprunt pour le livre "{book}" n\'a pas pu être approuvée pour le moment.',
      returnedTitle: 'Livre Retourné',
      returnedMsg: 'Nous confirmons le retour du livre "{book}". Merci pour votre lecture !',
      warningTitle: 'Avis de Retour Proche',
      warningMsg: 'Nous vous rappelons que le livre "{book}" doit être retourné demain. Veuillez le déposer à la bibliothèque.',
      registeredTitle: 'Réservation Enregistrée',
      registeredMsg: 'Votre demande de réservation pour le livre "{book}" a été reçue et est en attente d\'approbation. Vous disposerez de 12 heures pour récupérer le livre à la bibliothèque avant l\'expiration automatique de la réservation.'
    }
  },
  footer: {
    groupName: 'Groupement d\'Écoles',
    contacts: 'Contacts',
    usefulLinks: 'Liens Utiles',
    platform: 'Plateforme Sdurão',
    moodle: 'Moodle du Groupement',
    website: 'Site Web Officiel',
    docs: 'Documentation',
    rights: '© {year} Agrupamento de Escolas Tomás Cabreira, à Faro. Tous droits réservés.'
  }
}
