# Portfolio — Jonas Ngalamulume

Site 100 % statique : HTML + CSS + JavaScript, sans framework ni backend.

## Structure

```
index.html        structure de la page
css/style.css     apparence
js/data.js        TOUT le contenu (textes FR/EN, projets, compétences, liens)
js/main.js        comportement (Matrix, terminal, langue, formulaire)
assets/           photo.jpg (ta photo) et CV_Jonas_Ngalamulume.pdf
```

## À faire avant la mise en ligne

1. Dans `js/data.js` : renseigner `formspreeId`, les liens LinkedIn / Instagram / email, et les `repo` / `demo` de chaque projet.
2. Ajouter `assets/photo.jpg` (carrée, ~600×600 px) et `assets/CV_Jonas_Ngalamulume.pdf`.
3. Retirer de `PROJECTS` tout projet non publié sur GitHub.

## Test en local

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Déploiement sur GitHub Pages

1. Créer un dépôt public nommé `Hiden1807.github.io`.
2. Y pousser le contenu de ce dossier (`index.html` à la racine).
3. Settings → Pages → Source : « Deploy from a branch » → `main` / `/ (root)`.
4. Cocher « Enforce HTTPS ».
5. Le site est accessible sur `https://hiden1807.github.io`.
