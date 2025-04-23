"use client"
import { faPenToSquare, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import styless from "./style.module.css";

// buat variabel fetcher untuk mengambil data dari API
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  //buat variabel untuk swr untuk mengambil data
  const { data, error, isLoading } = useSWR(
    "http://localhost:3002/api/user",
    fetcher
  );

  return (
    <div>
      {/* buat tombol tambah data */}
      <section className="text-right">
        <button className="btn btn-dash btn-success"><FontAwesomeIcon icon={faPlus} /></button>
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

            {data?.data_user.map((item: any) => (
              <tr className="hover:bg-base-200">
                <td className="text-center w-1.5">
                  <Link href={"/"} title="Ubah Data">
                  <FontAwesomeIcon icon={faPenToSquare} style={{color: "#ffffff",}} />
                  </Link>
                  <Link href={"/"} title="Hapus Data">
                  <FontAwesomeIcon icon={faTrashCan} style={{color: "#ffffff",}} />
                  </Link>
                </td>
                <td className="text-left">{item.nama}</td>
                <td className="text-center">{item.username}</td>
                <td className="text-center">{item.password}</td>
              </tr>
            ))}

            {/* akhir looping */}
          </tbody>
        </table>
      </section>
    </div>
  );
}
