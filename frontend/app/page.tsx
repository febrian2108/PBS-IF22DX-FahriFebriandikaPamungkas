"use client";
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Image from "next/image";
import Link from "next/link";
// import {url} from "node:inspector";
import useSWR from "swr";
import styles from "./styles.module.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

// buat variable fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  // buat hook
  const modalRef = useRef<HTMLDialogElement>(null);
  const modalContentRef = useRef<HTMLParagraphElement>(null);

  // buat useState
  const [idUser, setIdUser] = useState("");
  const [toastMessage, setToastMessage] = useState("")
  const [toastVisible, setToastVisible] = useState(false)
  // const [toastInterval, setToastInterval] = useState(0)

  // buat hook "use effect"
  useEffect(() => {
    // menampilkan toast selama tiga (3) detik
    const timer = setInterval(() => {
      setToastVisible(false)
    }, 3000)

    // mengembalikan toast seperti semula
    return () => clearTimeout(timer)
  }, [toastVisible])
  

  // buat variabel swr
  const { data, error, isLoading, mutate } = useSWR(
    "http://localhost:3001/api/user",
    fetcher
  );

  // buat fungsi untuk buka "modal"
  const openModal = (id: string, nama: string) => {
    modalRef.current?.showModal();
    modalContentRef.current!.innerHTML = `Data user ${nama} ingin dihapus ? `;

    // buat setIdUser
    setIdUser(id);
  };

  // buat fungsi untuk hapus data
  const setDelete = async (id: string) => {
    const response = await axios.delete(`http://localhost:3001/api/user/${id}`);
    mutate(data);
    // return alert(response.data.meta_data.message);
    setToastVisible(true)
    setToastMessage(response.data.meta_data.message)
  };

  return (
    <div>
      <title>View Data User</title>
      {/* Buat tombol tambah data */}
      <section className="text-right">
        <Link href={"/add"} className="btn btn-info">
          <FontAwesomeIcon icon={faPlus} />
          Tambah Data
        </Link>
      </section>

      {/* Buat Tabel */}
      <div className="overflow-x-auto mt-5">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className={styles["background-tr"]}>
              <th>No</th>
              <th className="text-center w-1/5">Aksi</th>
              <th className="text-center w-2/5">Nama</th>
              <th className="text-center w-1/5">Username</th>
              <th className="text-center w-1/5">Password</th>
            </tr>
          </thead>
          <tbody>
            {/* row 2 */}
            {/* awal looping map */}
            {data?.metadata.error === 1 ? (
              <tr>
                <td colSpan={4} className="text-center">
                  {data?.meta_data.status}
                </td>
              </tr>
            ) : (
              data?.data_user.map((item: any) => (
                <tr key={item.id} className="hover:bg-rose-100">
                  <td className="text-center">{item.id}</td>
                  <td className="text-center">
                    <Link
                      href={"/"}
                      title="Ubah Data"
                      className={styles["frame-button-edit"]}
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </Link>
                    <Link
                      href={"/"}
                      title="Hapus Data"
                      className={styles["frame-button-delete"]}
                      onClick={() => openModal(item.id, item.nama)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Link>
                  </td>
                  <td className="text-left">{item.nama}</td>
                  <td className="text-center">{item.username}</td>
                  <td className="text-center">
                    <div className={styles["text-ellipsis"]}>
                      {item.password}
                    </div>
                  </td>
                </tr>
              ))
            )}
            {/* akhir looping map */}
          </tbody>
        </table>
      </div>

      {/* area toast */}
      {toastVisible &&
      <div className="toast toast-top toast-center">
        <div className="alert alert-info">
          <span>{toastMessage}</span>
        </div>
      </div>
      }

      {/* area modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Informasi</h3>
          <p className="py-4" ref={modalContentRef}></p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn mr-1.5 w-25 btn-error"
                onClick={() => {
                  setDelete(idUser);
                }}
              >
                Ya
              </button>
              <button className="btn ml-1.5 w-25 btn-success">Tidak</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
