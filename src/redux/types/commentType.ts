import { IComment } from '../../utils/TypeScript';

export const CREATE_COMMENT = 'CREATE_COMMENT';
export const GET_COMMENTS = 'GET_COMMENTS';
export const REPLY_COMMENTS = 'REPLY_COMMENTS';
export const UPDATE_COMMENTS = 'UPDATE_COMMENTS';
export const UPDATE_REPLY = 'UPDATE_REPLY';

export interface ICommentState {
  data: IComment[];
  total: number;
}

export interface ICreateCommentType {
  type: typeof CREATE_COMMENT;
  payload: IComment;
}

export interface IGetCommentsType {
  type: typeof GET_COMMENTS;
  payload: ICommentState;
}

export interface IReplyCommentType {
  type: typeof REPLY_COMMENTS;
  payload: IComment;
}

export interface IUpdateType {
  type: typeof UPDATE_COMMENTS | typeof UPDATE_REPLY;
  payload: IComment;
}

export type ICommentType =
  | ICreateCommentType
  | IGetCommentsType
  | IReplyCommentType
  | IUpdateType;