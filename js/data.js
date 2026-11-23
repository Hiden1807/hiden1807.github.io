/* =====================================================================
   data.js — TOUT le contenu du site est ici. Tu modifies ce fichier,
   tu n'as presque jamais besoin de toucher à index.html ou main.js.
   ===================================================================== */

const CONFIG = {
  // Après création du formulaire sur formspree.io, colle ici l'identifiant
  // (la fin de l'URL https://formspree.io/f/XXXXXXXX).
  formspreeId: "maeolpzo",

  // Laisse "" pour masquer un lien. Renseigne seulement ce que tu veux rendre public.
  links: {
    github: "https://github.com/Hiden1807",
    linkedin: "https://www.linkedin.com/in/jonas-ngalamulume-37089a26a/",   // ex: https://www.linkedin.com/in/ton-profil
    instagram: "https://www.instagram.com/the_son_of_god18/",  // ex: https://www.instagram.com/ton_compte
    email: "ngalamulumejonas18@gmail.com"       // ex: t@gmail.com
  },

  // Style de la pluie Matrix : "mixed" (katakana + chiffres + symboles), "latin" (lettres, chiffres, symboles) ou "binary" (0 et 1)
  matrixStyle: "mixed",

  cvFile: "assets/CV_Jonas_Ngalamulume.pdf"
};

/* ----- Projets -----
   Seuls les projets PUBLIÉS sur GitHub doivent figurer ici.
   repo = lien du dépôt GitHub, demo = lien du site en ligne (laisse "" si aucun). */
const PROJECTS = [
  {
    name: "ECO RDC Intelligence",
    stack: ["Django", "PostgreSQL", "Render"],
    repo: "https://github.com/Hiden1807/eco-rdc", demo: "https://eco-rdc-1.onrender.com/",
    fr: "Plateforme full-stack de signalement et de suivi écologique pour Kinshasa.",
    en: "Full-stack platform for ecological reporting and monitoring in Kinshasa."
  },
  {
    name: "port-80-monitor-systemd-telegram",
    stack: ["Linux", "systemd", "Telegram"],
    repo: "https://github.com/Hiden1807/port80-monitor-systemd-telegram", demo: "",
    fr: "Surveillance du port 80 sous Linux avec un service systemd et alertes envoyées sur Telegram.",
    en: "Port 80 monitoring on Linux with a systemd service and alerts sent to Telegram."
  },
  {
    name: "Collège Théophile",
    stack: ["PHP","HTML","Bootstrap","Infinityfree"],
    repo: "https://github.com/Hiden1807/college_theophile", demo: "https://college-saint-theophile.free.nf/",
    fr: "Projet web réalisé pour le Collège Théophile.",
    en: "Web project built for Collège Théophile."
  },
  {
    name: "TopInfoMag",
    stack: ["Django", "Neon PostgreSQL", "Jazzmin"],
    repo: "", demo: "",
    fr: "CMS d'actualités congolaises avec administration personnalisée et base PostgreSQL hébergée.",
    en: "Congolese news CMS with a customised admin and a hosted PostgreSQL database."
  },
  {
    name: "TelMed RDC",
    stack: ["PHP", "MySQL", "Bootstrap"],
    repo: "https://github.com/Hiden1807/TelMed_DRC.0", demo: "",
    fr: "Projet de groupe de télémédecine : analyse, conception UML et implémentation d'une plateforme web.",
    en: "Group telemedicine project: analysis, UML design and implementation of a web platform."
  }
];

/* ----- Compétences (affichage façon scan Nmap) -----
   state: "open" = pratiqué régulièrement, "partial" = en cours d'apprentissage */
