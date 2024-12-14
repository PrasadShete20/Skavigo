const toggleButton = document.getElementById("toggleFormButton");
const formContent = document.getElementById("formContent");

toggleButton.addEventListener("click", () => {
  if (formContent.style.maxHeight) {
    formContent.style.maxHeight = null; // Sluit het formulier
    toggleButton.textContent = "show form";
  } else {
    formContent.style.maxHeight = formContent.scrollHeight + "px"; // Open het formulier
    toggleButton.textContent = "close form";
  }
});
