import Image from "next/image";
import {roll_dice_js} from "nois";
import { useEffect, useState } from "react";
import { useDashboardContext } from "../../contexts/dashboard";
import dice_1 from "../../public/dice_one.gif";
import dice_2 from "../../public/dice_two.gif";
import dice_3 from "../../public/dice_three.gif";
import dice_4 from "../../public/dice_four.gif";
import dice_5 from "../../public/dice_five.gif";
import dice_6 from "../../public/dice_six.gif";

export const Dice = ({randomness}:{randomness: string}) => {

  //const { noisWasm } = useDashboardContext();

  const [winVisible, setWinVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setWinVisible(true);
    }, 4400);
  }, []);

  const renderDiceRoll = (num: number) => {
    switch(num) { 
      case 1: { 
         return (
          <Image 
            src={dice_1} 
            alt={"dice_1"}
            unoptimized
            height={200}
            width={200}
          />
          ) 
      } 
      case 2: { 
        return (
          <Image 
            src={dice_2} 
            alt={"dice_2"}
            unoptimized
            height={200}
            width={200}
          />
          )  
      }
      case 3: {
        return (
          <Image 
            src={dice_3} 
            alt={"dice_3"}
            unoptimized
            height={200}
            width={200}
          />
          ) 
      }
      case 4: {
        return (
          <Image 
            src={dice_4} 
            alt={"dice_4"}
            unoptimized
            height={200}
            width={200}
          />
          ) 
      }
      case 5: {
        return (
          <Image 
            src={dice_5} 
            alt={"dice_5"}
            unoptimized
            height={200}
            width={200}
          />
          ) 
      }
      case 6: {
        return (
          <Image 
            src={dice_6} 
            alt={"dice_6"}
            unoptimized
            height={200}
            width={200}
          />
          ) 
      }
   } 
  }

  const diceOutput = roll_dice_js(randomness);

  return (
      <>
      <div className="grid grid-rows-6 justify-between h-full">
        <div className="row-span-4">
          {renderDiceRoll(diceOutput)}
        </div>
        {winVisible && (
        <div className="row-span-2 flex self-end w-2/3 mx-auto p-1 border rounded-xl border-accent/70 bg-gradient-to-br from-accent/20 to-accent/10">
          <span className="mx-auto text-4xl font-orbitron text-accent drop-shadow-redsoft">
          {diceOutput}
          </span>
        </div>
        )}
      </div>
      </>
    )
}