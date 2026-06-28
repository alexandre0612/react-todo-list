# 📝 Todo List with React + MirageJS

A simple Todo List application built with **React**, **TypeScript**, **Axios**, and **MirageJS** to simulate a REST API.

---

## 🚀 Features
- Add new tasks  
- Mark tasks as completed  
- Delete tasks  
- Temporary persistence using `localStorage`  
- Mock API powered by MirageJS intercepting HTTP requests  

---

## 📂 Project Structure
```
src/
 ├── components/
 │    ├── InputAdd.tsx      # Input component to add tasks
 │    ├── TodoItems.tsx     # Component to render each task
 │    └── List.tsx          # Wrapper for the task list
 │
 ├── shared/
 │    └── services/
 │         └── api/
 │              └── TodoApi.ts # Axios service for API communication
 │
 ├── server.ts              # MirageJS server configuration
 ├── App.tsx                # Main application component
 └── main.tsx               # Application entry point
```

---

## ⚙️ Tech Stack
- **React** (Hooks)  
- **TypeScript**  
- **Axios** for HTTP requests  
- **MirageJS** for API mocking  
- **localStorage** for simple persistence  

---

## 🛠️ MirageJS Setup
The server is initialized in `server.ts`:

```ts
import { createServer, Model } from "miragejs";

createServer({
  models: {
    todos: Model,
  },
  routes() {
    this.namespace = "api";

    this.get("/todos", (schema) => {
      return { todos: schema.all("todos").models };
    });

    this.post("/todos", (schema, request) => {
      const attrs = JSON.parse(request.requestBody);
      return schema.create("todos", attrs);
    });

    this.put("/todos/:id", (schema, request) => {
      const id = request.params.id;
      const newAttrs = JSON.parse(request.requestBody);
      const todo = schema.find("todos", id);
      todo?.update(newAttrs);
      return todo;
    });

    this.delete("/todos/:id", (schema, request) => {
      const id = request.params.id;
      const todo = schema.find("todos", id);
      todo?.destroy();
      return {};
    });
  },
});
```

⚠️ Important: `server.ts` must be imported in `main.tsx` **before** rendering the `App`.

---

## ▶️ Getting Started
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd <project-name>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open in browser: `http://localhost:5173`

---

## 📌 Notes
- MirageJS intercepts requests to `/api/todos`.  
- Initial state is an empty array, but you can configure **seeds** to preload tasks.  
- Project uses `import type` for types (`ITodo`) due to `verbatimModuleSyntax` in `tsconfig.json`.
