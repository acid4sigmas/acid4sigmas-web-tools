import React, { useRef } from "react";
import { DefaultButton } from "../ui_components/Button";

interface FolderPickerProps {
  onFolderSelect?: (
    files: { name: string; path: string; data: Uint8Array }[] | null,
  ) => void;
}

const FolderPicker: React.FC<FolderPickerProps> = ({ onFolderSelect }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFolderChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (files && files.length > 0 && onFolderSelect) {
      const fileData = [];
      try {
        for (const file of Array.from(files)) {
          const data = await readFileAsUint8Array(file);
          const relativePath = file.webkitRelativePath;
          fileData.push({ name: file.name, path: relativePath, data });
        }
        onFolderSelect(fileData);
      } catch (error) {
        console.error("Error reading files: ", error);
        onFolderSelect(null);
      }
    } else {
      onFolderSelect?.(null);
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
          reject(new Error("Failed to read file as ArrayBuffer!"));
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
        directory=""
        webkitdirectory="true" // Allows folder selection
        multiple
        onChange={handleFolderChange}
        style={{ display: "none" }}
      />
      <DefaultButton
        onClick={() => inputRef.current?.click()}
        label="Select Folder"
      />
    </div>
  );
};

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    directory?: string;
    webkitdirectory?: string;
  }
}

export default FolderPicker;
