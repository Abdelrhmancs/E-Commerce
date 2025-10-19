import { useState, useContext } from "react";
import eye from "../assets/icons8-eye-24.png";
import skip_eye from "../assets/icons8-eye-24 (1).png";
import axios from "axios";
import logo from "../assets/logonobg.jpg";
import { ToggleContext } from "../Context/ToggleContextType";

export interface registerData {
  Name: string,
  phone: string,
  email: string,
  password: string,
  gender: string
}
const Register = () => {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error("ToggleContext must be used within ToggleProvider");
  }
  const { isOpen, setIsOpen ,setOpen , setUser ,setSuccess} = context;

  const [password, setPassword] = useState(false);
  const [data, setData] = useState<registerData>({} as registerData);

  const handelchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handelsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const registerResponse = await axios.post(
        "https://localhost:7211/Account/Register",
        data
      );

      if (registerResponse.status === 201 || registerResponse.status === 200) {
        console.log("✅ Register success");
        setUser(data.Name);
        const loginData = {
          emailOrPhone: data.email || data.phone,
          password: data.password,
        };

        const loginResponse = await axios.post(
          "https://localhost:7211/Account/Login",
          loginData
        );

        localStorage.setItem("token", loginResponse.data.token);
        console.log("✅ Auto login success. Token saved.");
        setOpen(!open);
        setSuccess(true);
      } else {
        console.log("❌ Register failed");
      }
    } catch (err) {
      console.log("❌ Error during register/login: ", err);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-6 w-[900px] h-[500px] rounded-lg">
        <div className="w-[450px] h-[500px] bg-[#0d4668] rounded-s-xl">
          <div className="mt-[30px]">
            <h1 className="flex justify-center text-[36px] text-[#ffffff] mb-[30px] font-bold">
              Create New Account
            </h1>
          </div>
          <form
            className="flex justify-center items-center flex-col gap-3"
            autoComplete="off"
            onSubmit={handelsubmit}
          >
            <input
              className="w-[376px] ring-[.3px] h-[44px] rounded-md bg-[#ffffff] outline-none focus:ring-1 text-[#333333] placeholder-[var(--color-text-secondary)] pl-3"
              type="text"
              name="Name"
              placeholder="Name"
              onChange={handelchange}
              value={data.Name}
            />
            <input
              className="w-[376px] ring-[.3px] h-[44px] rounded-md bg-[#ffffff] outline-none focus:ring-1  text-[#333333] placeholder-[var(--color-text-secondary)] pl-3"
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={handelchange}
              value={data.phone}
            />
            <input
              className="w-[376px] ring-[.3px] h-[44px] rounded-md bg-[#ffffff] outline-none focus:ring-1 text-[#333333] placeholder-[var(--color-text-secondary)] pl-3"
              type="text"
              name="email"
              placeholder="Email Address"
              onChange={handelchange}
              value={data.email}
            />
            <div className="relative w-[376px]">
              <input
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

            <select
              name="gender"
              id="gender"
              onChange={handelchange}
              value={data.gender}
              className="w-[376px] ring-[.3px] h-[44px] rounded-md text-[#333333] bg-[#ffffff] outline-none focus:ring-1 focus:text-[#333333] pl-3"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <button
              className="flex items-center justify-center gap-2 bg-[#007bc4] rounded-xl p-2 w-[376px] h-[40px] text-[15px] text-[#F8FAFC] hover:bg-[#1f6fa3] transtion duration-300"
              type="submit"
            >
              Create New Account
            </button>

            <p className="text-[13px]">
              Already have an account?{" "}
              <span
                onClick={() => setIsOpen(!isOpen)}
                className="underline text-[#007bc4] cursor-pointer hover:text-[#1f6fa3]"
              >
                Sign In
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

export default Register;
