import ContestModal from "../../../components/ContestModal/ContestModal";
import ContestsList from "../../../components/ContestsList/ContestsList";
import ListTitle from "../../../components/ListTitle/ListTitle";
import { useEffect, useState } from "react";
import { useGetSelfContestsQuery } from "../../../features/api/contest-api";
import Contest from "../../../features/models/contest.model";
import getStaticTranslationProps from "../../../utils/translation";
import { useTranslation } from "next-i18next";
import { useAuth } from "../../../components/Auth/AuthProvider";
import { useRouter } from "next/router";

export const getStaticProps = getStaticTranslationProps;

export default function MyContests() {
  const [selectedContestId, setSelectedContestId] = useState<Contest["id"]>();

  const { t } = useTranslation("contest");

  const { user } = useAuth();
  const { data: contests } = useGetSelfContestsQuery(undefined, { skip: !user });

  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [router]);

  if (!user) {
    return null;
  }

  return (
    <div className="h-full">
      <div className="px-5 pb-5">
        <div className="py-5">
          <ListTitle title={t("in_progress")} />
        </div>
        <ContestsList
          contests={
            contests?.filter(
              (contest) =>
                new Date(contest.startAt) <= new Date() && new Date(contest.endAt) >= new Date()
            ) ?? []
          }
          onSelectContestId={setSelectedContestId}
        />
        <div className="py-5">
          <ListTitle title={t("finished_contests")} />
        </div>
        <div>
          <ContestsList
            contests={contests?.filter((contest) => new Date(contest.endAt) <= new Date()) ?? []}
            onSelectContestId={setSelectedContestId}
          />
        </div>
      </div>
      {selectedContestId && (
        <ContestModal
          contestId={selectedContestId}
          onClose={() => setSelectedContestId(undefined)}
        />
      )}
    </div>
  );
}
