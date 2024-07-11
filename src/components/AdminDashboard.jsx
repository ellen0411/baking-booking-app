import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [classes, setClasses] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [newClass, setNewClass] = useState({ title: '', description: '', date: '', time: '', instructor: '' });

    useEffect(() => {
        fetchBookings();
        fetchClasses();
        fetchAnnouncements();
    }, []);

    const fetchBookings = async () => {
        const response = await axios.get('http://localhost:5000/api/bookings');
        setBookings(response.data);
    };

    const fetchClasses = async () => {
        const response = await axios.get('http://localhost:5000/api/classes');
        setClasses(response.data);
    };

    const fetchAnnouncements = async () => {
        const response = await axios.get('http://localhost:5000/api/announcements');
        setAnnouncements(response.data);
    };

    const handleCreateClass = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/classes', newClass);
        setNewClass({ title: '', description: '', date: '', time: '', instructor: '' });
        fetchClasses();
    };

    return (
        <Container>
            <h1>Admin Dashboard</h1>

            <Row>
                <Col>
                    <h2>Bookings</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => (
                                <tr key={booking.id}>
                                    <td>{booking.id}</td>
                                    <td>{booking.title}</td>
                                    <td>{booking.description}</td>
                                    <td>{booking.date}</td>
                                    <td>{booking.time}</td>
                                    <td>{booking.email}</td>
                                    <td>
                                        <Button variant="warning">Edit</Button>{' '}
                                        <Button variant="danger">Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h2>Create New Class</h2>
                    <Form onSubmit={handleCreateClass}>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={newClass.title} onChange={(e) => setNewClass({ ...newClass, title: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={newClass.description} onChange={(e) => setNewClass({ ...newClass, description: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" value={newClass.date} onChange={(e) => setNewClass({ ...newClass, date: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formTime">
                            <Form.Label>Time</Form.Label>
                            <Form.Control type="time" value={newClass.time} onChange={(e) => setNewClass({ ...newClass, time: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formInstructor">
                            <Form.Label>Instructor</Form.Label>
                            <Form.Control type="text" value={newClass.instructor} onChange={(e) => setNewClass({ ...newClass, instructor: e.target.value })} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Create Class</Button>
                    </Form>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h2>Classes</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Instructor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map(classItem => (
                                <tr key={classItem.id}>
                                    <td>{classItem.id}</td>
                                    <td>{classItem.title}</td>
                                    <td>{classItem.description}</td>
                                    <td>{classItem.date}</td>
                                    <td>{classItem.time}</td>
                                    <td>{classItem.instructor}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h2>Announcements</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {announcements.map(announcement => (
                                <tr key={announcement.id}>
                                    <td>{announcement.id}</td>
                                    <td>{announcement.title}</td>
                                    <td>{announcement.content}</td>
                                    <td>{announcement.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboard;
