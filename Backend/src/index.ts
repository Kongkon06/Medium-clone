import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Jwt } from 'hono/utils/jwt';
import { sign, verify } from 'hono/jwt';
import { userRoute } from './routes/user';
import { blogRoute } from './routes/blog';
import { cors } from 'hono/cors';
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string
	},
  Varibles :{
    userid : string
  }
}>();
app.use('/*',cors());
app.route('/api/v1/user',userRoute);
app.route('/api/v1/blogs', blogRoute);


export default app
