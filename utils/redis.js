const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
    constructor() {
        this.client = redis.createClient();

        // Handle Redis connection errors
        this.client.on('error', (err) => {
            console.error('Redis client error:', err);
        });

        // Promisify Redis client methods for async/await usage
        this.getAsync = promisify(this.client.get).bind(this.client);
        this.setAsync = promisify(this.client.set).bind(this.client);
        this.delAsync = promisify(this.client.del).bind(this.client);
    }

    isAlive() {
        // Check if the Redis client is connected and ready
        return this.client.connected;
    }

    async get(key) {
        try {
            const value = await this.getAsync(key);
            return value;
        } catch (err) {
            console.error(`Error getting key ${key} from Redis:`, err);
            return null;
        }
    }

    async set(key, value, duration) {
        try {
            await this.setAsync(key, value, 'EX', duration);
        } catch (err) {
            console.error(`Error setting key ${key} in Redis:`, err);
        }
    }

    async del(key) {
        try {
            await this.delAsync(key);
        } catch (err) {
            console.error(`Error deleting key ${key} from Redis:`, err);
        }
    }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
module.exports = redisClient;
