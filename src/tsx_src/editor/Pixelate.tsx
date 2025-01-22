import { useState } from "react";
import { ImageProcessor } from "../../../pkg/tester";

function Pixelate({ processor }: { processor: ImageProcessor }) {
  const [pixelateValue, setPixelateValue] = useState(0);

  const handlePixelateChange = async (newPixelateValue: number) => {
    setPixelateValue(newPixelateValue);
    if (processor) {
      await processor.pixelate(newPixelateValue);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newGrainValue = parseInt(event.target.value, 10);
    handlePixelateChange(isNaN(newGrainValue) ? 0 : newGrainValue);
  };

  return (
    <div className="flex flex-col">
      <label>pixelate</label>
      <input
        className="text-black bg-white border p-2"
        type="number"
        min={0}
        max={100}
        value={pixelateValue}
        onChange={handleChange}
      />
    </div>
  );
}

export default Pixelate;
