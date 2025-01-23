import FolderPicker from "../files/FolderPicker";
import TopBar from "../TopBar";
import { Container } from "../ui_components/Container";
import {
  compress_folder_to_zip,
  compress_file_to_zip,
} from "../../../pkg/tester";
import FilePicker from "../files/FilePicker";

export default function File() {
  const handleFile = (file: { name: string; data: Uint8Array } | null) => {
    console.log("handling file");
    if (file && file.data && file.data.length > 0) {
      try {
        const result = compress_file_to_zip(file);
        downloadZip(result, file.name);
      } catch (error) {
        console.error("Error processing file:", error);
      }
    } else {
      console.error("Invalid file data");
    }
  };
  const handleDir = (
    folder: { name: string; path: string; data: Uint8Array }[] | null,
  ) => {
    if (folder) {
      folder.forEach((folder) => {
        console.log(folder.name);
        console.log(folder.data);
        console.log(folder.path);
      });

      const result = compress_folder_to_zip(folder);
      console.log(result);

      downloadZip(result, generateRandomString(12));
    } else {
      console.error("no folder found");
    }
  };

  const downloadZip = (
    data: Uint8Array<ArrayBufferLike>,
    file_name: string,
  ) => {
    const blob = new Blob([data], { type: "application/zip" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = file_name + ".zip";
    link.click();
  };

  const generateRandomString = (len: number) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    let result: string = "";

    for (let i = 0; i < len; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  return (
    <div className="w-full">
      <TopBar />
      <Container>
        <div>
          <h1 className="text-3xl">Create a Zip file</h1>
          <div>
            <FolderPicker onFolderSelect={handleDir} />
            <FilePicker fileTypes={["*"]} onFileSelect={handleFile} />
          </div>
        </div>
      </Container>
    </div>
  );
}
