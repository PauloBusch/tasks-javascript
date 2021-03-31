window.addEventListener('load', function() {
  renderRakingHigh();
  renderRakingLow();
}, false);

function renderRakingHigh() {
  Highcharts.chart('ranking-high-time', {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Atividade com maior tempo dedicado na semana'
    },
    xAxis: {
      categories: ['Tests', 'Fix Bugs', 'Code Review']
    },
    yAxis: {
      title: {
        text: 'Horas',
      }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    series: [
      {
        type: 'bar',
        name: 'Horas',
        showInLegend: false,
        data: [
          {
            name: 'Tests',
            y: 55
          },
          {
            name: 'Fix Bugs',
            y: 30
          },
          {
            name: 'Code Review',
            y: 3
          }
        ]
      }
    ]
  });
}

function renderRakingLow() {
  Highcharts.chart('ranking-low-time', {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Atividade com menor tempo dedicado na semana'
    },
    xAxis: {
      categories: ['Meetings', 'Training', 'Read Documentation']
    },
    yAxis: {
      title: {
        text: 'Horas',
      }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    series: [
      {
        type: 'bar',
        name: 'Horas',
        showInLegend: false,
        data: [
          {
            name: 'Meetings',
            y: .5
          },
          {
            name: 'Training',
            y: .8
          },
          {
            name: 'Read Documentation',
            y: 2
          }
        ]
      }
    ]
  });
}
