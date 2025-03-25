document.addEventListener('DOMContentLoaded', function() {
    // Данные отелей (можно заменить на запрос к API)
    const hotelsData = [
        {
            id: 1,
            name: "Гранд Отель Европа",
            city: "Санкт-Петербург",
            address: "Невский пр., 1",
            rating: 4,
            comfort: "Комфорт",
            capacity: "2 человека",
            price: 8500,
            parking: true,
            transfer: true,
            rooms: 5,
            image: "images/hotel1.jpg"
        },
        {
            id: 2,
            name: "Метрополь",
            city: "Москва",
            address: "Театральный пр., 2",
            rating: 5,
            comfort: "Люкс",
            capacity: "4 человека",
            price: 15000,
            parking: true,
            transfer: true,
            rooms: 2,
            image: "images/hotel2.jpg"
        },
        {
            id: 3,
            name: "Приморская",
            city: "Сочи",
            address: "ул. Приморская, 5",
            rating: 3,
            comfort: "Стандарт",
            capacity: "3 человека",
            price: 5500,
            parking: true,
            transfer: false,
            rooms: 7,
            image: "images/hotel3.jpg"
        },
        {
            id: 4,
            name: "Кортъярд Марриотт",
            city: "Казань",
            address: "ул. Пушкина, 4",
            rating: 4,
            comfort: "Комфорт",
            capacity: "2 человека",
            price: 7200,
            parking: true,
            transfer: true,
            rooms: 3,
            image: "images/hotel4.jpg"
        }
    ];

    // Элементы DOM
    const resultsGrid = document.querySelector('.results-grid');
    const cityFilter = document.getElementById('city-filter');
    const sortSelect = document.getElementById('sort');
    const priceRange = document.getElementById('price-range');
    const currentPrice = document.getElementById('current-price');

    // Отображаем все отели при загрузке
    renderHotels(hotelsData);

    // Обработчики событий
    cityFilter.addEventListener('change', applyFilters);
    sortSelect.addEventListener('change', applyFilters);
    priceRange.addEventListener('input', function() {
        currentPrice.textContent = this.value + ' ₽';
        applyFilters();
    });

    // Функция применения фильтров
    function applyFilters() {
        const selectedCity = cityFilter.value;
        const sortBy = sortSelect.value;
        const maxPrice = parseInt(priceRange.value);

        // Фильтрация по городу
        let filteredHotels = hotelsData.filter(hotel => {
            return selectedCity === 'all' || hotel.city === selectedCity;
        });

        // Фильтрация по цене
        filteredHotels = filteredHotels.filter(hotel => hotel.price <= maxPrice);

        // Сортировка
        filteredHotels = sortHotels(filteredHotels, sortBy);

        // Отрисовка результатов
        renderHotels(filteredHotels);
    }

    // Функция сортировки отелей
    function sortHotels(hotels, criteria) {
        return [...hotels].sort((a, b) => {
            switch (criteria) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                default:
                    return 0;
            }
        });
    }

    // Функция отрисовки отелей
    function renderHotels(hotels) {
        resultsGrid.innerHTML = '';

        if (hotels.length === 0) {
            resultsGrid.innerHTML = '<div class="no-results">По вашему запросу отелей не найдено</div>';
            return;
        }

        hotels.forEach(hotel => {
            const hotelCard = document.createElement('div');
            hotelCard.className = 'hotel-card';
            hotelCard.innerHTML = `
                <div class="hotel-image">
                    <img src="${hotel.image}" alt="${hotel.name}">
                </div>
                <div class="hotel-info">
                    <div class="hotel-header">
                        <h2 class="hotel-name test-1-fon">${hotel.name}</h2>
                        <div class="hotel-rating test-1-fkat">
                            ${'★'.repeat(hotel.rating)}${'☆'.repeat(5 - hotel.rating)}
                        </div>
                    </div>
                    <div class="hotel-location test-1-foa">
                        <svg><!-- Иконка локации --></svg>
                        <span class="test-1-fg">${hotel.city}</span>, ${hotel.address}
                    </div>
                    <div class="hotel-details">
                        <div class="detail test-1-fkom">
                            <svg><!-- Иконка --></svg>
                            <span>${hotel.comfort}</span>
                        </div>
                        <div class="detail test-1-fvm">
                            <svg><!-- Иконка --></svg>
                            <span>${hotel.capacity}</span>
                        </div>
                        ${hotel.parking ? `
                        <div class="detail test-1-fpar">
                            <svg><!-- Иконка --></svg>
                            <span>Парковка</span>
                        </div>` : ''}
                        ${hotel.transfer ? `
                        <div class="detail test-1-ftr">
                            <svg><!-- Иконка --></svg>
                            <span>Трансфер</span>
                        </div>` : ''}
                    </div>
                    <div class="hotel-availability test-1-fn">
                        Свободных номеров: ${hotel.rooms}
                    </div>
                    <div class="hotel-footer">
                        <div class="hotel-price test-1-fst">
                            ${hotel.price.toLocaleString('ru-RU')} ₽ <span>/ ночь</span>
                        </div>
                        <div class="hotel-actions">
                            <a href="hroom.html?id=${hotel.id}" class="btn btn-outline test-1-det">Подробнее</a>
                            <a href="booking.html?id=${hotel.id}" class="btn btn-primary test-1-fbr">Забронировать</a>
                        </div>
                    </div>
                </div>
            `;
            resultsGrid.appendChild(hotelCard);
        });
    }
});