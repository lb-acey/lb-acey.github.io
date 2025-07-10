const modals = document.querySelectorAll(".modal");
const projects = document.querySelectorAll(".project");
const closes = document.querySelectorAll(".close");

projects.forEach(project => {
  project.addEventListener("click", () => {
    const id = project.getAttribute("data-modal");
    document.getElementById(id).style.display = "flex";
  });
});

closes.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".modal").style.display = "none";
  });
});

window.addEventListener("click", e => {
  modals.forEach(modal => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
