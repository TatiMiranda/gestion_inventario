import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

export function sign(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
}

export function verify(token) {
  return jwt.verify(token, JWT_SECRET);
}
