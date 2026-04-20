document.addEventListener("DOMContentLoaded", () => {
  const resultsContainer = document.getElementById("hotelsResults");
  const filterBtn = document.getElementById("filterHotelsBtn");

  function getPriceRange(hotel) {
    if (hotel.pricePerNight < 2200) return "budget";
    if (hotel.pricePerNight <= 3500) return "mid";
    return "premium";
  }

  function renderHotels(data) {
    resultsContainer.innerHTML = "";

    if (!data.length) {
      resultsContainer.innerHTML = `<div class="info-box"><h3>No hotels found</h3><p>Try changing your filters.</p></div>`;
      return;
    }

    data.forEach(hotel => {
      const availabilityClass = hotel.roomsLeft <= 3 ? "limited" : "";
      const card = document.createElement("article");
      card.className = "result-card hotel-card";

      card.innerHTML = `
        <div class="result-left">
          <h3>${hotel.name}</h3>
          <p class="result-sub">${hotel.city} · ${hotel.location}</p>
          <div class="meta-pills hotel-meta">
            <span class="meta-pill">${hotel.rating} ★</span>
            <span class="meta-pill">${hotel.reviews} reviews</span>
            <span class="meta-pill">Check-in ${hotel.checkIn}</span>
            <span class="meta-pill">Check-out ${hotel.checkOut}</span>
          </div>
          <div class="meta-pills hotel-meta">
            ${hotel.amenities.map(item => `<span class="meta-pill">${item}</span>`).join("")}
          </div>
        </div>

        <div class="hotel-right">
          <div class="price-tag">₹${hotel.pricePerNight.toLocaleString()}</div>
          <p class="result-sub">per night</p>
          <span class="availability-tag ${availabilityClass}">
            ${hotel.roomsLeft} rooms left
          </span>
          <button class="btn btn-primary book-now-btn" data-id="${hotel.id}">Book Stay</button>
        </div>
      `;

      resultsContainer.appendChild(card);
    });

    attachHotelBookingEvents(data);
  }

  function attachHotelBookingEvents(data) {
    const buttons = document.querySelectorAll(".book-now-btn");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const hotel = data.find(item => item.id === button.dataset.id);
        if (!hotel) return;

        handleHotelBooking({
          item: hotel,
          itemName: hotel.name,
          routeInfo: `${hotel.city} · ${hotel.location}`,
          totalAmount: hotel.pricePerNight,
          travelDate: document.getElementById("checkInDate").value || "Flexible"
        });
      });
    });
  }

  function filterHotels() {
    const city = document.getElementById("hotelCity").value.trim().toLowerCase();
    const selectedRange = document.getElementById("hotelPriceRange").value;

    const filtered = hotelsData.filter(hotel => {
      const cityMatch = !city || hotel.city.toLowerCase().includes(city);
      const rangeMatch = selectedRange === "all" || getPriceRange(hotel) === selectedRange;
      return cityMatch && rangeMatch;
    });

    renderHotels(filtered);
  }

  filterBtn.addEventListener("click", filterHotels);
  renderHotels(hotelsData);
});