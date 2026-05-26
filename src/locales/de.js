export default {
  sidebar: { discover: 'Entdecken', myLibrary: 'Meine Bibliothek', overview: 'Übersicht', books: 'Bücher', categories: 'Kategorien', loans: 'Ausleihen', users: 'Benutzer', administration: 'Verwaltung', settings: 'Einstellungen', admin: 'Admin', feedback: 'Feedback' },
  navbar: { 
    searchPlaceholder: 'Bücher, Autoren suchen...', 
    myAccount: 'Mein Konto', 
    myLoans: 'Meine Ausleihen', 
    manageBooks: 'Bücher verwalten', 
    manageLoans: 'Ausleihen', 
    newBook: 'Neues Buch', 
    logout: 'Abmelden', 
    login: 'Anmelden', 
    register: 'Registrieren', 
    adminMenu: 'Verwaltung', 
    docs: 'Dokumentation', 
    notifications: 'Benachrichtigungen', 
    loading: 'Wird geladen...', 
    all: 'Alle',
    home: 'Startseite',
    settings: 'Einstellungen'
  },
  landing: {
    badge: 'Digitale Bibliothek',
    title: 'Sekundarschule Tomás Cabreira',
    subtitle: 'Willkommen im digitalen Portal unserer Bibliothek. Erkunden Sie unseren umfangreichen Katalog an Büchern, Abschlussarbeiten und Bildungsressourcen.',
    exploreBtn: 'Katalog erkunden',
    ctaTitle: 'Bereit, ein Buch auszuleihen?',
    ctaDesc: 'Erstellen Sie jetzt Ihr Konto und erkunden Sie den digitalen Bibliothekskatalog.',
    aboutTitle: 'Über unsere Bibliothek',
    aboutDesc: 'Die Bibliothek der Sekundarschule Tomás Cabreira ist ein Ort des Lernens, Entdeckens und Teilens. Mit unserer digitalen Version können Sie jetzt von überall aus die Verfügbarkeit von Büchern prüfen und Ihre Anforderungen verwalten.',
    features: {
      search: 'Intelligente Suche',
      searchDesc: 'Finden Sie ganz einfach, was Sie suchen, nach Titel, Autor oder Kategorie.',
      manage: 'Online-Verwaltung',
      manageDesc: 'Verfolgen Sie Ihre Ausleihen und erhalten Sie Rückgabebenachrichtigungen.',
      access: 'Einfacher Zugang',
      accessDesc: 'Verfügbar auf jedem Gerät für die gesamte Schulgemeinschaft.'
    }
  },
  settings: { title: 'Einstellungen', subtitle: 'Verwalten Sie Ihr Konto und Ihre Einstellungen', profile: 'Profil', name: 'Name', email: 'E-Mail', appearance: 'Erscheinungsbild', theme: 'Design', light: 'Hell', dark: 'Dunkel', languageSection: 'Sprache', languageDesc: 'Wählen Sie Ihre bevorzugte Sprache', administration: 'Verwaltung', adminActive: 'Admin-Sitzung aktiv', adminDesc: 'Sie sind als Administrator angemeldet', adminLogout: 'Admin-Abmeldung', account: 'Konto', signOutTitle: 'Abmelden', signOutDesc: 'Sie werden zur Anmeldeseite weitergeleitet', logoutBtn: 'Abmelden', feedback: { title: 'Feedback Senden', question: 'Probleme oder Vorschläge?', questionDesc: 'Helfen Sie uns, die Plattform zu verbessern, indem Sie Ihre Erfahrungen beschreiben.', writeBtn: 'Schreiben', viewTitle: 'Erhaltenes Feedback Ansehen', viewDesc: 'Sehen Sie die von Benutzern gemeldeten Vorschläge und Probleme ein.', viewBtn: 'Feedback Ansehen', placeholder: 'Beschreiben Sie das gefundene Problem oder Ihren Verbesserungsvorschlag...', cancelBtn: 'Abbrechen', sendBtn: 'Feedback Senden', errorToast: 'Fehler beim Senden des Feedbacks', successToast: 'Danke für Ihr Feedback!' } },
  routes: { login: '/login', signup: '/signup', adminLogin: '/console/login', book: '/book/:id', myLoans: '/my-loans', settings: '/settings', notifications: '/notifications', adminBooks: '/console/books', adminCategories: '/console/categories', adminLoans: '/console/loans', adminBooksNew: '/console/books/new', adminBooksEdit: '/console/books/edit/:id' },
  admin: {
    dashboard: { totalBooks: 'BÜCHER INSGESAMT', activeLoans: 'AKTIVE AUSLEIHEN', pendingRequests: 'AUSSTEHENDE ANFRAGEN', overdue: 'ÜBERFÄLLIG', recentActivity: 'Letzte Aktivitäten', viewAll: 'Alle anzeigen', quickActions: 'Schnellzugriff', addNewBook: 'Neues Buch', updateCatalog: 'KATALOG AKTUALISIEREN', manageBooks: 'Bücher verwalten', editOrRemove: 'BEARBEITEN ODER ENTFERNEN', manageLoans: 'Ausleihen verwalten', approveReject: 'GENEHMIGEN / ABLEHNEN' },
    login: { title: 'Admin-Konsole', subtitle: 'Eingeschränktes Zugangsportal', backToLibrary: 'Zurück zur Bibliothek', authorize: 'Autorisieren', secureDb: 'Sichere Authentifizierung', accessDenied: 'Zugriff verweigert.' },
    common: { approve: 'Genehmigen', reject: 'Ablehnen', rejectBtn: 'Ablehnen', returnBtn: 'Zurückgeben', loadingRequests: 'Anfragen werden geladen...', fetchingCollection: 'Katalog wird geladen...', noRequests: 'Keine Leihanfragen gefunden', noBooks: 'Keine Bücher gefunden', saveOrder: 'Reihenfolge speichern', orderSaved: 'Reihenfolge gespeichert!', orderError: 'Fehler beim Speichern der Reihenfolge.', select: { placeholder: 'Option wählen...', noOptions: 'Keine Optionen' } },
    books: { searchPlaceholder: 'Suche nach Titel, Autor oder ISBN...', allCategories: 'Alle Kategorien', id: 'ID', bookInfo: 'INFO', inventory: 'BESTAND', featured: 'HIGHLIGHT', actions: 'AKTIONEN', available: 'VERFÜGBAR', outOfStock: 'AUSVERKAUFT', noCover: 'KEIN COVER', filterPlaceholder: 'GENRE WÄHLEN...', toastSaved: 'Buch erfolgreich aktualisiert!', toastAdded: 'Buch erfolgreich hinzugefügt!', toastDeleted: 'Buch erfolgreich gelöscht.', toastDeleteError: 'Fehler beim Löschen des Buches.', deleteTitle: 'Buch löschen', deleteMsg: 'Möchten Sie dieses Buch wirklich dauerhaft löschen?', deleteBtn: 'Löschen' },
    categories: { title: 'Kategorien', subtitle: 'Kategorien des Katalogs verwalten.', addPlaceholder: 'Neuer Kategoriename...', searchPlaceholder: 'Kategorien suchen...', addBtn: 'Hinzufügen', dragToReorder: 'Symbole zum Neusortieren ziehen', deleteTitle: 'Kategorie löschen', deleteMsg: 'Möchten Sie diese Kategorie wirklich löschen? Dies kann sich auf zugehörige Bücher auswirken.', deleteBtn: 'Ja, Löschen' },
    loans: { title: 'Hausleihverwaltung', subtitle: 'Ausleihen verwalten und verfolgen', searchPlaceholder: 'Nach Buch, Autor oder E-Mail suchen...', all: 'ALLE', pending: 'AUSSTEHEND', active: 'AKTIV', returned: 'ZURÜCKGEGEBEN', rejected: 'ABGELEHNT', overdue: 'ÜBERFÄLLIG', id: 'ID', user: 'BENUTZER', bookDetails: 'BUCHDETAILS', status: 'STATUS', actions: 'AKTIONEN', libMember: 'MITGLIED', borrowedDate: 'AUSGELIEHEN', returnedDate: 'RÜCKGABEDATUM', dueDate: 'FÄLLIGKEITSDATUM', approvedDate: 'GENEHMIGT AM' },
    users: { title: 'Benutzer', subtitle: 'Systemzugriff und Rollen verwalten', searchPlaceholder: 'Nach Name oder E-Mail suchen...', nameDetails: 'BENUTZERDETAILS', role: 'ROLLE', joined: 'BEIGETRETEN AM', updateSuccess: 'Rolle aktualisiert', updateError: 'Fehler bei Aktualisierung', noUsers: 'Keine Benutzer gefunden' },
    roles: { admin: 'Administrator', professor: 'Professor', aluno: 'Schüler', student: 'Schüler', membro: 'Mitglied' },
    editBook: { newBookTitle: 'Neues Buch hinzufügen', editBookTitle: 'Buchdetails bearbeiten', newBookSubtitle: 'Ein neues Buch zum Katalog hinzufügen', editBookSubtitle: 'Informationen aktualisieren', fullTitle: 'VOLLSTÄNDIGER TITEL', authorName: 'AUTOR', isbnReference: 'ISBN-REFERENZ', primaryCategory: 'HAUPTKATEGORIE', publisher: 'VERLAG', inventoryQuantity: 'ANZAHL', guidelines: 'RICHTLINIEN', guideline1: 'Hochauflösende Bilder bevorzugt', guideline2: 'Empfohlenes Verhältnis: 3:4', guideline3: 'Maximale Größe: 5 MB (JPG, PNG)', addBookBtn: 'BUCH HINZUFÜGEN', updateBookBtn: 'BUCH AKTUALISIEREN', uploadImage: 'Zum Hochladen klicken', imageFormats: 'SVG, PNG, JPG (max. 800x400)', titlePlaceholder: 'Der große Gatsby', authorPlaceholder: 'F. Scott Fitzgerald', isbnPlaceholder: '978-0-...', publisherPlaceholder: "Scribner's Sons" }
  },
  bookDetails: {
    backToCatalog: 'Zurück zum Katalog',
    backToStart: 'Zurück zum Anfang',
    bookNotFound: 'Buch nicht gefunden',
    requestedSuccess: 'Erfolgreich angefragt',
    requestBook: 'Buch anfragen',
    outOfStock: 'Nicht verfügbar',
    availableOf: '{available} von {total} verfügbar',
    aboutBook: 'Über dieses Buch',
    aiSummary: 'KI',
    generateAiSummary: 'KI-Zusammenfassung generieren',
    generatingAiSummary: 'Zusammenfassung wird generiert...',
    noDescription: 'Keine Beschreibung für dieses Buch verfügbar.',
    bookMetadata: 'Buchdetails',
    isbn: 'ISBN',
    publisher: 'Verlag',
    yearEdition: 'Erscheinungsjahr',
    reviewsTitle: 'Rezensionen & Kommentare',
    writeReview: 'Eine Rezension schreiben',
    editReview: 'Deine Rezension bearbeiten',
    submitReview: 'Rezension absenden',
    cancelReview: 'Abbrechen',
    noReviews: 'Noch keine Rezensionen. Sei der Erste, der dieses Buch bewertet!',
    ratingLabel: 'Bewertung',
    commentLabel: 'Kommentar (optional)',
    averageRating: 'Durchschnittsbewertung',
    reviewSuccess: 'Rezension erfolgreich übermittelt!',
    reviewError: 'Fehler beim Übermitteln der Rezension. Bitte versuchen Sie es erneut.',
    youReviewed: 'Du hast dieses Buch bewertet',
    catalog: 'Katalog',
    availability: 'Verfügbarkeit',
    availableForRequest: 'Bereit zur Ausleihe',
    alreadyRequested: 'Bereits Angefragt',
    waitingApproval: 'Warten auf die Genehmigung des Administrators',
    review: 'Bewertung',
    reviews: 'Bewertungen',
    deleteReviewTitle: 'Bewertung Löschen',
    deleteReviewConfirm: 'Sind Sie sicher, dass Sie diese Bewertung löschen möchten?',
    deleteReviewSuccess: 'Bewertung erfolgreich gelöscht.',
    deleteReviewError: 'Fehler beim Löschen der Bewertung.',
    anonymousUser: 'Benutzer',
    requestError: 'Fehler beim Anfordern des Buches',
    processError: 'Fehler bei der Bearbeitung Ihrer Anfrage.',
    featuredError: 'Fehler beim Aktualisieren des Highlights',
    featuredAdded: 'Buch als Highlight markiert ⭐',
    featuredRemoved: 'Highlight entfernt',
    emailSubject: 'Reservierung Registriert',
    emailMessage: 'Ihre Reservierungsanfrage für das Buch "{title}" ist eingegangen und wartet auf Genehmigung. Sie haben 12 Stunden Zeit, das Buch in der physischen Bibliothek abzuholen, bevor die Reservierung automatisch abläuft.',
    emailButtonText: 'Meine Ausleihen anzeigen'
  },
  docs: {
    badge: 'Offizielle Dokumentation',
    title: 'Bibliotheksdokumentation',
    subtitle: 'Alles, was Sie wissen müssen, um die Digitale Bibliothek effizient zu nutzen.',
    borrow: {
      title: '1. Wie Man ein Buch Ausleiht',
      desc: 'Durchsuchen Sie den Katalog, wählen Sie ein Buch aus und klicken Sie auf "Buch anfragen". Nach der Anfrage haben Sie ein 12-Stunden-Fenster, um das Buch in der physischen Bibliothek abzuholen, bevor die Reservierung automatisch storniert wird.',
    },
    pin: {
      title: '2. Rückgabe-PIN (4 Ziffern)',
      desc: 'Bei der Abholung wird Ihrer Anfrage ein einzigartiger 4-stelliger Code zugeordnet. Sie können diese PIN im Menü "Meine Ausleihen" einsehen. Sie müssen sie dem Administrator für die Rückgabe vorlegen.',
    },
    duration: {
      title: '3. Ausleihdauer',
      desc: 'Die Standard-Ausleihdauer für jedes Buch in unserem Katalog beträgt 14 Tage. Sie werden einen Tag vor Ablauf der Frist per E-Mail und durch Benachrichtigungen auf der Plattform informiert.',
    },
    ai: {
      title: '4. KI-Zusammenfassungen',
      desc: 'Unsere Plattform nutzt Künstliche Intelligenz, um Buch-Metadaten zu lesen und automatische Beschreibungen und ansprechende Zusammenfassungen zu generieren, die Ihnen bei der Entscheidung helfen, ob das Buch das Richtige für Sie ist.',
    },
    fine: {
      title: '5. Überfälligkeitsgebühr',
      desc: 'Um die Katalogrotation sicherzustellen, unterliegen Rückgaben nach dem Fälligkeitsdatum einer einmaligen Gebühr von 5,00€.',
    },
    feedback: {
      title: '6. Feedback und Support',
      desc: 'Wenn Sie einen Fehler auf der Website finden, Fragen zur Funktionsweise haben oder Verbesserungen vorschlagen möchten, verwenden Sie die Schaltfläche "Feedback Senden" in Ihren Einstellungen.',
    },
    privacy: {
      title: 'Datenschutzerklärung',
      content: `
        <h3>1. Verantwortlicher für die Datenverarbeitung</h3>
        <p>Das Agrupamento de Escolas Tomás Cabreira mit Sitz in Faro, Portugal, ist der Verantwortliche für die Verarbeitung personenbezogener Daten, die über diese digitale Bibliotheksplattform erhoben werden.</p>

        <h3>2. Erhobene Daten</h3>
        <p>Wir erheben nur die für die Erbringung des Dienstes unbedingt erforderlichen Daten:</p>
        <ul>
          <li>Vollständiger Name und E-Mail-Adresse (zur Identifikation und Kommunikation);</li>
          <li>Verlauf von Ausleihen und Rückgaben (zur Verwaltung der Ausleihen);</li>
          <li>Technische Zugriffsdaten wie IP-Adresse und Browsertyp (für Sicherheit und Diagnose).</li>
        </ul>

        <h3>3. Zweck der Verarbeitung</h3>
        <p>Die erhobenen Daten werden ausschließlich verwendet für:</p>
        <ul>
          <li>Verwaltung von Konten und Authentifizierung von Benutzern;</li>
          <li>Bearbeitung und Verfolgung von Ausleihanfragen;</li>
          <li>Senden von Benachrichtigungen im Zusammenhang mit Ihrem Konto (Genehmigungen, Fristen, Rückgaben);</li>
          <li>Kontinuierliche Verbesserung unserer Dienstleistungen.</li>
        </ul>

        <h3>4. Datenweitergabe</h3>
        <p>Ihre personenbezogenen Daten werden nicht an Dritte für kommerzielle Zwecke verkauft, vermietet oder weitergegeben. Sie dürfen nur dann an zuständige Behörden weitergegeben werden, wenn dies gesetzlich oder durch eine gerichtliche Anordnung vorgeschrieben ist.</p>

        <h3>5. Sicherheit</h3>
        <p>Wir implementieren geeignete technische und organisatorische Maßnahmen, um Ihre Daten vor unbefugtem Zugriff, Verlust oder Zerstörung zu schützen, einschließlich Verschlüsselung und Zugriffskontrollen.</p>

        <h3>6. Ihre Rechte</h3>
        <p>Gemäß der DSGVO haben Sie das Recht auf Auskunft, Berichtigung, Löschung oder Einschränkung der Verarbeitung Ihrer Daten. Um diese Rechte auszuüben, kontaktieren Sie uns über die Schaltfläche "Feedback Senden" in den Einstellungen.</p>

        <h3>7. Datenaufbewahrung</h3>
        <p>Die Daten werden so lange aufbewahrt, wie Ihr Konto aktiv ist oder wie es zur Erfüllung gesetzlicher Verpflichtungen erforderlich ist. Nach einem Lösungsantrag werden die Daten innerhalb von maximal 30 Tagen gelöscht.</p>

        <h3>8. Cookies</h3>
        <p>Wir verwenden ausschließlich technisch notwendige Cookies, die für das Funktionieren der Plattform erforderlich sind (Authentifizierungssitzung). Wir verwenden keine Tracking- oder Werbecookies.</p>

        <p><em>Zuletzt aktualisiert: 25/05/2026</em></p>
      `
    },
    terms: {
      title: 'Allgemeine Geschäftsbedingungen',
      content: `
        <h3>1. Annahme der Bedingungen</h3>
        <p>Mit der Registrierung und Nutzung der digitalen Bibliotheksplattform des Agrupamento de Escolas Tomás Cabreira erklären Sie, dass Sie diese Allgemeinen Geschäftsbedingungen gelesen, verstanden und akzeptiert haben.</p>

        <h3>2. Teilnahmeberechtigung</h3>
        <p>Dieser Dienst richtet sich ausschließlich an Schüler, Lehrer und Mitarbeiter des Agrupamento de Escolas Tomás Cabreira. Registrierungen mit falschen Angaben oder durch nicht autorisierte Benutzer werden unverzüglich gelöscht.</p>

        <h3>3. Ausleihen von Büchern</h3>
        <ul>
          <li>Jeder Benutzer darf maximal eine (1) aktive Ausleihe gleichzeitig haben;</li>
          <li>Nach der Genehmigung hat der Benutzer <strong>12 Stunden</strong> Zeit, das Buch in der physischen Bibliothek abzuholen;</li>
          <li>Die maximale Ausleihfrist beträgt <strong>14 Kalendertage</strong> ab dem Abholdatum;</li>
          <li>Die zugewiesene 4-stellige PIN ist persönlich und nicht übertragbar und wird für die Durchführung der Rückgabe benötigt.</li>
        </ul>

        <h3>4. Rückgaben und Gebühren</h3>
        <p>Die Rückgabe nach Ablauf der festgelegten Frist zieht eine einmalige Gebühr von <strong>5,00€</strong> nach sich. Die Zahlung muss persönlich in der Bibliothek erfolgen. Solange unbezahlte Gebühren vorhanden sind, kann der Benutzer keine neuen Ausleihanfragen stellen.</p>

        <h3>5. Verantwortung des Benutzers</h3>
        <p>Der Benutzer ist für die ordnungsgemäße Behandlung des Buches während der Ausleihfrist verantwortlich. Beschädigung, Verlust oder Verschlechterung des Buches können zur Verpflichtung führen, den Wiederbeschaffungswert des Buches zu zahlen.</p>

        <h3>6. Geistiges Eigentum</h3>
        <p>Alle auf der Plattform verfügbaren Inhalte, einschließlich Texte, Bilder und Metadaten, sind urheberrechtlich geschützt. Die Vervielfältigung, Verbreitung oder gewerbliche Nutzung ohne ausdrückliche Genehmigung ist strengstens untersagt.</p>

        <h3>7. Kontosperrung</h3>
        <p>Die Verwaltung behält sich das Recht vor, Konten bei Missbrauch der Plattform, Verstoß gegen diese Bedingungen oder Verhalten, das der Schulgemeinschaft schadet, zu sperren oder zu löschen.</p>

        <h3>8. Haftungsbeschränkung</h3>
        <p>Der Schulverbund haftet nicht für vorübergehende Serviceunterbrechungen, Datenverlust aufgrund technischer Fehler oder indirekte Schäden, die sich aus der Nutzung der Plattform ergeben.</p>

        <h3>9. Änderungen der Bedingungen</h3>
        <p>Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu aktualisieren. Die Benutzer werden über wesentliche Änderungen benachrichtigt. Die fortgesetzte Nutzung der Plattform nach einer Benachrichtigung stellt die Annahme der neuen Bedingungen dar.</p>

        <p><em>Zuletzt aktualisiert: 25/05/2026</em></p>
      `
    },
  },
  home: {
    recommended: 'Empfohlen',
    catalog: 'Katalog',
    catalogSub: 'Erkunden Sie alle verfügbaren Bücher in unserer Bibliothek',
    errorLoad: 'Bücher konnten nicht geladen werden.',
    errorCheckNet: 'Prüfen Sie Ihre Internetverbindung.',
    retryBtn: 'Wiederholen',
    noBooksFound: 'Es wurden keine Bücher gefunden, die Ihrer Suche entsprechen.',
    searchNoResults: 'Versuchen Sie es mit anderen Schlagwörtern.',
    paginationLabel: 'Katalog-Paginierung',
    page: 'Seite {page}',
    prevPage: 'Vorherige Seite',
    nextPage: 'Nächste Seite'
  },
  myLoans: {
    title: 'Meine Ausleihen',
    subtitle: 'Vollständige Historie Ihrer Anfragen',
    emptyTitle: 'Keine Ausleihen',
    emptyDesc: 'Sie haben noch keine Bücher aus dem Katalog angefragt.',
    exploreCatalog: 'Katalog erkunden',
    status: {
      active: 'Aktiv',
      pending: 'Ausstehend',
      rejected: 'Abgelehnt',
      returned: 'Zurückgegeben'
    },
    requestLabel: 'Anfrage'
  },
  auth: {
    loginTitle: 'Willkommen zurück',
    loginSubtitle: 'Melden Sie sich an, um auf die Bibliothek zuzugreifen',
    emailLabel: 'E-Mail',
    emailPlaceholder: 'deine@email.com',
    passwordLabel: 'Passwort',
    passwordPlaceholder: '••••••••',
    signInBtn: 'Anmelden',
    or: 'oder',
    googleBtn: 'Weiter mit Google',
    noAccount: 'Kein Konto?',
    registerLink: 'Registrieren',
    signupTitle: 'Konto erstellen',
    signupSubtitle: 'Treten Sie unserer Bibliothek bei',
    nameLabel: 'Vollständiger Name',
    namePlaceholder: 'Max Mustermann',
    signUpBtn: 'Konto erstellen',
    hasAccount: 'Bereits ein Konto?',
    loginLink: 'Anmelden'
  },
  notifications: {
    title: 'Benachrichtigungen',
    subtitle: 'Bleiben Sie über Ihre Bibliothek auf dem Laufenden',
    emptyTitle: 'Alles auf dem neuesten Stand!',
    emptyDesc: 'Sie haben noch keine Benachrichtigungen. Alle Mitteilungen über Ausleihen oder neue Bücher erscheinen hier.',
    exploreCatalog: 'Katalog erkunden',
    markAllAsRead: 'Alle als gelesen markieren',
    templates: {
      approvedTitle: 'Ausleihe Genehmigt',
      approvedMsg: 'Ihre Ausleihanfrage für das Buch "{book}" wurde genehmigt. Das Buch steht zur Abholung bereit.',
      rejectedTitle: 'Ausleihe Abgelehnt',
      rejectedMsg: 'Ihre Ausleihanfrage für das Buch "{book}" konnte derzeit nicht genehmigt werden.',
      returnedTitle: 'Buch Zurückgegeben',
      returnedMsg: 'Wir bestätigen die Rückgabe des Buches "{book}". Vielen Dank fürs Lesen!',
      warningTitle: 'Rückgabeerinnerung',
      warningMsg: 'Wir erinnern Sie daran, dass das Buch "{book}" morgen zurückgegeben werden muss. Bitte bringen Sie es in die Bibliothek.',
      registeredTitle: 'Reservierung Registriert',
      registeredMsg: 'Ihre Reservierungsanfrage für das Buch "{book}" ist eingegangen und wartet auf Genehmigung. Sie haben 12 Stunden Zeit, das Buch in der Bibliothek abzuholen, bevor die Reservierung automatisch abläuft.'
    }
  },
  footer: {
    groupName: 'Schulverbund',
    contacts: 'Kontakte',
    usefulLinks: 'Nützliche Links',
    platform: 'Plattform Sdurão',
    moodle: 'Verbunds-Moodle',
    website: 'Offizielle Website',
    docs: 'Dokumentation',
    rights: '© {year} Agrupamento de Escolas Tomás Cabreira, in Faro. Alle Rechte vorbehalten.'
  }
}
