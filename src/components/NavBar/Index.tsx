/* eslint-disable no-ternary */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Cerrar from "../../../public/img/iconos/cerrar sesión.svg";
import Image from "next/image";
import { userRepository } from "../../infraestructure/repository/UserRepository";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (typeof Storage !== "undefined") {
      const sesionToken = localStorage.getItem("token");
      if (sesionToken === null && router.pathname !== "/ResetPassword") {
        router.push("/");
      }
    }
  }, [router, router.pathname]);

  const [isAdmin, setIsAdmin] = useState<boolean>();

  // useEffect(()=>{
  const getRole = async () => {
    if (typeof Storage !== "undefined") {
      const sesionToken = localStorage.getItem("token");
      if (typeof sesionToken === "string") {
        const user = await userRepository.findMe(sesionToken);
        if (user.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    }
  };
  getRole();
  // },[]);

  useEffect(() => {
    const handleAdminUrls = async () => {
      if (typeof Storage !== "undefined") {
        const sesionToken = localStorage.getItem("token");
        if (typeof sesionToken === "string") {
          const user = await userRepository.findMe(sesionToken);
          if (router.pathname.includes("/Admin") && user.role !== "admin") {
            router.push("/Customer/TimeSheet/Lista");
          }
        }
      }
    };
    handleAdminUrls();
  }, [router, router.pathname]);

  function cerrarSesion() {
    localStorage.clear();
    router.push("/");
  }
  return (
    <>
      <div className="xl:w-[250px] md:w-[200px] h-screen py-16 hidden md:flex flex-col items-center justify-between text-customGray fixed bg-customWhite">
        {/* <Link href="/"> */}
        <button
          onClick={() => {
            cerrarSesion();
          }}
          className="flex flex-row h-8 cursor-pointer items-center"
        >
          <div className="mr-8">
            <Image src={Cerrar} width={30} height={30} alt={""} />
          </div>
          <p>Cerrar sesión</p>
        </button>
        {/* </Link> */}
      </div>
    </>
  );
}
