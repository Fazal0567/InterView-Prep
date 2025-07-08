import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: '',
    experience: '',
    topicsToFocus: '',
    description: ''
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, experience, topicsToFocus } = formData;
    if (!role || !experience || !topicsToFocus) {
      setErrors("Please fill in all the required fields.");
      return;
    }

    setErrors("");
    setLoading(true);

    try {
      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role,
        experience,
        topicsToFocus,
        numberOfQuestions: 18,
      });

      const generatedQuestions = aiResponse.data;

      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });

      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data.session._id}`);
      }

    } catch (error) {
      if (error.response?.data?.message) {
        setErrors(error.response.data.message);
      } else {
        setErrors("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Start a new interview journey
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Fill in the details below to create a new session.
        </p>

        <form onSubmit={handleCreateSession} className="space-y-4">
          <Input
            label="Target Role"
            type="text"
            placeholder="e.g., Frontend Developer, Backend Engineer"
            value={formData.role}
            onChange={(e) => handleChange('role', e.target.value)}
          />
          <Input
            label="Years of Experience"
            type="text"
            placeholder="e.g., 1 year, 3 years, 5+ years"
            value={formData.experience}
            onChange={(e) => handleChange('experience', e.target.value)}
          />
          <Input
            label="Topics to focus on"
            type="text"
            placeholder="Comma-separated, e.g., React, Node.js, Algorithms"
            value={formData.topicsToFocus}
            onChange={(e) => handleChange('topicsToFocus', e.target.value)}
          />
          <Input
            label="Description"
            type="text"
            placeholder="Any specified topics, e.g., Focus on system design, data structures"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />

          {errors && (
            <p className="text-red-500 text-xs pt-1">{errors}</p>
          )}

          <button
            type="submit"
            className={`w-full py-2 px-4 mt-2 text-white bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-xl flex justify-center items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? <SpinnerLoader /> : 'Create Session'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSessionForm;
