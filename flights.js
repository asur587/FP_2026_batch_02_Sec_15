document.addEventListener("DOMContentLoaded", () => {
  const resultsContainer = document.getElementById("flightsResults");
  const filterBtn = document.getElementById("filterFlightsBtn");

  function renderFlights(data) {
    resultsContainer.innerHTML = "";

    if (!data.length) {
      resultsContainer.innerHTML = `<div class="info-box"><h3>No flights found</h3><p>Try changing your filters.</p></div>`;
      return;
    }

    data.forEach(flight => {
      const availabilityClass = flight.seatsLeft <= 5 ? "limited" : "";
      const card = document.createElement("article");
      card.className = "result-card";

      card.innerHTML = `
        <div class="result-left">
          <h3>${flight.airline} <span class="result-sub">${flight.code}</span></h3>
          <p class="result-sub">${flight.from} → ${flight.to}</p>
          <div class="meta-pills">
            <span class="meta-pill">${flight.classType}</span>
            <span class="meta-pill">${flight.baggage}</span>
            <span class="meta-pill">${flight.refund}</span>
          </div>
        </div>

        <div class="route-center">
          <div class="route-time">
            <div>
              <strong>${flight.departure}</strong>
              <p class="result-sub">${flight.from}</p>
            </div>
            <div>
              <p class="result-sub">${flight.duration}</p>
              <div class="route-line"></div>
            </div>
            <div>
              <strong>${flight.arrival}</strong>
              <p class="result-sub">${flight.to}</p>
            </div>
          </div>
        </div>

        <div class="result-right">
          <div class="price-tag">₹${flight.price.toLocaleString()}</div>
          <span class="availability-tag ${availabilityClass}">
            ${flight.seatsLeft} seats left
          </span>
          <button class="btn btn-primary book-now-btn" data-id="${flight.id}">Select Seats</button>
        </div>
      `;

      resultsContainer.appendChild(card);
    });

    attachFlightBookingEvents(data);
  }

  function attachFlightBookingEvents(data) {
    const buttons = document.querySelectorAll(".book-now-btn");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const flight = data.find(item => item.id === button.dataset.id);
        if (!flight) return;

        openSeatModal({
          bookingType: "Flight",
          item: flight,
          itemName: `${flight.airline} ${flight.code}`,
          routeInfo: `${flight.from} → ${flight.to}`,
          basePrice: flight.price,
          travelDate: document.getElementById("flightDate").value || "Flexible",
          maxSelectable: 4
        });
      });
    });
  }

  function filterFlights() {
    const from = document.getElementById("flightFrom").value.trim().toLowerCase();
    const to = document.getElementById("flightTo").value.trim().toLowerCase();
    const selectedClass = document.getElementById("flightClass").value;

    const filtered = flightsData.filter(flight => {
      const fromMatch = !from || flight.from.toLowerCase().includes(from);
      const toMatch = !to || flight.to.toLowerCase().includes(to);
      const classMatch = selectedClass === "all" || flight.classType === selectedClass;
      return fromMatch && toMatch && classMatch;
    });

    renderFlights(filtered);
  }

  filterBtn.addEventListener("click", filterFlights);
  renderFlights(flightsData);
});