import { cookies } from "next/headers";
import SellerCommentsFilters from "../components/SellerCommentsFilter";
import { jwtDecode } from "jwt-decode";
import { IDecodedToken } from "@/modules/fastReserveDetail/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import { IAdminCommentResponse, ICommentResponse } from "../../payments/types";
import CommentsList from "@/components/dashboard/CommentsList";

const SellerCommentManagementView = async ({
  params,
  role,
}: {
  params: Record<string, string>;
  role: "admin" | "seller";
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value as string;
  const decoded = jwtDecode(token) as IDecodedToken;

  let comments: ICommentResponse | IAdminCommentResponse | null = null;

  if (role == "seller") {
    const sellerId = decoded.id;
    comments = await apiFetch<ICommentResponse | null>(
      `/comments/seller/${sellerId}`,
      { params, cache: "no-store" },
    );
  } else {
    comments = await apiFetch<IAdminCommentResponse | null>(`/admin/comments`, {
      params,
      cache: "no-store",
    });
  }

  const normalizedComments = comments
    ? role === "seller"
      ? {
          comments: (comments as ICommentResponse).comments,
          totalCount: comments.totalCount,
          currentPage: (comments as ICommentResponse).currentPage,
          totalPages: (comments as ICommentResponse).totalPages,
        }
      : {
          comments: (comments as IAdminCommentResponse).data,
          totalCount: comments.totalCount,
          currentPage: parseInt(params.page?.toString() ?? "1") || 1,
          totalPages:
            Math.ceil(
              Number(comments.totalCount || 0) /
                parseInt(params.limit?.toString() ?? "6"),
            ) || 1,
        }
    : null;

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
        {normalizedComments && normalizedComments?.totalCount > 0 ? (
          <CommentsList role={role} data={normalizedComments} />
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
