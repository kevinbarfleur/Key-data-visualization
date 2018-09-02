import Chart from 'chart.js'
import { formatedData, workbook } from './data'

const handleData = workbook => {
  workbook.then(data => formatedData(data)).then(data => displayChart(data))
}

const displayChart = data => {
  const titles = data.map(element => element[0])
  const mtep = data.map(element => element[1][1][0][0])

  const total = mtep.reduce((acc, val) => acc + val)
  const percent = data.map(element =>
    Math.round((element[1][1][0][0] * 100) / total)
  )

  const context = document.getElementById('chart')
  const myPieChart = new Chart(context, {
    type: 'doughnut',
    data: {
      labels: titles,
      datasets: [
        {
          label: 'Population (millions)',
          backgroundColor: [
            '#372561',
            '#fff793',
            '#0086c0',
            '#fff570',
            '#51aae2',
            '#fff000'
          ],
          data: percent
        }
      ]
    },
    options: options
  })
}

const options = {
  title: {
    display: true,
    text: "Consommation finale d'énergie en Belgique en 2016",
    fontSize: 14
  },
  layout: {
    padding: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10
    }
  }
}

handleData(workbook)
