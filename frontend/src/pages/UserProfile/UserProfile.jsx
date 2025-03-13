import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, ListGroup, Form, Row, Col } from 'react-bootstrap';
import {
    FaFacebookF,
    FaLinkedinIn,
    FaTwitter,
    FaPinterestP,
    FaInstagram,
    FaYoutube,
    FaFilePdf,
    FaDownload
} from 'react-icons/fa';
import './UserProfile.css';
const UserProfile = () => {
    return (
        <div className="container-fluid padding-profile" style={{ maxWidth: '85%' }}>
            {/* Header Section */}
            <div className="row mb-4 pb-2" style={{ borderBottom: '1px solid #e0e0e0' }}>
                <div className="col-md-10 d-flex align-items-center gap-4">
                    <img
                        src="https://jobtexnextjs.vercel.app/images/user/avatar/avt-author-1.jpg"
                        alt="User Avatar"
                        className="img-fluid"
                        style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '5%' }}
                    />
                    <div >
                        <p className='badge badge-available fw-normal  rounded-pill mb-1 p-2' style={{
                            fontSize: '11px',
                        }}>Available Now</p>
                        <h1 className="fs-6 text-success">Computer Systems Analyst</h1>
                        <h2 className="fs-6 fw-bold">Maverick Nguyen</h2>
                        <div className="d-flex gap-2">
                            <div className="d-flex gap-2 align-items-center justify-content-center">
                                <p className='badge badge-background text-dark fw-normal  rounded-pill p-2'>Blender</p>
                                <p className='badge text-dark fw-normal badge-background rounded-pill p-2'>Sketch</p>
                                <p className='badge text-dark fw-normal badge-background rounded-pill p-2'>Adobe XD</p>
                                <p className='badge text-dark fw-normal badge-background rounded-pill p-2'>Figma</p>
                            </div>
                            <div className="d-flex gap-2 align-items-center justify-content-center pt-3">
                                <p className=' text-muted fw-normal text-small'>Tokyo, Japan</p>
                                <p className=' text-muted fw-normal text-small'>$300/day</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 d-flex align-items-end flex-column justify-content-center gap-2">
                    <Button variant="success" className="w-100">Download CV</Button>
                    <Button variant="outline-success" className='w-100 text-dark fw-medium'>Message</Button>
                </div>
            </div>

            <div className="row">
                <div className="col-md-8">
                    <Card className="mb-4 border-0">
                        <Card.Body >
                            <Card.Title>About Me</Card.Title>
                            <Card.Text className="text-small">
                                Are you a User Experience Designer with a track record of delivering intuitive digital experiences that drive results? Are you a strategic storyteller and systems thinker who can concept and craft smart, world-class campaigns across a variety of mediums? <br /><br />

                                Deloitte's Green Dot Agency is looking to add a Lead User Experience Designer to our experience design team. We want a passionate creative who's inspired by new trends and emerging technologies, and is able to integrate them into memorable user experiences. A problem solver who is entrepreneurial, collaborative, hungry, and humble; can deliver beautifully designed, leading-edge experiences under tight deadlines; and who has demonstrated proven expertise.

                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card className="mb-4 border-0">
                        <Card.Body >
                            <Card.Title className='mb-3'>Education</Card.Title>
                            <ListGroup variant="flush" style={{ borderLeft: '1px solid #e0e0e0' }} className='pl-3'>
                                <ListGroup.Item className='border-0'>
                                    <div className="d-flex gap-2">
                                        <h5 className='text-small fw-bold text-dark'>FPI University</h5>
                                        <h5 className='text-small fw-bold text-dark'>2019-2021</h5>
                                    </div>
                                    <h6 className="mb-1 fw-bold text-dark">Graphic Design</h6>
                                    <p className='text-small'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                                </ListGroup.Item>
                                <ListGroup.Item className='border-0'>
                                    <div className="d-flex gap-2">
                                        <h5 className='text-small fw-bold text-dark'>FPI University</h5>
                                        <h5 className='text-small fw-bold text-dark'>2019-2021</h5>
                                    </div>
                                    <h6 className="mb-1">Graphic Design</h6>
                                    <p className='text-small'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>

                    <Card className="mb-4 border-0">
                        <Card.Body >
                            <Card.Title className='mb-3'>Experience</Card.Title>
                            <ListGroup variant="flush" style={{ borderLeft: '1px solid #e0e0e0' }} className='pl-3'>
                                <ListGroup.Item className='border-0'>
                                    <div className="d-flex gap-2">
                                        <h5 className='text-small fw-bold text-dark'>FPT University</h5>
                                        <h5 className='text-small fw-bold text-dark'>2019-2021</h5>
                                    </div>
                                    <h6 className="mb-1">Graphic Design</h6>
                                    <p className='text-small'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                                </ListGroup.Item>
                                <ListGroup.Item className='border-0'>
                                    <div className="d-flex gap-2">
                                        <h5 className='text-small fw-bold text-dark'>FPT University</h5>
                                        <h5 className='text-small fw-bold text-dark'>2019-2021</h5>
                                    </div>
                                    <h6 className="mb-1">Graphic Design</h6>
                                    <p className='text-small'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>

                    <Card className='mx-3'>
                        <Card.Body>
                            <Card.Title className="mb-4">Contact Candidate</Card.Title>

                            <Form>
                                {/* Row for Subject and Name */}
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Group controlId="formSubject">
                                            <Form.Label>Subject</Form.Label>
                                            <Form.Control type="text" placeholder="Subject" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formName">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" placeholder="Name" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                {/* Email Field */}
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Email" />
                                </Form.Group>

                                {/* Message Field */}
                                <Form.Group className="mb-4" controlId="formMessage">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control as="textarea" rows={4} placeholder="Message..." />
                                </Form.Group>

                                {/* Submit Button */}
                                <Button variant="success" type="submit">
                                    Send Private Message
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                </div>

                {/* Sidebar */}
                <div className="col-md-4">
                    <Card>
                        <Card.Body style={{ backgroundColor: '#F5F5F5' }} className='p-3'>
                            <div className="d-flex justify-content-between border-bottom mb-2 pb-0">
                                <Card.Text className='text-small'>Career Finding</Card.Text>
                                <Card.Text className='text-small fw-medium text-dark'>UI UX Designer</Card.Text>
                            </div>
                            <div className="d-flex justify-content-between border-bottom mb-2 pb-0">
                                <Card.Text className='text-small'>Location</Card.Text>
                                <Card.Text className='text-small fw-medium text-dark'>Hanoi City, Viet Nam</Card.Text>
                            </div>
                            <div className="d-flex justify-content-between border-bottom mb-2 pb-0">
                                <Card.Text className='text-small'>Phone</Card.Text>
                                <Card.Text className='text-small fw-medium text-dark'>123.456.7890</Card.Text>
                            </div>
                            <div className="d-flex justify-content-between border-bottom mb-2 pb-0">
                                <Card.Text className='text-small'>Offered Salary                                </Card.Text>
                                <Card.Text className='text-small fw-medium text-dark'>$2500/Month</Card.Text>
                            </div>

                            <div className="d-flex justify-content-between border-bottom mb-2 pb-0">
                                <Card.Text className='text-small'>Experience time
                                </Card.Text>
                                <Card.Text className='text-small fw-medium text-dark'>5 Years                                </Card.Text>
                            </div>

                            <div className="d-flex justify-content-between border-bottom mb-2 pb-0">
                                <Card.Text className='text-small'>Age
                                </Card.Text>
                                <Card.Text className='text-small fw-medium text-dark'>26 Years Old

                                </Card.Text>
                            </div>

                            <div className="d-flex justify-content-between border-bottom mb-2 pb-0">
                                <Card.Text className='text-small'>Qualification                                </Card.Text>
                                <Card.Text className='text-small fw-medium text-dark'>Master Degree</Card.Text>
                            </div>


                            <div className="d-flex align-items-center">
                                <h6 className="me-3 mb-0">Socials:</h6>
                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
                                        style={{ width: '36px', height: '36px' }}
                                    >
                                        <FaFacebookF />
                                    </button>
                                    <button
                                        className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
                                        style={{ width: '36px', height: '36px' }}
                                    >
                                        <FaLinkedinIn />
                                    </button>
                                    <button
                                        className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
                                        style={{ width: '36px', height: '36px' }}
                                    >
                                        <FaTwitter />
                                    </button>
                                    <button
                                        className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
                                        style={{ width: '36px', height: '36px' }}
                                    >
                                        <FaPinterestP />
                                    </button>
                                    <button
                                        className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
                                        style={{ width: '36px', height: '36px' }}
                                    >
                                        <FaInstagram />
                                    </button>
                                    <button
                                        className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
                                        style={{ width: '36px', height: '36px' }}
                                    >
                                        <FaYoutube />
                                    </button>
                                </div>
                            </div>

                            <div className="card mt-3" style={{ maxWidth: '350px' }}>
                                <div className="card-body d-flex align-items-center justify-content-between">
                                    <div>
                                        <p className="mb-1 text-muted text-small">SAMPLE_CV_JOBITEX</p>
                                        <p className="mb-0 text-muted fs-6 fw-bold">PDF</p>
                                    </div>
                                    <FaFilePdf size={28} color="#0D6EFD" />
                                </div>
                            </div>

                            <button className="btn btn-success d-inline-flex align-items-center justify-content-center mt-3 w-100" >
                                <FaDownload className="me-2" />
                                Download CV
                            </button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div >
    );
};

export default UserProfile;