import z from 'zod';
export const signupInput = z.object({
    email:z.string().email(),
    name:z.string(),
    password:z.string()
  })
export const signinInput = z.object({
    email:z.string(),
    password:z.string()
})
export const createBlog = z.object({
    title:z.string(),
    content:z.string()
})
export const updateBlog = z.object({
    title:z.string(),
    id:z.string(),
    content:z.string()
})
export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlog = z.infer<typeof createBlog>;
export type UpdateBlog = z.infer<typeof updateBlog>;