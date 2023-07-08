import { useState } from "react"
import { AiOutlineCopy } from "react-icons/ai"
import { toast } from "react-toastify"

export const TokenDashboardMenu: React.FC = () => {
  const [peserta, setPeserta] = useState<string[]>(["aaa", "user2", "eee"]) // TODO data shape w backend
  const [token, setToken] = useState<string>("G32XA6")

  function generateToken() {
    // TODO LOGIC
  }

  function fetchPesertaTerdaftar() {
    // TODO LOGIC
  }

  function handleCopyCode() {
    toast.success("Kode berhasil disalinkan")
  }


  return (
    <>
      <h3>Token</h3>
      <br/>
      <div className="flex flex-col md:flex-row ">
        <div className="flex flex-col gap-y-2">
          <p>Disini, anda bisa men-generate dan membagikan token untuk pendataan dan kehadiran peserta di Event anda.</p>
          <p>Ketika peserta memasukkan token di halaman INI ( TODO ), partisipasi tersebut akan dicatat di profil mereka.</p>
        </div>
        <div className="flex flex-col gap-y-2">
          <p>Pastikan kode ini hanya dibagikan ke peserta yang hadir di lokasi.</p>
          <div className="bg-lightGray rounded-lg flex gap-x-2 w-fit">
            <h1 className="p-2">{token}</h1>
            <button className=" rounded-r-lg bg-gray-300 p-2 hover:scale-[1.05] active:scale-[0.95]" onClick={() => { handleCopyCode() }}>
              <AiOutlineCopy size={24}/>
            </button>
          </div>
        </div>
      </div>
      <br/>
      <h3>Peserta</h3>
      <div className="flex justify-around text-center">
        <div>
          <h4>Peserta Terdaftar</h4>
          <div>
            { peserta.map((user, i) => (
              <p key={user}>{user}</p>
            ))}
          </div>
        </div>
        <div>
          <h4>Peserta Hadir</h4>
          <div>
            { peserta.map((user, i) => (
              <p key={user}>{user}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
