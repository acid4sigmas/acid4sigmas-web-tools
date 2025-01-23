import React, { useRef } from "react";
import { DefaultButton } from "../ui_components/Button";

interface FilePickerProps {
  fileTypes?: string[];
  onFileSelect?: (file: { name: string; data: Uint8Array } | null) => void;
}

const FilePicker: React.FC<FilePickerProps> = ({
  fileTypes = [],
  onFileSelect,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Create a string for the "accept" attribute based on the file types array
  const acceptedTypes = fileTypes.length > 0 ? fileTypes.join(",") : "*";

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (files && files[0] && onFileSelect) {
      const file = files[0];
      try {
        const data = await readFileAsUint8Array(file);
        onFileSelect({ name: file.name, data });
      } catch (error) {
        console.error("Error reading file:", error);
        onFileSelect(null); // Return null if there's an error
      }
    } else {
      onFileSelect?.(null); // No file selected
    }
  };

  const readFileAsUint8Array = (file: File): Promise<Uint8Array> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const arrayBuffer = reader.result;
        if (arrayBuffer instanceof ArrayBuffer) {
          const uint8Array = new Uint8Array(arrayBuffer);
          resolve(uint8Array);
        } else {
          reject(new Error("failed to read file as arraybuffer!"));
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        accept={acceptedTypes}
        multiple
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <button onClick={() => inputRef.current?.click()}>Select Files</button>
      <DefaultButton
        onClick={() => inputRef.current?.click()}
        label="Select File"
      />
    </div>
  );
};

export default FilePicker;
