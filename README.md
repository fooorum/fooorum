# 🇫ooorum

[![Website öffnen](https://custom-icon-badges.demolab.com/badge/Website_öffnen-121212?style=for-the-badge&logo=globe&logoColor=ce93d8)](https://fooorum.vercel.app)
[![Mit CodeSandbox öffnen](https://custom-icon-badges.demolab.com/badge/Mit_CodeSandbox_öffnen-121212?style=for-the-badge&logo=codesandbox&logoColor=EAFF96)](https://codesandbox.io/p/github/fooorum/fooorum)
[![Mit Astro erstellt](https://custom-icon-badges.demolab.com/badge/Mit_Astro_erstellt-121212?style=for-the-badge&logo=astro&logoColor=#BC52EE)](https://astro.build)

Ein simples Internetforum.

## Features

- Browse [Beiträge](https://fooorum.vercel.app/posts), [Foren](https://fooorum.vercel.app/forums) und [Nutzer](https://fooorum.vercel.app/users).
- [Erstelle und verwende Nutzer](https://fooorum.vercel.app/login)
- Sende, bewerte und kommentiere Beiträge als Nutzer.

## Tech Stack

- [Astro](https://astro.build) als vielfältiges Webframework
- [Drizzle ORM](https://orm.drizzle.team) als SQL-Wrapper
- [Lucia](https://lucia-auth.com) zur sicheren Nutzerauthentifizierung
- Material Design [Palette](https://m3.material.io/styles/color/static/baseline) und [Icons](https://m3.material.io/styles/icons/overview)

## Struktur

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
