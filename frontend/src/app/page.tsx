import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* buat tombol tambah data */}
      <section className="text-right">
      <button className="btn btn-dash btn-success">Tambah Data</button>
      </section>
      {/* buat table */}
      <section className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th className="text-center"></th>
              <th className="text-left">Name</th>
              <th className="text-center">Job</th>
              <th className="text-center">Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-base-200">
              <td className="text-center">1</td>
              <td className="text-left">Hart Hagerty</td>
              <td className="text-center">Desktop Support Technician</td>
              <td className="text-center">Purple</td>
            </tr>
          </tbody>
        </table>
</section>
    </div>
  );
}
