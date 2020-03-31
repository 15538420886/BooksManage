import React from 'react';
import createG2 from 'g2-react'
import { Stat } from 'g2'
import {Row, Col} from 'antd'
const Pie = createG2(chart => {
  chart.coord('theta');
  chart.intervalStack().position(Stat.summary.proportion()).color(
    'item',
    ['#5b8ff9', '#5ad8a6', '#5d7092', '#f6bd16', '#e8684a']
  )
  chart.render()
})

const Line = createG2(chart => {

  chart.intervalDodge().position('date*value').color('type');
  chart.line().position('date*rate');

  //3、定义别名
  chart.cols({
      date: {
          alias: '月份' // 设置属性的别名
      },
      value: {
          alias: '数量'
      },
      rate: {
          alias: '借阅率(%)'
      }
  });

  //图例
  chart.legend({
      mode: false,
      position: 'top', // 图例的显示位置，有 'top','left','right','bottom'四种位置，默认是'right'。
      title: "示例",
      dy: 5,
  });

  //最后，绘制组件
  chart.render();
});

const Chart = createG2(chart => {
  chart.col('startDate', {
      alias: '',
      type: 'time',
      mask: 'mm-dd'
  });
  chart.col('totalError', {
      alias: ' '
  });
  chart.line().position('startDate*totalError').color('#1E90FF').size(2).shape('smooth');
  chart.area().position('startDate*totalError').color('#87CEFF').shape('smooth');
  chart.render();
});


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      params: [],
      pieData: [
        {
          item: '计算机学院',
          count: 40,
          percent: 0.4,
          value: 20
        },
        {
          item: '物联网学院',
          count: 21,
          percent: 0.21,
          value: 20
        },
        {
          item: '电子商务学院',
          count: 17,
          percent: 0.17,
          value: 20
        },
        {
          item: '大数据学院',
          count: 13,
          percent: 0.13,
          value: 20
        },
        {
          item: '智能制造学院',
          count: 9,
          percent: 0.09,
          value: 20
        },
    ],
      lineData: [
        {"date":"2017-6","value":22.75,"type":"即将到期","rate":23.335},
        {"date":"2017-6","value":23.44,"type":"已到期","rate":23.335},
        {"date":"2017-6","value":22.69,"type":"逾期金额","rate":23.335},

        {"date":"2017-7","value":21.75,"type":"即将到期","rate":43.335},
        {"date":"2017-7","value":33.44,"type":"已到期","rate":43.335},
        {"date":"2017-7","value":42.69,"type":"逾期金额","rate":43.335},

        {"date":"2017-8","value":31.75,"type":"即将到期","rate":25.335},
        {"date":"2017-8","value":35.44,"type":"已到期","rate":25.335},
        {"date":"2017-8","value":12.69,"type":"逾期金额","rate":25.335},

        {"date":"2017-9","value":36.75,"type":"即将到期","rate":45.335},
        {"date":"2017-9","value":65.44,"type":"已到期","rate":45.335},
        {"date":"2017-9","value":32.69,"type":"逾期金额","rate":45.335},

        {"date":"2017-10","value":35.75,"type":"即将到期","rate":35.335},
        {"date":"2017-10","value":15.44,"type":"已到期","rate":35.335},
        {"date":"2017-10","value":52.69,"type":"逾期金额","rate":35.335},

        {"date":"2017-11","value":41.75,"type":"即将到期","rate":75.335},
        {"date":"2017-11","value":25.44,"type":"已到期","rate":75.335},
        {"date":"2017-11","value":62.69,"type":"逾期金额","rate":75.335},
      ],
      line1Data: [
        { startDate: '1991', totalError: 3 },
        { startDate: '1992', totalError: 4 },
        { startDate: '1993', totalError: 3.5 },
        { startDate: '1994', totalError: 5 },
        { startDate: '1995', totalError: 4.9 },
        { startDate: '1996', totalError: 6 },
        { startDate: '1997', totalError: 7 },
        { startDate: '1998', totalError: 9 },
        { startDate: '1999', totalError: 13 },
      ],
      plotCfg: {
        margin: [30, 40, 90, 80],
      },
      linePlotCfg: {
        margin: [30, 40, 90, 80],
        background: {
            stroke: '#ccc', // 边颜色
            lineWidth: 1, // 边框粗细
        }
      },
      chartPlotCfg: {
        margin: [25, 50, 40, 50],
        border: {
            fill: '#FFE4E1',
            fillOpacity: 0.7, 
        },
        background: {
            fill: '#FFE4E1',  
            fillOpacity: 0.4, 
        }
      }
    }
  }

  render () {
    const { pieData, lineData, plotCfg, chartPlotCfg, line1Data } = this.state
    return (
      <div>
        <Row>
          <Col span={12}>
            <Pie
              data={pieData}
              width={600}
              height={400}
              plotCfg={plotCfg}
              ref='myChart'
            />
          </Col>
          <Col span={12}>
            <Chart
              data={line1Data}
              width={600}
              height={400}
              forceFit={false}
              plotCfg={chartPlotCfg}
            />
          </Col>
        </Row>
        <Line
          data={lineData}
          forceFit={true}
          height={400}
          width={600}
          plotCfg={{
              margin: [80, 80, 50, 80],
          }}
        />
      </div>
    );
  }
}

export default Home;
