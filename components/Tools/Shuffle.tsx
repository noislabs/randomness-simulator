import { shuffle } from "nois";
import { useState } from "react";
import toast from "react-hot-toast";
import { AddItemTextBox, ItemTab, OutputTab } from "./ShufflerBox";

export const Shuffle = ({ randomness }: { randomness: string }) => {
  const [shuffleItems, setShuffleItems] = useState<string[]>([]);
  const [shuffledItems, setShuffledItems] = useState<string[]>([]);

  const handleAddItem = (add: string) => {
    if (!add || add === "") {
      toast.error("Item cannot be left blank");
      return;
    }
    setShuffleItems((shuffleItems) => [...shuffleItems, add]);
  };

  const handleDeleteItem = (remove: string) => {
    const removeIndex = shuffleItems.indexOf(remove);
    setShuffleItems((shuffleItems) =>
      shuffleItems.filter((item, index) => index !== removeIndex)
    );
  };

  const handleShuffleItems = (items: string[]) => {
    if (shuffleItems.length === 0) {
      toast.error("Must have items to shuffle | Try adding some");
      return;
    }

    setShuffledItems(shuffle(randomness, shuffleItems));
  };

  const clear = () => {
    setShuffleItems([]);
    setShuffledItems([]);
  };

  return (
    <>
      <div className="grid grid-rows-2 h-full gap-y-6">
        <div className="row-span-1 grid grid-cols-12 w-full gap-x-2 bg-gradient-to-br from-primary/20">
          <div className="col-span-3 flex flex-col justify-between h-full">
            <div className="basis-1/3">
              <AddItemTextBox add={handleAddItem} />
            </div>
            <div className="basis-1/3 self-end pt-1">
              <button
                className="nois-button-small p-1 text-xs text-white/50"
                onClick={() => clear()}
              >
                Clear All
              </button>
            </div>
            <div className="basis-1/3">
              <button
                onClick={() => handleShuffleItems(shuffleItems)}
                className="nois-button w-full py-1 font-orbitron text-accent/90 border border-accent/70 bg-accent/10"
              >
                Shuffle!
              </button>
            </div>
          </div>
          <div className="col-span-9 flex flex-wrap overflow-auto border border-accent/50 bg-black/10">
            {shuffleItems.map((item, index) => (
              <div className="p-1" key={"preshuffle" + index}>
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
          <div className="col-span-3 h-1/4 w-1/2 justify-self-end">
            <span className="inline-block text-right pr-2 w-full align-middle font-orbitron text-accent/80">
              Output :
            </span>
          </div>
          <div className="col-span-9 flex flex-wrap overflow-auto border border-accent/50 bg-black/10">
            {shuffledItems.length > 0 &&
              shuffledItems.map((item, index) => (
                <div className="p-1" key={"post" + index}>
                  <OutputTab index={index} selfText={item} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
