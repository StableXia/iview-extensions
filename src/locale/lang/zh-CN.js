import { addLangFile } from '../util.service'

const lang = {
  ac: {
    locale: 'zh-CN',
    select: {
      placeholder: '请选择',
      noMatch: '无匹配数据',
      loading: '加载中'
    },
    table: {
      noDataText: '暂无数据',
      noFilteredDataText: '暂无筛选结果',
      confirmFilter: '筛选',
      resetFilter: '重置',
      clearFilter: '全部'
    },
    modal: {
      okText: '确定',
      cancelText: '取消'
    }
  }
}

addLangFile(lang)

export default lang
