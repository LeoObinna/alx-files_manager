import { dbClient } from '../utils/db.js';

class AppController {
  static getStatus(req, res) {
    res.status(200).json({
      db: dbClient.isAlive(),
    });
  }

  static async getStats(req, res) {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();

    res.status(200).json({
      users,
      files
    });
  }
}

export default AppController;
