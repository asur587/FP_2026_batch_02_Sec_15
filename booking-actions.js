let activeBookingPayload = null;

function setupSeatModalEvents() {
  const modal = document.getElementById("seatModal");
  const closeBtn = document.getElementById("seatCloseBtn");
  const continueBtn = document.getElementById("continueSeatBtn");

  if (closeBtn && !closeBtn.dataset.bound) {
    closeBtn.addEventListener("click", closeSeatModal);
    closeBtn.dataset.bound = "true";
  }

  if (continueBtn && !continueBtn.dataset.bound) {
    continueBtn.addEventListener("click", continueSeatBooking);
    continueBtn.dataset.bound = "true";
  }

  if (modal && !modal.dataset.bound) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeSeatModal();
      }
    });
    modal.dataset.bound = "true";
  }

  if (!document.body.dataset.seatEscapeBound) {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeSeatModal();
      }
    });
    document.body.dataset.seatEscapeBound = "true";
  }
}

function openSeatModal({
  bookingType,
  item,
  itemName,
  routeInfo,
  basePrice,
  travelDate = "",
  maxSelectable = 4
}) {
  setupSeatModalEvents();

  activeBookingPayload = {
    bookingType,
    item,
    itemName,
    routeInfo,
    basePrice,
    travelDate,
    maxSelectable
  };

  const modal = document.getElementById("seatModal");
  const seatGrid = document.getElementById("seatGrid");
  const seatTitle = document.getElementById("seatModalTitle");
  const seatSubtitle = document.getElementById("seatModalSubtitle");
  const selectedSeatText = document.getElementById("selectedSeatText");
  const totalFareText = document.getElementById("totalFareText");
  const continueBtn = document.getElementById("continueSeatBtn");

  if (!modal || !seatGrid || !continueBtn) {
    console.error("Seat modal elements not found");
    return;
  }

  seatTitle.textContent = `${bookingType} Seat Selection`;
  seatSubtitle.textContent = `${itemName} • ${routeInfo}`;
  selectedSeatText.textContent = "No seats selected";
  totalFareText.textContent = "₹0";
  continueBtn.disabled = true;

  seatGrid.innerHTML = "";

  const unavailableSeats = ["A3", "B2", "C4", "D1"];
  const rows = ["A", "B", "C", "D", "E", "F"];
  const cols = [1, 2, 3, 4];

  rows.forEach((row) => {
    cols.forEach((col) => {
      const seatNo = `${row}${col}`;
      const seat = document.createElement("button");
      seat.type = "button";
      seat.className = "seat";
      seat.textContent = seatNo;
      seat.dataset.seat = seatNo;

      if (unavailableSeats.includes(seatNo)) {
        seat.classList.add("unavailable");
        seat.disabled = true;
      } else {
        seat.addEventListener("click", () => {
          const alreadySelected = [...seatGrid.querySelectorAll(".seat.selected")];

          if (!seat.classList.contains("selected") && alreadySelected.length >= maxSelectable) {
            alert(`You can select up to ${maxSelectable} seats only.`);
            return;
          }

          seat.classList.toggle("selected");
          updateSeatSummary();
        });
      }

      seatGrid.appendChild(seat);
    });
  });

  function updateSeatSummary() {
    const selected = [...seatGrid.querySelectorAll(".seat.selected")].map(
      (s) => s.dataset.seat
    );

    selectedSeatText.textContent = selected.length
      ? selected.join(", ")
      : "No seats selected";

    const totalAmount = activeBookingPayload.basePrice * selected.length;
    totalFareText.textContent = selected.length
      ? `₹${Number(totalAmount).toLocaleString()}`
      : "₹0";

    continueBtn.disabled = selected.length === 0;
  }

  modal.classList.add("show");
  document.body.classList.add("modal-open");
}

function closeSeatModal() {
  const modal = document.getElementById("seatModal");
  if (modal) {
    modal.classList.remove("show");
  }
  document.body.classList.remove("modal-open");
}

function continueSeatBooking() {
  console.log("continueSeatBooking fired");

  const seatGrid = document.getElementById("seatGrid");

  if (!seatGrid) {
    console.error("seatGrid not found");
    return;
  }

  if (!activeBookingPayload) {
    console.error("activeBookingPayload missing");
    return;
  }

  const selected = [...seatGrid.querySelectorAll(".seat.selected")].map(
    (s) => s.dataset.seat
  );

  console.log("Selected seats:", selected);

  if (!selected.length) {
    alert("Please select at least one seat/berth.");
    return;
  }

  const selectedBooking = {
    bookingType: activeBookingPayload.bookingType,
    item: activeBookingPayload.item,
    itemName: activeBookingPayload.itemName,
    routeInfo: activeBookingPayload.routeInfo,
    totalAmount: activeBookingPayload.basePrice * selected.length,
    selectedSeats: selected,
    travelDate: activeBookingPayload.travelDate || "Flexible"
  };

  console.log("Saving booking:", selectedBooking);

  if (typeof setSelectedBooking !== "function") {
    console.error("setSelectedBooking is not defined");
    alert("Booking storage function not available. Check script order.");
    return;
  }

  setSelectedBooking(selectedBooking);
  closeSeatModal();

  const target = window.location.pathname.includes("/pages/")
    ? "../payment.html"
    : "payment.html";

  console.log("Redirecting to:", target);
  window.location.href = target;
}

function handleHotelBooking({ item, itemName, routeInfo, totalAmount, travelDate = "" }) {
  const selectedBooking = {
    bookingType: "Hotel",
    item,
    itemName,
    routeInfo,
    totalAmount,
    selectedSeats: ["1 Room"],
    travelDate
  };

  if (typeof setSelectedBooking !== "function") {
    console.error("setSelectedBooking is not defined");
    alert("Booking storage function not available. Check script order.");
    return;
  }

  setSelectedBooking(selectedBooking);

  const target = window.location.pathname.includes("/pages/")
    ? "../payment.html"
    : "payment.html";

  window.location.href = target;
}

/* expose globally in case any code expects window functions */
window.openSeatModal = openSeatModal;
window.closeSeatModal = closeSeatModal;
window.continueSeatBooking = continueSeatBooking;
window.handleHotelBooking = handleHotelBooking;

/* run once immediately too */
setupSeatModalEvents();