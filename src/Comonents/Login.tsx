import { useState, useContext } from "react";
import eye from "../assets/icons8-eye-24.png";
import skip_eye from "../assets/icons8-eye-24 (1).png";
import logo from '../assets/logonobg.jpg';
import axios from "axios";
import { ToggleContext } from "../Context/ToggleContextType";
const Login = () => {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error("ToggleContext must be used within ToggleProvider");
  }
  const { isOpen, setIsOpen  , open , setOpen , setSuccess , setUser} = context;

  const [password, setPassword] = useState(false);
  const [data, setData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const handelchange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handelsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7211/Account/Login",
        data
      );

      localStorage.setItem("token", response.data.token);
      console.log("✅ Login successful. Token saved.");
      setUser(data.emailOrPhone);
      setOpen(!open);
      setSuccess(true);
    } catch (err) {
      console.log(" Login failed:", err);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-6 w-[900px] h-[500px] rounded-lg">
        <div className="w-[450px] h-[500px] bg-[#0d4668] rounded-s-xl">
          <div className="mt-[30px]">
            <h1 className="flex justify-center text-[36px] text-[#ffffff] mb-[30px] font-bold">
              Sign In
            </h1>
          </div>
          <form
            className="flex justify-center items-center flex-col gap-3"
            autoComplete="off"
            onSubmit={handelsubmit}
          >
            <div className="relative w-[376px]">
              <label id="emailOrPhone" className="text-[15px]">
                Email Address
                <span className="text-[var(--color-primary)]"> *</span>
              </label>
              <input
                id="emailOrPhone"
                className="w-full h-[44px] rounded-md bg-[#ffffff] outline-none ring-[0.3px] focus:ring-1 text-[#333333] placeholder-[var(--color-text-secondary)] pl-3 pr-10"
                type="text"
                name="emailOrPhone"
                placeholder="Email Or Phone"
                onChange={handelchange}
                value={data.emailOrPhone}
              />
            </div>

            <div>
              <label id="password" className="text-[15px]">
                Password <span className="text-[var(--color-primary)]">*</span>
              </label>
              <div className="relative w-[376px]">
                <input
                  id="password"
                  className="w-full h-[44px] rounded-md bg-[#ffffff] outline-none ring-[0.3px] focus:ring-1 text-[#333333] placeholder-[var(--color-text-secondary)] pl-3 pr-10"
                  type={password ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={handelchange}
                  value={data.password}
                />
                <button
                  type="button"
                  onClick={() => setPassword(!password)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  <img
                    src={password ? eye : skip_eye}
                    alt="toggle password"
                    className="w-5 h-5"
                  />
                </button>
              </div>

              <p className="hover:text-[#3B82F6] transition duration-300 flex justify-end text-[15px] mt-2 cursor-pointer">
                Forgot Password?
              </p>
            </div>

            <button
              className="flex items-center justify-center gap-2 bg-[#007bc4] rounded-xl p-2 w-[376px] h-[40px] text-[15px] text-[#F8FAFC] hover:bg-[#1f6fa3] transtion duration-300"
              type="submit"
            >
              Login
            </button>
            <p className="text-[13px]">
              Don't have an account?{" "}
              <span
                onClick={() => setIsOpen(!isOpen)}
                className="underline text-[#007bc4] cursor-pointer hover:text-[#1f6fa3]"
              >
                Create New Account
              </span>
            </p>
          </form>
        </div>
        <div className="relative hidden lg:block w-[450px] h-[500px] bg-[#ECF7FF] rounded-e-xl overflow-hidden">
          <div className="flex justify-center">
            <img src={logo} alt="logo" className="w-[140px] mt-[12px]" />
          </div>
          <div className="w-96 h-96 bg-[#E5EFF9] rounded-full absolute bottom-[-40px] right-[-40px]"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
