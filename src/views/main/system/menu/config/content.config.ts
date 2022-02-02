interface IPropType {
  prop?: string;
  label?: string;
  width?: string;
  minWidth?: string;
  align?: string;
  slotName?: string; // 插槽名
}

interface ITableConfig<T> {
  title: string;
  propList: T[];
  showIndexColumn?: boolean;
  showSelectColumn?: boolean;
  childrenProps?: IChildrenProps;
  showPagination: boolean;
}

interface IChildrenProps {
  rowKey: string;
  treeProp: any;
}

export const contentTableConfig: ITableConfig<IPropType> = {
  // 表格标题
  title: '菜单列表',

  // 表格props配置
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '100' },
    { prop: 'type', label: '类型', minWidth: '60' },
    { prop: 'url', label: '菜单url', minWidth: '100' },
    { prop: 'icon', label: '菜单icon', minWidth: '100', slotName: 'icon' },
    { prop: 'permission', label: '按钮权限', minWidth: '100' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '200',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '200',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '100',
      slotName: 'handler'
    }
  ],
  // 是否展示序号
  showIndexColumn: false,
  showSelectColumn: false,
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  showPagination: false
};
