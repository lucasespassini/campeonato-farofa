// Configurações de cores das equipes
const teamColors = {
  "red-bull": {
    gradientFrom: "from-blue-900",
    gradientTo: "to-blue-700",
    lineColor: "via-blue-500",
    headerBg: "bg-blue-900",
    teamBg: "bg-blue-500",
    textColor: "text-blue-200",
    statsBg: "bg-blue-950",
    statsText: "text-blue-300",
  },
  ferrari: {
    gradientFrom: "from-red-800",
    gradientTo: "to-red-600",
    lineColor: "via-red-600",
    headerBg: "bg-red-700",
    teamBg: "bg-red-600",
    textColor: "text-red-200",
    statsBg: "bg-red-950",
    statsText: "text-red-300",
  },
  mercedes: {
    gradientFrom: "from-teal-800",
    gradientTo: "to-teal-600",
    lineColor: "via-teal-500",
    headerBg: "bg-teal-700",
    teamBg: "bg-teal-600",
    textColor: "text-teal-200",
    statsBg: "bg-teal-950",
    statsText: "text-teal-300",
  },
  mclaren: {
    gradientFrom: "from-orange-800",
    gradientTo: "to-orange-600",
    lineColor: "via-orange-500",
    headerBg: "bg-orange-700",
    teamBg: "bg-orange-600",
    textColor: "text-orange-200",
    statsBg: "bg-orange-950",
    statsText: "text-orange-300",
  },
  alpine: {
    gradientFrom: "from-pink-800",
    gradientTo: "to-pink-600",
    lineColor: "via-pink-500",
    headerBg: "bg-pink-700",
    teamBg: "bg-pink-600",
    textColor: "text-pink-200",
    statsBg: "bg-pink-950",
    statsText: "text-pink-300",
  },
  "aston-martin": {
    gradientFrom: "from-emerald-800",
    gradientTo: "to-emerald-600",
    lineColor: "via-emerald-500",
    headerBg: "bg-emerald-700",
    teamBg: "bg-emerald-600",
    textColor: "text-emerald-200",
    statsBg: "bg-emerald-950",
    statsText: "text-emerald-300",
  },
  haas: {
    gradientFrom: "from-gray-700",
    gradientTo: "to-gray-500",
    lineColor: "via-gray-400",
    headerBg: "bg-gray-600",
    teamBg: "bg-gray-500",
    textColor: "text-gray-200",
    statsBg: "bg-gray-800",
    statsText: "text-gray-300",
  },
  "racing-bulls": {
    gradientFrom: "from-indigo-800",
    gradientTo: "to-indigo-600",
    lineColor: "via-indigo-500",
    headerBg: "bg-indigo-700",
    teamBg: "bg-indigo-600",
    textColor: "text-indigo-200",
    statsBg: "bg-indigo-950",
    statsText: "text-indigo-300",
  },
  sauber: {
    gradientFrom: "from-lime-800",
    gradientTo: "to-lime-600",
    lineColor: "via-lime-500",
    headerBg: "bg-lime-700",
    teamBg: "bg-lime-600",
    textColor: "text-lime-200",
    statsBg: "bg-lime-950",
    statsText: "text-lime-300",
  },
  williams: {
    gradientFrom: "from-sky-800",
    gradientTo: "to-sky-600",
    lineColor: "via-sky-500",
    headerBg: "bg-sky-700",
    teamBg: "bg-sky-600",
    textColor: "text-sky-200",
    statsBg: "bg-sky-950",
    statsText: "text-sky-300",
  },
};

// Definir categoria e ano atuais
let currentCategory = "f1";

// Definir ano atual - se não existir no array, pega o último disponível
const currentYearDate = new Date().getFullYear();

function getAvailableYears() {
  if (!championshipData[currentCategory]) return [];
  return Object.keys(championshipData[currentCategory])
    .map(Number)
    .sort((a, b) => b - a);
}

const availableYears = getAvailableYears();
let currentYear = availableYears.includes(currentYearDate)
  ? currentYearDate
  : availableYears[0];

