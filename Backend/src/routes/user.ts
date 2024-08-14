import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt';
import z from 'zod';
import { signupInput,signinInput } from "@kongkon06/medium-common";
export const userRoute = new Hono<{
    Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string
	}
}>();
userRoute.post('/signup',async (c) => {
  const body =await c.req.json();
  const { success } = signupInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({msg:"Input error"})
  }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
    try{
    const user = await prisma.user.create({
      data:{
        email: body.email,
        name: body.name,
        password: body.password
      }
    })
    const token = await sign({id: user.id},c.env.JWT_SECRET);
    return c.json({
      jwt:token
    });
  }catch(err){
    c.status(403);
    return c.json({msg:"User already exits"});
  }  
  })
  userRoute.post('/signin', async (c) => {
    const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL	,
      }).$extends(withAccelerate());
  
      try{const body = await c.req.json();
        const sucess= signinInput.safeParse(body);
        if(!sucess){
          c.json({msg:"invalid input"});
        }
      const user = await prisma.user.findUnique({
          where: {
              email: body.email,
        password:body.password
          }
      });
  
      if (!user) {
          c.status(403);
          return c.json({ error: "user not found" });
  
      }
    const token = await sign({id: user.id},c.env.JWT_SECRET);
    return c.json({jwt:token});
  }catch(err){
      c.status(411);
      return c.json({msg:"invalid creds"})
    }
  })