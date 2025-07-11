export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function isLoggedIn() {
  return !!getUser();
}
