import {
  ICommentItem,
  ICommentTreeItem,
} from "@/modules/fastReserveDetail/types";

export const BuildCommentTree = (flatComments: ICommentItem[]) => {
  const commentMap: Record<number, ICommentTreeItem> = {};
  const roots: ICommentTreeItem[] = [];

  flatComments.forEach((comment) => {
    commentMap[comment.id] = {
      ...comment,
      children: [],
    };
  });

  flatComments.forEach((comment) => {
    const currentComment = commentMap[comment.id];

    if (comment.parent_comment_id === null) {
      roots.push(currentComment);
    } else {
      const parent = commentMap[comment.parent_comment_id];

      if (parent) {
        parent.children.push(currentComment);
      } else {
        roots.push(currentComment);
      }
    }
  });

  return roots;
};
