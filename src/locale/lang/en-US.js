import { addLangFile } from '../util.service'

const lang = {
  ac: {
    locale: 'en-US',
    select: {
      placeholder: 'Select',
      noMatch: 'No matching data',
      loading: 'Loading'
    },
    table: {
      noDataText: 'No Data',
      noFilteredDataText: 'No filter data',
      confirmFilter: 'Confirm',
      resetFilter: 'Reset',
      clearFilter: 'All'
    },
    modal: {
      okText: 'OK',
      cancelText: 'Cancel'
    }
  }
}

addLangFile(lang)

export default lang
