/**
 * CampusBookX - Lógica de Interacción del Catálogo Universitario
 * Enfoque de Accesibilidad y Usabilidad (HCI)
 */

// 1. Estado inicial de la aplicación
let currentUser = {
    name: "Carlos Mendoza",
    major: "Medicina (4° Semestre)",
    phone: "+52 312 123 4567"
};

let booksData = [
    {
        id: 1,
        title: "Anatomía con Orientación Clínica",
        author: "Keith L. Moore, Arthur F. Dalley",
        subject: "ANAT-101 (Anatomía Humana)",
        edition: "8ª Edición",
        buyPrice: 780,
        rentPrice: 380,
        seller: "Sofía Ruiz",
        sellerMajor: "Medicina (6° Sem)",
        sellerPhone: "+52 312 987 6543",
        notes: "Excelente estado, sin tachones, incluye tablas de músculos intactas.",
        tag: "Más Buscado"
    },
    {
        id: 2,
        title: "Cálculo: Trascendentes Tempranas",
        author: "James Stewart",
        subject: "MAT-101 (Cálculo)",
        edition: "8ª Edición",
        buyPrice: 650,
        rentPrice: 280,
        seller: "Alejandro Pérez",
        sellerMajor: "Ing. en Software",
        sellerPhone: "+52 312 555 1212",
        notes: "Algunos ejercicios marcados a lápiz suave en capítulos 3 y 4.",
        tag: "Recomendado"
    },
    {
        id: 3,
        title: "Fisiología Médica",
        author: "Guyton y Hall",
        subject: "FISIO-201 (Fisiología)",
        edition: "9ª Edición",
        buyPrice: 800,
        rentPrice: 420,
        seller: "Mariana Torres",
        sellerMajor: "Medicina (5° Sem)",
        sellerPhone: "+52 312 444 3322",
        notes: "Encuadernación pasta dura, perfecto estado estético.",
        tag: "Imprescindible"
    },
    {
        id: 4,
        title: "Estructuras de Datos y Algoritmos",
        author: "Mark Allen Weiss",
        subject: "CS-101 (Programación)",
        edition: "4ª Edición",
        buyPrice: 490,
        rentPrice: 220,
        seller: "Carlos Mendoza",
        sellerMajor: "Ing. en Software",
        sellerPhone: "+52 312 123 4567",
        notes: "Edición con ejemplos prácticos en C++ y Java.",
        tag: "Última Copia"
    },
    {
        id: 5,
        title: "Las Bases Farmacológicas de la Terapéutica",
        author: "Goodman & Gilman",
        subject: "FARMA-301 (Farmacología)",
        edition: "9ª Edición",
        buyPrice: 750,
        rentPrice: 350,
        seller: "Lucía Morales",
        sellerMajor: "Medicina (7° Sem)",
        sellerPhone: "+52 312 777 8899",
        notes: "Forrado con plástico protector transparente desde nuevo.",
        tag: "Clásico"
    },
    {
        id: 6,
        title: "Física Universitaria con Física Moderna Vol. 1",
        author: "Sears y Zemansky",
        subject: "FIS-202 (Física)",
        edition: "7ª Edición",
        buyPrice: 520,
        rentPrice: 240,
        seller: "Héctor Gómez",
        sellerMajor: "Ing. Mecatrónica",
        sellerPhone: "+52 312 888 9900",
        notes: "Hojas limpias, sin apuntes de marcador.",
        tag: "Oportunidad"
    }
];

let selectedBookForMeetup = null;
let currentMeetupMode = 'rent'; // 'rent' o 'buy'

// 2. Elementos del DOM
const booksGrid = document.getElementById('books-grid');
const booksCount = document.getElementById('books-count');
const searchInput = document.getElementById('search-input');
const filterSubject = document.getElementById('filter-subject');
const filterEdition = document.getElementById('filter-edition');
const filterPriceRange = document.getElementById('filter-price-range');
const priceDisplay = document.getElementById('price-display');
const btnResetFilters = document.getElementById('btn-reset-filters');

const studentModal = document.getElementById('student-modal');
const btnOpenStudentModal = document.getElementById('btn-open-student-modal');
const btnCloseStudentModal = document.getElementById('btn-close-student-modal');
const studentForm = document.getElementById('student-form');
const navUserName = document.getElementById('nav-user-name');
const navUserMajor = document.getElementById('nav-user-major');
const navUserAvatar = document.getElementById('nav-user-avatar');

const publishModal = document.getElementById('publish-modal');
const btnOpenPublishModal = document.getElementById('btn-open-publish-modal');
const btnClosePublishModal = document.getElementById('btn-close-publish-modal');
const publishForm = document.getElementById('publish-form');

