import { createServer, Model } from "miragejs";

createServer({
  models: {
    todos: Model,
  },

  routes() {
    this.namespace = "api";

    this.get("/todos", (schema) => {
      return schema.all("todos");
    });

    this.post("/todos", (schema, req) => {
      const atts = JSON.parse(req.requestBody);
      return schema.create("todos", atts);
    });

    this.put("/todos/: id", (schema, req) => {
      const id = req.params.id;
      const newAtts = JSON.parse(req.requestBody);

      const todo = schema.find("todos", id);
      todo?.update(newAtts);

      return {};
    });

    this.delete("/todos/: id", (schema, req) => {
      const id = req.params.id;

      const todo = schema.find("todos", id);
      todo?.destroy();

      return {};
    });
  },
});
