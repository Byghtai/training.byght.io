import jwt from 'jsonwebtoken';
import { validateTrainingPassword, initDatabase } from './db.js';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Initialize database (creates tables if not present)
    console.log('Initializing database on login...');
    await initDatabase();
    console.log('Database initialization completed');

    const { password } = await req.json();

    // Validate training password
    const validation = await validateTrainingPassword(password);
    if (!validation.valid) {
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate JWT token for training access
    const token = jwt.sign(
      { 
        userId: 'training_user',
        username: 'Training User',
        isAdmin: false,
        passwordId: validation.passwordId,
        expiryDate: validation.expiryDate
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return new Response(JSON.stringify({
      token,
      username: 'Training User',
      userId: 'training_user',
      isAdmin: false,
      passwordId: validation.passwordId,
      expiryDate: validation.expiryDate
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: error.stack,
      step: 'login_error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
