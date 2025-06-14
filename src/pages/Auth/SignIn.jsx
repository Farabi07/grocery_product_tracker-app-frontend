import React, { useState } from "react";
import logo from "../../assets/logo.png";
import men from "../../assets/men.png";
import { Eye, EyeOff } from "lucide-react";
import { FaUserEdit } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom"; // FIXED import
import { useTranslation } from "react-i18next";
import { signIn } from "../../api/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await signIn(email, password);
      // localStorage.setItem('token', response.data.access); // Save token if needed
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      setError("Invalid email or password");
      // Optionally log error: console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 ">
      <div className="flex flex-col md:flex-row ">
        {/* left content  */}
        <div className="w-full md:w-1/2 bg-white">
          {/* logo section  */}
          <div className="flex items-center gap-x-4 mt-12">
            <div>
              <img src={logo} alt="nav logo" className="w-[60px] h-[60px] object-cover" />
            </div>
            <div>
              <h1 className="font-Roboto-Serif font-medium leading-[10px] text-textClr text-xl">
                {t('sidebar.title')}
              </h1>
              <p className="font-koh-Santepheap text-textClr3/50  text-sm mt-2">
                {t('sidebar.subtitle')}
              </p>
            </div>
          </div>
          {/* form section area  */}
          <div className="max-w-[454px] mx-auto md:mt-[200px] mt-32">
            <h1 className="text-[2rem] font-Inter font-medium text-textClr text-center  mb-4">
              {t('auth.signin')}
            </h1>
            <form onSubmit={handleSubmit} className="w-full">
              {/* email input  */}
              <div className="mt-13">
                <label className="block mb-1 font-Inter font-medium text-textClr">
                  {t('auth.email')}
                </label>
                <div className="w-full h-12 flex items-center justify-between border-[1px] border-textClr/30 rounded-xl px-2 py-4 bg-[#F3F3F3] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className=" outline-none flex-1 text-gray-800"
                    placeholder={t('auth.placeholder.email')}
                  />
                  <FaUserEdit className="w-5.5 h-5.5 text-textClr ml-2" />
                </div>
              </div>
              {/* password input  */}
              <div className="my-9">
                <label className="block mb-1 font-Inter font-medium text-textClr">
                  {t('auth.password')}
                </label>
                <div className="w-full h-12  flex items-center rounded-xl px-2 py-4 bg-[#F3F3F3] border-[1px] border-textClr/30 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-transparent outline-none flex-1 text-gray-800"
                    placeholder={t('auth.placeholder.password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 text-textClr hover:text-textClr/70 transition duration-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              {/* error message */}
              {error && (
                <div className="text-red-500 text-sm mb-2">{error}</div>
              )}
              {/* submit button  */}
              <button
                type="submit"
                className="mt-5 cursor-pointer text-2xl font-bold font-Inter w-full bg-Yellow hover:bg-Yellow/90 text-white py-4 rounded-xl transition duration-300"
              >
                {t('auth.signin')}
              </button>
            </form>
          </div>
        </div>
        {/* right content  */}
        <div className="w-full md:w-1/2 bg-Blue min-h-screen hidden md:flex items-center justify-center">
          <img src={men} alt="men picture" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;