import XLSX from 'xlsx'

export const getFile = file_path => {
  return new Promise((resolve, reject) => {
    fetch(file_path)
      .then(res => {
        /* get the data as a Blob */
        if (!res.ok) throw new Error('fetch failed')
        return res.blob()
      })
      .catch(err => reject(err))
      .then(blob => {
        /* configure a FileReader to process the blob */
        const reader = new FileReader()
        reader.addEventListener('loadend', function() {
          /* parse the data when it is received */
          const data = new Uint8Array(this.result)
          const workbook = XLSX.read(data, { type: 'array' })

          /* DO SOMETHING WITH workbook HERE */
          resolve(workbook.Sheets)
        })
        reader.readAsArrayBuffer(blob)
      })
      .catch(err => reject(err))
  })
}
