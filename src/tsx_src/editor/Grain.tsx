import { useState } from "react";
import { ImageProcessor } from "../../../pkg/tester";

function Grain({ processor }: { processor: ImageProcessor }) {
  const [grainValue, setGrainValue] = useState(0);

  const handleGrainChange = async (newGrainValue: number) => {
    setGrainValue(newGrainValue);
    if (processor) {
      await processor.add_grain(newGrainValue);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newGrainValue = parseInt(event.target.value, 10);
    handleGrainChange(isNaN(newGrainValue) ? 0 : newGrainValue);
  };

  return (
    <div className="flex flex-col">
      <label>grain</label>
      <input
        className="text-black bg-white border p-2"
        type="number"
        min={0}
        max={100}
        value={grainValue}
        onChange={handleChange}
      />
    </div>
  );
}

export default Grain;
