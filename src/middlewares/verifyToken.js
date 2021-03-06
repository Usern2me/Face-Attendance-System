import jwt from 'jsonwebtoken'

// 验证token的中间件
export default async function (ctx, next) {
  const authorization = ctx.get('Authorization')
  if (!authorization) {
    ctx.throw(401, `no token detected in http header 'Authorization'`)
  }
  const token = authorization.split(' ')[1]
  let tokenContent
  try {
    tokenContent = await jwt.verify(token, ctx.config.jwt.cert)
    console.log('tokenContent--->',tokenContent)
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      ctx.throw(401, 'token expried')
    }
    ctx.throw(401, 'invalid token')
  }
  ctx.token = tokenContent
  await next()
}
