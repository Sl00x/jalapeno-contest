import { FC, useEffect, useState } from "react";
import { RiArrowDropRightLine, RiTimeLine } from "react-icons/ri";
import {
  useGetContestEndSoonQuery,
  useGetContestsQuery,
} from "../../features/api/contest-api";
import Contest from "../../features/models/contest.model";
import { getStep } from "../../utils/contest";
import ContestModal from "../ContestModal/ContestModal";
import ContestsList from "../ContestsList/ContestsList";
import ListTitle from "../ListTitle/ListTitle";

interface Props {
  contests: Contest[];
  onSelectContestId: (contestId: Contest["id"]) => void;
}

const HomeList: FC<Props> = ({ contests, onSelectContestId }) => {
  const { data: lastContestEndSoon, refetch } = useGetContestEndSoonQuery();
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (!lastContestEndSoon) return;
    const intervalId = setInterval(() => {
      const newRemainingTime =
        new Date(lastContestEndSoon.endAt).getTime() - Date.now();
      if (newRemainingTime < 0) {
        clearInterval(intervalId);
        refetch();
      } else {
        setRemainingTime(newRemainingTime);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [lastContestEndSoon, refetch]);

  const seconds = Math.floor((remainingTime / 1000) % 60);
  const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
  const hours = Math.floor((remainingTime / 1000 / 60 / 60) % 24);
  const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);

  const step = lastContestEndSoon
    ? getStep(lastContestEndSoon.steps, lastContestEndSoon.participants.length)
    : undefined;

  return (
    <>
      {lastContestEndSoon && (
        <div
          style={{
            backgroundImage:
              "url(https://img.freepik.com/vector-premium/patron-costuras-cajas-regalo-lazos-diferentes-patrones-porcentajes-descuento-rojo-gris-sobre-fondo-negro_444390-17908.jpg)",
          }}
          className="relative w-full md:h-1/2 lg:1/2"
        >
          <div className="bg-black/30 backdrop-blur-[4px] absolute top-0 left-0 w-full h-full ">
            <div className="flex flex-row h-full">
              <div className="flex-1 flex flex-col justify-center items-center space-y-8 h-full">
                <div className="flex flex-row justify-center bg-white/30 backdrop-blur-sm drop-shadow-md">
                  {/*<img
                    src={step!.step.prize.image_url}
                    className="h-[150px] w-[150px]"
        />*/}
                </div>
                <div className="flex flex-row">
                  <div className="p-2 bg-red-jalapeno/50">
                    <RiTimeLine color="white" size={50} />
                  </div>
                  <div className="p-2 bg-white/70 flex flex-row justify-center items-center">
                    <span className="text-red-jalapeno text-3xl font-bold">
                      {days}j:{hours}h:{minutes}m:
                      {seconds}s
                    </span>
                  </div>
                </div>
                <span className="text-white text-6xl font-bold">
                  {lastContestEndSoon.name}
                </span>
                <div className="flex flew-row items-center bg-red-jalapeno/100 cursor-pointer hover:opacity-90">
                  <span
                    onClick={() => onSelectContestId(lastContestEndSoon.id)}
                    className="text-white p-2 px-4 border-r border-white/10"
                  >
                    Participer au concours
                  </span>
                  <div className="px-2">
                    <RiArrowDropRightLine color="white" size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="px-5 pb-5">
        <div className="py-5">
          <ListTitle title="En cours" />
        </div>
        <ContestsList
          contests={contests.filter(
            (contest) =>
              new Date(contest.startAt) <= new Date() &&
              new Date(contest.endAt) >= new Date()
          )}
          onSelectContestId={onSelectContestId}
        />
        <div className="py-5">
          <ListTitle title="Prochains concours" />
        </div>
        <ContestsList
          contests={contests.filter(
            (contest) => new Date(contest.startAt) > new Date()
          )}
          onSelectContestId={onSelectContestId}
        />
        <div className="py-5">
          <ListTitle title="Concours terminés" />
        </div>
        <div>
          <ContestsList
            contests={contests.filter(
              (contest) => new Date(contest.endAt) <= new Date()
            )}
            onSelectContestId={onSelectContestId}
          />
        </div>
      </div>
    </>
  );
};

export default HomeList;
