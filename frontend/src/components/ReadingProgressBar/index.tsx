import './index.css';
import { AssignedBook } from '../../types';

interface ReadingProgressBarProps {
    books: AssignedBook[];
}

const ReadingProgressBar = ({ books }: ReadingProgressBarProps) => {
    // Подсчет количества книг по статусам
    const statusCounts = {
        completed: books.filter((book) => book.status === 'completed').length,
        reading: books.filter((book) => book.status === 'reading').length,
        not_started: books.filter((book) => book.status === 'assigned').length,
    };

    const totalBooks = books.length;

    // Проценты для каждого статуса
    const percentages = {
        completed: (statusCounts.completed / totalBooks) * 100,
        reading: (statusCounts.reading / totalBooks) * 100,
        not_started: (statusCounts.not_started / totalBooks) * 100,
    };

    return (
        <div className="progress-container">
            <h3>Прогресс чтения</h3>
            <div className="progress-bar">
                <div
                    className="progress-segment completed"
                    style={{ width: `${percentages.completed}%` }}
                    title={`Прочитано: ${statusCounts.completed}`}
                ></div>
                <div
                    className="progress-segment reading"
                    style={{ width: `${percentages.reading}%` }}
                    title={`Читаю: ${statusCounts.reading}`}
                ></div>
                <div
                    className="progress-segment not-started"
                    style={{ width: `${percentages.not_started}%` }}
                    title={`Не начато: ${statusCounts.not_started}`}
                ></div>
            </div>
            <div className="progress-legend">
                <span>
                    <span className="legend-color completed"></span> Прочитано
                </span>
                <span>
                    <span className="legend-color reading"></span> Читаю
                </span>
                <span>
                    <span className="legend-color not-started"></span> Не начато
                </span>
            </div>
        </div>
    );
};

export default ReadingProgressBar;
