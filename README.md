# Astro Starter Kit: Minimal

[![Website öffnen](https://custom-icon-badges.demolab.com/badge/Website_öffnen-121212?style=for-the-badge&logo=globe&logoColor=ce93d8)](https://fooorum.vercel.app)
[![Mit CodeSandbox öffnen](https://custom-icon-badges.demolab.com/badge/Mit_CodeSandbox_öffnen-121212?style=for-the-badge&logo=codesandbox&logoColor=EAFF96)](https://codesandbox.io/p/github/fooorum/fooorum)
[![Gebaut mit Astro](https://custom-icon-badges.demolab.com/badge/Gebaut_mit_Astro-121212?style=for-the-badge&logo=astro&logoColor=#BC52EE)](https://astro.build)

Ein simples Internetforum.

## Features

- Browse [Beiträge](https://fooorum.vercel.app/posts), [Foren](https://fooorum.vercel.app/forums) und [Nutzer](https://fooorum.vercel.app/users).
- Sende, bewerte und kommentiere Beiträge.
- [Erstelle Nutzer](https://fooorum.vercel.app/login) mit sicherem Passwort.
- [Progressive Verbesserung](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) mit [Astro](https://astro.build) und semantischem HTML.

## Dateienstruktur

```text
/
├── db/
│   └── config.ts   # Datenbank deklarieren
│   └── seed.ts     # Datenbank initiieren
├── src/
│   └── assets/     # Statische Medien
│   └── components/ # Wiederverwendbare Komponenten
│   └── layouts/    # Gliedernde Komponenten
│   └── lib/        # Backendlogik
│   └── pages/      # Unterseiten
│   └── styles/     # Globales Design
├── astro.config.ts # Server-Konfiguration
└── package.json    # Dependencies
```
