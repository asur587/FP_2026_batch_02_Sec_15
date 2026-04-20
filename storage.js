function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser")) || null;
}

function logoutUser() {
  localStorage.removeItem("currentUser");
}

function getBookings() {
  return JSON.parse(localStorage.getItem("bookings")) || [];
}

function saveBookings(bookings) {
  localStorage.setItem("bookings", JSON.stringify(bookings));
}

function addBooking(newBooking) {
  const bookings = getBookings();
  bookings.push(newBooking);
  saveBookings(bookings);
}

function updateCurrentUser(updatedUser) {
  const users = getUsers();
  const index = users.findIndex(user => user.email === updatedUser.email);

  if (index !== -1) {
    users[index] = updatedUser;
    saveUsers(users);
    setCurrentUser(updatedUser);
  }
}

function setSelectedBooking(data) {
  localStorage.setItem("selectedBooking", JSON.stringify(data));
}

function getSelectedBooking() {
  return JSON.parse(localStorage.getItem("selectedBooking")) || null;
}

function clearSelectedBooking() {
  localStorage.removeItem("selectedBooking");
}