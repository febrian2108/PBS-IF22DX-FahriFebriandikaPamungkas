"use client";
import {
  faPenToSquare,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import styless from "./style.module.css";
import axios from "axios";
import { useRef, useState } from "react";

// buat variabel fetcher untuk mengambil data dari API
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  // buat hook "useRef" 
  const modalRef = useRef<HTMLDialogElement>(null)
  const modalContentRef = useRef<HTMLParagraphElement>(null) 
  // buat react hook "useState"
  const [idUser, setIdUser] = useState("");

  //buat variabel untuk swr untuk mengambil data
  const { data, error, isLoading, mutate } = useSWR(
    "http://localhost:3002/api/user",
    fetcher
  );

  // buat fungsi untuk buka "modal"
  const openModal = (id: string, nama: string) => {
    modalRef.current?.showModal()
    if(modalContentRef.current)
      {
        modalContentRef.current!.innerHTML=`Data User <strong>${nama}</strong> Berhasil dihapus`;
      }

      //simpan state "setIdUser"
      setIdUser(id);
  }

  const setDelete = async (id: string) => {
    const response = await axios.delete(`http://localhost:3002/api/user/${id}`);
    mutate(data);
    return response;
  };

  return (
    <div>
      {/* buat tombol tambah data */}
      <section className="text-right">
        <button className="btn btn-dash btn-success">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </section>
      {/* buat table */}
      <section className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className={styless["background-th"]}>
              <th className="text-center"></th>
              <th className="text-left">Name</th>
              <th className="text-center">Job</th>
              <th className="text-center">Password</th>
            </tr>
          </thead>
          <tbody>
            {/* tampil data */}
            {/* mulai looping */}

            {data?.meta_data.error === true ? (
              <tr>
                <td colSpan={4} className="text-center">
                  {data?.meta_data.message}
                </td>
              </tr>
            ) : (
              data?.data_user.map((item: any) => (
                <tr className="hover:bg-base-200" key={item.id}>
                  <td className="text-center w-1.5">
                    <Link href={"/"} title="Ubah Data">
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ color: "#ffffff" }}
                      />
                    </Link>
                    <Link
                      href={"/"}
                      title="Hapus Data"
                      onClick={() => {openModal(item.id, item.nama)}}>
                      <dialog ref={modalRef} className="modal">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Peringatan !</h3>
                          <p className="py-4" ref={modalContentRef}>
                            Data anda Berhasil di hapus
                            </p>
                          <div className="modal-action">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal */}
                              <button className="btn mr-1.5 w-25 btn-error" onClick={() => {setDelete(idUser)}}>Ya</button>
                              <button className="btn ml-1.5 w-25 btn-active">Tidak</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        style={{ color: "#ffffff" }}
                      />
                    </Link>
                  </td>
                  <td className="text-left">{item.nama}</td>
                  <td className="text-center">{item.username}</td>
                  <td className="text-center">{item.password}</td>
                </tr>
              ))
            )}

            {/* akhir looping */}
          </tbody>
        </table>
      </section>
    </div>
  );
}
