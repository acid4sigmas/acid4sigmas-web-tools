import React from "react";

interface FilePickerProps {
  onFileSelect: (base64Image: string) => void;
}

const FilePicker: React.FC<FilePickerProps> = ({ onFileSelect }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        onFileSelect(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FilePicker;
