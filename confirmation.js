document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("confirmationDetails");
  const booking = JSON.parse(localStorage.getItem("lastConfirmedBooking"));

  if (!booking) {
    container.innerHTML = "<p>No confirmation details found.</p>";
    return;
  }

  container.innerHTML = `
    <div class="summary-row">
      <span class="summary-key">Booking ID</span>
      <span class="summary-value">${booking.bookingId}</span>
    </div>
    <div class="summary-row">
      <span class="summary-key">Booking Type</span>
      <span class="summary-value">${booking.bookingType}</span>
    </div>
    <div class="summary-row">
      <span class="summary-key">Passenger</span>
      <span class="summary-value">${booking.passengers.name}</span>
    </div>
    <div class="summary-row">
      <span class="summary-key">Email</span>
      <span class="summary-value">${booking.passengers.email}</span>
    </div>
    <div class="summary-row">
      <span class="summary-key">Travel</span>
      <span class="summary-value">${booking.item?.from ? `${booking.item.from} → ${booking.item.to}` : booking.item?.city || booking.itemName || "Trip"}</span>
    </div>
    <div class="summary-row">
      <span class="summary-key">Seats / Rooms</span>
      <span class="summary-value">${booking.selectedSeats?.length ? booking.selectedSeats.join(", ") : "1 unit"}</span>
    </div>
    <div class="summary-row">
      <span class="summary-key">Payment Method</span>
      <span class="summary-value">${booking.paymentMethod}</span>
    </div>
    <div class="summary-row">
      <span class="summary-key">Amount Paid</span>
      <span class="summary-value">₹${Number(booking.totalAmount).toLocaleString()}</span>
    </div>
  `;
});



