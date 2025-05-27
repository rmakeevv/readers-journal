import { pool } from '../db.js';
import e from 'express';

export const User = {
    findOneByEmail: async (email) => {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1;',
            [email]
        );
        return result.rows[0];
    },
    findOneById: async (id) => {
        const result = await pool.query('SELECT * FROM users WHERE id = $1;', [
            id,
        ]);
        return result.rows[0];
    },
    create: async ({ name, last_name, role, email, password, parent_id }) => {
        const text =
            'INSERT INTO users(name, last_name, role, email, password, parent_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
        const values = [name, last_name, role, email, password, parent_id];

        const query = {
            name: 'register',
            text,
            values,
        };

        const result = await pool.query(query);
        return result.rows[0];
    },
    update: async (id, { name, last_name, role, email, password }) => {
        // Создаем массив для хранения обновляемых полей и их значений
        const updates = [];
        const values = [];
        let paramIndex = 1; // Начинаем с $1 для параметров

        // Добавляем поля в запрос только если они переданы
        if (name !== undefined) {
            updates.push(`name = $${paramIndex}`);
            values.push(name);
            paramIndex++;
        }

        if (last_name !== undefined) {
            updates.push(`last_name = $${paramIndex}`);
            values.push(last_name);
            paramIndex++;
        }

        if (role !== undefined) {
            updates.push(`role = $${paramIndex}`);
            values.push(role);
            paramIndex++;
        }

        if (email !== undefined) {
            updates.push(`email = $${paramIndex}`);
            values.push(email);
            paramIndex++;
        }

        if (password !== undefined) {
            updates.push(`password = $${paramIndex}`);
            values.push(password); // Предполагается, что пароль уже хэширован
            paramIndex++;
        }

        // Если нечего обновлять
        if (updates.length === 0) {
            throw new Error('No fields to update');
        }

        // Добавляем ID в конец массива values
        values.push(id);

        const text = `
            UPDATE users 
            SET ${updates.join(', ')}
            WHERE id = $${paramIndex}
            RETURNING *
        `;

        const query = {
            name: 'update-user',
            text,
            values,
        };

        const result = await pool.query(query);
        return result.rows[0];
    },
    async getChildrenWithAssignedBooks(parentId) {
        try {
            // 1. Получаем всех детей данного родителя
            const childrenQuery = `
        SELECT id, name, last_name, email 
        FROM users 
        WHERE parent_id = $1 AND role = 'student'
      `;
            const childrenResult = await pool.query(childrenQuery, [parentId]);
            const children = childrenResult.rows;

            // 2. Для каждого ребенка получаем назначенные книги
            for (const child of children) {
                const booksQuery = `
                  SELECT b.id, b.name, b.author, ab.status
                  FROM AssignedBooks ab
                  JOIN Books b ON ab.book_id = b.id
                  WHERE ab.child_id = $1
                  ORDER BY ab.id DESC
                `;
                const booksResult = await pool.query(booksQuery, [child.id]);
                child.assignedBooks = booksResult.rows;
            }

            return children;
        } catch (error) {
            throw new Error(
                `Error fetching children with books: ${error.message}`
            );
        }
    },
    getAllChildrenByParentId: async (parentId) => {
        try {
            // 1. Получаем всех детей данного родителя
            const childrenQuery = `
        SELECT id, name, last_name, email 
        FROM users 
        WHERE parent_id = $1 AND role = 'student'
      `;
            const childrenResult = await pool.query(childrenQuery, [parentId]);
            return childrenResult.rows;
        } catch (error) {
            throw new Error(
                `Error fetching children with books: ${error.message}`
            );
        }
    },
    assignBook: async (parentId, childId, bookId) => {
        try {
            const text =
                'INSERT INTO AssignedBooks(id, child_id,  book_id, assigned_by, status) VALUES($1, $2, $3, $4, $5) RETURNING *';
            const values = [
                childId + bookId,
                childId,
                bookId,
                parentId,
                'assigned',
            ];

            const query = {
                name: 'assign-book',
                text,
                values,
            };

            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw new Error(
                `Error fetching children with books: ${error.message}`
            );
        }
    },
    startReadingBook: async (parentId, childId, bookId) => {
        try {
            // Проверяем, назначена ли книга ребенку в любом статусе
            const checkQuery = {
                text: 'SELECT id FROM AssignedBooks WHERE book_id = $1 AND child_id = $2',
                values: [bookId, childId],
            };
            const checkResult = await pool.query(checkQuery);

            if (checkResult.rows.length > 0) {
                // Если книга уже назначена, обновляем статус
                const updateQuery = {
                    text: `
                    UPDATE AssignedBooks 
                    SET status = $1
                    WHERE book_id = $2 AND child_id = $3
                    RETURNING *
                `,
                    values: ['reading', bookId, childId],
                };

                const updateResult = await pool.query(updateQuery);
                return updateResult.rows;
            }

            const text =
                'INSERT INTO AssignedBooks(id, child_id,  book_id, assigned_by, status) VALUES($1, $2, $3, $4, $5) RETURNING *';
            const values = [
                childId + bookId,
                childId,
                bookId,
                parentId,
                'reading',
            ];

            const query = {
                name: 'reading-book',
                text,
                values,
            };

            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw new Error(`Error fetching: ${error.message}`);
        }
    },
    getAssignedBooksByChildId: async (childId) => {
        try {
            const getBookIdQuery = {
                text: 'SELECT book_id FROM AssignedBooks WHERE child_id = $1',
                values: [childId],
            };
            const getBookIdResult = await pool.query(getBookIdQuery);
            const bookId = getBookIdResult.rows[0].book_id;

            const getBookDataQuery = {
                text: 'SELECT * FROM books WHERE id = $1',
                values: [bookId],
            };
            const getResult = await pool.query(getBookDataQuery);

            return getResult.rows;
        } catch (e) {
            throw new Error(`Error fetching: ${e.message}`);
        }
    },
};
