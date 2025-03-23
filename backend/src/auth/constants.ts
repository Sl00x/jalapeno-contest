const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('Invalid JWT_SECRET');
}

export const jwtConstants = {
  secret: JWT_SECRET,
};
