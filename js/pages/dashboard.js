window.addEventListener('load', renderDashboard, false);

function renderDashboard() {
  Highcharts.chart('chart-tasks', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Atividades da semana'
    },
    xAxis: {
      categories: [
        'Sex',
        'Seg',
        'Ter',
        'Qua',
        'Qui'
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'HH'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Code Review',
      data: [0.5, 0.2, 0.8, 1, 0.6]
    }, {
      name: 'Fix Bugs',
      data: [1, 3, 2, 2.5, 1.5]
    }, {
      name: 'Tests',
      data: [2, 4, 3, 1, 2]
    }, {
      name: 'Daily',
      data: [0.2, 0.2, 0.3, 0.1, 0.15]
    }]
  });
}
