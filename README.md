# 🍕 Food Ordering App

> **Demo Link:** [https://food-app-redux.vercel.app/](https://food-app-redux.vercel.app/)  
> **Demo Admin Account (for testing)**
>
> - **Email:** `medo0122689@gmail.com`
> - **Password:** `asdASD123456@`
> - **Role:** `super admin`

A modern food-ordering web app built with **Next.js**. It includes full authentication flows, cart with persistence, an admin panel with role-based access (admin/super admin), and **Stripe** payments. The UI is built with **Shadcn** and animations via **Framer Motion**; forms use **React Hook Form** with **Zod** validation.

---

## 📸 Screenshots

### Admin Dashboard

![Dashboard Products Admin Page](https://res.cloudinary.com/dny22pvbp/image/upload/v1755091010/site_images/1012dac3-3a98-466c-ab44-e81513f1d39d.png)  
![Dashboard Transactions Admin Page](https://res.cloudinary.com/dny22pvbp/image/upload/v1755090971/site_images/cf1c7ba4-f2ca-4b52-9e64-7d8229ae1cf9.png)  
![Admin Dashboard Users Page](https://res.cloudinary.com/dny22pvbp/image/upload/v1755090900/site_images/983c1502-3f39-458b-ae7e-6d0bbe46ef7c.png)

### Store Pages

![Cart & Checkout Page](https://res.cloudinary.com/dny22pvbp/image/upload/v1755090962/site_images/b7de5bdb-58f8-451d-affb-fe3cfee429c1.png)  
![Register Page](https://res.cloudinary.com/dny22pvbp/image/upload/v1755090879/site_images/d6c3eb38-719a-4cb6-804e-590ed6fa6c90.png)  
![Account Page](https://res.cloudinary.com/dny22pvbp/image/upload/v1755090944/site_images/eef7fc14-f84b-486b-984f-426f680c6b7b.png)

### Mobile View

![Mobile View](https://res.cloudinary.com/dny22pvbp/image/upload/v1755090896/site_images/08527c0e-6b05-4c88-91e5-f0859272be93.png)

---

## ✨ Highlights

- 🔐 **Auth**: Login, Register, Email Verification, Forgot/Reset Password (NextAuth.js + Prisma)
- 🧺 **Cart**: Add to cart, update quantities, remove items, and persisted state (Redux Toolkit)
- 👤 **RBAC**: Role-based access (**user**, **admin**, **super admin**) with user management in the dashboard
- 💳 **Payments**: Secure checkout & payments with **Stripe**
- 🧱 **UI/UX**: **Shadcn** components, responsive layout, and **Framer Motion** animations
- ✅ **Forms**: **React Hook Form** + **Zod** schema validation
- 🗃️ **ORM/DB**: **Prisma ORM** with typed models and migrations
- ⚙️ **DX**: Type-safe codebase with **TypeScript**

---

## 🛠 Tech Stack

- **Frontend**: Next.js, TypeScript, Shadcn UI, Framer Motion
- **State Management**: Redux Toolkit (cart + persistence)
- **Auth**: NextAuth.js
- **Validation**: React Hook Form, Zod
- **Payments**: Stripe
- **Database/ORM**: Prisma ORM
- **Styling**: Tailwind CSS (with Shadcn)

---

## 🚀 Getting Started

### 1) Install dependencies

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```
