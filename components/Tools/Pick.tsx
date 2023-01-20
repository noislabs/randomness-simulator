import { pick } from "nois";
import { useState } from "react";
import toast from "react-hot-toast";
import { AddItemTextBox, ItemTab, OutputTab } from "./ShufflerBox";
import { NumberSelect } from "./PickBox";

export const Pick = ({ randomness }: { randomness: string }) => {
  const [pickFromItems, setPickFromItems] = useState<string[]>([]);
  const [pickedItems, setPickedItems] = useState<string[]>([]);
  const [numToPick, setNumToPick] = useState(1);

  const handleAddItem = (add: string) => {
    if (!add || add === "") {
      toast.error("Item cannot be left blank");
      return;
    }
    setPickFromItems((pickFromItems) => [...pickFromItems, add]);
  };

  const handleDeleteItem = (remove: string) => {
    const removeIndex = pickFromItems.indexOf(remove);
    setPickFromItems((pickItems) =>
      pickItems.filter((item, index) => index !== removeIndex)
    );
  };

  const handlePickItems = () => {
    if (pickFromItems.length <= 1) {
      toast.error("Must have 2 or more items to pick from | Try adding some");
      return;
    }

    if (isNaN(numToPick)) {
      toast.error("Please enter a valid number");
      return;
    }

    if (numToPick <= 0) {
      toast.error("Number of picks must be greater than 0");
      return;
    }

    if (numToPick > pickFromItems.length) {
      toast.error(
        <div className="flex flex-col gap-y-2 justify-center items-center">
          <div>
            {`You are trying to pick ${numToPick} items from a list with ${pickFromItems.length} total items.`}
          </div>
          <div>
            {`Try changing "${numToPick}" to "${pickFromItems.length - 1}"`}
          </div>
        </div>
      );
      return;
    }

    setPickedItems(pick(randomness, numToPick, pickFromItems));
  };

  const clear = () => {
    setPickFromItems([]);
    setPickedItems([]);
  };

  const copyItems = () => {
    if (pickedItems.length === 0) {
      toast.error("No items to copy");
      return;
    }
    toast.success("Copied to Clipboard");
    navigator.clipboard.writeText(pickedItems.join("\n"));
  };

  return (
    <>
      <div className="grid grid-rows-2 h-full gap-y-6">
        <div className="row-span-1 grid grid-cols-12 w-full gap-x-2 bg-gradient-to-br from-primary/20">
          <div className="col-span-3 flex flex-col justify-between h-full">
            <div className="basis-1/4">
              <AddItemTextBox add={handleAddItem} />
            </div>
            <div className="basis-1/4">
              <NumberSelect setNum={setNumToPick} />
            </div>
            <div className="basis-1/4 flex justify-between items-center">
              <button
                className={
                  pickFromItems.length <= 0
                    ? `nois-button-small-disabled`
                    : `nois-button-small text-white/50 duration-150 ease-in-out active:scale-90 active:bg-accent/10`
                }
                onClick={() => clear()}
              >
                Clear all
              </button>
              <button
                onClick={() => handlePickItems()}
                className="nois-button w-1/2 py-1 font-orbitron text-accent/90 border border-accent/70 bg-accent/10"
              >
                Pick!
              </button>
            </div>
          </div>
          <div className="col-span-9 flex flex-wrap overflow-auto border border-accent/50 bg-black/10">
            {pickFromItems.map((item, index) => (
              <div className="p-1" key={"prepick" + index}>
                <ItemTab
                  index={index}
                  parentDelete={handleDeleteItem}
                  selfText={item}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="row-span-1 grid grid-cols-12 w-full gap-x-2 border-accent">
          <div className="col-span-3 grid justify-between w-1/2 justify-self-end">
            <div className="text-right pr-2 w-full font-orbitron text-accent/80">
              Output :
            </div>
            <div className="w-full self-end">
              <button
                className={`text-xs
                ${
                  pickedItems.length > 0
                    ? "nois-button-small duration-150 ease-in-out active:scale-90 active:bg-accent/10"
                    : "nois-button-small-disabled"
                }
              `}
                onClick={() => copyItems()}
              >
                Copy CSV
              </button>
            </div>
          </div>
          <div className="col-span-9 flex flex-wrap overflow-auto border border-accent/50 bg-black/10">
            {pickedItems.length > 0 &&
              pickedItems.map((item, index) => (
                <div className="p-1" key={"postpick" + index}>
                  <OutputTab index={index} selfText={item} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
