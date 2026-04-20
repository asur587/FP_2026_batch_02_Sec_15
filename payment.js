document.addEventListener("DOMContentLoaded", () => {
  const selectedBooking = getSelectedBooking();
  const summaryContainer = document.getElementById("bookingSummary");
  const paymentForm = document.getElementById("paymentForm");

  if (!selectedBooking) {
    summaryContainer.innerHTML = `
      <div class="summary-row">
        <span class="summary-key">Status</span>
        <span class="summary-value">No selected booking found</span>
      </div>
    `;
    return;
  }

  renderSummary(selectedBooking);

  paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const currentUser = getCurrentUser();

    if (!currentUser) {
      alert("Please login before completing the booking.");
      window.location.href = "login.html";
      return;
    }

    const passengerName = document.getElementById("passengerName").value.trim();
    const passengerAge = document.getElementById("passengerAge").value.trim();
    const passengerEmail = document.getElementById("passengerEmail").value.trim();
    const passengerPhone = document.getElementById("passengerPhone").value.trim();
    const paymentMethod = document.getElementById("paymentMethod").value;

    if (!passengerName || !passengerAge || !passengerEmail || !passengerPhone || !paymentMethod) {
      alert("Please fill all passenger and payment fields.");
      return;
    }

    const finalBooking = {
      bookingId: "BK" + Date.now(),
      userEmail: currentUser.email,
      userName: currentUser.name,
      bookingType: selectedBooking.bookingType,
      item: selectedBooking.item,
      selectedSeats: selectedBooking.selectedSeats || [],
      travelDate: selectedBooking.travelDate || "Not specified",
      passengers: {
        name: passengerName,
        age: passengerAge,
        email: passengerEmail,
        phone: passengerPhone
      },
      paymentMethod,
      totalAmount: selectedBooking.totalAmount,
      bookedAt: new Date().toISOString()
    };

    addBooking(finalBooking);

    currentUser.bookings = currentUser.bookings || [];
    currentUser.bookings.push(finalBooking);
    updateCurrentUser(currentUser);

    localStorage.setItem("lastConfirmedBooking", JSON.stringify(finalBooking));
    clearSelectedBooking();

    window.location.href = "confirmation.html";
  });

  function renderSummary(data) {
    summaryContainer.innerHTML = `
      <div class="summary-row">
        <span class="summary-key">Type</span>
        <span class="summary-value">${data.bookingType}</span>
      </div>
      <div class="summary-row">
        <span class="summary-key">Name</span>
        <span class="summary-value">${data.itemName}</span>
      </div>
      <div class="summary-row">
        <span class="summary-key">Route / City</span>
        <span class="summary-value">${data.routeInfo}</span>
      </div>
      <div class="summary-row">
        <span class="summary-key">Travel Date</span>
        <span class="summary-value">${data.travelDate || "Not specified"}</span>
      </div>
      <div class="summary-row">
        <span class="summary-key">Seats / Rooms</span>
        <span class="summary-value">${data.selectedSeats?.length ? data.selectedSeats.join(", ") : "1 booking unit"}</span>
      </div>
      <div class="summary-row">
        <span class="summary-key">Amount</span>
        <span class="summary-value">₹${Number(data.totalAmount).toLocaleString()}</span>
      </div>
    `;
  }
});

document.addEventListener("DOMContentLoaded", () => {

  const booking = getSelectedBooking();
  const user = getCurrentUser();
  const payBtn = document.getElementById("payBtn");

  if (!booking || !user) {
    window.location.href = "index.html";
    return;
  }

  if (!payBtn) {
    console.error("Pay button not found");
    return;
  }

  payBtn.addEventListener("click", () => {

    const name = document.getElementById("cardName").value;
    const number = document.getElementById("cardNumber").value;

    if (!name || !number) {
      if (typeof showToast === "function") {
        showToast("Please fill payment details", "error");
      } else {
        alert("Please fill payment details");
      }
      return;
    }

    // disable button
    payBtn.disabled = true;
    payBtn.textContent = "Processing...";

    // safe loader call
    if (typeof showLoader === "function") {
      showLoader("Processing Payment...");
    }

    setTimeout(() => {
      try {

        const newBooking = {
          id: "TS" + Date.now(),
          user: user.email,
          ...booking,
          status: "Confirmed"
        };

        addBooking(newBooking);
        clearSelectedBooking();

        localStorage.setItem("latestBooking", JSON.stringify(newBooking));

        if (typeof hideLoader === "function") {
          hideLoader();
        }

        // 🔥 REDIRECT (final)
        window.location.href = "confirmation.html";

      } catch (err) {
        console.error(err);

        if (typeof hideLoader === "function") {
          hideLoader();
        }

        if (typeof showToast === "function") {
          showToast("Payment failed", "error");
        } else {
          alert("Payment failed");
        }

        payBtn.disabled = false;
        payBtn.textContent = "Pay Now";
      }
    }, 2000);
  });

});