const meetupModal = document.getElementById('meetup-modal');
const btnCloseMeetupModal = document.getElementById('btn-close-meetup-modal');
const modalBookTitle = document.getElementById('modal-book-title');
const modalBookSeller = document.getElementById('modal-book-seller');
const modalPriceTag = document.getElementById('modal-price-tag');
const btnOptRent = document.getElementById('btn-opt-rent');
const btnOptBuy = document.getElementById('btn-opt-buy');
const btnConfirmMeetup = document.getElementById('btn-confirm-meetup');

const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// 3. Sistema de Notificaciones Accesible (Toast)
function showToast(msg) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    toast.classList.remove('translate-x-96', 'opacity-0');
    toast.classList.add('translate-x-0', 'opacity-100');
    
    setTimeout(() => {
        toast.classList.remove('translate-x-0', 'opacity-100');
        toast.classList.add('translate-x-96', 'opacity-0');
    }, 3800);
}

// 4. Renderizado del Catálogo de Libros
function renderBooks() {
    const query = searchInput.value.toLowerCase().trim();
    const subject = filterSubject.value;
    const edition = filterEdition.value;
    const maxPrice = parseInt(filterPriceRange.value, 10);

    const filtered = booksData.filter(book => {
        const matchesQuery = book.title.toLowerCase().includes(query) || 
                             book.author.toLowerCase().includes(query) ||
                             book.subject.toLowerCase().includes(query);
        const matchesSubject = (subject === 'ALL' || book.subject === subject);
        const matchesEdition = (edition === 'ALL' || book.edition === edition);
        const matchesPrice = (book.rentPrice <= maxPrice || book.buyPrice <= maxPrice);

        return matchesQuery && matchesSubject && matchesEdition && matchesPrice;
    });

    booksCount.textContent = filtered.length;
    booksGrid.innerHTML = '';

    if (filtered.length === 0) {
        booksGrid.innerHTML = `
            <div class="col-span-full py-12 text-center bg-white border border-slate-200 rounded-3xl p-8 space-y-3 shadow-sm">
                <i class="fa-solid fa-book-bookmark text-4xl text-slate-400" aria-hidden="true"></i>
                <h3 class="text-base font-bold text-slate-800">No encontramos libros con esos criterios</h3>
                <p class="text-xs text-slate-600 max-w-sm mx-auto">Prueba ajustando el precio máximo o restableciendo los filtros de materia y edición.</p>
                <button onclick="resetAllFilters()" class="bg-blue-50 text-blue-800 font-bold px-4 py-2 rounded-xl text-xs hover:bg-blue-100 transition border border-blue-200">
                    Restablecer búsqueda
                </button>
            </div>
        `;
        return;
    }

    filtered.forEach(book => {
        const card = document.createElement('article');
        card.className = "book-card bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-5 flex flex-col justify-between shadow-sm relative";
        
        card.innerHTML = `
            <div class="space-y-3">
                <div class="flex items-start justify-between gap-2">
                    <span class="inline-block bg-blue-50 text-blue-800 text-[11px] font-bold px-2.5 py-1 rounded-md border border-blue-200">
                        ${book.subject}
                    </span>
                    <span class="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                        ${book.edition}
                    </span>
                </div>

                <div>
                    <h3 class="font-bold text-slate-900 text-base leading-snug line-clamp-2">${book.title}</h3>
                    <p class="text-xs text-slate-600 mt-1"><i class="fa-solid fa-user-pen mr-1 text-slate-400" aria-hidden="true"></i> ${book.author}</p>
                </div>

                <p class="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200 italic">
                    "${book.notes}"
                </p>
            </div>

            <div class="pt-4 border-t border-slate-200 mt-4 space-y-3">
                <div class="grid grid-cols-2 gap-2 text-left bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <div>
                        <span class="text-[10px] uppercase font-bold text-slate-500 block">Renta Semestre</span>
                        <span class="text-sm font-black text-blue-700 font-mono">$${book.rentPrice} MXN</span>
                    </div>
                    <div class="border-l border-slate-200 pl-2">
                        <span class="text-[10px] uppercase font-bold text-slate-500 block">Compra Directa</span>
                        <span class="text-sm font-black text-slate-900 font-mono">$${book.buyPrice} MXN</span>
                    </div>
                </div>

                <div class="flex items-center justify-between text-[11px] text-slate-600">
                    <span><i class="fa-solid fa-circle-user text-blue-700 mr-1" aria-hidden="true"></i> ${book.seller}</span>
                    <span class="text-slate-500">${book.sellerMajor}</span>
                </div>

                <button onclick="openMeetupModal(${book.id})" class="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-sm">
                    <i class="fa-solid fa-handshake" aria-hidden="true"></i> Acordar Cita en Campus
                </button>
            </div>
        `;

        booksGrid.appendChild(card);
    });
}

// 5. Restablecer Filtros
function resetAllFilters() {
    searchInput.value = '';
    filterSubject.value = 'ALL';
    filterEdition.value = 'ALL';
    filterPriceRange.value = 800;
    priceDisplay.textContent = '$800 MXN';
    renderBooks();
    showToast('Filtros restablecidos');
}

