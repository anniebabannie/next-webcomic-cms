import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("pages").collect();
  },
});

export const createPage = mutation({
  args: { 
    number: v.number(),
    img: v.string(),
    chapterId: v.id("chapters"),
    published: v.boolean(),
  },
  handler: async (ctx, args) => {
    const newPageId = await ctx.db.insert("pages", { 
      number: args.number,
      img: args.img,
      chapterId: args.chapterId,
      published: args.published,
      archived: false,
     });
    return newPageId;
  },
});


export const archivePage = mutation({
  args: { id: v.id("pages") },
  handler: async (ctx, args) => {
    const newPageId = await ctx.db.patch(args.id, { archived: true });
    return newPageId;
  },
});