import { TEAM } from "../data/teams.js";

const IMG_PATH = "../assets/img/";

function createCard({ name, role, photo, description }) {
  return `
    <div class="col">
      <div class="flip-card" role="button" tabindex="0" aria-pressed="false"
           aria-label="Ver más sobre ${name}" style="height: 240px">
        <div class="flip-card-inner position-relative w-100 h-100">

          <div class="flip-card-face flip-card-front card position-absolute top-0 start-0 w-100 h-100
                      border-3 d-flex flex-column align-items-center justify-content-center text-center p-3">
            <img src="${IMG_PATH}${photo}" alt="Foto de ${name}"
                 class="rounded-circle object-fit-cover mb-3" width="80" height="80">
            <span class="h6 fw-bold mb-1">${name}</span>
            <span class="small text-body-secondary">${role}</span>
            <span class="small fw-bold text-primary mt-3">
              <i class="bi bi-arrow-repeat"></i> Toca para ver más
            </span>
          </div>

          <div class="flip-card-face flip-card-back card position-absolute top-0 start-0 w-100 h-100
                      border-3 d-flex flex-column align-items-center justify-content-center text-center p-3
                      text-bg-dark">
            <span class="h6 fw-bold mb-2">${name}</span>
            <p class="small mb-0">${description}</p>
          </div>

        </div>
      </div>
    </div>`;
}

function initTeam() {
  const grid = document.getElementById("team-grid");
  if (!grid) return;

  grid.innerHTML = TEAM.map(createCard).join("");

  const flip = (card) => {
    const isFlipped = card.classList.toggle("is-flipped");
    card.setAttribute("aria-pressed", isFlipped);
  };

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".flip-card");
    if (card) flip(card);
  });

  grid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest(".flip-card");
    if (card) {
      e.preventDefault();
      flip(card);
    }
  });
}

initTeam();