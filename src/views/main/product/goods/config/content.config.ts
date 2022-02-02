interface IPropType {
  prop?: string;
  label?: string;
  width?: string;
  minWidth?: string;
  align?: string;
  slotName?: string; // 插槽名
  fixed?: string;
}

interface ITableConfig<T> {
  title: string;
  propList: T[];
  showIndexColumn?: boolean;
  showSelectColumn?: boolean;
}
export const contentTableConfig: ITableConfig<IPropType> = {
  // 表格标题
  title: '用户列表',

  // 表格props配置
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '200', align: 'center' },
    {
      prop: 'oldPrice',
      label: '原价格',
      minWidth: '80',
      align: 'center',
      slotName: 'oldPrice'
    },
    { prop: 'newPrice', label: '现价格', minWidth: '80', align: 'center' },
    {
      prop: 'imgUrl',
      label: '商品图片',
      minWidth: '120',
      align: 'center',
      slotName: 'image'
    },
    {
      prop: 'status',
      label: '状态',
      minWidth: '100',
      align: 'center',
      slotName: 'status'
    },
    {
      prop: 'inventoryCount',
      label: '库存数',
      minWidth: '80',
      align: 'center'
    },
    {
      prop: 'saleCount',
      label: '销量',
      minWidth: '80',
      align: 'center'
    },
    {
      prop: 'favorCount',
      label: '喜欢数',
      minWidth: '80',
      align: 'center'
    },
    {
      prop: 'address',
      label: '地址',
      minWidth: '100',
      align: 'center'
    },
    {
      prop: 'categoryId',
      label: '分类ID',
      minWidth: '80',
      align: 'center'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '200',
      align: 'center',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '200',
      align: 'center',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '120',
      slotName: 'handler',
      fixed: 'right'
    }
  ],
  // 是否展示序号
  showIndexColumn: true,
  showSelectColumn: true
};
