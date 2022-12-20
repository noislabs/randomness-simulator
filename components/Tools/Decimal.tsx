import { random_decimal } from "nois";

export const Decimal = ({ randomness }: { randomness: string }) => {
  const decimalOutput = random_decimal(randomness);

  return (
    <>
      <div className="flex items-center h-2/3">
        <div className="text-4xl font-orbitron text-accent drop-shadow-redsoft">
          {decimalOutput}
        </div>
      </div>
    </>
  );
};
