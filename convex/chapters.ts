import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("chapters").collect();
  },
});

export const createChapter = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const newChapterId = await ctx.db.insert("chapters", { name: args.name });
    return newChapterId;
  },
});

// this deletes the chapter, but archives the pages
export const deleteChapter = mutation({
  args: { id: v.id("chapters") },
  handler: async (ctx, args) => {
    const pages = await ctx.db.query("pages").collect();
    for (const page of pages) {
      if (page.chapterId === args.id) {
        await ctx.db.patch(page._id, { archived: true });
      }
    }
    await ctx.db.delete(args.id);
    return args.id;
  },
});