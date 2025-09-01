'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';


const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters.'),
  address: z.string().min(5, 'Address is required.'),
  city: z.string().min(2, 'City is required.'),
  state: z.string().min(2, 'State is required.'),
  contact: z
    .string()
    .regex(/^\d{10}$/, 'Contact must be a 10-digit number.'),
  email_id: z.string().email('Invalid email address.'),
  
  image: z
    .any()
    .refine((files) => files?.length === 1, 'Image is required.')
    .refine((files) => files?.[0]?.size > 0, 'Image is required.'),
});


const FormFieldIcon = ({ children }) => (
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    {children}
  </div>
);

export default function AddSchoolPage() {
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

 
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmissionStatus(null);

   
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('address', data.address);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('contact', data.contact);
    formData.append('email_id', data.email_id);
    formData.append('image', data.image[0]); 

    try {

      await axios.post('/api/schools', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSubmissionStatus({
        success: true,
        message: 'School added successfully!',
      });
      setTimeout(() => {
        reset(); 
        setSubmissionStatus(null);
      }, 3000); 
    } catch (error)      {
      setSubmissionStatus({
        success: false,
        message: 'Failed to add school. Please try again.',
      });
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-8 transform transition-all hover:shadow-2xl">

        {/* Header Section */}
        <div className="text-center">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Register a New School
            </h1>
            <p className="mt-2 text-gray-500">Fill in the details below to add a new school to the directory.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* School Name */}
          <div className="relative">
            <FormFieldIcon>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path></svg>
            </FormFieldIcon>
            <input
              id="name"
              placeholder="School Name"
              {...register('name')}
              className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Address */}
          <div className="relative">
             <FormFieldIcon>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </FormFieldIcon>
            <input
              id="address"
              placeholder="Full Address"
              {...register('address')}
              className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
            {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>}
          </div>

          {/* City and State Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              id="city"
              placeholder="City"
              {...register('city')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
            <input
              id="state"
              placeholder="State"
              {...register('state')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
            {errors.city && <p className="text-red-600 text-sm -mt-4">{errors.city.message}</p>}
            {errors.state && <p className="text-red-600 text-sm -mt-4 md:text-right">{errors.state.message}</p>}
          </div>

          {/* Contact and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              id="contact"
              type="tel"
              placeholder="Contact Number (10 digits)"
              {...register('contact')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
            <input
              id="email_id"
              type="email"
              placeholder="Email Address"
              {...register('email_id')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
             {errors.contact && <p className="text-red-600 text-sm -mt-4">{errors.contact.message}</p>}
             {errors.email_id && <p className="text-red-600 text-sm -mt-4 md:text-right">{errors.email_id.message}</p>}
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              School Image
            </label>
            <input
              id="image"
              type="file"
              {...register('image')}
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition duration-300"
            />
            {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:from-gray-400 transition-all duration-300 transform hover:scale-105"
          >
            {isSubmitting ? 'Submitting...' : 'Add School'}
          </button>
        </form>

        {/* Success or Error Message Box */}
        {submissionStatus && (
            <div
            className={`mt-4 p-4 rounded-lg text-center font-semibold transition-all duration-500 transform ${
                submissionStatus.success ? 'bg-green-100 text-green-800 scale-100' : 'bg-red-100 text-red-800 scale-100'
            } ${submissionStatus ? 'opacity-100' : 'opacity-0 scale-95'}`}
            >
            {submissionStatus.message}
            </div>
        )}
      </div>
    </div>
  );
}