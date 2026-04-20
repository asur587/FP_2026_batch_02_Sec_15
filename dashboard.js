document.addEventListener("DOMContentLoaded", () => {

  const user = getCurrentUser();

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // welcome text
  document.getElementById("welcomeText").textContent =
    `Welcome, ${user.name || user.email}`;

  let bookings = getBookings().filter(b => b.user === user.email);

  const container = document.getElementById("bookingList");

  function renderBookings(data) {
    container.innerHTML = "";

    if (!data.length) {
      container.innerHTML = `<div class="no-booking">No bookings found</div>`;
      updateStats([]);
      return;
    }

    data.forEach(b => {
      const card = document.createElement("div");
      card.className = "booking-card";

      card.innerHTML = `
        <div class="booking-top">
          <h3>${b.bookingType || b.type}</h3>
          <span class="status ${b.status.toLowerCase()}">${b.status}</span>
        </div>

        <p><strong>ID:</strong> ${b.id}</p>
        <p><strong>Route:</strong> ${b.routeInfo || "N/A"}</p>
        <p><strong>Seats:</strong> ${b.selectedSeats?.join(", ") || "-"}</p>
        <p><strong>Total:</strong> ₹${b.totalAmount || b.total}</p>

        <div class="booking-actions">
          <button class="btn btn-outline cancel-btn">Cancel</button>
        </div>
      `;

      // cancel booking
      card.querySelector(".cancel-btn").addEventListener("click", () => {

        if (b.status === "Cancelled") {
          showToast("Already cancelled", "error");
          return;
        }

        b.status = "Cancelled";

        const allBookings = getBookings();
        const index = allBookings.findIndex(x => x.id === b.id);

        if (index !== -1) {
          allBookings[index] = b;
          saveBookings(allBookings);
        }

        showToast("Booking cancelled", "success");
        loadDashboard();
      });

      container.appendChild(card);
    });

    updateStats(data);
  }

  function updateStats(data) {
    document.getElementById("totalBookings").textContent = data.length;

    document.getElementById("confirmedBookings").textContent =
      data.filter(b => b.status === "Confirmed").length;

    document.getElementById("cancelledBookings").textContent =
      data.filter(b => b.status === "Cancelled").length;
  }

  function loadDashboard() {
    bookings = getBookings().filter(b => b.user === user.email);
    renderBookings(bookings);
  }

  // SEARCH
  document.getElementById("searchInput").addEventListener("input", e => {
    const value = e.target.value.toLowerCase();

    const filtered = bookings.filter(b =>
      JSON.stringify(b).toLowerCase().includes(value)
    );

    renderBookings(filtered);
  });

  // FILTER
  document.getElementById("filterType").addEventListener("change", e => {
    const type = e.target.value;

    if (type === "all") {
      renderBookings(bookings);
      return;
    }

    const filtered = bookings.filter(b =>
      (b.bookingType || b.type) === type
    );

    renderBookings(filtered);
  });

  // LOGOUT
  document.getElementById("logoutBtn").addEventListener("click", () => {
    logoutUser();
    window.location.href = "login.html";
  });

  loadDashboard();
});