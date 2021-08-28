import { Dispatch } from "redux";

import { ALERT, IAlertType } from "../types/alertType";
import {
  CREATE_COMMENT,
  GET_COMMENTS,
  ICreateCommentType,
  IGetCommentsType,
} from "../types/commentType";

import { IComment } from "../../utils/TypeScript";
import { getAPI, postAPI } from "../../utils/FetchData";

export const createComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICreateCommentType>) => {
    try {
      const res = await postAPI("comment", data, token);

      dispatch({
        type: CREATE_COMMENT,
        payload: { ...res.data, user: data.user },
      });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const getComments =
  (id: string) => async (dispatch: Dispatch<IAlertType | IGetCommentsType>) => {
    try {
      const res = await getAPI(`comments/blog/${id}`);

      dispatch({
        type: GET_COMMENTS,
        payload: { data: res.data.comments, total: res.data.total },
      });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
