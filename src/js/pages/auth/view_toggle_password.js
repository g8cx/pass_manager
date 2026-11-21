const passwordToggles = document.querySelectorAll(
  "#login_toggle_password, #register_toggle_password",
);

passwordToggles.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const container = checkbox.parentElement;

    const passwordInput = container.querySelector('input[name="password"]');

    if (checkbox.checked) {
      passwordInput.type = "text";
      passwordInput.focus();
    } else {
      passwordInput.type = "password";
      passwordInput.focus();
    }
  });
});
