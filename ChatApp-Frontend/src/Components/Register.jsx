







import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";
import { useForm } from 'react-hook-form';
import useChatContext from '../Service/ChatAppContext';
import { registeruser } from '../Service/ApiService';
import { ChatAppLoader } from './ChatAppLoader';

const Register = () => {
    const { darkMode } = useChatContext();
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        mode: 'onChange',
        defaultValues: {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
            dob: '',
            gender: '',
            phoneNumber: '',
            role: 'normal',
        }
    });

    const [showLoader, setShowLoader] = useState(false);
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);
    const [profilePictureUrlPreview, setProfilePictureUrlPreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // New loading state
    const fileInputRef = useRef(null);

    const handleProfilePictureChange = async (e) => {
        if (isSubmitting) return; // Disable during submission

        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);

        try {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "ChatApplication");
            data.append("cloud_name", "descckgrd");

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/descckgrd/image/upload`,
                {
                    method: "POST",
                    body: data
                }
            );

            if (!res.ok) {
                throw new Error("Upload failed");
            }

            const result = await res.json();
            setProfilePictureUrl(result.secure_url);

            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePictureUrlPreview(reader.result);
                setIsUploading(false);
            };
            reader.readAsDataURL(file);

        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload profile picture");
            setIsUploading(false);
        }
    };

    const triggerFileInput = () => {
        if (!isUploading && !isSubmitting) {
            fileInputRef.current.click();
        }
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true); 
        try {
            const formData = {
                ...data,
                ...(profilePictureUrl && { profilePictureUrl }),
                role:data.role?'admin':'normal'
            };
            await registeruser(formData);
            toast.success("Registration Successfull!");
            setShowLoader(true);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data || "Registration Failed!");
        } finally {
            setIsSubmitting(false); // Stop loading
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
        >
            <div className={`min-h-screen pb-20 flex items-center justify-center transition-colors duration-300 pt-24 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={`w-full max-w-lg p-6 rounded-xl shadow-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                    noValidate
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Register</h2>

                    {/* Profile Picture Upload */}
                    <div className="flex flex-col items-center mb-6">
                        <div
                            className={`w-24 h-24 rounded-full border-2 ${darkMode ? 'border-gray-600' : 'border-gray-300'} cursor-pointer overflow-hidden flex items-center justify-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            onClick={triggerFileInput}
                        >
                            {isUploading ? (
                                <div className="animate-spin text-blue-500 text-2xl">⏳</div>
                            ) : profilePictureUrlPreview ? (
                                <img
                                    src={profilePictureUrlPreview}
                                    alt="Profile Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className={`text-4xl ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <i className="fas fa-user"></i>
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleProfilePictureChange}
                            accept="image/*"
                            className="hidden"
                            disabled={isUploading || isSubmitting}
                        />
                        <button
                            type="button"
                            onClick={triggerFileInput}
                            disabled={isUploading || isSubmitting}
                            className={`mt-2 text-sm flex items-center justify-center ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                                } ${(isUploading || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isUploading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500"
                                        xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10"
                                            stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Uploading...
                                </>
                            ) : profilePictureUrlPreview ? (
                                'Change Profile Picture'
                            ) : (
                                'Upload Profile Picture'
                            )}
                        </button>
                    </div>

                        {/* <div className="flex justify-center mb-6">
                        <div
                            className={`w-24 h-24 rounded-full border-2 ${darkMode ? 'border-gray-600' : 'border-gray-300'} cursor-pointer overflow-hidden flex items-center justify-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={triggerFileInput}
                        >
                            {isUploading ? (
                                <div className="animate-spin text-blue-500 text-2xl">⏳</div>
                            ) : profilePictureUrlPreview ? (
                                <img src={profilePictureUrlPreview} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className={`text-4xl ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <i className="fas fa-user"></i>
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleProfilePictureChange}
                            accept="image/*"
                            className="hidden"
                            disabled={isUploading || isSubmitting}
                        />
                    </div> */}


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* First Name */}
                        <div>
                            <label className="text-sm font-medium">First Name</label>
                            <input
                                {...register("firstName", {
                                    required: "First name is required",
                                    minLength: {
                                        value: 2,
                                        message: "First name must be at least 2 characters"
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: "First name must be less than 30 characters"
                                    },
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: "Letters only"
                                    }
                                })}
                                className={`w-full px-4 py-2 rounded-md border mt-1 focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-600'
                                    } ${errors.firstName ? 'border-red-500' : ''} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                placeholder="John"
                                disabled={isSubmitting}
                            />
                            {errors.firstName && (
                                <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
                            )}
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="text-sm font-medium">Last Name</label>
                            <input
                                {...register("lastName", {
                                    required: "Last name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Last name must be at least 2 characters"
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: "Last name must be less than 30 characters"
                                    },
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: "Letters only"
                                    }
                                })}
                                className={`w-full px-4 py-2 rounded-md border mt-1 focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-600'
                                    } ${errors.lastName ? 'border-red-500' : ''} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                placeholder="Doe"
                                disabled={isSubmitting}
                            />
                            {errors.lastName && (
                                <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm font-medium">Password</label>
                            <input
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters"
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                        message: "Password must contain at least one uppercase, one lowercase, one number and one special character"
                                    }
                                })}
                                className={`w-full px-4 py-2 rounded-md border mt-1 focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-600'
                                    } ${errors.password ? 'border-red-500' : ''} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                placeholder="••••••••"
                                disabled={isSubmitting}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Username */}
                        <div>
                            <label className="text-sm font-medium">Username</label>
                            <input
                                {...register("userName", {
                                    required: "Username is required",
                                    minLength: {
                                        value: 4,
                                        message: "Username must be at least 4 characters"
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "Username must be less than 20 characters"
                                    }
                                })}
                                className={`w-full px-4 py-2 rounded-md border mt-1 focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-600'
                                    } ${errors.userName ? 'border-red-500' : ''} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                placeholder="johndoe123"
                                disabled={isSubmitting}
                            />
                            {errors.userName && (
                                <p className="mt-1 text-sm text-red-500">{errors.userName.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                className={`w-full px-4 py-2 rounded-md border mt-1 focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-600'
                                    } ${errors.email ? 'border-red-500' : ''} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                placeholder="example@mail.com"
                                disabled={isSubmitting}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="text-sm font-medium">Phone Number</label>
                            <input
                                type="tel"
                                {...register("phoneNumber", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^\d{10}$/,
                                        message: "Phone number must be 10 digits"
                                    }
                                })}
                                className={`w-full px-4 py-2 rounded-md border mt-1 focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-600'
                                    } ${errors.phoneNumber ? 'border-red-500' : ''} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                placeholder="9876543210"
                                disabled={isSubmitting}
                            />
                            {errors.phoneNumber && (
                                <p className="mt-1 text-sm text-red-500">{errors.phoneNumber.message}</p>
                            )}
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="text-sm font-medium">Date of Birth</label>
                            <input
                                type="date"
                                {...register("dob", {
                                    required: "Date of birth is required",
                                    validate: {
                                        validDate: (value) => {
                                            const dob = new Date(value);
                                            const today = new Date();
                                            const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
                                            return dob <= minAgeDate || "You must be at least 18 years old";
                                        }
                                    }
                                })}
                                className={`w-full px-4 py-2 rounded-md border mt-1 focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-600'
                                    } ${errors.dob ? 'border-red-500' : ''} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                disabled={isSubmitting}
                            />
                            {errors.dob && (
                                <p className="mt-1 text-sm text-red-500">{errors.dob.message}</p>
                            )}
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="text-sm font-medium">Gender</label>
                            <select
                                {...register("gender", { required: "Gender is required" })}
                                className={`w-full px-4 py-2 rounded-md border mt-1 focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-600'
                                    } ${errors.gender ? 'border-red-500' : ''} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                disabled={isSubmitting}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.gender && (
                                <p className="mt-1 text-sm text-red-500">{errors.gender.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Admin Checkbox */}
                    <div className="mt-4 flex items-center">
                        <input
                            type="checkbox"
                            id="role"
                            {...register("role")}
                            className={`h-4 w-4 rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
                                } focus:ring-blue-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isSubmitting}
                        />
                        <label htmlFor="role" className="ml-2 text-sm font-medium">
                            Register as Admin
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full mt-6 py-2 rounded-md cursor-pointer font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-600'
                            } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Registering...
                            </>
                        ) : 'Register'}
                    </button>
                </form>

                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar
                    closeOnClick
                    pauseOnHover
                    draggable
                    theme={darkMode ? 'dark' : 'light'}
                    newestOnTop={false}
                />
            </div>
        </motion.div>
    );
};

export default Register;

