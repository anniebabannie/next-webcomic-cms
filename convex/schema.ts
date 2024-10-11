import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  chapters: defineTable({
    name: v.string(),
  }),
  pages: defineTable({
    number: v.number(),
    img: v.string(),
    chapterId: v.id("chapters"),
    published: v.boolean(),
    archived: v.boolean(),
  }).index("chapterId", ["chapterId"])
});