import { useState, useEffect } from 'react';
import { getAnnouncements, createAnnouncement } from '../services/api';

const AdminDashboard = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '', date: '' });

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const data = await getAnnouncements();
                setAnnouncements(data);
            } catch (error) {
                console.error('Error fetching announcements:', error);
            }
        };

        fetchAnnouncements();
    }, []);

    const handleCreateAnnouncement = async () => {
        try {
            const createdAnnouncement = await createAnnouncement(newAnnouncement);
            setAnnouncements([...announcements, createdAnnouncement]);
        } catch (error) {
            console.error('Error creating announcement:', error);
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
                <h2>Create Announcement</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Content"
                    value={newAnnouncement.content}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Date"
                    value={newAnnouncement.date}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, date: e.target.value })}
                />
                <button onClick={handleCreateAnnouncement}>Create</button>
            </div>
            <div>
                <h2>Announcements</h2>
                <ul>
                    {announcements.map((announcement) => (
                        <li key={announcement.id}>
                            <h3>{announcement.title}</h3>
                            <p>{announcement.content}</p>
                            <p>{announcement.date}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;
