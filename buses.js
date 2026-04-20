document.addEventListener("DOMContentLoaded", () => {
  const resultsContainer = document.getElementById("busesResults");
  const filterBtn = document.getElementById("filterBusesBtn");

  function renderBuses(data) {
    resultsContainer.innerHTML = "";

    if (!data.length) {
      resultsContainer.innerHTML = `<div class="info-box"><h3>No buses found</h3><p>Try changing your filters.</p></div>`;
      return;
    }

    data.forEach(bus => {
      const availabilityClass = bus.seatsLeft <= 5 ? "limited" : "";
      const card = document.createElement("article");
      card.className = "result-card";

      card.innerHTML = `
        <div class="result-left">
          <h3>${bus.operator}</h3>
          <p class="result-sub">${bus.from} → ${bus.to}</p>
          <div class="meta-pills">
            <span class="meta-pill">${bus.type}</span>
            <span class="meta-pill">Boarding: ${bus.boarding}</span>
            <span class="meta-pill">Dropping: ${bus.dropping}</span>
          </div>
        </div>

        <div class="route-center">
          <div class="route-time">
            <div>
              <strong>${bus.departure}</strong>
              <p class="result-sub">${bus.from}</p>
            </div>
            <div>
              <p class="result-sub">${bus.duration}</p>
              <div class="route-line"></div>
            </div>
            <div>
              <strong>${bus.arrival}</strong>
              <p class="result-sub">${bus.to}</p>
            </div>
          </div>
        </div>

        <div class="result-right">
          <div class="price-tag">₹${bus.price.toLocaleString()}</div>
          <span class="availability-tag ${availabilityClass}">
            ${bus.seatsLeft} seats left
          </span>
          <button class="btn btn-primary book-now-btn" data-id="${bus.id}">Select Seats</button>
        </div>
      `;

      resultsContainer.appendChild(card);
    });

    attachBusBookingEvents(data);
  }

  function attachBusBookingEvents(data) {
    const buttons = document.querySelectorAll(".book-now-btn");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const bus = data.find(item => item.id === button.dataset.id);
        if (!bus) return;

        openSeatModal({
          bookingType: "Bus",
          item: bus,
          itemName: `${bus.operator} - ${bus.type}`,
          routeInfo: `${bus.from} → ${bus.to}`,
          basePrice: bus.price,
          travelDate: document.getElementById("busDate").value || "Flexible",
          maxSelectable: 6
        });
      });
    });
  }

  function filterBuses() {
    const from = document.getElementById("busFrom").value.trim().toLowerCase();
    const to = document.getElementById("busTo").value.trim().toLowerCase();
    const selectedType = document.getElementById("busType").value;

    const filtered = busesData.filter(bus => {
      const fromMatch = !from || bus.from.toLowerCase().includes(from);
      const toMatch = !to || bus.to.toLowerCase().includes(to);
      const typeMatch = selectedType === "all" || bus.type === selectedType;
      return fromMatch && toMatch && typeMatch;
    });

    renderBuses(filtered);
  }

  filterBtn.addEventListener("click", filterBuses);
  renderBuses(busesData);
});