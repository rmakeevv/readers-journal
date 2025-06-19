import { useEffect, useState } from 'react';
import { Button, Input, Form, message } from 'antd';
import { instance } from '../../services';
import { selectUserId } from '../../store/user/slice';
import { useSelector } from 'react-redux';
const { TextArea } = Input;

interface NoteFormProps {
    noteText: string;
    bookId: number;
}

const NoteForm = ({ noteText = '', bookId }: NoteFormProps) => {
    const [form] = Form.useForm();
    const [note, setNote] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [savedNote, setSavedNote] = useState('');
    const userId = useSelector(selectUserId);

    useEffect(() => {
        if (noteText) {
            setSavedNote(noteText);
        }
    }, [noteText]);

    const handleSubmit = async () => {
        if (!note.trim()) {
            message.warning('Заметка не может быть пустой!');
            return;
        }
        setSavedNote(note);
        try {
            await instance.post('notes', { userId, bookId, text: note });
            message.success('Заметка сохранена!');
        } catch (e) {
            console.log(e);
            message.warning('Что то пошло не так!');
        }

        setIsEditing(false);
    };

    const handleCancel = () => {
        form.resetFields();
        setNote(savedNote);
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    return (
        <div style={{ maxWidth: '600px', padding: '20px 0' }}>
            <Form form={form} layout="vertical">
                <Form.Item label="Ваша заметка" name="note">
                    <TextArea
                        rows={6}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        disabled={!isEditing && !!savedNote}
                    />
                </Form.Item>

                <div style={{ display: 'flex', gap: '10px' }}>
                    {!isEditing && savedNote ? (
                        <Button type="primary" onClick={handleEdit}>
                            Написать
                        </Button>
                    ) : (
                        <>
                            <Button type="primary" onClick={handleSubmit}>
                                Отправить
                            </Button>
                            <Button onClick={handleCancel}>Отменить</Button>
                        </>
                    )}
                </div>
            </Form>

            {savedNote && !isEditing && (
                <div
                    style={{
                        marginTop: '20px',
                        padding: '15px',
                        background: '#f5f5f5',
                        borderRadius: '4px',
                    }}
                >
                    <h3 style={{ margin: '10px 0' }}>Сохранённая заметка:</h3>
                    <p>{savedNote}</p>
                </div>
            )}
        </div>
    );
};

export default NoteForm;
