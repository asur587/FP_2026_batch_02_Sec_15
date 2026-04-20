document.addEventListener("DOMContentLoaded", () => {
  const resultsContainer = document.getElementById("trainsResults");
  const filterBtn = document.getElementById("filterTrainsBtn");

  function getTrainAvailabilityClass(status) {
    if (status.includes("WL")) return "warning";
    if (status.includes("RAC")) return "limited";
    return "";
  }

  function renderTrains(data) {
    resultsContainer.innerHTML = "";

    if (!data.length) {
      resultsContainer.innerHTML = `<div class="info-box"><h3>No trains found</h3><p>Try changing your filters.</p></div>`;
      return;
    }

    data.forEach(train => {
      const availabilityClass = getTrainAvailabilityClass(train.availability);
      const card = document.createElement("article");
      card.className = "result-card";

      card.innerHTML = `
        <div class="result-left">
          <h3>${train.trainName} <span class="result-sub">(${train.trainNo})</span></h3>
          <p class="result-sub">${train.from} → ${train.to}</p>
          <div class="meta-pills">
            ${train.classes.map(item => `<span class="meta-pill">${item}</span>`).join("")}
            <span class="meta-pill">${train.days}</span>
          </div>
        </div>

        <div class="route-center">
          <div class="route-time">
            <div>
              <strong>${train.departure}</strong>
              <p class="result-sub">${train.from}</p>
            </div>
            <div>
              <p class="result-sub">${train.duration}</p>
              <div class="route-line"></div>
            </div>
            <div>
              <strong>${train.arrival}</strong>
              <p class="result-sub">${train.to}</p>
            </div>
          </div>
        </div>

        <div class="result-right">
          <div class="price-tag">₹${train.price.toLocaleString()}</div>
          <span class="availability-tag ${availabilityClass}">
            ${train.availability}
          </span>
          <button class="btn btn-primary book-now-btn" data-id="${train.id}">Select Berths</button>
        </div>
      `;

      resultsContainer.appendChild(card);
    });

    attachTrainBookingEvents(data);
  }

  function attachTrainBookingEvents(data) {
    const buttons = document.querySelectorAll(".book-now-btn");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const train = data.find(item => item.id === button.dataset.id);
        if (!train) return;

        openSeatModal({
          bookingType: "Train",
          item: train,
          itemName: `${train.trainName} (${train.trainNo})`,
          routeInfo: `${train.from} → ${train.to}`,
          basePrice: train.price,
          travelDate: document.getElementById("trainDate").value || "Flexible",
          maxSelectable: 6
        });
      });
    });
  }

  function filterTrains() {
    const from = document.getElementById("trainFrom").value.trim().toLowerCase();
    const to = document.getElementById("trainTo").value.trim().toLowerCase();
    const selectedClass = document.getElementById("trainClass").value;

    const filtered = trainsData.filter(train => {
      const fromMatch = !from || train.from.toLowerCase().includes(from);
      const toMatch = !to || train.to.toLowerCase().includes(to);
      const classMatch = selectedClass === "all" || train.classes.includes(selectedClass);
      return fromMatch && toMatch && classMatch;
    });

    renderTrains(filtered);
  }

  filterBtn.addEventListener("click", filterTrains);
  renderTrains(trainsData);
});