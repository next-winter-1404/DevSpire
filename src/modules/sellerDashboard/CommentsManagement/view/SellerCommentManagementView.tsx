import { cookies } from "next/headers";
import SellerCommentsFilters from "../components/SellerCommentsFilter";
import { jwtDecode } from "jwt-decode";
import { IDecodedToken } from "@/modules/fastReserveDetail/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import { ICommentResponse } from "../../Payments/types";
import CommentsList from "@/components/dashboard/CommentsList";

const SellerCommentManagementView = async ({
  params,
}: {
  params: Record<string, string>;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value as string;
  const decoded = jwtDecode(token) as IDecodedToken;
  const sellerId = decoded.id;

  const comments = await apiFetch<ICommentResponse | null>(
    `/comments/seller/${sellerId}`,
    { params, cache: "no-store" },
  );
  console.log(comments);

  return (
    <div className="h-full">
      <div
        className=" w-full flex flex-col md:flex-row justify-between
       items-center mb-4 gap-4"
      >
        <h1 className="text-xl font-bold text-foreground">
          {" "}
          کامنت های مشتریان {`(${comments?.totalCount})`}
        </h1>
        <div className=" w-full md:w-[50%]">
          <SellerCommentsFilters />
        </div>
      </div>
      <div
        className="h-[90%]  border-[#DDDDDD] 
      rounded-[24px] overflow-hidden  dark:border-[#333333]
         bg-[#ffff] dark:bg-[#262626]"
      >
        {comments && comments?.totalCount > 0 ? (
          <CommentsList role="seller" data={comments} />
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] text-center px-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              هنوز نظری ثبت نشده است
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerCommentManagementView;
