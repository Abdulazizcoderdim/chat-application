import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { uploadFile } from '../helpers/upload-file';

const RegisterPage = () => {
  const [data, setData] = useState<{
    name: string;
    email: string;
    password: string;
    profile_pic: string;
  }>({
    name: '',
    email: '',
    password: '',
    profile_pic: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [uploadPhoto, setUploadPhoto] = useState<File | string | null>('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const uploadPhoto = await uploadFile(file as File);

    if (file?.type.startsWith('image/')) {
      setUploadPhoto(file);
    } else {
      console.log('Please upload a valid image file.');
    }

    setData(prev => {
      return {
        ...prev,
        profile_pic: uploadPhoto?.url,
      };
    });
  };

  const handleClearUploadPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto(null);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${import.meta.env.VITE_PUBLIC_BACKEND_API}/api/register`;

    try {
      setLoading(true);
      const res = await axios.post(URL, data);

      toast.success(res?.data?.message);

      if (res?.data?.success) {
        setData({
          name: '',
          email: '',
          password: '',
          profile_pic: '',
        });
        navigate('/email');
      }
    } catch (error) {
      // @ts-expect-error: error?.response.data.message may be null or undefined
      toast.error(error?.response?.data?.message || 'Something went wrong');
      console.log('error regsiter', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto">
        <h3>Welcome to Chat app!</h3>

        <form onSubmit={handleSubmit} className="grid gap-4 mt-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="enter your name"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="enter your email"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password :</label>
            <input
              min={6}
              type="password"
              id="password"
              name="password"
              placeholder="enter your password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">
              Photo :
              <div className="h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer">
                <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                  {(uploadPhoto as File)?.name
                    ? (uploadPhoto as File)?.name
                    : 'Upload profile photo'}
                </p>
                {(uploadPhoto as File)?.name && (
                  <button
                    type="button"
                    title="Clear"
                    className="text-lg ml-2 hover:text-red-600"
                    onClick={handleClearUploadPhoto}
                  >
                    <IoClose />
                  </button>
                )}
              </div>
            </label>

            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              accept="image/*" // Only allows image file types
              className="bg-slate-100 px-2 py-1 focus:outline-primary hidden"
              onChange={handleUploadPhoto}
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide"
          >
            {loading ? 'Loading...' : 'Register'}
          </button>
        </form>

        <p className="my-3 text-center">
          Already have account ?{' '}
          <Link to={'/email'} className="hover:text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
