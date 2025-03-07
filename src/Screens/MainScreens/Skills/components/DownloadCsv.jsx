import { useAxiosInstance } from "../../../../Hooks/Instances/useAxiosInstance";
import { DOWNLOAD_EXAM_API } from "../../../../Utilities/APIs/APIs";

export default function DownloadCsv({ setCreateModal }) {
  const axiosInstance = useAxiosInstance();

  async function handleDownload() {
    try {
      const response = await axiosInstance.get(`${DOWNLOAD_EXAM_API}`);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "exams.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setCreateModal(false);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <p className="text-2xl "> Are you sure you want to export data?</p>
      <div className="flex justify-center items-center gap-4  *:p-2 *:rounded">
        <button
          className="bg-green-600  hover:bg-green-700 duration-300"
          onClick={handleDownload}
        >
          Download
        </button>
        <button
          onClick={() => setCreateModal(false)}
          className="bg-zinc-600 hover:bg-zinc-400 duration-300"
        >
          {" "}
          Cancel
        </button>
      </div>
    </div>
  );
}
