import TopBar from "../TopBar";
import { Container } from "../ui_components/Container";
import FilePicker from "../FilePicker";
import { ImageProcessor } from "../../../pkg/tester";
import { useState, useEffect } from "react";
import Grain from "../editor/Grain";
import Pixelate from "../editor/Pixelate";
import Apply from "../editor/Apply";
import UndoRedo from "../editor/UndoRedo";

export default function Editor() {
  const [imageProcessor, setImageProcessor] = useState<ImageProcessor | null>(
    null,
  );

  const loadImage = async (imageBase64: string) => {
    const canvasId = "image";
    try {
      console.log(imageBase64);
      const imageProcessor = new ImageProcessor(imageBase64, canvasId, 100);

      setImageProcessor(imageProcessor);

      console.log("created image processor: " + imageProcessor);
      await imageProcessor.render_to_canvas();
    } catch (e) {
      console.error(e);
    }
  };

  const handleFileSelect = (file: { name: string; base64: string } | null) => {
    if (file) {
      loadImage(file.base64);
    } else {
      console.error("No file selected or file read error.");
    }
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const divSize = screenWidth > 1000 ? 1000 : screenWidth;

  return (
    <div className="w-full">
      <TopBar />
      <Container>
        <div className="flex justify-center">
          <div
            style={{
              height: `${divSize}px`,
              width: `${divSize}px`,
            }}
            className="flex relative bg-gray-500 overflow-hidden items-center justify-center"
          >
            <canvas
              id="image"
              className="block max-w-full max-h-full object-contain "
            />
          </div>
        </div>

        <FilePicker onFileSelect={handleFileSelect} />

        <div>
          <div className="flex flex-row Ggap-2">
            {imageProcessor && <Grain processor={imageProcessor} />}
            {imageProcessor && <Pixelate processor={imageProcessor} />}
          </div>
          <br />
          <div className="flex gap-4">
            {imageProcessor && <UndoRedo processor={imageProcessor} />}
            {imageProcessor && <Apply processor={imageProcessor} />}
          </div>
        </div>
      </Container>
    </div>
  );
}
