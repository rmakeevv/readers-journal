import { pool } from '../db.js';

export class ModelHelper {
    constructor(tableName) {
        this.tableName = tableName;
    }

    async findAll() {
        try {
            const data = await pool.query(
                `SELECT * FROM "${this.tableName}" ORDER BY id DESC;`
            );
            return data.rows;
        } catch (error) {
            console.error(`Error getting all from ${this.tableName}:`, error);
            throw error; // Пробрасываем ошибку для обработки выше
        }
    }

    async findOne(conditions) {
        if (!conditions || typeof conditions !== 'object') {
            throw new Error('Conditions must be an object');
        }

        const keys = Object.keys(conditions);
        if (keys.length === 0) {
            throw new Error('At least one condition is required');
        }

        // Создаем массив значений для подстановки
        const values = keys.map((key) => conditions[key]);

        // Создаем часть WHERE запроса (например, "column1 = $1 AND column2 = $2")
        const whereClause = keys
            .map((key, index) => `${key} = $${index + 1}`)
            .join(' AND ');

        try {
            const data = await pool.query(
                `SELECT * FROM "${this.tableName}" WHERE ${whereClause} LIMIT 1;`,
                values
            );

            return data.rows[0] || null;
        } catch (error) {
            console.error('Error in findOne:', error);
            throw error;
        }
    }
}