const SKILLS = [
  { port: "22/tcp",   state: "open",    service: "ssh",        fr: "Linux (Kali, Ubuntu) · Bash · VirtualBox", en: "Linux (Kali, Ubuntu) · Bash · VirtualBox" },
  { port: "80/tcp",   state: "open",    service: "http",       fr: "HTML · CSS · JavaScript", en: "HTML · CSS · JavaScript" },
  { port: "443/tcp",  state: "partial",    service: "https",      fr: "Django · Django REST · React (Vite) · PHP", en: "Django · Django REST · React (Vite) · PHP" },
  { port: "3306/tcp", state: "open",    service: "mysql",      fr: "MySQL · PostgreSQL", en: "MySQL · PostgreSQL" },
  { port: "161/udp",  state: "partial", service: "snmp",       fr: "Réseaux Cisco (STP, RIP) · Wireshark · Nmap", en: "Cisco networking (STP, RIP) · Wireshark · Nmap" },
  { port: "8080/tcp", state: "partial", service: "http-proxy", fr: "Burp Suite · sqlmap · Hashcat", en: "Burp Suite · sqlmap · Hashcat" },
  { port: "8501/tcp", state: "partial",    service: "streamlit",  fr: "Python · modélisation et optimisation (Dijkstra)", en: "Python · modelling and optimisation (Dijkstra)" },
  { port: "1883/tcp", state: "partial",    service: "mqtt",       fr: "IoT : ESP32 · MPU6050 · GPS/GSM · énergie solaire", en: "IoT: ESP32 · MPU6050 · GPS/GSM · solar power" },
  { port: "9000/tcp", state: "open",    service: "design",     fr: "Figma · Canva · Photoshop · GIMP", en: "Figma · Canva · Photoshop · GIMP" }
];

/* ----- Certifications ----- */
const CERTS = [
  {
    name: "LPI Linux Essentials",
    score: "87,5 %",
    fr: "Obtenue le 1er septembre 2026, en collaboration avec l'AUF (Agence universitaire de la Francophonie).",
    en: "Earned on 1 September 2026 through a collaboration with the AUF (Agence universitaire de la Francophonie)."
  },
  {
    name: "Cisco Networking Academy",
    score: "6 h",
    fr: "« Introduction à la cybersécurité » — certificat délivré le 5 octobre 2026.",
    en: "“Introduction to Cybersecurity” — certificate issued on 5 October 2026."
  },
  {
    name: "Certification Pix",
    score: "444 Pix - Independant 2",
    fr: "Obtenue le 28 juillet 2025,en collaboration avec l'AUF (Agence universitaire de la Francophonie).",
    en: "Earned on 28 july 2026 through a collaboration with the AUF (Agence universitaire de la Francophonie)"
  }
];

