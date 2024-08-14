import { createBlog, updateBlog } from '@kongkon06/medium-common';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from "hono";
import { sign, verify } from 'hono/jwt';
export const blogRoute= new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    },
    Variables:{
      userId:string}
}>();
blogRoute.use('/*', async (c, next) => {
  const headers = c.req.header('authorization') || "";
  const token = headers.split(" ")[1];
  
  try {
      const user = await verify(token, c.env.JWT_SECRET);
      if (user && typeof user.id === 'string') {
          c.set("userId", user.id);
          await next();
      } else {
          c.status(404);
          return c.json({ msg: "Not authorized" });
      }
  } catch (error) {
      c.status(403);
      return c.json({ msg: "middleware error" });
  }
});
  blogRoute.post('/blog',async (c) => {
    const body = await c.req.json();
    try{const authorId= c.get("userId");
      const success=createBlog.safeParse(body);
      if(!success){
        c.json({msg:"Invalid input"});
      }
    const prisma= new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blog = await prisma.post.create({
      data:{
        title: body.title,
        content: body.content,
        authorId: authorId
      }
    })
    return c.json({Id:blog.id});}catch(e){
      c.json({msg:"unexpected error"})
    }
  })
  blogRoute.put('/blog',async (c) => {
    const body = await c.req.json();
    const authorId= c.get("userId");
    const prisma= new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try{
      const success=updateBlog.safeParse(body);
      const blog = await prisma.post.update({
      where:{
        id:body.id
      },
      data:{
        title: body.title,
        content: body.content,
        authorId: authorId
      }
    })
    return c.json({Id:blog.id});}catch(e){
      c.json({
        msg:"unexpected error"
      })
    }
  })
  blogRoute.get('/bulk',async (c) => {
    const prisma= new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogs = await prisma.post.findMany({
      select:{
        content:true,
        title:true,
        id:true,
        author:{
          select:{
            name:true
          }
        }
      }
    })
    return c.json({blogs});
  })
  blogRoute.get('/:id',async (c) => {
    try{
      const id = c.req.param("id");
    const prisma= new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blog = await prisma.post.findFirst({
      where:{
        id:id
      },select:{
        content:true,
        title:true,
        id:true,
        author:{
          select:{
            name:true
          }
        }
      }
    })
    return c.json({blog});
    }catch(e){
      return c.json({
        msg:'error fetching'
      })
    }
  })
  // todo add pagination
