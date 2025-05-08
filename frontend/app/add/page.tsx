"use client";
import React, { useEffect, useRef, useState } from "react";

export default function AddUser() {
    // buak hook untuk pesan show/hide error
    const [errorNamaVisible, setErrorNamaVisible] = useState(false);
    const [errorUsernameVisible, setErrorUsernameVisible] = useState(false);
    const [errorPasswordVisible, setErrorPasswordVisible] = useState(false);

    //buat hook "useRef" untuk isi pesan error
    const errorMessageNama = useRef<HTMLParagraphElement>(null)
    const errorMessageUsername = useRef<HTMLParagraphElement>(null)
    const errorMessagePassword = useRef<HTMLParagraphElement>(null)

    //buat hook "useEffect" untuk respon pesan error
    useEffect(() => {
        if (errorMessageNama.current){
            errorMessageNama.current!.innerHTML = "Nama User Harus Diisi"
        }
        if (errorMessageUsername.current){
            errorMessageUsername.current!.innerHTML = "Username User Harus Diisi"
        }
        if (errorMessagePassword.current){
            errorMessagePassword.current!.innerHTML = "Password User Harus Diisi"
        }

    }, [errorNamaVisible, errorUsernameVisible, errorPasswordVisible]);

    return (
        <div>
        <title>Tambah Data User</title>

        <fieldset className="fieldset">
            <legend className="fieldset-legend">Nama User</legend>
            <input
            type="text"
            className="input w-150"
            placeholder="Isi Nama User"
            />
            {errorNamaVisible && <p ref={errorMessageNama} className="label text-red-500"></p>}
        </fieldset>

        <fieldset className="fieldset">
            <legend className="fieldset-legend">Username User</legend>
            <input
            type="text"
            className="input w-150"
            placeholder="Isi Username User"
            />
            {errorUsernameVisible && <p className="label text-red-500">Optional</p>}
        </fieldset>

        <fieldset className="fieldset">
            <legend className="fieldset-legend">Password User</legend>
            <input
            type="password"
            className="input w-150"
            placeholder="Isi Password User"
            />
            {errorPasswordVisible && <p className="label text-red-500">Optional</p>}
        </fieldset>

        <section className="mt-5">
            <button className="btn mr-1.5 w-30">Simpan</button>
            <button className="btn ml-1.5 w-30">Batal</button>
        </section>
        </div>
    );
}
