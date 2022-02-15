import { ILoginState } from './login/types';
import { ISystemState } from './main/system/types';
import { IDashBoardState } from './main/analysis/types';
export interface IRootState {
  name: string;
  entireDepartment: any[];
  entireRole: any[];
  entireMenu: any[];
}

export interface IRootWithModule {
  login: ILoginState;
  system: ISystemState;
  dashboard: IDashBoardState;
}

export type IStoreType = IRootState & IRootWithModule;
