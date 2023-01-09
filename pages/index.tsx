import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryBeaconsHandle, VerifiedBeacon } from "../hooks/noisBeacon";
import { useDashboardContext } from "../contexts/dashboard";
import { RandomnessGrid } from "../components/randomnessGrid";
import Loader from "../components/Loader";
import { Disclaimer } from "../components/Modals/Disclaimer";

export const getStaticProps: GetStaticProps<{ firstBeacons: string }> = async (
  context
) => {
  const firstBeaconsD: VerifiedBeacon[] = await queryBeaconsHandle();
  const firstBeacons = JSON.stringify(firstBeaconsD);

  return {
    props: {
      firstBeacons,
    },
  };
};

const Home: NextPage<{ firstBeacons: string }> = ({
  firstBeacons,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { tab, firstLoad } = useDashboardContext();

  //const queryClient = useQueryClient();

  function makeTimer() {
    let start = 31;
    return () => {
      if (start === 1) {
        start = 31;
        return start - 1;
      } else {
        start -= 1;
        return start - 1;
      }
    };
  }

  const RoundTimer = () => {
    const timeRef = useRef(makeTimer());
    const { data: time } = useQuery(["roundtimer"], timeRef.current, {
      refetchInterval: 1000,
    });

    return <div>{time}</div>;
  };

  const parseHack = (fb: any) => {
    const jobj = JSON.parse(fb);

    const xx: VerifiedBeacon[] = jobj.map((r: any) => {
      const publi = new Date(r.published);
      const vf = new Date(r.verified);
      return {
        round: r.round,
        randomness: r.randomness,
        published: publi,
        verified: vf,
        diff: r.diff,
      } as VerifiedBeacon;
    });
    return xx;
  };

  const {
    isLoading,
    isError,
    error,
    data: myVerifiedBeacons,
    isFetching,
    isPreviousData,
    status,
  } = useQuery(["main"], () => queryBeaconsHandle(), {
    //initialData: parseHack(firstBeacons),
    placeholderData: parseHack(firstBeacons),
    staleTime: 0,
    refetchOnMount: true,
    refetchInterval: 30000,
  });

  if ((tab === "Randomness" || !tab) && myVerifiedBeacons) {
    return (
      <>
        {firstLoad && <Disclaimer />}
        <RandomnessGrid rands={myVerifiedBeacons} timer={<RoundTimer />} />
      </>
    );
  }

  return (
    <div className="mx-auto flex justify-center items-center h-[98vh] w-[98vh]">
      <Loader />
    </div>
  );
};

export default Home;
