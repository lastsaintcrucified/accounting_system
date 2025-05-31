# 📘 Project Workspace: Minimal Accounting System

### 🛠 Tech Stack:

- **Next.js (App Router)**
- **Tailwind CSS**
- **TypeScript**
- **Prisma**
- **SQLite/PostgreSQL** (local vs production)
- **v0.dev** (for UI scaffolding)

---

## ✅ Project Overview

This project is a simplified accounting system with two main features:

- **Chart of Accounts**: Manage different types of accounts
- **Journal Entry**: Record accounting entries with double-entry validation

---

## ✅ Node modules install

- **NodeModules**:

  ```bash
  npm install --legacy-peer-deps

  ```

---

## ✅ Environment settings

- **DATABASE_URL**:
  postgres://postgres:[your_password]@localhost:5432/[database_name]

### 📁 Project Folder Structure

---

```bash
.
├── app
│   ├── accounts
│   │   ├── page.tsx              # View all accounts
│   │   ├── new.tsx               # Add account form
│   │   └── [id]
│   │       └── edit.tsx          # Edit account
│   ├── journal
│   │   ├── page.tsx              # View all journal entries
│   │   └── new.tsx               # Add new journal entry
│   └── api
│       ├── accounts              # API endpoints for accounts
│       └── journal-entries       # API endpoints for journal entries
│
├── components
│   ├── AccountForm.tsx
│   ├── JournalEntryForm.tsx
│   └── JournalLineItem.tsx
│
├── prisma
│   └── schema.prisma
│
├── lib
│   └── validators.ts             # Logic for entry balancing
│
├── utils
│   └── db.ts                     # Prisma client
│
└── types
    └── index.ts                  # Shared types/interfaces
```

---

## 👨‍💻 Team Workflow & Task Assignments

| Task                  | Description                                                                                                                                | Assignee        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| **Setup**             | Initialize `Next.js`, Tailwind CSS, Prisma, TypeScript. Use SQLite for local dev. Add project README.                                      | `@junior-dev-A` |
| **Models**            | Define `Account`, `JournalEntry`, and `JournalLine` models in `schema.prisma`. Run migrations and seed sample data.                        | `@junior-dev-B` |
| **Chart of Accounts** | Create CRUD API routes and React pages for managing accounts. Use `/app/accounts` structure.                                               | `@junior-dev-A` |
| **Journal Entry**     | Create a form for journal entries with line items. Store entries and lines in DB. Use `/app/journal/new.tsx`.                              | `@junior-dev-B` |
| **Validation Logic**  | Implement `lib/validators.ts` to ensure total debit === total credit before submission.                                                    | `@junior-dev-A` |
| **UI via v0.dev**     | Use [v0.dev](https://v0.dev) to design both Chart of Accounts and Journal Entry forms. Refactor into reusable components in `/components`. | `@junior-dev-B` |
| **Testing**           | Manually test full workflow: account creation/edit/delete, journal entry creation, double-entry validation.                                | `@junior-dev-A` |
| **Polish**            | Ensure mobile responsiveness, form validation messages, button states (loading, disabled), and error displays.                             | `@junior-dev-B` |

---

## 🔗 Helpful Links

- [v0.dev](https://v0.dev) – use for generating clean Tailwind UI components
- [Prisma Docs](https://www.prisma.io/docs)
- [Next.js App Router Docs](https://nextjs.org/docs/app/building-your-application/routing)

---

## ✅ Completion Checklist for Dev-A and Dev-B

- [ ] 🛠 Project initialized with base config (Next.js, Tailwind, TypeScript,
      Prisma) — **@junior-dev-A**
- [ ] 🗂 Prisma models defined and DB migrated (`Account`, `JournalEntry`,
      `JournalLine`) — **@junior-dev-B**
- [ ] 🧾 Account CRUD (API routes + UI pages) — **@junior-dev-A**
- [ ] 📥 Journal Entry form + save logic with multiple lines — **@junior-dev-B**
- [ ] ✅ Entry validation (ensure total debit equals credit) — **@junior-dev-A**
- [ ] 🎨 UI responsive and user-friendly (via v0.dev + Tailwind polish) —
      **@junior-dev-B**
- [ ] 🧪 Basic test cases manually verified for account and journal workflows —
      **@junior-dev-A**
