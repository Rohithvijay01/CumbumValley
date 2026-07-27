# AgriConnect Plan

## Goal
Build a MERN-stack agricultural marketplace for farmers in Theni and Idukki to sell produce directly to buyers. The MVP will use Cash-on-Delivery (no payment gateway), basic order management, and an English-only UI.

## Project Type
WEB (MERN Stack)

## Success Criteria
- [ ] Users can register/login as Admin, Farmer, or Buyer
- [ ] Farmers can list and manage products
- [ ] Buyers can browse products and place orders
- [ ] Admins can verify farmers

## Tech Stack
- Frontend: React (Vite), Tailwind CSS, React Router, Redux Toolkit, Axios, React Hook Form, Zod
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, Helmet, Morgan
- Tools: ESLint, Prettier

## File Structure
```
agriconnect/
├── client/
└── server/
```

## Tasks
- [x] Task 1: Initialize Backend Foundation → Verify: Server starts on port 5000 (Agent: backend-specialist, Skill: app-builder)
- [x] Task 2: Implement User & Auth Models + APIs → Verify: Can register and login via API (Agent: backend-specialist, Skill: api-patterns)
- [x] Task 3: Initialize Frontend Foundation → Verify: Vite React app runs (Agent: frontend-specialist, Skill: app-builder)
- [x] Task 4: Implement Frontend Auth UI & Routing → Verify: Can login and see protected dashboard (Agent: frontend-specialist, Skill: frontend-design)
- [x] Task 5: Implement Product & Order CRUD Backend → Verify: APIs return 200/201 (Agent: backend-specialist, Skill: api-patterns)
- [x] Task 6: Implement Product & Order UI → Verify: Can list product and place order (Agent: frontend-specialist, Skill: frontend-design)
- [x] Task 7: Polish UI/UX and Dashboards → Verify: Responsive and clean design (Agent: frontend-specialist, Skill: ui-styling)

## Phase X: Verification
- [ ] Lint: Pass
- [ ] Security: No critical issues
- [ ] Build: Success
