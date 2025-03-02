import React, { useState, useEffect } from 'react';
import { FiCamera } from 'react-icons/fi';
import { Form, Button, Card, Badge, ListGroup } from 'react-bootstrap';
import "./UserProfile.css"
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

import bg1 from "../../../public/asset/images/default-profile.jpg"
const UserProfileSettings = () => {

    // const [phone, setPhone] = useState("");
    // const [address, setAddress] = useState("");
    // const [avatar, setAvatar] = useState(null);
    // const [showModal, setShowModal] = useState(false);
    // const [avatarFile, setAvatarFile] = useState(null);
    // const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);
    // const [isUpdating, setIsUpdating] = useState(false);
    // const [name, setName] = useState("");
    // const [cmnd, setCmnd] = useState("");
    // const [id, setId] = useState("");
    // const [email, setEmail] = useState("");
    // useEffect(() => {
    //     fetchCurrentUser();
    // }, []);

    // const fetchCurrentUser = async () => {
    //     try {
    //         const response = await axiosInstance.get("/customer/current-user");
    //         const userData = response.data.user;
    //         setPhone(userData.phone || "");
    //         setAddress(userData.address || "");
    //         setAvatar(userData.image?.url || null);
    //         setName(userData.name || "");
    //         setCmnd(userData.cmnd || "");
    //         setId(userData._id);
    //         setEmail(userData.email);
    //     } catch (error) {
    //         toast.error("Error fetching user data");
    //         console.log(error);
    //     }
    // };
    // // Handle profile update
    // const handleUpdateProfile = async (e) => {
    //     e.preventDefault();

    //     const updates = {};
    //     if (phone) updates.phone = phone;
    //     if (address) updates.address = address;
    //     if (name) updates.name = name;
    //     if (cmnd) updates.cmnd = cmnd;
    //     if (Object.keys(updates).length === 0) {
    //         toast.error("No data provided for update");
    //         return;
    //     }

    //     setIsUpdating(true);
    //     try {
    //         await axiosInstance.patch(`/customer/update-profile`, updates);
    //         toast.success("Profile updated successfully");
    //         await fetchCurrentUser(); // Will update both profile and navbar
    //         console.log("Profile updated successfully");
    //     } catch (error) {
    //         console.log(error);
    //         toast.error("Failed to update profile");
    //     } finally {
    //         setIsUpdating(false);
    //     }
    // };

    // // Handle avatar update
    // const handleAvatarUpdate = async (e) => {
    //     e.preventDefault();
    //     if (!avatarFile) {
    //         toast.error("Please select an image");
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append("image", avatarFile);

    //     setIsUploadingAvatar(true);
    //     try {
    //         const response = await axiosInstance.put(`/customer/update-avatar/${id}`, formData, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //             }
    //         });
    //         setAvatar(response.data.image.url);
    //         toast.success("Avatar updated successfully");
    //         setShowModal(false);
    //         setAvatarFile(null);
    //         await fetchCurrentUser(); // Will update both profile and navbar
    //     } catch (error) {
    //         toast.error("Failed to update avatar");
    //         console.log(error);
    //     } finally {
    //         setIsUploadingAvatar(false);
    //     }
    // };


    // if (isLoading) {
    //     return (
    //         <div className="d-flex justify-content-center align-items-center min-vh-100">
    //             <div className="spinner-border text-primary" role="status">
    //                 <span className="visually-hidden">Loading...</span>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="container-fluid padding-profile w-75">
            <h1 className="mb-4" style={{ borderLeft: "8px solid  #14A077" }}>Profile Setting</h1>

            {/* Avatar Upload Section */}
            <Card className="mb-4">
                <Card.Body>
                    <div className="d-flex align-items-center justify-content-between gap-4">
                        <div className='d-flex align-items-center gap-3'>
                            <img
                                src={bg1}
                                alt="avatar"
                                style={{ width: '80px', height: '80px' }}
                            />
                            <Form.Group controlId="formFile" className="mb-3 d-flex flex-column">
                                <Form.Label className='fw-bold'>Upload a new avatar:</Form.Label>
                                <Form.Control type="file" hidden />
                                <Button variant="outline-secondary">Choose File</Button>
                            </Form.Group>
                        </div>
                        <Button variant="success">Save Profile</Button>

                    </div>
                </Card.Body>
            </Card>

            {/* Information Section */}
            <Card className="mb-4">
                <Card.Body>
                    <h2 className="mb-4">Information</h2>

                    <Form>
                        <div className="row">
                            {/* First Row */}
                            <div className="col-md-6 mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" placeholder="Full Name" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <Form.Label>Date Of Birth</Form.Label>
                                <Form.Control type="date" />
                            </div>

                            {/* Second Row */}
                            <div className="col-md-6 mb-3">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="tel" placeholder='Phone Number' />
                            </div>
                            <div className="col-md-6 mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder='Email' />
                            </div>

                            {/* Third Row */}
                            <div className="col-md-6 mb-3">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </Form.Select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <Form.Label>Age</Form.Label>
                                <Form.Select>
                                    <option>18-24</option>
                                    <option>24-30</option>
                                    <option>30-40</option>
                                </Form.Select>
                            </div>

                            {/* Fourth Row */}
                            <div className="col-md-6 mb-3">
                                <Form.Label>Offered Salary ($)</Form.Label>
                                <Form.Control type="text" placeholder='Offered Salary' />
                            </div>
                            <div className="col-md-6 mb-3">
                                <Form.Label>Salary Type</Form.Label>
                                <Form.Select>
                                    <option>1 month</option>
                                    <option>6 month</option>
                                    <option>12 month</option>
                                </Form.Select>
                            </div>

                            {/* Fifth Row */}
                            <div className="col-md-6 mb-3">
                                <Form.Label>Experience time</Form.Label>
                                <Form.Select>
                                    <option>1 Year</option>
                                    <option>3 Years</option>
                                    <option>5 Years</option>
                                    <option>7 Years</option>
                                </Form.Select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <Form.Label>Qualification</Form.Label>
                                <Form.Select>
                                    <option>Master Degree</option>
                                    <option>Master Bachelor</option>
                                </Form.Select>
                            </div>

                            {/* Sixth Row */}
                            <div className="col-md-6 mb-3">
                                <Form.Label>Location</Form.Label>
                                <Form.Select>
                                    <option disabled>Please Select</option>
                                    <option>Quang Nam</option>
                                    <option>Quang Binh</option>
                                    <option>43</option>
                                </Form.Select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <Form.Label>Language</Form.Label>
                                <Form.Select>
                                    <option>Vietnamese</option>
                                    <option>English</option>
                                    <option>Korean</option>
                                </Form.Select>
                            </div>

                            {/* Seventh Row */}
                            <div className="col-md-6 mb-3">
                                <Form.Label>Job Title</Form.Label>
                                <Form.Select>
                                    <option disabled>Please Select</option>
                                    <option>Web Designer</option>
                                    <option>Web Developer</option>
                                    <option>UI Designer</option>
                                </Form.Select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <Form.Label>Categories</Form.Label>
                                <Form.Select>
                                    <option disabled>Please Select</option>
                                    <option>Design</option>
                                    <option>Development</option>
                                    <option>Marketing</option>
                                </Form.Select>
                            </div>
                        </div>

                        {/* Privacy Settings */}
                        <div className="mb-4">
                            <Form.Label>Show my profile</Form.Label>
                            <div className="d-flex gap-3">
                                <Form.Check
                                    type="radio"
                                    label="Show"
                                    name="privacy"
                                    id="show"
                                    defaultChecked
                                />
                                <Form.Check
                                    type="radio"
                                    label="Hidden"
                                    name="privacy"
                                    id="hidden"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <Form.Label>Tag Skill</Form.Label>
                            <div className="d-flex flex-wrap gap-2 mb-2">
                                <Badge bg="secondary" className="p-2">Figma</Badge>
                                <Badge bg="secondary" className="p-2">UI Design</Badge>
                                <Badge bg="secondary" className="p-2">UX Research</Badge>
                            </div>
                            <div className="d-flex gap-2">
                                <Form.Control type="text" placeholder="Add new skill" />
                                <Button variant="outline-secondary">Add</Button>
                            </div>
                        </div>

                    </Form>
                </Card.Body>
            </Card>
            <Card className="mt-4">
                <Card.Body>
                    {/* <Card.Title>About Company</Card.Title>
                    <div className="mb-3">
                    </div> */}

                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <strong>Social Network</strong>
                            <div className="row mt-2">
                                <div className="col-md-6 mb-2 d-flex align-items-center">
                                    <button
                                        className="btn btn-light rounded-circle d-flex align-items-center justify-content-center me-2"
                                        style={{ width: '36px', height: '36px' }}
                                        disabled
                                    >
                                        <FaFacebookF />
                                    </button>
                                    <Form.Control type="text" placeholder='Facebook' />
                                </div>
                                <div className="col-md-6 mb-2 d-flex align-items-center">
                                    <button
                                        className="btn btn-light rounded-circle d-flex align-items-center justify-content-center me-2"
                                        style={{ width: '36px', height: '36px' }}
                                        disabled
                                    >
                                        <FaInstagram />
                                    </button>
                                    <Form.Control type="text" placeholder='Instagram' />
                                </div>

                                <div className="col-md-6 mb-2 d-flex align-items-center">
                                    <button
                                        className="btn btn-light rounded-circle d-flex align-items-center justify-content-center me-2"
                                        style={{ width: '36px', height: '36px' }}
                                        disabled
                                    >
                                        <FaTwitter />
                                    </button>
                                    <Form.Control type="text" placeholder='Twitter' />
                                </div>

                                <div className="col-md-6 mb-2 d-flex align-items-center">
                                    <button
                                        className="btn btn-light rounded-circle d-flex align-items-center justify-content-center me-2"
                                        style={{ width: '36px', height: '36px' }}
                                        disabled
                                    >
                                        <FaLinkedinIn />
                                    </button>
                                    <Form.Control type="text" placeholder='LinkedIn' />
                                </div>

                                <div className="col-md-6 mb-2 d-flex align-items-center">
                                    <button
                                        className="btn btn-light rounded-circle d-flex align-items-center justify-content-center me-2"
                                        style={{ width: '36px', height: '36px' }}
                                        disabled
                                    >
                                        <FaYoutube />
                                    </button>
                                    <Form.Control type="text" placeholder='Youtube' />
                                </div>

                                <div className="col-md-6 mb-2 d-flex align-items-center">
                                    <button
                                        className="btn btn-light rounded-circle d-flex align-items-center justify-content-center me-2"
                                        style={{ width: '36px', height: '36px' }}
                                        disabled
                                    >
                                        <FaPinterestP />
                                    </button>
                                    <Form.Control type="text" placeholder='Pinterest' />
                                </div>
                            </div>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <strong>Contact Information</strong>
                            <div className="mt-2">
                                <div className="mb-2">
                                    <Form.Label className='fw-medium'>Address</Form.Label>
                                    <Form.Control type="text" placeholder='Address' />
                                </div>
                                <div className="mb-2">
                                    <Form.Label className='fw-medium'>Location</Form.Label>
                                    <Form.Control type="text" placeholder='Location' />
                                </div>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>

                </Card.Body>
            </Card>

        </div>

    );
};

export default UserProfileSettings;