// Função para formatar nome do piloto (de id para nome legível)
function formatDriverName(id) {
  return id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Função para obter caminho da imagem
function getDriverImage(year, teamId, driverId) {
  return `img/${year}/${teamId}/${driverId}.jpeg`;
}

// Função para calcular overall da equipe
function calculateTeamOverall(drivers) {
  if (drivers.length === 0) return 0;
  const total = drivers.reduce((sum, driver) => sum + driver.overall, 0);
  return (total / drivers.length).toFixed(1);
}

// Função para renderizar tabs de anos
function renderYearTabs() {
  const yearTabs = document.getElementById("yearTabs");
  const years = getAvailableYears();

  if (years.length === 0) {
    yearTabs.innerHTML =
      '<p class="text-gray-400">Nenhum ano disponível para esta categoria</p>';
    return;
  }

  yearTabs.innerHTML = years
    .map(
      (year) => `
        <button 
            onclick="switchYear(${year})"
            class="year-tab px-4 py-2 rounded-lg font-bold text-sm md:text-base shadow-md transition-all ${
              year == currentYear
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }">
            ${year}
        </button>
    `
    )
    .join("");
}

// Função para atualizar estilo dos botões de categoria
function updateCategoryButtons() {
  const f1Button = document.getElementById("categoryF1");
  const gt3Button = document.getElementById("categoryGT3");

  if (f1Button) {
    if (currentCategory === "f1") {
      f1Button.className =
        "category-tab px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold text-sm md:text-base shadow-lg transition-all bg-blue-600 text-white";
    } else {
      f1Button.className =
        "category-tab px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold text-sm md:text-base shadow-lg transition-all bg-gray-700 text-gray-300 hover:bg-gray-600";
    }
  }

  if (gt3Button) {
    if (currentCategory === "gt3") {
      gt3Button.className =
        "category-tab px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold text-sm md:text-base shadow-lg transition-all bg-blue-600 text-white";
    } else {
      gt3Button.className =
        "category-tab px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold text-sm md:text-base shadow-lg transition-all bg-gray-700 text-gray-300 hover:bg-gray-600";
    }
  }

  // Atualizar subtítulo
  const subtitle = document.getElementById("categorySubtitle");
  if (subtitle) {
    if (currentCategory === "f1") {
      subtitle.textContent = "F1 25 - Overall dos Pilotos";
    } else {
      subtitle.textContent = "GT3 - Overall dos Pilotos";
    }
  }
}

// Função para renderizar cards de pilotos
function renderDriverCard(driver, team, year) {
  const driverName = formatDriverName(driver.id);
  const imagePath = getDriverImage(year, team.id, driver.id);

  return `
        <div class="driver-card rounded-xl overflow-hidden shadow-2xl">
            <img 
                src="${imagePath}" 
                alt="${driverName}" 
                class="w-full h-full object-cover"
                onerror="this.src='https://via.placeholder.com/400x600/1f2937/ffffff?text=${encodeURIComponent(
                  driverName
                )}'"
            >
        </div>
    `;
}

// Função para renderizar equipe
function renderTeam(team, year) {
  const colors = teamColors[team.id];
  const teamOverall = calculateTeamOverall(team.drivers);

  // Ordenar pilotos por overall (maior primeiro)
  const sortedDrivers = [...team.drivers].sort((a, b) => b.overall - a.overall);

  return `
        <div class="mb-8">
            <div class="flex items-center mb-4">
                <div class="h-1 flex-grow bg-gradient-to-r from-transparent ${
                  colors.lineColor
                } to-transparent"></div>
                <h2 class="team-header text-xl md:text-2xl text-white mx-2 px-4 py-2 ${
                  colors.headerBg
                } rounded-lg shadow-lg text-center">
                    ${team.name}
                </h2>
                <div class="h-1 flex-grow bg-gradient-to-r from-transparent ${
                  colors.lineColor
                } to-transparent"></div>
            </div>
            
            <div class="grid grid-cols-1 ${
              sortedDrivers.length > 1
                ? "sm:grid-cols-2"
                : "sm:grid-cols-1 max-w-sm mx-auto"
            } gap-4">
                ${sortedDrivers
                  .map((driver) => renderDriverCard(driver, team, year))
                  .join("")}
            </div>
            
            <div class="text-center mt-4">
                <span class="inline-block ${
                  colors.teamBg
                } text-white px-4 py-2 rounded-full font-bold text-sm md:text-base shadow-lg">
                    Overall da Equipe: ${teamOverall}
                </span>
            </div>
        </div>
    `;
}

// Função para renderizar todas as equipes do ano
function renderTeams() {
  const container = document.getElementById("teamsContainer");
  const categoryData = championshipData[currentCategory];

  if (!categoryData || !categoryData[currentYear]) {
    container.innerHTML = `
            <div class="text-center text-gray-400 py-20">
                <p class="text-2xl">Nenhuma equipe cadastrada para ${currentYear} na categoria ${currentCategory.toUpperCase()}</p>
            </div>
        `;
    return;
  }

  const teams = categoryData[currentYear];

  if (teams.length === 0) {
    container.innerHTML = `
            <div class="text-center text-gray-400 py-20">
                <p class="text-2xl">Nenhuma equipe cadastrada para ${currentYear}</p>
            </div>
        `;
    return;
  }

  // Ordenar equipes por overall médio (maior para menor)
  const sortedTeams = [...teams].sort((a, b) => {
    return calculateTeamOverall(b.drivers) - calculateTeamOverall(a.drivers);
  });

  // Agrupar equipes em linhas de 2
  let html = '<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">';
  html += sortedTeams.map((team) => renderTeam(team, currentYear)).join("");
  html += "</div>";

  container.innerHTML = html;
}

// Função para trocar de categoria
function switchCategory(category) {
  currentCategory = category;

  // Atualizar ano disponível para a nova categoria
  const years = getAvailableYears();
  if (years.length > 0) {
    const yearExists = years.includes(currentYear);
    if (!yearExists) {
      currentYear = years[0];
    }
  }

  updateCategoryButtons();
  renderYearTabs();
  renderTeams();

  // Scroll suave para o topo
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Função para trocar de ano
function switchYear(year) {
  currentYear = year;
  renderYearTabs();
  renderTeams();

  // Scroll suave para o topo
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Inicializar página
document.addEventListener("DOMContentLoaded", () => {
  updateCategoryButtons();
  renderYearTabs();
  renderTeams();
});
