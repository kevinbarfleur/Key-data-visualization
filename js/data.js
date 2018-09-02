import { getFile } from './request'

const file_path = require('../assets/Page7.xlsx')
export const workbook = getFile(file_path)

export const formatedData = data => {
  const attributes = []

  Object.keys(data).map(item => {
    const temp_attr = []
    const temp_val = []
    const name = data[item].A2.v

    Object.keys(data[item]).map(attribute => {
      const attribute_name = data[item][attribute].t
      const attribute_value = data[item][attribute].v

      if (attribute_value !== name) {
        if (attribute_name === 's') {
          temp_attr.push([attribute_value])
        } else if (attribute_name === 'n') {
          temp_val.push([attribute_value])
        }
      }
    })
    attributes.push([name, [temp_attr, temp_val]])
  })
  return attributes
}
