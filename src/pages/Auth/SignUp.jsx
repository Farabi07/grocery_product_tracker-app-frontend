import React, { useState } from "react";
import logo from "../../assets/logo.png";
import men from "../../assets/men.png";
import { Mail, Eye, EyeOff } from "lucide-react";
import { FaUserEdit } from "react-icons/fa";
import { Link } from "react-router";
import { FaApple } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useTranslation } from "react-i18next";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
    console.log({ name, email, password,  });
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
          <div className="max-w-[454px] mx-auto mt-32">
            <h1 className="text-3xl font-Inter font-medium text-textClr text-center mb-4">
             {t('auth.signup')}
            </h1>
            <form onSubmit={handleSubmit}>
              {/* name input  */}
              <div className="mt-7">
                <label className="block mb-1 font-Inter font-medium text-textClr">
                  {t('auth.name')}
                </label>
                <div className="w-full h-12 flex items-center justify-between border-[1px] border-textClr/30 rounded-xl px-2 py-4 bg-[#F3F3F3] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className=" outline-none flex-1 text-gray-800"
                    placeholder={t('auth.placeholder.name')}
                  />
                  <FaUserEdit className="w-5.5 h-5.5 text-textClr ml-2" />
                </div>
              </div>
              {/* email input  */}
              <div className="mt-7">
                <label className="block mb-1 font-Inter font-medium text-textClr">
                  {t('auth.email')}
                </label>
                <div className=" w-full h-12 flex items-center justify-between border-[1px] border-textClr/30 rounded-xl px-2 py-4 bg-[#F3F3F3] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className=" outline-none flex-1 text-gray-800"
                    placeholder={t('auth.placeholder.email')}
                  />
                  <Mail className="w-5.5 h-5.5 text-textClr ml-2" />
                </div>
              </div>
              {/* password input  */}
              <div className="my-7">
                <label className="block mb-1 font-medium text-textClr">
                  {t('auth.password')}
                </label>
                <div className="w-full h-12 flex items-center rounded-xl px-2 py-3 bg-[#F3F3F3] border-[1px] border-textClr/30 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-transparent outline-none flex-1 text-gray-800"
                    placeholder= {t('auth.password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 text-textClr hover:text-textClr/70"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5.5 h-5.5" />
                    ) : (
                      <Eye className="w-5.5 h-5.5 " />
                    )}
                  </button>
                </div>
              </div>
              {/* confirm password input  */}
              <div className="my-7">
                <label className="block mb-1 font-medium text-textClr">
                  {t('auth.confirm_password')}
                </label>
                <div className="w-full h-12 flex items-center rounded-xl px-2 py-3 bg-[#F3F3F3] border-[1px] border-textClr/30 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="bg-transparent outline-none flex-1 text-gray-800"
                    placeholder={t('auth.placeholder.confirm_password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 text-textClr hover:text-textClr/70"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5.5 h-5.5" />
                    ) : (
                      <Eye className="w-5.5 h-5.5 " />
                    )}
                  </button>
                </div>
              </div>
            

              {/* submit button  */}
              <button
                type="submit"
                className="cursor-pointer text-2xl font-bold font-Inter w-full bg-Yellow hover:bg-Yellow/90 text-white py-3 rounded-xl transition duration-300"
              >
                {t('auth.signup')}
              </button>
            </form>
            {/* sign up link */}
            <div className="text-center mt-4">
              <span className="text-sm font-Roboto text-textClr">
                {t('auth.do_you_have_account')} {" "}
                <Link to={'/signin'} className="text-blue-600 hover:underline">
                  {t('auth.signin')}
                </Link>
              </span>
            </div>
            <h1 className="my-4 text-center">{t('auth.or')}</h1>
            {/* icon area  */}
            <div className="flex items-center justify-center gap-x-4">
                          <Link to={"/"}>
                            <FaApple size={26} />
                          </Link>
                          <Link to={"/"}>
                            <FcGoogle size={26} />
                          </Link>
                        </div>
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

export default SignUp;

