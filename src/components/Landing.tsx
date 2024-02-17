import Image from "next/image";
import styles from "../../styles/Home.module.css";
import Logo from "../../public/img/logos/Logo.png";
import Ver from "../../public/img/iconos/Ver contraseña.svg";
import Ocultar from "../../public/img/iconos/Ocultar contraseña.svg";
import { ChangeEvent, useEffect, useState } from "react";
import Router from "next/router";
import { userRepository } from "../infraestructure/repository/UserRepository";
import { AuthRepository } from "../infraestructure/repository/AuthRepository";
import ModalLanding from "./ModalLanding";

export function Landing() {
  const [viewPassword, setViewPassword] = useState(false);
  useEffect(() => {
    const posibleLogin = async () => {
      if (typeof Storage !== undefined) {
        const storageToken = localStorage.getItem("token");
        if (storageToken !== null && storageToken?.length > 0) {
          const data: any = await userRepository.findMe(storageToken);
          if (data.role === "admin") {
            Router.push("/Admin/TimeSheet");
          } else {
            Router.push("/Customer/TimeSheet");
          }
        }
      }
    };
    posibleLogin();
  }, []);

  const [userInput, setUserInput] = useState({
    user: "",
    password: "",
  });
  const [errorUser, setErrorUser] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [modal, setModal] = useState(false);

  function validateUser(e: string) {
    if (
      e.length === 0 ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e)
    ) {
      setErrorUser("Ingresa tu usuario");
    } else {
      setErrorUser("");
    }
  }
  function validatePassword(e: string) {
    if (e.length < 5) {
      setErrorPassword("Ingresar tu contraseña");
    } else {
      setErrorPassword("");
    }
  }

  function handleUser(e: ChangeEvent<HTMLInputElement>) {
    setUserInput({
      ...userInput,
      user: e.target.value,
    });
    validateUser(e.target.value);
  }
  function handlePassword(e: ChangeEvent<HTMLInputElement>) {
    setUserInput({
      ...userInput,
      password: e.target.value,
    });
    validatePassword(e.target.value);
  }

  async function login() {
    if (errorUser.length === 0 && errorPassword.length === 0) {
      try {
        const { user, access_token } = await AuthRepository.Login(
          userInput.user,
          userInput.password
        );

        localStorage.setItem("token", access_token);
        localStorage.setItem("user", JSON.stringify(user));
        const data: any = await userRepository.findMe(access_token);
        if (data.role === "admin") {
          Router.push("/Admin/TimeSheet");
        } else {
          Router.push("/Admin/Customer");
        }
      } catch (err) {
        if (err !== undefined) {
          setModal(true);
        }
      }
    }
  }
  async function loginEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (errorUser.length === 0 && errorPassword.length === 0) {
        try {
          const { user, access_token } = await AuthRepository.Login(
            userInput.user,
            userInput.password
          );
          // localStorage.setItem('token', jwt);
          // localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem("token", access_token);
          localStorage.setItem("user", JSON.stringify(user));
          const data: any = await userRepository.findMe(access_token);
          if (data.role === "admin") {
            Router.push("/Admin/TimeSheet");
          } else {
            Router.push("/Admin/Customer");
          }
        } catch (err) {
          if (err !== undefined) {
            setModal(true);
            // alert('usuario o contraseña invalido');
          }
        }
      }
    }
  }
  return (
    <>
      <div className={styles.container}>
        <div className="flex items-center justify-center w-full min-h-screen">
          <div className="flex flex-col items-center justify-center w-full lg:w-2/5 ">
            <div>
              <Image src={Logo} alt={""} />
            </div>
            <div className="flex flex-col w-full md:w-4/5 gap-6">
              <div
                className={`text-xl backdrop-blur-md border-[2px] ${
                  // eslint-disable-next-line no-ternary
                  errorUser?.length > 0
                    ? "border-customRed"
                    : "border-customWhite"
                } w-full rounded-md flex justify-between items-center relative`}
              >
                <input
                  type="text"
                  placeholder="Usuario"
                  name="user"
                  className="bg-transparent w-full h-full py-4 pl-8 focus:outline-none text-customWhite"
                  onChange={(e) => {
                    handleUser(e);
                  }}
                />
              </div>
              <div
                className={`text-xl backdrop-blur-md border-[2px]  ${
                  // eslint-disable-next-line no-ternary
                  errorPassword?.length > 0
                    ? "border-customRed"
                    : "border-customWhite"
                } w-full rounded-md flex justify-between items-center relative`}
              >
                <input
                  // eslint-disable-next-line no-ternary
                  type={viewPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  name="password"
                  className="bg-transparent w-full h-full py-4 pl-8 focus:outline-none text-customWhite"
                  onChange={(e) => {
                    handlePassword(e);
                  }}
                  onKeyDown={(e) => {
                    loginEnter(e);
                  }}
                />
                <div
                  className="mr-2 cursor-pointer absolute right-5"
                  onClick={() => {
                    setViewPassword((prev) => !prev);
                  }}
                >
                  {/* eslint-disable-next-line no-ternary */}
                  <Image src={viewPassword === true ? Ocultar : Ver} alt={""} />
                </div>
              </div>
              {/* <Link href="/Inicio"> */}
              <button
                className="bg-customGold w-full h-14 rounded-md flex flex-column items-center justify-center md:mt-10 mt-32"
                onClick={() => {
                  login();
                }}
              >
                <span className="text-customBlue font-bold text-xl">
                  INGRESAR
                </span>
              </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
      {modal && <ModalLanding setModal={setModal} />}
    </>
  );
}
