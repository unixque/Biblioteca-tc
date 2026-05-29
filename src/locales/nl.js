export default {
  sidebar: {
    discover: 'Ontdekken',
    myLibrary: 'Mijn Bibliotheek',
    overview: 'Overzicht',
    books: 'Boeken',
    categories: 'Categorieën',
    loans: 'Leningen',
    users: 'Gebruikers',
    administration: 'Administratie',
    settings: 'Instellingen',
    admin: 'Admin',
    feedback: 'Feedback',
    wishlist: 'Verlanglijst',
    activity: 'Activiteit',
  },
  wishlist: {
    title: 'Verlanglijst',
    subtitle: 'Boeken die u voor later heeft bewaard',
    empty: 'Nog geen boeken op uw verlanglijst.',
    toggle: 'Toevoegen aan verlanglijst',
    added: 'Toegevoegd aan verlanglijst',
    removed: 'Verwijderd van verlanglijst',
    error: 'Kon de lijst niet bijwerken',
  },
  aiChat: {
    open: 'Boekassistent',
    title: 'BibliotecaTC Assistent',
    welcome: 'Beschrijf een onderwerp, vak of auteur — ik stel passende boeken uit onze catalogus voor.',
    placeholder: 'Bijv. een filosofieboek aanbevelen...',
    thinking: 'Bezig met nadenken...',
    viewBook: 'Bekijk boek in catalogus',
    error: 'Geen antwoord ontvangen. Probeer opnieuw.',
    noApiKey: 'De assistent is momenteel niet beschikbaar.',
    loginRequired: 'Log in om de assistent te gebruiken.',
  },
  navbar: { 
    searchPlaceholder: 'Zoek boeken, auteurs...', 
    myAccount: 'Mijn Account', 
    myLoans: 'Mijn Leningen', 
    manageBooks: 'Boeken Beheren', 
    manageLoans: 'Leningen', 
    newBook: 'Nieuw Boek', 
    logout: 'Uitloggen', 
    login: 'Inloggen', 
    register: 'Registreren', 
    adminMenu: 'Administratie', 
    docs: 'Documentatie', 
    notifications: 'Meldingen', 
    loading: 'Laden...', 
    all: 'Alle',
    home: 'Home',
    settings: 'Instellingen'
  },
  landing: {
    badge: 'Digitale Bibliotheek',
    title: 'Middelbare School Tomás Cabreira',
    subtitle: 'Welkom bij het digitale portaal van onze bibliotheek. Verken onze uitgebreide catalogus met boeken, scripties en educatieve bronnen.',
    exploreBtn: 'Catalogus verkennen',
    ctaTitle: 'Klaar om een boek te lenen?',
    ctaDesc: 'Maak nu uw account aan en verken de digitale catalogus van de bibliotheek.',
    aboutTitle: 'Over onze Bibliotheek',
    aboutDesc: 'De bibliotheek van de middelbare school Tomás Cabreira is een plek voor leren, ontdekken en delen. Nu kunt u met onze digitale versie overal de beschikbaarheid van boeken controleren en uw aanvragen beheren.',
    features: {
      search: 'Slim Zoeken',
      searchDesc: 'Vind eenvoudig wat u zoekt op titel, auteur of categorie.',
      manage: 'Online Beheer',
      manageDesc: 'Volg uw leningen en ontvang retourmeldingen.',
      access: 'Eenvoudige Toegang',
      accessDesc: 'Beschikbaar op elk apparaat voor de hele schoolgemeenschap.'
    }
  },
  settings: { title: 'Instellingen', subtitle: 'Beheer uw account en voorkeuren', profile: 'Profiel', name: 'Naam', email: 'E-mail', appearance: 'Uiterlijk', theme: 'Thema', light: 'Licht', dark: 'Donker', languageSection: 'Taal', languageDesc: 'Kies uw voorkeurstaal', administration: 'Administratie', adminActive: 'Admin Sessie Actief', adminDesc: 'U bent ingelogd als administrator', adminLogout: 'Admin Uitloggen', account: 'Account', signOutTitle: 'Uitloggen', signOutDesc: 'U wordt doorgestuurd naar de inlogpagina', logoutBtn: 'Uitloggen', feedback: { title: 'Feedback Sturen', question: 'Problemen of Suggesties?', questionDesc: 'Help ons het platform te verbeteren door uw ervaring te beschrijven.', writeBtn: 'Schrijven', viewTitle: 'Ontvangen Feedback Bekijken', viewDesc: 'Bekijk de suggesties en problemen gemeld door gebruikers.', viewBtn: 'Feedback Bekijken', placeholder: 'Beschrijf het probleem dat u heeft gevonden of uw suggestie ter verbetering...', cancelBtn: 'Annuleren', sendBtn: 'Feedback Sturen', errorToast: 'Fout bij het versturen van feedback', successToast: 'Bedankt voor uw feedback!' } },
  routes: { login: '/login', signup: '/signup', adminLogin: '/console/login', book: '/book/:id', myLoans: '/my-loans', settings: '/settings', notifications: '/notifications', adminBooks: '/console/books', adminCategories: '/console/categories', adminLoans: '/console/loans', adminBooksNew: '/console/books/new', adminBooksEdit: '/console/books/edit/:id' },
  admin: {
    dashboard: { totalBooks: 'TOTAAL BOEKEN', activeLoans: 'ACTIEVE LENINGEN', pendingRequests: 'PENDELENDE AANVRAGEN', overdue: 'TE LAAT', recentActivity: 'Recente Activiteit', viewAll: 'Alles Weergeven', quickActions: 'Snelle Acties', addNewBook: 'Nieuw Boek', updateCatalog: 'CATALOGUS BIJWERKEN', manageBooks: 'Boeken Beheren', editOrRemove: 'BEWERKEN OF VERWIJDEREN', manageLoans: 'Leningen Beheren', approveReject: 'GOEDKEUREN / AFWIJZEN' },
    login: { title: 'Admin Console', subtitle: 'Beperkt toegangsportaal', backToLibrary: 'Terug naar de Bibliotheek', authorize: 'Autoriseren', secureDb: 'Veilige Authenticatie', accessDenied: 'Toegang geweigerd.' },
    common: { approve: 'Goedkeuren', reject: 'Afwijzen', rejectBtn: 'Afwijzen', returnBtn: 'Inleveren', loadingRequests: 'Aanvragen laden...', fetchingCollection: 'Catalogus laden...', noRequests: 'Geen leningaanvragen gevonden', noBooks: 'Geen boeken gevonden', saveOrder: 'Volgorde opslaan', orderSaved: 'Volgorde succesvol opgeslagen!', orderError: 'Fout bij opslaan volgorde.', select: { placeholder: 'Selecteer een optie...', noOptions: 'Geen opties' } },
    books: { searchPlaceholder: 'Zoek op titel, auteur of ISBN...', allCategories: 'Alle Categorieën', id: 'ID', bookInfo: 'INFO', inventory: 'VOORRAAD', featured: 'UITGELICHT', actions: 'ACTIES', available: 'BESCHIKBAAR', outOfStock: 'UITVERKOCHT', noCover: 'GEEN OMSLAG', filterPlaceholder: 'SELECTEER GENRE...', toastSaved: 'Boek succesvol bijgewerkt!', toastAdded: 'Boek succesvol toegevoegd!', toastDeleted: 'Boek succesvol verwijderd.', toastDeleteError: 'Fout bij verwijderen boek.', deleteTitle: 'Boek Verwijderen', deleteMsg: 'Weet u zeker dat u dit boek permanent wilt verwijderen?', deleteBtn: 'Verwijderen' },
    categories: { title: 'Categorieën', subtitle: 'Beheer de categorieën van de catalogus.', addPlaceholder: 'Nieuwe categorienaam...', searchPlaceholder: 'Zoek categorieën...', addBtn: 'Toevoegen', dragToReorder: 'Sleep iconen om te herordenen', deleteTitle: 'Categorie Verwijderen', deleteMsg: 'Weet u zeker dat u deze categorie wilt verwijderen? Dit kan invloed hebben op gekoppelde boeken.', deleteBtn: 'Ja, Verwijderen' },
    loans: { title: 'Leningbeheer', subtitle: 'Leningen beheren en volgen', searchPlaceholder: 'Zoek op boek, auteur of e-mail...', all: 'ALLE', pending: 'IN AFWACHTING', active: 'ACTIEF', returned: 'INGELEVERD', rejected: 'AFGEWEZEN', overdue: 'TE LAAT', id: 'ID', user: 'GEBRUIKER', bookDetails: 'BOEKDETAILS', status: 'STATUS', actions: 'ACTIES', libMember: 'LID', borrowedDate: 'GELEEND', returnedDate: 'INGELEVERD OP', dueDate: 'VERVALDATUM', approvedDate: 'GOEDGEKEURD OP' },
    users: { title: 'Gebruikers', subtitle: 'Beheer systeemtoegang en rollen', searchPlaceholder: 'Zoek naam of e-mail...', nameDetails: 'GEBRUIKERSDETAILS', role: 'ROL', joined: 'LID SINDS', updateSuccess: 'Rol bijgewerkt', updateError: 'Fout bij bijwerken', noUsers: 'Geen gebruikers gevonden' },
    roles: { admin: 'Administrator', professor: 'Professor', aluno: 'Leerling', student: 'Leerling', membro: 'Lid' },
    editBook: { newBookTitle: 'Nieuw Boek Toevoegen', editBookTitle: 'Boekdetails Bewerken', newBookSubtitle: 'Voeg een nieuw boek toe aan de catalogus', editBookSubtitle: 'Informatie bijwerken', fullTitle: 'VOLLEDIGE TITEL', authorName: 'AUTEUR', isbnReference: 'ISBN REFERENTIE', primaryCategory: 'HOOFDCATEGORIE', publisher: 'UITGEVER', inventoryQuantity: 'AANTAL', guidelines: 'RICHTLIJNEN', guideline1: 'Hoge resolutie afbeeldingen hebben de voorkeur', guideline2: 'Aanbevolen verhouding: 3:4', guideline3: 'Maximale grootte: 5 MB (JPG, PNG)', addBookBtn: 'BOEK TOEVOEGEN', updateBookBtn: 'BOEK BIJWERKEN', uploadImage: 'Klik om te uploaden', imageFormats: 'SVG, PNG, JPG (max. 800x400)', titlePlaceholder: 'The Great Gatsby', authorPlaceholder: 'F. Scott Fitzgerald', isbnPlaceholder: '978-0-...', publisherPlaceholder: "Scribner's Sons" }
  },
  bookDetails: {
    backToCatalog: 'Terug naar catalogus',
    backToStart: 'Terug naar start',
    bookNotFound: 'Boek niet gevonden',
    requestedSuccess: 'Succesvol aangevraagd',
    requestBook: 'Boek Aanvragen',
    outOfStock: 'Niet op voorraad',
    availableOf: '{available} van {total} beschikbaar',
    aboutBook: 'Over dit boek',
    aiSummary: 'AI',
    generateAiSummary: 'Genereer AI samenvatting',
    generatingAiSummary: 'Samenvatting genereren...',
    noDescription: 'Geen beschrijving voor dit boek. Gebruik de knop hieronder om een AI-samenvatting te maken.',
    noDescriptionGuest: 'Geen beschrijving. Log in om een AI-samenvatting te maken.',
    generateSummaryLogin: 'Inloggen om samenvatting te maken',
    bookMetadata: 'Boekdetails',
    isbn: 'ISBN',
    publisher: 'Uitgever',
    yearEdition: 'Jaar van uitgave',
    reviewsTitle: 'Recensies & Reacties',
    writeReview: 'Schrijf een Recensie',
    editReview: 'Bewerk je Recensie',
    submitReview: 'Recensie Versturen',
    cancelReview: 'Annuleren',
    noReviews: 'Nog geen recensies. Wees de eerste om dit boek te beoordelen!',
    ratingLabel: 'Beoordeling',
    commentLabel: 'Reactie (optioneel)',
    averageRating: 'Gemiddelde Beoordeling',
    reviewSuccess: 'Recensie succesvol verzonden!',
    reviewError: 'Verzenden van recensie mislukt. Probeer het opnieuw.',
    youReviewed: 'Je hebt dit boek beoordeeld',
    catalog: 'Catalogus',
    availability: 'Beschikbaarheid',
    availableForRequest: 'Beschikbaar voor aanvraag',
    alreadyRequested: 'Al Aangevraagd',
    waitingApproval: 'Wachtend op goedkeuring van de beheerder',
    review: 'recensie',
    reviews: 'recensies',
    deleteReviewTitle: 'Recensie Verwijderen',
    deleteReviewConfirm: 'Weet u zeker dat u deze recensie wilt verwijderen?',
    deleteReviewSuccess: 'Recensie succesvol verwijderd.',
    deleteReviewError: 'Fout bij het verwijderen van de recensie.',
    anonymousUser: 'Gebruiker',
    requestError: 'Fout bij het aanvragen van het boek',
    processError: 'Fout bij het verwerken van uw verzoek.',
    featuredError: 'Fout bij het bijwerken van de uitgelichte status',
    featuredAdded: 'Boek als uitgelicht gemarkeerd ⭐',
    featuredRemoved: 'Uitgelichte status verwijderd',
    emailSubject: 'Reservering Geregistreerd',
    emailMessage: 'Uw reserveringsverzoek voor het boek "{title}" is ontvangen en wacht op goedkeuring. U heeft 12 uur de tijd om het boek op te halen in de fysieke bibliotheek voordat de reservering automatisch verloopt.',
    emailButtonText: 'Mijn leningen bekijken'
  },
  docs: {
    badge: 'Officiële Documentatie',
    title: 'Bibliotheekdocumentatie',
    subtitle: 'Alles wat u moet weten om de Digitale Bibliotheek efficiënt te gebruiken.',
    borrow: {
      title: '1. Hoe Leen Je een Boek',
      desc: 'Blader door de catalogus, kies een boek en klik op "Boek Aanvragen". Na de aanvraag heeft u een venster van 12 uur om het boek op te halen in de fysieke bibliotheek voordat de reservering automatisch wordt geannuleerd.',
    },
    pin: {
      title: '2. Retour-PIN (4 Cijfers)',
      desc: 'Bij het ophalen wordt een unieke 4-cijferige code aan uw aanvraag gekoppeld. U kunt deze PIN bekijken in het menu "Mijn Leningen". U dient deze aan de beheerder te overhandigen om de retournering te voltooien.',
    },
    duration: {
      title: '3. Leentermijn',
      desc: 'De standaard leentermijn voor elk boek in onze catalogus is 14 dagen. U wordt één dag voor de deadline op de hoogte gebracht via e-mail en meldingen op het platform.',
    },
    ai: {
      title: '4. AI-Samenvattingen',
      desc: 'Ons platform maakt gebruik van Kunstmatige Intelligentie om boekmetadata te lezen en automatische beschrijvingen en boeiende samenvattingen te genereren, waarmee u kunt beslissen of het boek bij u past.',
    },
    fine: {
      title: '5. Boete bij Te Laat Inleveren',
      desc: 'Om de catalogusrotatie te waarborgen, zijn retouneringen na de deadline onderhevig aan een eenmalige boete van €5,00.',
    },
    feedback: {
      title: '6. Feedback en Ondersteuning',
      desc: 'Als u een fout op de website vindt, vragen heeft over de werking ervan of verbeteringen wilt voorstellen, gebruik dan de knop "Feedback Sturen" in uw Instellingen.',
    },
    privacy: {
      title: 'Privacybeleid',
      content: `
        <h3>1. Verwerkingsverantwoordelijke</h3>
        <p>Het Agrupamento de Escolas Tomás Cabreira, gevestigd in Faro, Portugal, is de verwerkingsverantwoordelijke voor de persoonsgegevens die via dit digitale bibliotheekplatform worden verzameld.</p>

        <h3>2. Verzamelde Gegevens</h3>
        <p>We verzamelen alleen de gegevens die strikt noodzakelijk zijn voor het leveren van de dienst:</p>
        <ul>
          <li>Volledige naam en e-mailadres (voor identificatie en communicatie);</li>
          <li>Geschiedenis van leningen en inleveringen (voor het leningbeheer);</li>
          <li>Technische toegangsgegevens zoals IP-adres en browsertype (voor beveiliging en diagnose).</li>
        </ul>

        <h3>3. Doel van de Verwerking</h3>
        <p>De verzamelde gegevens worden uitsluitend gebruikt voor:</p>
        <ul>
          <li>Accountbeheer en gebruikersauthenticatie;</li>
          <li>Verwerking en opvolging van leningaanvragen;</li>
          <li>Verzenden van meldingen met betrekking tot uw account (goedkeuringen, deadlines, retourneringen);</li>
          <li>Continue verbetering van onze dienstverlening.</li>
        </ul>

        <h3>4. Delen van Gegevens</h3>
        <p>Uw persoonsgegevens worden niet verkocht, verhuurd of gedeeld met derden voor commerciële doeleinden. Ze kunnen alleen worden gedeeld met bevoegde autoriteiten wanneer dit wettelijk of door een gerechtelijk bevel vereist is.</p>

        <h3>5. Beveiliging</h3>
        <p>We implementeren passende technische en organisatorische maatregelen om uw gegevens te beveiligen tegen ongeoorloofde toegang, verlies of vernietiging, waaronder encryptie en toegangscontroles.</p>

        <h3>6. Uw Rechten</h3>
        <p>Onder de AVG heeft u recht op toegang, rectificatie, verwijdering of beperking van de verwerking van uw gegevens. Om deze rechten uit te oefenen, kunt u contact met ons opnemen via de knop "Feedback Sturen" in de Instellingen.</p>

        <h3>7. Gegevensbewaring</h3>
        <p>Gegevens worden bewaard zolang uw account actief is of zolang dit nodig is om aan wettelijke verplichtingen te voldoen. Na een verzoek tot verwijdering worden de gegevens binnen maximaal 30 days verwijderd.</p>

        <h3>8. Cookies</h3>
        <p>We gebruiken alleen technisch essentiële cookies die nodig zijn voor het functioneren van het platform (authenticatiesessie). We gebruiken geen tracking- of advertentiecookies.</p>

        <p><em>Laatst bijgewerkt: 25/05/2026</em></p>
      `
    },
    terms: {
      title: 'Algemene Voorwaarden',
      content: `
        <h3>1. Acceptatie van de Voorwaarden</h3>
        <p>Door u te registreren en gebruik te maken van het digitale bibliotheekplatform van Agrupamento de Escolas Tomás Cabreira, verklaart u dat u deze Algemene Voorwaarden heeft gelezen, begrepen en geaccepteerd.</p>

        <h3>2. Geschiktheid</h3>
        <p>De dienst is uitsluitend bedoeld voor leerlingen, docenten en medewerkers van het Agrupamento de Escolas Tomás Cabreira. Registratie met valse gegevens of door onbevoegde gebruikers zal onmiddellijk worden geannuleerd.</p>

        <h3>3. Boeken Lenen</h3>
        <ul>
          <li>Elke gebruiker mag maximaal één (1) actieve lening tegelijk hebben;</li>
          <li>Na goedkeuring heeft de gebruiker <strong>12 uur</strong> de tijd om het boek op te halen in de fysieke bibliotheek;</li>
          <li>De maximale leentermijn is <strong>14 kalenderdagen</strong> vanaf de ophaaldatum;</li>
          <li>De toegewezen 4-cijferige PIN is persoonlijk en niet-overdraagbaar en is vereist om de retournering te voltooien.</li>
        </ul>

        <h3>4. Inleveren en Boetes</h3>
        <p>Het inleveren van een boek na de vastgestelde deadline brengt een eenmalige boete van <strong>€5,00</strong> met zich mee. Betaling dient persoonlijk in de bibliotheek te geschieden. Zolang er openstaande boetes zijn, kan de gebruiker geen nieuwe leningaanvragen indienen.</p>

        <h3>5. Verantwoordelijkheid van de Gebruiker</h3>
        <p>De gebruiker is verantwoordelijk voor de goede zorg van het boek tijdens de leentermijn. Schade, verlies of verslechtering van het boek kan leiden tot betaling van de vervangingswaarde van het werk.</p>

        <h3>6. Intellectueel Eigendom</h3>
        <p>Alle op het platform beschikbare inhoud, inclusief teksten, afbeeldingen en metadata, is auteursrechtelijk beschermd. Reproductie, distribution of commercieel gebruik zonder uitdrukkelijke toestemming is ten strengste verboden.</p>

        <h3>7. Accountopschorting</h3>
        <p>De administratie behoudt zich het recht voor om accounts op te schorten of te verwijderen in geval van misbruik van het platform, schending van deze voorwaarden of gedrag dat schadelijk is voor de schoolgemeenschap.</p>

        <h3>8. Beperking van Aansprakelijkheid</h3>
        <p>De scholengroep is niet aansprakelijk voor tijdelijke serviceonderbrekingen, gegevensverlies als gevolg van technische storingen of indirecte schade die voortvloeit uit het gebruik van het platform.</p>

        <h3>9. Wijzigingen van de Voorwaarden</h3>
        <p>We behouden ons het recht voor om deze voorwaarden op elk moment bij te werken. Gebruikers worden op de hoogte gesteld van belangrijke wijzigingen. Voortgezet gebruik van het platform na kennisgeving houdt acceptatie van de nieuwe voorwaarden in.</p>

        <p><em>Laatst bijgewerkt: 25/05/2026</em></p>
      `
    },
  },
  home: {
    recommended: 'Aanbevolen',
    catalog: 'Catalogus',
    catalogSub: 'Exploreer alle beschikbare boeken in onze bibliotheek',
    errorLoad: 'Boeken konden niet worden geladen.',
    errorCheckNet: 'Controleer uw internetverbinding.',
    retryBtn: 'Opnieuw Proberen',
    noBooksFound: 'Geen boeken gevonden voor uw zoekopdracht.',
    searchNoResults: 'Probeer andere trefwoorden te gebruiken.',
    paginationLabel: 'Catalogus paginering',
    page: 'Pagina {page}',
    prevPage: 'Vorige pagina',
    nextPage: 'Volgende pagina'
  },
  myLoans: {
    title: 'Mijn Bibliotheek',
    subtitle: 'Leningen en verlanglijst',
    tabs: {
      loans: 'Leningen',
      wishlist: 'Verlanglijst',
    },
    emptyTitle: 'Geen leningen',
    emptyDesc: 'U heeft nog geen boeken uit de catalogus aangevraagd.',
    exploreCatalog: 'Catalogus verkennen',
    status: {
      active: 'Actief',
      pending: 'In afwachting',
      rejected: 'Afgewezen',
      returned: 'Ingeleverd'
    },
    requestLabel: 'Aanvraag'
  },
  auth: {
    loginTitle: 'Welkom terug',
    loginSubtitle: 'Log in om toegang te krijgen tot de bibliotheek',
    emailLabel: 'E-mail',
    emailPlaceholder: 'jouw@email.com',
    passwordLabel: 'Wachtwoord',
    passwordPlaceholder: '••••••••',
    signInBtn: 'Inloggen',
    or: 'of',
    googleBtn: 'Doorgaan met Google',
    noAccount: 'Geen account?',
    registerLink: 'Registreren',
    signupTitle: 'Account Aanmaken',
    signupSubtitle: 'Word lid van onze bibliotheek',
    nameLabel: 'Volledige naam',
    namePlaceholder: 'Jan Jansen',
    signUpBtn: 'Account aanmaken',
    hasAccount: 'Heb je al een account?',
    loginLink: 'Inloggen'
  },
  notifications: {
    title: 'Meldingen',
    subtitle: 'Blijf op de hoogte van uw bibliotheek',
    emptyTitle: 'Helemaal bij!',
    emptyDesc: 'U heeft nog geen meldingen. Eventuele berichten over leningen of nieuwe boeken verschijnen hier.',
    exploreCatalog: 'Catalogus verkennen',
    markAllAsRead: 'Alles als gelezen markeren',
    templates: {
      approvedTitle: 'Lening Goedgekeurd',
      approvedMsg: 'Uw leenverzoek voor het boek "{book}" is goedgekeurd. Het boek ligt klaar om opgehaald te worden.',
      rejectedTitle: 'Lening Geweigerd',
      rejectedMsg: 'Uw leenverzoek voor het boek "{book}" kon op dit moment niet worden goedgekeurd.',
      returnedTitle: 'Boek Geretourneerd',
      returnedMsg: 'We bevestigen de retournering van het boek "{book}". Bedankt voor het lezen!',
      warningTitle: 'Herinnering voor Retournering',
      warningMsg: 'We herinneren u eraan dat het boek "{book}" morgen moet worden geretourneerd. Lever het in bij de bibliotheek.',
      registeredTitle: 'Reservering Geregistreerd',
      registeredMsg: 'Uw reserveringsverzoek voor het boek "{book}" is ontvangen en wacht op goedkeuring. U heeft 12 uur de tijd om het boek op te halen in de bibliotheek voordat de reservering automatisch verloopt.'
    }
  },
  footer: {
    groupName: 'Scholengroep',
    contacts: 'Contacten',
    usefulLinks: 'Handige Links',
    platform: 'Platform Sdurão',
    moodle: 'Groeps-Moodle',
    website: 'Officiële Website',
    docs: 'Documentatie',
    rights: '© {year} Agrupamento de Escolas Tomás Cabreira, in Faro. Alle rechten voorbehouden.'
  }
}
