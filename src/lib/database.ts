import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sqte',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const db = {
  async query(sql: string, params?: any[]) {
    const [rows] = await pool.execute(sql, params);
    return rows;
  },

  async getUser(email: string) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  },

  async createUser(user: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    pole?: string;
  }) {
    const [result] = await pool.execute(
      `INSERT INTO users (email, password, first_name, last_name, phone, pole)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [user.email, user.password, user.firstName, user.lastName, user.phone, user.pole]
    );
    return result;
  },

  async createPasswordReset(userId: string) {
    const token = crypto.randomUUID();
    await pool.execute(
      `INSERT INTO password_resets (user_id, token)
       VALUES (?, ?)`,
      [userId, token]
    );
    return token;
  },

  async verifyPasswordReset(token: string) {
    const [rows] = await pool.execute(
      `SELECT * FROM password_resets 
       WHERE token = ? AND used = 0 AND expires_at > NOW()`,
      [token]
    );
    return rows[0];
  },

  async createAdminNotification(notification: {
    type: string;
    title: string;
    content: string;
  }) {
    const [result] = await pool.execute(
      `INSERT INTO admin_notifications (type, title, content)
       VALUES (?, ?, ?)`,
      [notification.type, notification.title, notification.content]
    );
    return result;
  }
};