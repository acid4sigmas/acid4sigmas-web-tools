import React, { useRef } from "react";

interface FilePickerProps {
  fileTypes?: string[];
  onFileSelect?: (file: { name: string; base64: string } | null) => void;
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
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        onFileSelect({ name: file.name, base64 });
      } catch (error) {
        console.error("Error reading file:", error);
        onFileSelect(null); // Return null if there's an error
      }
    } else {
      onFileSelect?.(null); // No file selected
    }
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
    </div>
  );
};

export default FilePicker;
