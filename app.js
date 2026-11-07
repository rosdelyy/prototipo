tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        emerald: {
                            400: '#34d399',
                            500: '#10b981',
                            600: '#059669',
                        }
                    }
                }
            }
        }

let currentStudent = {
            name: 'Carlos Mendoza',
            major: 'Medicina (4° Semestre)',
            phone: '+52 55 9876 5432'
        };

        let BOOKS = [
            {
                id: 'b-1',
                title: 'Anatomía con Orientación Clínica',
                author: 'Keith L. Moore',
                subject: 'ANAT-101 (Anatomía Humana)',
                edition: '8ª Edición',
                buyPrice: 780,
                rentPrice: 380,
                condition: 'Excelente',
                notes: 'Libro de lab de anatomía. Esquemas limpios sin rayaduras.',
                coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
                seller: { name: 'Dra. Andrea Ruiz', major: 'Medicina (Internado)', phone: '+52 55 1122 3344' }
            },
            {
                id: 'b-2',
                title: 'Tratado de Fisiología Médica',
                author: 'Guyton y Hall',
                subject: 'FISIO-201 (Fisiología)',
                edition: '9ª Edición',
                buyPrice: 750,
                rentPrice: 360,
                condition: 'Como Nuevo',
                notes: 'Empastado en perfecto estado. Sin marca-textos.',
                coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600',
                seller: { name: 'Mateo Morales', major: 'Medicina (6° Semestre)', phone: '+52 55 9988 7766' }
            },
            {
                id: 'b-3',
                title: 'Farmacología Ilustrada',
                author: 'Karen Whalen (Lippincott)',
                subject: 'FARMA-301 (Farmacología)',
                edition: '7ª Edición',
                buyPrice: 580,
                rentPrice: 270,
                condition: 'Bueno',
                notes: 'Diagramas de mecanismos de acción con notas a lápiz.',
                coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600',
                seller: { name: 'Valeria Gómez', major: 'QFB (5° Semestre)', phone: '+52 55 4455 6677' }
            },
            {
                id: 'b-4',
                title: 'Cálculo de Una Variable',
                author: 'James Stewart',
                subject: 'MAT-101 (Cálculo)',
                edition: '8ª Edición',
                buyPrice: 450,
                rentPrice: 220,
                condition: 'Excelente',
                notes: 'Usado en primer semestre. Ejercicios resueltos anexados.',
                coverImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=600',
                seller: { name: 'Sofía Martínez', major: 'Ingeniería Civil', phone: '+52 55 1234 5678' }
            },
            {
                id: 'b-5',
                title: 'Fundamentos de Programación en Java',
                author: 'Robert Lafore',
                subject: 'CS-101 (Programación)',
                edition: '5ª Edición',
                buyPrice: 380,
                rentPrice: 190,
                condition: 'Bueno',
                notes: 'Ideal para programación orientada a objetos.',
                coverImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=600',
                seller: { name: 'Carlos Mendoza', major: 'Computación', phone: '+52 55 9876 5432' }
            },
            {
                id: 'b-6',
                title: 'Física Universitaria Vol 1',
                author: 'Sears y Zemansky',
                subject: 'FIS-202 (Física)',
                edition: '9ª Edición',
                buyPrice: 720,
                rentPrice: 340,
                condition: 'Como Nuevo',
                notes: 'Pasta dura intacta, incluye guía de laboratorio.',
                coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600',
                seller: { name: 'Elena Rostova', major: 'Física', phone: '+52 55 3344 5566' }
            }
        ];

        let selectedBookForMeetup = null;
        let selectedOptionType = 'rent';

        function renderBooks(booksToDisplay) {
            const grid = document.getElementById('books-grid');
            const countEl = document.getElementById('books-count');

            if (!grid) return;
            grid.innerHTML = '';
            countEl.textContent = booksToDisplay.length;

            if (booksToDisplay.length === 0) {
                grid.innerHTML = `
                    <div class="col-span-full bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center space-y-3">
                        <i class="fa-solid fa-book-open-reader text-slate-600 text-3xl"></i>
                        <p class="text-xs text-slate-400">No se encontraron libros que coincidan con los filtros seleccionados.</p>
                        <button id="btn-empty-reset" class="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-xl font-bold text-xs">
                            Limpiar Filtros
                        </button>
                    </div>
                `;
                document.getElementById('btn-empty-reset')?.addEventListener('click', resetFilters);
                return;
            }

            booksToDisplay.forEach(book => {
                const card = document.createElement('div');
                card.className = 'book-card bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl overflow-hidden flex flex-col justify-between shadow-lg group';

                card.innerHTML = `
                    <div>
                        <div class="relative h-48 bg-slate-950 overflow-hidden">
                            <img src="${book.coverImage}" alt="${book.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                            <span class="absolute top-2 left-2 bg-slate-950/90 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-emerald-500/30 backdrop-blur-md">
                                ${book.subject}
                            </span>
                            <span class="absolute bottom-2 right-2 bg-slate-950/90 text-slate-300 text-[10px] px-2 py-0.5 rounded border border-slate-800">
                                ${book.condition}
                            </span>
                        </div>

                        <div class="p-4 space-y-2">
                            <span class="text-[11px] font-semibold text-emerald-400 block">${book.edition}</span>
                            <h3 class="font-bold text-white text-base line-clamp-1 group-hover:text-emerald-300 transition">${book.title}</h3>
                            <p class="text-xs text-slate-400 font-medium">${book.author}</p>

                            <div class="flex items-center gap-2 pt-2 border-t border-slate-800/80 mt-2">
                                <div class="w-6 h-6 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center font-bold text-[10px] border border-slate-700 shrink-0">
                                    <i class="fa-solid fa-user-graduate"></i>
                                </div>
                                <div class="overflow-hidden">
                                    <span class="text-[11px] font-bold text-slate-200 block truncate">${book.seller.name}</span>
                                    <span class="text-[9px] text-slate-400 block truncate">${book.seller.major} • ${book.seller.phone}</span>
                                </div>
                            </div>

                            <p class="text-[11px] text-slate-400 italic bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 mt-2">
                                "${book.notes}"
                            </p>
                        </div>
                    </div>

                    <div class="p-4 pt-0 space-y-3">
                        <div class="grid grid-cols-2 gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
                            <div>
                                <span class="text-[10px] text-slate-400 block">Comprar</span>
                                <span class="text-xs font-bold text-white font-mono">$${book.buyPrice} MXN</span>
                            </div>
                            <div class="border-l border-slate-800">
                                <span class="text-[10px] text-emerald-400 block">Alquilar / Sem.</span>
                                <span class="text-xs font-bold text-emerald-400 font-mono">$${book.rentPrice} MXN</span>
                            </div>
                        </div>

                        <button data-book-id="${book.id}" class="btn-open-meetup w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/10">
                            Acordar Cita / Comprar <i class="fa-solid fa-chevron-right text-[10px]"></i>
                        </button>
                    </div>
                `;

                grid.appendChild(card);
            });

            document.querySelectorAll('.btn-open-meetup').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const bookId = e.currentTarget.getAttribute('data-book-id');
                    openMeetupModal(bookId);
                });
            });
        }

        function applyFilters() {
            const searchVal = (document.getElementById('search-input')?.value || '').toLowerCase().trim();
            const subjectVal = document.getElementById('filter-subject')?.value || 'ALL';
            const editionVal = document.getElementById('filter-edition')?.value || 'ALL';
            const maxPriceVal = parseInt(document.getElementById('filter-price-range')?.value || '800', 10);

            const filtered = BOOKS.filter(book => {
                const matchSearch = searchVal === '' ||
                    book.title.toLowerCase().includes(searchVal) ||
                    book.author.toLowerCase().includes(searchVal);

                const matchSubject = subjectVal === 'ALL' || book.subject === subjectVal;
                const matchEdition = editionVal === 'ALL' || book.edition === editionVal;
                const matchPrice = book.rentPrice <= maxPriceVal || book.buyPrice <= maxPriceVal;

                return matchSearch && matchSubject && matchEdition && matchPrice;
            });

            renderBooks(filtered);
        }

        function updatePriceDisplayAndFilter() {
            const val = document.getElementById('filter-price-range').value;
            document.getElementById('price-display').textContent = `$${val} MXN`;
            applyFilters();
        }

        function resetFilters() {
            if (document.getElementById('search-input')) document.getElementById('search-input').value = '';
            if (document.getElementById('filter-subject')) document.getElementById('filter-subject').value = 'ALL';
            if (document.getElementById('filter-edition')) document.getElementById('filter-edition').value = 'ALL';
            if (document.getElementById('filter-price-range')) {
                document.getElementById('filter-price-range').value = 800;
                document.getElementById('price-display').textContent = '$800 MXN';
            }
            applyFilters();
            showToast('Filtros restablecidos');
        }

        function openMeetupModal(bookId) {
            selectedBookForMeetup = BOOKS.find(b => b.id === bookId);
            if (!selectedBookForMeetup) return;

            document.getElementById('modal-book-title').textContent = selectedBookForMeetup.title;
            document.getElementById('modal-book-seller').textContent = `Vendedor: ${selectedBookForMeetup.seller.name} (${selectedBookForMeetup.seller.major})`;

            selectOption('rent');
            document.getElementById('meetup-modal').classList.remove('hidden');
        }

        function closeMeetupModal() {
            document.getElementById('meetup-modal').classList.add('hidden');
        }

        function selectOption(type) {
            selectedOptionType = type;
            const btnRent = document.getElementById('btn-opt-rent');
            const btnBuy = document.getElementById('btn-opt-buy');
            const priceTag = document.getElementById('modal-price-tag');

            if (type === 'rent') {
                btnRent.className = 'p-2.5 rounded-xl border font-bold text-center transition bg-emerald-500/20 border-emerald-500 text-emerald-400';
                btnBuy.className = 'p-2.5 rounded-xl border font-bold text-center transition bg-slate-950 border-slate-800 text-slate-400';
                if (priceTag && selectedBookForMeetup) priceTag.textContent = `$${selectedBookForMeetup.rentPrice} MXN`;
            } else {
                btnBuy.className = 'p-2.5 rounded-xl border font-bold text-center transition bg-emerald-500/20 border-emerald-500 text-emerald-400';
                btnRent.className = 'p-2.5 rounded-xl border font-bold text-center transition bg-slate-950 border-slate-800 text-slate-400';
                if (priceTag && selectedBookForMeetup) priceTag.textContent = `$${selectedBookForMeetup.buyPrice} MXN`;
            }
        }

        function confirmMeetup() {
            const loc = document.getElementById('meetup-location').value;
            const date = document.getElementById('meetup-date').value;
            const time = document.getElementById('meetup-time').value;

            closeMeetupModal();
            showToast(`¡Cita agendada! Te verás con ${selectedBookForMeetup.seller.name} en: ${loc} el ${date} a las ${time} hs.`);
        }

        function updateNavUserUI() {
            const navName = document.getElementById('nav-user-name');
            const navMajor = document.getElementById('nav-user-major');
            const navAvatar = document.getElementById('nav-user-avatar');

            if (navName) navName.textContent = currentStudent.name;
            if (navMajor) navMajor.textContent = currentStudent.major;
            if (navAvatar && currentStudent.name) {
                navAvatar.textContent = currentStudent.name.charAt(0).toUpperCase();
            }
        }

        function saveStudentProfile(e) {
            e.preventDefault();
            currentStudent.name = document.getElementById('student-name').value;
            currentStudent.major = document.getElementById('student-major').value;
            currentStudent.phone = document.getElementById('student-phone').value;

            updateNavUserUI();
            document.getElementById('student-modal').classList.add('hidden');
            showToast(`Perfil actualizado: ${currentStudent.name}`);
        }

        function handlePublishBook(e) {
            e.preventDefault();
            const title = document.getElementById('pub-title').value;
            const author = document.getElementById('pub-author').value;
            const subject = document.getElementById('pub-subject').value;
            const edition = document.getElementById('pub-edition').value;
            const buyPrice = parseInt(document.getElementById('pub-buy-price').value, 10);
            const rentPrice = parseInt(document.getElementById('pub-rent-price').value, 10);
            const notes = document.getElementById('pub-notes').value || 'Libro universitario en buen estado.';

            const newBook = {
                id: `b-${Date.now()}`,
                title,
                author,
                subject,
                edition,
                buyPrice,
                rentPrice,
                condition: 'Excelente',
                notes,
                coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
                seller: {
                    name: currentStudent.name,
                    major: currentStudent.major,
                    phone: currentStudent.phone
                }
            };

            BOOKS.unshift(newBook);
            document.getElementById('publish-modal').classList.add('hidden');
            applyFilters();
            showToast(`¡Libro publicado por ${currentStudent.name}!`);
        }

        function showToast(msg) {
            const toast = document.getElementById('toast');
            const toastMsg = document.getElementById('toast-message');
            if (toast && toastMsg) {
                toastMsg.textContent = msg;
                toast.classList.remove('translate-x-96', 'opacity-0');
                setTimeout(() => {
                    toast.classList.add('translate-x-96', 'opacity-0');
                }, 3500);
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            updateNavUserUI();
            renderBooks(BOOKS);

            document.getElementById('search-input')?.addEventListener('input', applyFilters);
            document.getElementById('filter-subject')?.addEventListener('change', applyFilters);
            document.getElementById('filter-edition')?.addEventListener('change', applyFilters);
            document.getElementById('filter-price-range')?.addEventListener('input', updatePriceDisplayAndFilter);
            document.getElementById('btn-reset-filters')?.addEventListener('click', resetFilters);

            document.getElementById('btn-open-student-modal')?.addEventListener('click', () => {
                document.getElementById('student-name').value = currentStudent.name;
                document.getElementById('student-major').value = currentStudent.major;
                document.getElementById('student-phone').value = currentStudent.phone;
                document.getElementById('student-modal').classList.remove('hidden');
            });
            document.getElementById('btn-close-student-modal')?.addEventListener('click', () => {
                document.getElementById('student-modal').classList.add('hidden');
            });

            document.getElementById('btn-open-publish-modal')?.addEventListener('click', () => {
                document.getElementById('publish-modal').classList.remove('hidden');
            });
            document.getElementById('btn-close-publish-modal')?.addEventListener('click', () => {
                document.getElementById('publish-modal').classList.add('hidden');
            });

            document.getElementById('btn-close-meetup-modal')?.addEventListener('click', closeMeetupModal);
            document.getElementById('btn-opt-rent')?.addEventListener('click', () => selectOption('rent'));
            document.getElementById('btn-opt-buy')?.addEventListener('click', () => selectOption('buy'));
            document.getElementById('btn-confirm-meetup')?.addEventListener('click', confirmMeetup);

            document.getElementById('student-form')?.addEventListener('submit', saveStudentProfile);
            document.getElementById('publish-form')?.addEventListener('submit', handlePublishBook);
        });
