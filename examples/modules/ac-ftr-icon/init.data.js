const tablePropHead = [
  {
    key: 'col0',
    type: 'index'
  },
  {
    key: 'col1',
    dataKey: 'param',
    title: '参数',
    width: 120
  },
  {
    key: 'col2',
    dataKey: 'explain',
    title: '说明'
  },
  {
    key: 'col3',
    dataKey: 'type',
    title: '类型',
    width: 100
  },
  {
    key: 'col4',
    dataKey: 'option',
    title: '可选值',
    width: 300
  },
  {
    key: 'col5',
    dataKey: 'default',
    title: '默认值',
    width: 100
  }
]

const tablePropData1 = [
  {
    _key: '1',
    param: 'type',
    explain: '图标类型，必传',
    type: 'String',
    option: '--',
    default: '无'
  },
  {
    _key: '2',
    param: 'size',
    explain: '图标大小',
    type: 'String',
    option: 'medium、small、large',
    default: 'medium'
  },
  {
    _key: '3',
    param: 'color',
    explain: '图标颜色',
    type: 'String',
    option: '--',
    default: '无'
  }
]

const code = {}

code.actionBase = `
<template>
	<ac-icon type="right"></ac-icon>
</template>`

export { code, tablePropHead, tablePropData1 }