// 6. Modal de Cita y Reserva
window.openMeetupModal = function(id) {
    const book = booksData.find(b => b.id === id);
    if (!book) return;

    selectedBookForMeetup = book;
    currentMeetupMode = 'rent';

    modalBookTitle.textContent = book.title;
    modalBookSeller.textContent = `Ofrecido por: ${book.seller} (${book.sellerMajor})`;

    updateMeetupModalPrices();
    meetupModal.classList.remove('hidden');
};

function updateMeetupModalPrices() {
    if (!selectedBookForMeetup) return;

    if (currentMeetupMode === 'rent') {
        modalPriceTag.textContent = `$${selectedBookForMeetup.rentPrice} MXN (Renta semestral)`;
        btnOptRent.className = "p-2.5 rounded-xl border font-bold text-center transition bg-blue-50 border-blue-600 text-blue-900";
        btnOptBuy.className = "p-2.5 rounded-xl border font-bold text-center transition bg-white border-slate-300 text-slate-700 hover:bg-slate-50";
    } else {
        modalPriceTag.textContent = `$${selectedBookForMeetup.buyPrice} MXN (Compra definitiva)`;
        btnOptBuy.className = "p-2.5 rounded-xl border font-bold text-center transition bg-blue-50 border-blue-600 text-blue-900";
        btnOptRent.className = "p-2.5 rounded-xl border font-bold text-center transition bg-white border-slate-300 text-slate-700 hover:bg-slate-50";
    }
}

// 7. Eventos de la Interfaz
document.addEventListener('DOMContentLoaded', () => {
    renderBooks();

    // Filtros dinámicos
    searchInput.addEventListener('input', renderBooks);
    filterSubject.addEventListener('change', renderBooks);
    filterEdition.addEventListener('change', renderBooks);
    
    filterPriceRange.addEventListener('input', (e) => {
        priceDisplay.textContent = `$${e.target.value} MXN`;
        renderBooks();
    });

    btnResetFilters.addEventListener('click', resetAllFilters);

    // Modal de Cita
    btnOptRent.addEventListener('click', () => {
        currentMeetupMode = 'rent';
        updateMeetupModalPrices();
    });

    btnOptBuy.addEventListener('click', () => {
        currentMeetupMode = 'buy';
        updateMeetupModalPrices();
    });

    btnCloseMeetupModal.addEventListener('click', () => {
        meetupModal.classList.add('hidden');
    });

    btnConfirmMeetup.addEventListener('click', () => {
        const place = document.getElementById('meetup-location').value;
        const date = document.getElementById('meetup-date').value;
        const time = document.getElementById('meetup-time').value;

        meetupModal.classList.add('hidden');
        showToast(`¡Cita confirmada! Lugar: ${place} (${date} a las ${time})`);
    });

    // Modal de Perfil
    btnOpenStudentModal.addEventListener('click', () => {
        document.getElementById('student-name').value = currentUser.name;
        document.getElementById('student-major').value = currentUser.major;
        document.getElementById('student-phone').value = currentUser.phone;
        studentModal.classList.remove('hidden');
    });

    btnCloseStudentModal.addEventListener('click', () => {
        studentModal.classList.add('hidden');
    });

    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        currentUser.name = document.getElementById('student-name').value;
        currentUser.major = document.getElementById('student-major').value;
        currentUser.phone = document.getElementById('student-phone').value;

        navUserName.textContent = currentUser.name;
        navUserMajor.textContent = currentUser.major;
        navUserAvatar.textContent = currentUser.name.charAt(0).toUpperCase();

        studentModal.classList.add('hidden');
        showToast('Perfil actualizado correctamente');
    });

    // Modal de Publicar Libro
    btnOpenPublishModal.addEventListener('click', () => {
        publishModal.classList.remove('hidden');
    });

    btnClosePublishModal.addEventListener('click', () => {
        publishModal.classList.add('hidden');
    });

    publishForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newBook = {
            id: Date.now(),
            title: document.getElementById('pub-title').value,
            author: document.getElementById('pub-author').value,
            subject: document.getElementById('pub-subject').value,
            edition: document.getElementById('pub-edition').value,
            buyPrice: parseInt(document.getElementById('pub-buy-price').value, 10),
            rentPrice: parseInt(document.getElementById('pub-rent-price').value, 10),
            seller: currentUser.name,
            sellerMajor: currentUser.major,
            sellerPhone: currentUser.phone,
            notes: document.getElementById('pub-notes').value || "En buen estado.",
            tag: "Nuevo"
        };

        booksData.unshift(newBook);
        publishForm.reset();
        publishModal.classList.add('hidden');
        renderBooks();
        showToast('¡Libro publicado exitosamente en el catálogo!');
    });
});