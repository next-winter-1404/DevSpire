import { apiFetch } from "@/core/Server-fetch/fetchApi";
import { TSocialBookMarksResponse } from "@/components/common/types";
import SocialBookMarksTop from "../components/SocialBookMarksTop";
import SocialBookMarksList from "../components/SocialBookMarksList";

interface IProps {
  params: Record<string, string>;
}

const SocialBookmarksView = async ({ params }: IProps) => {
  const data = await apiFetch<TSocialBookMarksResponse | null>(
    "/social-bookmarks",
    { params: params, cache: "no-store" },
  );

  return (
    <div className="flex flex-col gap-4">
      <SocialBookMarksTop />
      {data && data.totalCount > 0 ? (
        <SocialBookMarksList data={data} />
      ) : (
        <div className="flex justify-center w-full">
          <span>نشانکی وجود ندارد</span>
        </div>
      )}
    </div>
  );
};

export default SocialBookmarksView;
