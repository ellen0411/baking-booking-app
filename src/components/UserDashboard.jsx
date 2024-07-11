import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';

const UserDashboard = () => {
    const [classes, setClasses] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [newBooking, setNewBooking] = useState({ classId: '', title: '', description: '', date: '', time: '', email: '' });

    useEffect(() => {
        fetchClasses();
        fetchBookings();
    }, []);

    const fetchClasses = async () => {
        const response = await axios.get('http://localhost:5000/api/classes');
        setClasses(response.data);
    };

    const fetchBookings = async () => {
        const response = await axios.get('http://localhost:5000/api/bookings');
        setBookings(response.data);
    };

    const handleCreateBooking = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/bookings', newBooking);
        setNewBooking({ classId: '', title: '', description: '', date: '', time: '', email: '' });
        fetchBookings();
    };

    return (
        <Container>
            <h1>User Dashboard</h1>

            <Row>
                <Col>
                    <h2>Available Classes</h2>
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
                    <h2>Book a Class</h2>
                    <Form onSubmit={handleCreateBooking}>
                        <Form.Group controlId="formClassId">
                            <Form.Label>Class ID</Form.Label>
                            <Form.Control type="text" value={newBooking.classId} onChange={(e) => setNewBooking({ ...newBooking, classId: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={newBooking.title} onChange={(e) => setNewBooking({ ...newBooking, title: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={newBooking.description} onChange={(e) => setNewBooking({ ...newBooking, description: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" value={newBooking.date} onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formTime">
                            <Form.Label>Time</Form.Label>
                            <Form.Control type="time" value={newBooking.time} onChange={(e) => setNewBooking({ ...newBooking, time: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={newBooking.email} onChange={(e) => setNewBooking({ ...newBooking, email: e.target.value })} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Book Class</Button>
                    </Form>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h2>Your Bookings</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Class ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => (
                                <tr key={booking.id}>
                                    <td>{booking.id}</td>
                                    <td>{booking.classId}</td>
                                    <td>{booking.title}</td>
                                    <td>{booking.description}</td>
                                    <td>{booking.date}</td>
                                    <td>{booking.time}</td>
                                    <td>{booking.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default UserDashboard;
