import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createTodo = mutation({
  args: { text: v.string(), date: v.string(), status: v.string() },
  handler: async (ctx, args) => {
    const newTodo = await ctx.db.insert("todos", {
      text: args.text,
      date: args.date,
      status: args.status,
    });
    return newTodo;
  },
});

export const getTodos = query({
  handler: async (ctx, args) => {
    const tasks = await ctx.db.query("todos").order("desc").take(100);
    return tasks;
  },
});

export const deleteTodo = mutation({
  args: { todoId: v.id("todos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.todoId);
  },
});

export const modifyTodo = mutation({
  args: {
    todoId: v.id("todos"),
    text: v.optional(v.string()),
    status: v.optional(v.string()),
    date: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const payload: {
      [key: string]: any;
    } = {};
    if (args.text) {
      payload["text"] = args.text;
    }
    if (args.status) {
      payload["status"] = args.status;
    }
    if (args.date) {
      payload["date"] = args.date;
    }
    await ctx.db.patch(args.todoId, payload);
  },
});
