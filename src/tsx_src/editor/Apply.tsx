import { ImageProcessor } from "../../../pkg/tester";
import { DefaultButton } from "../ui_components/Button";

function Apply({ processor }: { processor: ImageProcessor }) {
  const handleClick = async () => {
    if (processor) {
      processor.apply_changes();
    }
  };

  return <DefaultButton onClick={handleClick} label="Apply Changes" />;
}

export default Apply;