/* ----- Textes de l'interface ----- */
const I18N = {
  fr: {
    boot_skip: "Passer",
    nav_about: "À propos", nav_skills: "Compétences", nav_projects: "Projets", nav_certs: "Certifications", nav_contact: "Contact",
    cta_projects: "Voir mes projets", cta_cv: "Télécharger le CV", cta_contact: "Me contacter",
    about_title: "À propos",
    about_p1: "Je suis étudiant en Mathématiques et Informatique à l'Université de Kinshasa, en formation en réseaux et cybersécurité. J'aime comprendre comment les systèmes communiquent, et comment on les protège.",
    about_p2: "Avant l'informatique, j'ai fait de l'électricité industrielle : cela m'a appris la rigueur, la sécurité et le travail sur le terrain. Aujourd'hui, je construis des projets web et j'explore la sécurité des réseaux.",
    fact1_k: "Formation", fact1_v: "Licence 3 Maths-Info, UNIKIN",
    fact2_k: "Focus", fact2_v: "Réseaux & cybersécurité",
    fact3_k: "Base", fact3_v: "Kinshasa, RD Congo",
    fact4_k: "Disponible pour", fact4_v: "Stages · freelance · bourses · formation",
    skills_title: "Compétences",
    skills_note: "Mes compétences, présentées comme un scan de ports.",
    skills_head: ["PORT", "ÉTAT", "SERVICE", "CE QUE JE FAIS"],
    skills_legend: "open = pratiqué régulièrement · open|filtered = en cours d'apprentissage",
    projects_title: "Projets",
    projects_note: "Une sélection de projets publiés sur GitHub.",
    link_repo: "Code source", link_demo: "Démo en ligne",
    certs_title: "Certifications",
    contact_title: "Contact",
    contact_intro: "Une mission, un stage, une question ? Écris-moi, je réponds dès que possible.",
    f_name: "Nom", f_email: "Email", f_msg: "Message", f_send: "Envoyer",
    f_sending: "Envoi en cours…",
    f_ok: "Message envoyé. Merci, je reviens vers vous très vite.",
    f_err: "L'envoi a échoué. Réessayez plus tard ou utilisez un des liens ci-contre.",
    f_invalid: "Vérifiez les champs en rouge.",
    f_unconfigured: "Formulaire pas encore configuré (identifiant Formspree manquant).",
    footer: "© Jonas Ngalamulume · Kinshasa",
    boot: [
      "Initialisation du noyau.......",
      "Montage du système de fichiers.......",
      "Chargement du profil : jonas.......",
      "Vérification des certifications.......",
      "Démarrage de l'interface......."
    ],
    hero: [
      { cmd: "whoami", out: "jonas-ngalamulume-tshimanga" },
      { cmd: "cat role.txt", out: "Étudiant en Mathématiques & Informatique (UNIKIN)\nEn formation : réseaux & cybersécurité" },
      { cmd: "ls certifications/", out: "LPI-Linux-Essentials/   Cisco-Cybersecurite/  Sensibilisation-Cybersecurite-HP/" },
      { cmd: "echo $STATUT", out: "Ouvert aux stages, missions freelance et bourses" }
    ]
  },
  en: {
    boot_skip: "Skip",
    nav_about: "About", nav_skills: "Skills", nav_projects: "Projects", nav_certs: "Certifications", nav_contact: "Contact",
    cta_projects: "See my projects", cta_cv: "Download CV", cta_contact: "Contact me",
    about_title: "About",
    about_p1: "I'm a Mathematics and Computer Science student at the University of Kinshasa, training in networking and cybersecurity. I like understanding how systems talk to each other, and how to protect them.",
    about_p2: "Before computing, I worked in industrial electricity, which taught me rigour, safety and hands-on work. Today I build web projects and explore network security.",
    fact1_k: "Education", fact1_v: "3rd-year Maths & CS, UNIKIN",
    fact2_k: "Focus", fact2_v: "Networking & cybersecurity",
    fact3_k: "Based in", fact3_v: "Kinshasa, DR Congo",
    fact4_k: "Open to", fact4_v: "Internships · freelance · scholarships",
    skills_title: "Skills",
    skills_note: "My skills, shown as a port scan.",
    skills_head: ["PORT", "STATE", "SERVICE", "WHAT I DO"],
    skills_legend: "open = used regularly · open|filtered = currently learning",
    projects_title: "Projects",
    projects_note: "A selection of projects published on GitHub.",
    link_repo: "Source code", link_demo: "Live demo",
    certs_title: "Certifications",
    contact_title: "Contact",
    contact_intro: "A project, an internship, a question? Write to me, I reply as soon as I can.",
    f_name: "Name", f_email: "Email", f_msg: "Message", f_send: "Send",
    f_sending: "Sending…",
    f_ok: "Message sent. Thank you, I'll get back to you shortly.",
    f_err: "Sending failed. Please try again later or use one of the links nearby.",
    f_invalid: "Please check the fields in red.",
    f_unconfigured: "Form not configured yet (missing Formspree ID).",
    footer: "© Jonas Ngalamulume · Kinshasa",
    boot: [
      "Initialising kernel.......",
      "Mounting filesystem.......",
      "Loading profile: jonas.......",
      "Checking certifications.......",
      "Starting interface......."
    ],
    hero: [
      { cmd: "whoami", out: "jonas-ngalamulume-tshimanga" },
      { cmd: "cat role.txt", out: "Mathematics & Computer Science student (UNIKIN)\nTraining in networking & cybersecurity" },
      { cmd: "ls certifications/", out: "LPI-Linux-Essentials/   Cisco-Cybersecurity/" },
      { cmd: "echo $STATUS", out: "Open to internships, freelance work and scholarships" }
    ]
  }
};
