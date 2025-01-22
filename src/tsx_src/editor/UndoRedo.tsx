import { ImageProcessor } from "../../../pkg/tester";
import { DefaultButton } from "../ui_components/Button";

enum Action {
  Undo = "UNDO",
  Redo = "REDO",
}

function UndoRedo({ processor }: { processor: ImageProcessor }) {
  const handleUndoRedo = async (action: Action) => {
    if (processor) {
      if (action == Action.Undo) {
        await processor.undo();
      } else if (action == Action.Redo) {
        // not implemented
      }
    }
  };

  return (
    <div className="flex gap-2">
      <DefaultButton onClick={() => handleUndoRedo(Action.Undo)} label="Undo" />
      <DefaultButton onClick={() => handleUndoRedo(Action.Redo)} label="Redo" />
    </div>
  );
}

export default UndoRedo;
