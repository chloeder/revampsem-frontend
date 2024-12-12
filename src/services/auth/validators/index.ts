import {z} from "zod";

export const authSchema = z.object({
   username: z.string().min(3, {
      message: "Username must be at least 3 characters"
   }).max(255, {
      message: "Username must be at most 255 characters"
   }).nonempty({
      message: "Username cannot be empty"
   }),
   password: z.string().min(6, {
      message: "Password must be at least 6 characters"
   }).max(255, {
      message: "Password must be at most 255 characters"
   }).nonempty({
      message: "Password cannot be empty"
   }),
})