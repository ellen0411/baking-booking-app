import { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

const BookingForm = () => {
    const [booking, setBooking] = useState({ title: '', description: '', date: '', time: '', email: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/bookings', booking);
        setBooking({ title: '', description: '', date: '', time: '', email: '' });
        alert('Booking created successfully!');
    };

    return (
        <Container>
            <h2>Create Booking</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={booking.title}
                        onChange={(e) => setBooking({ ...booking, title: e.target.value })}
                        placeholder="Enter title"
                    />
                </Form.Group>

                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        value={booking.description}
                        onChange={(e) => setBooking({ ...booking, description: e.target.value })}
                        placeholder="Enter description"
                    />
                </Form.Group>

                <Form.Group controlId="formDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={booking.date}
                        onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                    />
                </Form.Group>

                <Form.Group controlId="formTime">
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                        type="time"
                        value={booking.time}
                        onChange={(e) => setBooking({ ...booking, time: e.target.value })}
                    />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={booking.email}
                        onChange={(e) => setBooking({ ...booking, email: e.target.value })}
                        placeholder="Enter email"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create Booking
                </Button>
            </Form>
        </Container>
    );
};

export default BookingForm;
