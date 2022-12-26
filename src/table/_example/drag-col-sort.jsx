import React, { useState } from 'react';
import { Table, Tag } from 'tdesign-react';
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-react';

const statusNameListMap = {
  0: { label: '审批通过', theme: 'success', icon: <CheckCircleFilledIcon /> },
  1: { label: '审批失败', theme: 'danger', icon: <CloseCircleFilledIcon /> },
  2: { label: '审批过期', theme: 'warning', icon: <ErrorCircleFilledIcon /> },
};

const initialColumns = [
  { colKey: 'applicant', title: '申请人', width: '100' },
  {
    colKey: 'status',
    title: '申请状态',
    width: '150',
    cell: ({ row }) => (
      <Tag
        shape="round"
        theme={statusNameListMap[row.status].theme}
        variant="light-outline"
        icon={statusNameListMap[row.status].icon}
      >
        {statusNameListMap[row.status].label}
      </Tag>
    ),
  },
  { colKey: 'channel', title: '签署方式', width: '120' },
  { colKey: 'detail.email', title: '邮箱地址', ellipsis: true },
  { colKey: 'createTime', title: '申请时间' },
];
const initData = [];
for (let i = 0; i < 5; i++) {
  initData.push({
    index: i + 1,
    applicant: ['贾明', '张三', '王芳'][i % 3],
    status: i % 3,
    channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
    detail: {
      email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
    },
    matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
    time: [2, 3, 1, 4][i % 4],
    createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
  });
}

export default function TableDragSort() {
  const [data] = useState(initData);
  const [columns, setColumns] = useState(initialColumns);

  // { currentIndex, targetIndex, current, target, data, newData, e, sort }
  function onDragSort(params) {
    console.log('交换行', params);
    // 数据受控实现
    if (params.sort === 'col') {
      setColumns(params.newData);
    }
  }

  // 拖拽排序涉及到 data 的变更，相对比较慎重，因此仅支持受控用法
  return <Table rowKey="index" data={data} columns={columns} dragSort="col" onDragSort={onDragSort} />;
}
