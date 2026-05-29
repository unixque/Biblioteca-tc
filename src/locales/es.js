export default {
  sidebar: {
    discover: 'Descubrir',
    myLibrary: 'Mi Biblioteca',
    overview: 'Resumen',
    books: 'Libros',
    categories: 'Categorías',
    loans: 'Préstamos',
    users: 'Usuarios',
    administration: 'Administración',
    settings: 'Configuración',
    admin: 'Admin',
    feedback: 'Feedback',
    wishlist: 'Favoritos',
    activity: 'Actividad',
  },
  wishlist: {
    title: 'Lista de deseos',
    subtitle: 'Libros que guardó para leer más tarde',
    empty: 'Aún no ha añadido libros a favoritos.',
    toggle: 'Añadir a favoritos',
    added: 'Añadido a favoritos',
    removed: 'Eliminado de favoritos',
    error: 'No se pudo actualizar la lista',
  },
  aiChat: {
    open: 'Asistente de libros',
    title: 'Asistente BibliotecaTC',
    welcome: 'Describa un tema, materia o autor — le sugeriré libros de nuestro catálogo que encajen.',
    placeholder: 'Ej: recomienda un libro de filosofía...',
    thinking: 'Pensando...',
    viewBook: 'Ver libro en el catálogo',
    error: 'No pude responder. Inténtelo de nuevo.',
    noApiKey: 'El asistente no está disponible en este momento.',
    loginRequired: 'Inicie sesión para usar el asistente.',
  },
  navbar: { 
    searchPlaceholder: 'Buscar libros, autores...', 
    myAccount: 'Mi Cuenta', 
    myLoans: 'Mis Préstamos', 
    manageBooks: 'Gestionar Libros', 
    manageLoans: 'Préstamos', 
    newBook: 'Nuevo Libro', 
    logout: 'Cerrar Sesión', 
    login: 'Iniciar Sesión', 
    register: 'Registrarse', 
    adminMenu: 'Administración', 
    docs: 'Documentación', 
    notifications: 'Notificaciones', 
    loading: 'Cargando...', 
    all: 'Todo',
    home: 'Inicio',
    settings: 'Ajustes'
  },
  landing: {
    badge: 'Biblioteca Digital',
    title: 'Escuela Secundaria Tomás Cabreira',
    subtitle: 'Bienvenido al portal digital de nuestra biblioteca. Explore nuestro vasto catálogo de libros, tesis y recursos educativos.',
    exploreBtn: 'Explorar Catálogo',
    ctaTitle: '¿Listo para pedir un libro?',
    ctaDesc: 'Cree su cuenta ahora y explore el catálogo digital de la biblioteca.',
    aboutTitle: 'Sobre nuestra Biblioteca',
    aboutDesc: 'La Biblioteca de la Escuela Secundaria Tomás Cabreira es un espacio de aprendizaje, descubrimiento y intercambio. Ahora, con nuestra versión digital, puede consultar la disponibilidad de libros y gestionar sus préstamos desde cualquier lugar.',
    features: {
      search: 'Búsqueda Inteligente',
      searchDesc: 'Encuentre fácilmente lo que busca por título, autor o categoría.',
      manage: 'Gestión Online',
      manageDesc: 'Siga sus préstamos y recibe notificaciones de devolución.',
      access: 'Acceso Fácil',
      accessDesc: 'Disponible en cualquier dispositivo para toda la comunidad escolar.'
    }
  },
  settings: { title: 'Configuración', subtitle: 'Gestiona tu cuenta y preferencias', profile: 'Perfil', name: 'Nombre', email: 'Correo', appearance: 'Apariencia', theme: 'Tema', light: 'Claro', dark: 'Oscuro', languageSection: 'Idioma', languageDesc: 'Elige tu idioma preferido', administration: 'Administración', adminActive: 'Sesión de Admin Ativa', adminDesc: 'Estás conectado como administrador', adminLogout: 'Cerrar Sesión Admin', account: 'Cuenta', signOutTitle: 'Cerrar Sesión', signOutDesc: 'Serás redirigido a la página de inicio de sesión', logoutBtn: 'Cerrar Sesión', feedback: { title: 'Enviar Feedback', question: '¿Problemas o Sugerencias?', questionDesc: 'Ayúdanos a mejorar la plataforma describiendo tu experiencia.', writeBtn: 'Escribir', viewTitle: 'Ver Feedback Recibido', viewDesc: 'Consulta las sugerencias y problemas reportados por los usuarios.', viewBtn: 'Ver Feedback', placeholder: 'Describe el problema que encontraste o tu sugerencia de mejora...', cancelBtn: 'Cancelar', sendBtn: 'Enviar Feedback', errorToast: 'Error al enviar feedback', successToast: '¡Gracias por tu feedback!' } },
  routes: { login: '/login', signup: '/signup', adminLogin: '/console/login', book: '/book/:id', myLoans: '/my-loans', settings: '/settings', notifications: '/notifications', adminBooks: '/console/books', adminCategories: '/console/categories', adminLoans: '/console/loans', adminBooksNew: '/console/books/new', adminBooksEdit: '/console/books/edit/:id' },
  admin: {
    dashboard: { totalBooks: 'TOTAL LIBROS', activeLoans: 'PRÉSTAMOS ACTIVOS', pendingRequests: 'SOLICITUDES PENDIENTES', overdue: 'VENCIDOS', recentActivity: 'Actividad Reciente', viewAll: 'Ver Todo', quickActions: 'Acciones Rápidas', addNewBook: 'Nuevo Libro', updateCatalog: 'ACTUALIZAR', manageBooks: 'Gestionar Libros', editOrRemove: 'EDITAR O ELIMINAR', manageLoans: 'Gestionar Préstamos', approveReject: 'APROBAR / RECHAZAR' },
    login: { title: 'Consola de Administración', subtitle: 'Portal de acceso restringido', backToLibrary: 'Volver a la Biblioteca', authorize: 'Autorizar', secureDb: 'Autenticación Segura', accessDenied: 'Acceso denegado.' },
    common: { approve: 'Aprobar', reject: 'Rechazar', rejectBtn: 'Rechazar', returnBtn: 'Devolver', loadingRequests: 'Cargando solicitudes...', fetchingCollection: 'Cargando catálogo...', noRequests: 'No hay solicitudes de préstamo', noBooks: 'No se encontraron libros', saveOrder: 'Guardar orden', orderSaved: '¡Orden guardado!', orderError: 'Error al guardar el orden.', select: { placeholder: 'Seleccione una opción...', noOptions: 'Sin opciones' } },
    books: { searchPlaceholder: 'Buscar por título, autor o ISBN...', allCategories: 'Todas las Categorías', id: 'ID', bookInfo: 'INFO', inventory: 'INVENTARIO', featured: 'DESTACADO', actions: 'ACCIONES', available: 'DISPONIBLE', outOfStock: 'AGOTADO', noCover: 'SIN PORTADA', filterPlaceholder: 'Seleccionar género...', toastSaved: '¡Libro actualizado correctamente!', toastAdded: '¡Libro añadido correctamente!', toastDeleted: 'Libro eliminado correctamente.', toastDeleteError: 'Error al eliminar el libro.', deleteTitle: 'Eliminar Libro', deleteMsg: '¿Seguro que quieres eliminar este libro permanentemente?', deleteBtn: 'Eliminar' },
    categories: { title: 'Categorías', subtitle: 'Gestiona las categorías del catálogo.', addPlaceholder: 'Nuevo nombre de categoría...', searchPlaceholder: 'Buscar categorías...', addBtn: 'Añadir', dragToReorder: 'Arrastra los iconos para reordenar', deleteTitle: 'Eliminar Categoría', deleteMsg: '¿Seguro que quieres eliminar esta categoría? Puede afectar a los libros asociados.', deleteBtn: 'Sí, Eliminar' },
    loans: { title: 'Gestión de Préstamos', subtitle: 'Gestiona y realiza un seguimiento de los préstamos', searchPlaceholder: 'Buscar por libro, autor o correo...', all: 'TODO', pending: 'PENDIENTE', active: 'ACTIVO', returned: 'DEVUELTO', rejected: 'RECHAZADO', overdue: 'VENCIDO', id: 'ID', user: 'USUARIO', bookDetails: 'DETALLES DEL LIBRO', status: 'ESTADO', actions: 'ACCIONES', libMember: 'MIEMBRO', borrowedDate: 'PRESTADO', returnedDate: 'FECHA DE DEVOLUCIÓN', dueDate: 'FECHA LÍMITE', approvedDate: 'APROBADO EL' },
    users: { title: 'Usuarios', subtitle: 'Gestiona el acceso al sistema y roles', searchPlaceholder: 'Buscar nombre o correo...', nameDetails: 'DETALLES DE USUARIO', role: 'ROL', joined: 'FECHA REGISTRO', updateSuccess: 'Rol actualizado', updateError: 'Error al actualizar', noUsers: 'No se encontraron usuarios' },
    roles: { admin: 'Administrador', professor: 'Profesor', aluno: 'Alumno', student: 'Alumno', membro: 'Miembro' },
    editBook: { newBookTitle: 'Añadir Nuevo Libro', editBookTitle: 'Editar Detalles del Libro', newBookSubtitle: 'Añade un nuevo libro al catálogo', editBookSubtitle: 'Actualiza la información', fullTitle: 'TÍTULO COMPLETO', authorName: 'NOMBRE DEL AUTOR', isbnReference: 'REFERENCIA ISBN', primaryCategory: 'CATEGORÍA PRINCIPAL', publisher: 'EDITORIAL', inventoryQuantity: 'CANTIDAD', guidelines: 'DIRECTRICES', guideline1: 'Imágenes de alta resolución preferidas', guideline2: 'Proporción recomendada: 3:4', guideline3: 'Tamaño máximo: 5 MB (JPG, PNG)', addBookBtn: 'AÑADIR LIBRO', updateBookBtn: 'ACTUALIZAR LIBRO', uploadImage: 'Haz clic para subir', imageFormats: 'SVG, PNG, JPG (máx. 800x400)', titlePlaceholder: 'El Gran Gatsby', authorPlaceholder: 'F. Scott Fitzgerald', isbnPlaceholder: '978-0-...', publisherPlaceholder: "Scribner's Sons" }
  },
  bookDetails: {
    backToCatalog: 'Volver al catálogo',
    backToStart: 'Volver al inicio',
    bookNotFound: 'Libro no encontrado',
    requestedSuccess: 'Solicitado con éxito',
    requestBook: 'Solicitar Libro',
    outOfStock: 'Agotado',
    availableOf: '{available} de {total} disponibles',
    aboutBook: 'Sobre este libro',
    aiSummary: 'IA',
    generateAiSummary: 'Generar resumen IA',
    generatingAiSummary: 'Generando resumen...',
    noDescription: 'No hay descripción disponible para este libro. Use el botón de abajo para generar un resumen con IA.',
    noDescriptionGuest: 'No hay descripción disponible. Inicie sesión para generar un resumen con IA.',
    generateSummaryLogin: 'Iniciar sesión para generar resumen',
    bookMetadata: 'Detalles del Libro',
    isbn: 'ISBN',
    publisher: 'Editorial',
    yearEdition: 'Año de Edición',
    reviewsTitle: 'Reseñas y Comentarios',
    writeReview: 'Escribir una Reseña',
    editReview: 'Editar tu Reseña',
    submitReview: 'Enviar Reseña',
    cancelReview: 'Cancelar',
    noReviews: 'Aún no hay reseñas. ¡Sé el primero en calificar este libro!',
    ratingLabel: 'Calificación',
    commentLabel: 'Comentario (opcional)',
    averageRating: 'Calificación Media',
    reviewSuccess: '¡Reseña enviada con éxito!',
    reviewError: 'Error al enviar la reseña. Inténtalo de nuevo.',
    youReviewed: 'Calificaste este libro',
    catalog: 'Catálogo',
    availability: 'Disponibilidad',
    availableForRequest: 'Disponible para préstamo',
    alreadyRequested: 'Ya Solicitado',
    waitingApproval: 'Esperando la aprobación del administrador',
    review: 'reseña',
    reviews: 'reseñas',
    deleteReviewTitle: 'Eliminar Reseña',
    deleteReviewConfirm: '¿Está seguro de que desea eliminar esta reseña?',
    deleteReviewSuccess: 'Reseña eliminada con éxito.',
    deleteReviewError: 'Error al eliminar la reseña.',
    anonymousUser: 'Usuario',
    requestError: 'Error al solicitar el libro',
    processError: 'Error al procesar su solicitud.',
    featuredError: 'Error al actualizar el destacado',
    featuredAdded: 'Libro marcado como destacado ⭐',
    featuredRemoved: 'Destacado eliminado',
    emailSubject: 'Reserva Registrada',
    emailMessage: 'Su solicitud de reserva para el libro "{title}" ha sido recibida y está en espera de aprobación. Tendrá 12 horas para recoger el libro en la biblioteca antes de que la reserva expire automáticamente.',
    emailButtonText: 'Ver mis préstamos'
  },
  docs: {
    badge: 'Documentación Oficial',
    title: 'Documentación de la Biblioteca',
    subtitle: 'Todo lo que necesitas saber para utilizar la Biblioteca Digital de manera eficiente.',
    borrow: {
      title: '1. Cómo Solicitar un Libro',
      desc: 'Navega por el catálogo, elige una obra y haz clic en "Solicitar Libro". Después de la solicitud, tendrás una ventana de 12 horas para recoger el libro en la biblioteca física antes de que la reserva sea cancelada automáticamente.',
    },
    pin: {
      title: '2. PIN de Devolución (4 Dígitos)',
      desc: 'Al momento de la recogida, se asociará un código único de 4 dígitos a tu solicitud. Puedes consultar este PIN en el menú "Mis Préstamos". Deberás proporcionarlo al administrador para completar la devolución.',
    },
    duration: {
      title: '3. Duración del Préstamo',
      desc: 'El período normal de préstamo para cualquier libro de nuestro catálogo es de 14 días. Se le notificará un día antes de la fecha límite por correo electrónico y notificaciones en la plataforma.',
    },
    ai: {
      title: '4. Resúmenes por IA',
      desc: 'Nuestra plataforma utiliza Inteligencia Artificial para leer los metadatos de las obras y generar descripciones automáticas y resúmenes atractivos, ayudándote a decidir si el libro es lo que buscas.',
    },
    fine: {
      title: '5. Multa por Atraso',
      desc: 'Para garantizar la rotación del catálogo, las devoluciones realizadas después de la fecha límite están sujetas a una multa única de 5,00€.',
    },
    feedback: {
      title: '6. Feedback y Soporte',
      desc: 'Si encuentras algún error en el sitio, tienes dudas sobre su funcionamiento o quieres sugerir mejoras, utiliza el botón "Enviar Feedback" en tu Configuración.',
    },
    privacy: {
      title: 'Política de Privacidad',
      content: `
        <h3>1. Responsable del Tratamiento</h3>
        <p>El Agrupamento de Escolas Tomás Cabreira, con sede en Faro, Portugal, es el responsable del tratamiento de los datos personales recopilados a través de esta plataforma de biblioteca digital.</p>

        <h3>2. Datos Recopilados</h3>
        <p>Recopilamos únicamente los datos estrictamente necesarios para la prestación del servicio:</p>
        <ul>
          <li>Nombre completo y dirección de correo electrónico (para identificación y comunicación);</li>
          <li>Historial de préstamos y devoluciones (para la gestión de préstamos);</li>
          <li>Datos técnicos de acceso, como dirección IP y tipo de navegador (para seguridad y diagnóstico).</li>
        </ul>

        <h3>3. Finalidad del Tratamiento</h3>
        <p>Los datos recopilados se utilizan exclusivamente para:</p>
        <ul>
          <li>Gestión de cuentas y autenticación de usuarios;</li>
          <li>Procesamiento y seguimiento de solicitudes de préstamo;</li>
          <li>Envío de notificaciones relacionadas con su cuenta (aprobaciones, plazos, devoluciones);</li>
          <li>Mejora continua de nuestros servicios.</li>
        </ul>

        <h3>4. Compartir Datos</h3>
        <p>Sus datos personales no se venden, alquilan ni comparten con terceros para fines comerciales. Solo podrán ser compartidos con autoridades competentes cuando lo exija la ley o una orden judicial.</p>

        <h3>5. Seguridad</h3>
        <p>Implementamos medidas técnicas y organizativas adecuadas para proteger sus datos contra el acceso no autorizado, la pérdida o la destrucción, incluyendo encriptación y control de accesos.</p>

        <h3>6. Sus Derechos</h3>
        <p>Según el RGPD, tiene derecho a acceder, rectificar, eliminar o limitar el tratamiento de sus datos. Para ejercer estos derechos, contáctenos a través del botón "Enviar Feedback" en la Configuración.</p>

        <h3>7. Retención de Datos</h3>
        <p>Los datos se conservan mientras la cuenta esté activa o durante el tiempo necesario para cumplir con las obligaciones legales. Tras una solicitud de eliminación, los datos se eliminan en un plazo máximo de 30 días.</p>

        <h3>8. Cookies</h3>
        <p>Utilizamos únicamente cookies técnicas esenciales para el funcionamiento de la plataforma (sesión de autenticación). No utilizamos cookies de seguimiento o publicidad.</p>

        <p><em>Última actualización: 25/05/2026</em></p>
      `
    },
    terms: {
      title: 'Términos y Condiciones',
      content: `
        <h3>1. Aceptación de los Términos</h3>
        <p>Al registrarse y utilizar la plataforma de Biblioteca Digital del Agrupamento de Escolas Tomás Cabreira, declara haber leído, comprendido y aceptado los presentes Términos y Condiciones.</p>

        <h3>2. Elegibilidad</h3>
        <p>El servicio está destinado exclusivamente a alumnos, profesores y personal del Agrupamento de Escolas Tomás Cabreira. El registro con datos falsos o por parte de usuarios no autorizados será cancelado inmediatamente.</p>

        <h3>3. Préstamo de Libros</h3>
        <ul>
          <li>Cada usuario puede tener hasta un (1) préstamo activo a la vez;</li>
          <li>Tras la aprobación, el usuario tiene <strong>12 horas</strong> para recoger el libro en la biblioteca física;</li>
          <li>El plazo máximo de préstamo es de <strong>14 días naturales</strong> a partir de la fecha de recogida;</li>
          <li>El PIN de 4 dígitos asignado es personal e intransferible, siendo necesario para realizar la devolución.</li>
        </ul>

        <h3>4. Devoluciones y Multas</h3>
        <p>La devolución fuera del plazo establecido implica una multa única de <strong>5,00€</strong>. El pago debe realizarse presencialmente en la biblioteca. Mientras existan multas pendientes, el usuario no podrá realizar nuevas solicitudes de préstamo.</p>

        <h3>5. Responsabilidad del Usuario</h3>
        <p>El usuario es responsable de la conservación del libro durante el período de préstamo. El daño, pérdida o deterioro del libro podrá implicar el pago del valor de reposición de la obra.</p>

        <h3>6. Propiedad Intelectual</h3>
        <p>Todo el contenido disponible en la plataforma, incluidos textos, imágenes y metadatos, está protegido por derechos de autor. La reproducción, distribución o uso comercial sin autorización expresa está estrictamente prohibida.</p>

        <h3>7. Suspensión de Cuenta</h3>
        <p>La administración se reserva el derecho de suspender o eliminar cuentas en caso de uso indebido de la plataforma, incumplimiento de los presentes términos o comportamiento perjudicial para la comunidad escolar.</p>

        <h3>8. Limitación de Responsabilidad</h3>
        <p>El Agrupamiento no se hace responsable de interrupciones temporales del servicio, pérdida de datos por fallos técnicos o daños indirectos derivados del uso de la plataforma.</p>

        <h3>9. Modificaciones de los Términos</h3>
        <p>Nos reservamos el derecho de actualizar estos términos en cualquier momento. Los usuarios serán notificados de cambios significativos. El uso continuado de la plataforma tras la notificación constituye la aceptación de los nuevos términos.</p>

        <p><em>Última actualización: 25/05/2026</em></p>
      `
    }
  },
  home: {
    recommended: 'Recomendados',
    catalog: 'Catálogo',
    catalogSub: 'Explora todos los libros disponibles en nuestra biblioteca',
    errorLoad: 'No se pudieron cargar los libros.',
    errorCheckNet: 'Verifica tu conexión a internet.',
    retryBtn: 'Reintentar',
    noBooksFound: 'Ningún libro coincide con tu búsqueda.',
    searchNoResults: 'Intenta con diferentes palabras clave o limpiando los filtros.',
    paginationLabel: 'Paginación del catálogo',
    page: 'Página {page}',
    prevPage: 'Página anterior',
    nextPage: 'Página siguiente'
  },
  myLoans: {
    title: 'Mi Biblioteca',
    subtitle: 'Préstamos y lista de deseos',
    tabs: {
      loans: 'Préstamos',
      wishlist: 'Lista de deseos',
    },
    emptyTitle: 'Sin préstamos',
    emptyDesc: 'Aún no ha solicitado ningún libro del catálogo.',
    exploreCatalog: 'Explorar Catálogo',
    status: {
      active: 'Activo',
      pending: 'Pendiente',
      rejected: 'Rechazado',
      returned: 'Devuelto'
    },
    requestLabel: 'Solicitud'
  },
  auth: {
    loginTitle: 'Bienvenido de nuevo',
    loginSubtitle: 'Inicia sesión para acceder a la biblioteca',
    emailLabel: 'Correo electrónico',
    emailPlaceholder: 'tu@email.com',
    passwordLabel: 'Contraseña',
    passwordPlaceholder: '••••••••',
    signInBtn: 'Entrar',
    or: 'o',
    googleBtn: 'Continuar con Google',
    noAccount: '¿No tienes cuenta?',
    registerLink: 'Regístrate',
    signupTitle: 'Crear Cuenta',
    signupSubtitle: 'Únete a nuestra biblioteca',
    nameLabel: 'Nombre completo',
    namePlaceholder: 'Juan Pérez',
    signUpBtn: 'Crear cuenta',
    hasAccount: '¿Ya tienes cuenta?',
    loginLink: 'Entrar'
  },
  notifications: {
    title: 'Notificaciones',
    subtitle: 'Mantente al día con tu biblioteca',
    emptyTitle: '¡Todo al día!',
    emptyDesc: 'Aún no tienes notificaciones. Cualquier aviso sobre préstamos o libros nuevos aparecerá aquí.',
    exploreCatalog: 'Explorar Catálogo',
    markAllAsRead: 'Marcar todas como leídas',
    templates: {
      approvedTitle: 'Préstamo Aprobado',
      approvedMsg: 'Su solicitud de préstamo para el libro "{book}" ha sido aprobada. El libro está disponible para su recogida.',
      rejectedTitle: 'Préstamo Rechazado',
      rejectedMsg: 'Su solicitud de préstamo para el libro "{book}" no pudo ser aprobada en este momento.',
      returnedTitle: 'Libro Devuelto',
      returnedMsg: 'Confirmamos la devolución del libro "{book}". ¡Gracias por leer!',
      warningTitle: 'Aviso de Devolución Próxima',
      warningMsg: 'Le recordamos que el libro "{book}" debe ser devuelto mañana. Por favor, entréguelo en la biblioteca.',
      registeredTitle: 'Reserva Registrada',
      registeredMsg: 'Su solicitud de reserva para el libro "{book}" ha sido recibida y está en espera de aprobación. Tendrá 12 horas para recoger el libro en la biblioteca antes de que la reserva expire automáticamente.'
    }
  },
  footer: {
    groupName: 'Agrupación de Escuelas',
    contacts: 'Contactos',
    usefulLinks: 'Enlaces Útiles',
    platform: 'Plataforma Sdurão',
    moodle: 'Moodle de la Agrupación',
    website: 'Sitio Web Oficial',
    docs: 'Documentación',
    rights: '© {year} Agrupamento de Escolas Tomás Cabreira, en Faro. Todos los derechos reservados.'
  }
}
