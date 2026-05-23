function afficherSection(idSection) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('actif'));
  document.querySelectorAll('.nav-liens a').forEach(a => a.classList.remove('actif'));
  document.getElementById(idSection).classList.add('actif');
  document.getElementById('nav-' + idSection).classList.add('actif');
}
const INFO_STAGE = {
  entreprise: "CTI Saint-Étienne",
  service:    "RPP - Recette prepoduction",
  tuteur:     "Nicolas Gaillard",
  debut:      "18 mai 2026",
  fin:        "03 juillet 2026"
};
const SEMAINES = [
  {
    numero:         1,
    dates:          "18-22 mai 2026",
    activites:      "- Découverte de l'entreprise; prise en main des logiciels et environnements; participation à des réunions;\n- Observation des processus de travail et des projets en cours; création d'un script shell pour automatiser des tâches.",  
    outils:         "",
    competences:    [],   
    difficultes:    "",
    apprentissages: ""
  },
  {
    numero:         2,
    dates:          "",
    activites:      "",
    outils:         "",
    competences:    [],
    difficultes:    "",
    apprentissages: ""
  },
  {
    numero:         3,
    dates:          "",
    activites:      "",
    outils:         "",
    competences:    [],
    difficultes:    "",
    apprentissages: ""
  },
  {
    numero:         4,
    dates:          "",
    activites:      "",
    outils:         "",
    competences:    [],
    difficultes:    "",
    apprentissages: ""
  },
  {
    numero:         5,
    dates:          "",
    activites:      "",
    outils:         "",
    competences:    [],
    difficultes:    "",
    apprentissages: ""
  },
  {
    numero:         6,
    dates:          "",
    activites:      "",
    outils:         "",
    competences:    [],
    difficultes:    "",
    apprentissages: ""
  },
  {
    numero:         7,
    dates:          "",
    activites:      "",
    outils:         "",
    competences:    [],
    difficultes:    "",
    apprentissages: ""
  }
];
function construireStage() {
  afficherInfoEntreprise();
  construireOnglets();
  construirePanneaux();
  changerSemaine(1);
}
function afficherInfoEntreprise() {
  const bloc = document.getElementById('info-entreprise');
  if (!bloc) return;
  bloc.innerHTML = `
    <div class="info-item">
      <span class="info-label">ENTREPRISE</span>
      <span class="info-valeur">${INFO_STAGE.entreprise}</span>
    </div>
    <div class="info-item">
      <span class="info-label">SERVICE</span>
      <span class="info-valeur">${INFO_STAGE.service}</span>
    </div>
    <div class="info-item">
      <span class="info-label">TUTEUR</span>
      <span class="info-valeur">${INFO_STAGE.tuteur}</span>
    </div>
    <div class="info-item">
      <span class="info-label">PÉRIODE</span>
      <span class="info-valeur">${INFO_STAGE.debut} → ${INFO_STAGE.fin}</span>
    </div>
  `;
}
function semaineEstRemplie(semaine) {
  return !!(semaine.activites && semaine.activites.trim());
}
function construireOnglets() {
  const conteneur = document.getElementById('onglets-semaines');
  conteneur.innerHTML = '';
  SEMAINES.forEach(semaine => {
    const onglet = document.createElement('button');
    onglet.id = 'onglet-' + semaine.numero;
    onglet.className = 'onglet-semaine' + (semaineEstRemplie(semaine) ? ' rempli' : '');
    onglet.innerHTML = `<span class="onglet-point"></span> S${semaine.numero}`;
    onglet.onclick = () => changerSemaine(semaine.numero);
    conteneur.appendChild(onglet);
  });
}
function construirePanneaux() {
  const conteneur = document.getElementById('panneaux-semaines');
  conteneur.innerHTML = '';
  SEMAINES.forEach(semaine => {
    const panneau = document.createElement('div');
    panneau.id = 'panneau-' + semaine.numero;
    panneau.className = 'panneau-semaine';
    if (!semaineEstRemplie(semaine)) {
      panneau.innerHTML = `
        <div class="semaine-vide">
          <p class="semaine-vide-texte">Semaine ${semaine.numero} — pas encore renseignée.</p>
        </div>
      `;
    } else {
      panneau.innerHTML = `
        <div class="semaine-contenu">
          <div class="semaine-header">
            <span class="semaine-numero">SEMAINE ${semaine.numero}</span>
            <span class="semaine-dates">${semaine.dates}</span>
          </div>
          <div class="blocs-semaine">
            <div class="bloc">
              <p class="bloc-titre">ACTIVITÉS RÉALISÉES</p>
              <div class="bloc-texte">${formaterActivites(semaine.activites)}</div>
            </div>
            ${semaine.outils ? `
            <div class="bloc">
              <p class="bloc-titre">OUTILS & TECHNOLOGIES</p>
              <div class="bloc-texte">${semaine.outils}</div>
            </div>` : ''}
            ${semaine.competences.length > 0 ? `
            <div class="bloc">
              <p class="bloc-titre">COMPÉTENCES BTS MOBILISÉES</p>
              <div class="liste-tags">
                ${semaine.competences.map(c => `<span class="tag accent">${c}</span>`).join('')}
              </div>
            </div>` : ''}
            ${semaine.difficultes ? `
            <div class="bloc">
              <p class="bloc-titre">DIFFICULTÉS RENCONTRÉES</p>
              <div class="bloc-texte">${semaine.difficultes}</div>
            </div>` : ''}
            ${semaine.apprentissages ? `
            <div class="bloc">
              <p class="bloc-titre">CE QUE J'AI APPRIS</p>
              <div class="bloc-texte">${semaine.apprentissages}</div>
            </div>` : ''}
          </div>
        </div>
      `;
    }
    conteneur.appendChild(panneau);
  });
}
function formaterActivites(texte) {
  const lignes = texte.trim().split('\n').map(l => l.trim()).filter(l => l);
  if (lignes.every(l => l.startsWith('-'))) {
    const items = lignes.map(l => `<li>${l.slice(1).trim()}</li>`).join('');
    return `<ul class="liste-activites">${items}</ul>`;
  }
  return `<p>${texte.trim()}</p>`;
}
function changerSemaine(num) {
  document.querySelectorAll('.onglet-semaine').forEach(o => o.classList.remove('actif'));
  document.querySelectorAll('.panneau-semaine').forEach(p => p.classList.remove('actif'));
  document.getElementById('onglet-' + num).classList.add('actif');
  document.getElementById('panneau-' + num).classList.add('actif');
}
construireStage();

function basculerTheme() {
  const estClair = document.documentElement.classList.toggle('clair');
  const btn = document.getElementById('btn-theme');
  btn.textContent = estClair ? '☾ Sombre' : '☀ Clair';
  localStorage.setItem('theme', estClair ? 'clair' : 'sombre');
}

const themeSauvegarde = localStorage.getItem('theme');
if (themeSauvegarde === 'clair') {
  document.documentElement.classList.add('clair');
  document.getElementById('btn-theme').textContent = '☾ Sombre';
}
