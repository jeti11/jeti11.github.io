$(window).resize(function () {
  setHeight();
})


$(document).ready(function () {
  setHeight();
  setCurrentTime();

  r1Chart.setOption(r1ChartOption);
  r2Chart3.setOption(r2Chart3Option);
  r3Chart1.setOption(r3Chart1Option);
  r3Chart2.setOption(r3Chart2Option);
  r3Chart3.setOption(r3Chart3Option);
})

// 화면 너비에 따라 높이조절 하는 함수
var setHeight = function () {
  var htmlHeight = $('html').outerHeight();
  var minusHeight = $('nav').outerHeight();
  $('#wrapper').height(htmlHeight - minusHeight);

  r1Chart.resize();
  r2Chart1.resize();
  r2Chart2.resize();
  r2Chart3.resize();
  r3Chart1.resize();
  r3Chart2.resize();
  r3Chart3.resize();

}

// DOM을 준비하고 echart 객체를 만듭니다.
var r1Chart = echarts.init(document.getElementById('r1-chart'));
var r2Chart1 = echarts.init(document.getElementById('r2-chart1'));
var r2Chart2 = echarts.init(document.getElementById('r2-chart2'));
var r2Chart3 = echarts.init(document.getElementById('r2-chart3'));
var r3Chart1 = echarts.init(document.getElementById('r3-chart1'));
var r3Chart2 = echarts.init(document.getElementById('r3-chart2'));
var r3Chart3 = echarts.init(document.getElementById('r3-chart3'));

// -------------------------------- r1-chart -------------------------------------
// 초기 데이터
var initData = {
  time: [(new Date()).toLocaleTimeString().replace(/^\D*/, '')],
  vibration: [Math.floor(Math.random() * (100) + 400)]
};

//초기값 설정
var resultDiv = document.getElementById('r1-chart-value');
resultDiv.textContent = initData.vibration;


var r1ChartOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#283b56'
      }
    }
  },
  grid: {
    top: '20%',
    bottom: '15%',
    left: '4%',
    right: '1%'
  },
  legend: {
    data: ['진동 데이터']
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: true,
      data: initData.time,
      axisLabel: {
        interval: 1 // x축의 라벨이 겹치지 않도록 설정합니다.
      },
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#FFFFFF',
          width: 1
        }
      },
      min: 0, // x축의 최소값을 0으로 설정합니다.
      max: 9 // x축의 최대값을 9로 설정하여 처음부터 최대 10개의 데이터만 보이도록 합니다.
    }
  ],
  yAxis: [
    {
      type: 'value',
      splitLine: {
        show: false // Y축 방향의 격자선을 제거
      },
      scale: true,
      name: '',
      max: 500,
      min: 400,
      boundaryGap: [0.2, 0.2],
      axisLine: {
        show: false,
        lineStyle: {
          color: '#FFFFFF',
          width: 1
        }
      },
      axisLabel: {
        formatter: '{value}'
      },
    }
  ],
  series: [
    {
      name: '유효 전력',
      type: 'line',
      lineStyle: {
        color: '#FFFFFF' // line차트 색상 변경
      },
      smooth: false, // 부드러운 line 표현
      yAxisIndex: 0, // yAxis 1번째 사용
      data: initData.vibration
    }
  ]
};



// 현재 시간 구하기
var setCurrentTime = function () {
  var now = new Date(); // 현재 시간
  var hours = now.getHours(); // 0~23 사이의 시간
  var minutes = now.getMinutes(); // 분
  var seconds = now.getSeconds(); // 초

  var ampm = hours >= 12 ? 'PM' : 'AM'; // AM/PM 결정

  // 12시간 형식으로 변환
  hours = hours % 12; // 12시간으로 변환
  hours = hours ? hours : 12; // 0인 경우 12로 설정

  // 분과 초를 두 자리로 설정
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  var timeStr = ampm + hours + ':' + minutes + ':' + seconds; // 최종 문자열
  $('#currTime').text(timeStr);
}


// -------------------------------- r2-chart1 -------------------------------------
const data = [];
for (let i = 0; i < 5; ++i) {
  data.push(Math.round(Math.random() * 200));
}

var r2Chart1Option = {
  xAxis: {
    max: 'dataMax',  // x축의 최대 값을 데이터의 최대 값에 맞춥니다.
    type: 'value',   // x축을 값 축으로 설정합니다.
    animation: true,  // x축 애니메이션 활성화
    animationDuration: 3000,
    animationEasing: 'linear',
    axisLine: {
      show: false,
      lineStyle: {
        color: '#FFFFFF',
        width: 1
      }
    },
  },
  yAxis: {
    type: 'category',
    data: ['A', 'B', 'C', 'D', 'E'],
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 300,
    max: 2 // only the largest 3 bars will be displayed
  },
  grid: {
    top: '10%',
    bottom: '15%',
    left: '5%',
    right: '7%'
  },
  series: [
    {
      realtimeSort: true,
      name: 'kWh',
      type: 'bar',
      data: data,
      label: {
        show: true,
        position: 'right',
        valueAnimation: true
      },
      itemStyle: {
        color: function (params) {
          var colors = ['#dc3545', '#0d6efd', '#198754', '#ffc107', '#0dcaf0'];
          return colors[params.dataIndex % colors.length];
        }
      }
    }
  ],
  legend: {
    show: false
  },
  animationDuration: 0,
  animationDurationUpdate: 3000,
  animationEasing: 'linear',
  animationEasingUpdate: 'linear'
}

function r2Chart1Run() {
  for (var i = 0; i < data.length; ++i) {
    if (Math.random() > 0.9) {
      data[i] += Math.round(Math.random() * 2000);
    } else {
      data[i] += Math.round(Math.random() * 200);
    }
  }
  r2Chart1.setOption({
    series: [
      {
        type: 'bar',
        data
      }
    ]
  });
}

r2Chart1.setOption(r2Chart1Option);



// -------------------------------- r2-chart2 -------------------------------------
var ROOT_PATH = 'https://echarts.apache.org/examples';

var _panelImageURL = ROOT_PATH + '/data/asset/img/custom-gauge-panel.png';
var _animationDuration = 1000;
var _animationDurationUpdate = 1000;
var _animationEasingUpdate = 'quarticInOut';
var _valOnRadianMax = 500;
var _outerRadius = 120;
var _innerRadius = 80;
var _pointerInnerRadius = 40;
var _insidePanelRadius = 80;
var _currentDataIndex = 0;

function renderItem(params, api) {
  var valOnRadian = api.value(1);
  var coords = api.coord([api.value(0), valOnRadian]);
  var polarEndRadian = coords[3];
  var imageStyle = {
    image: _panelImageURL,
    x: params.coordSys.cx - _outerRadius,
    y: params.coordSys.cy - _outerRadius,
    width: _outerRadius * 2,
    height: _outerRadius * 2,
  };
  return {
    type: 'group',
    children: [
      {
        type: 'image',
        style: imageStyle,
        clipPath: {
          type: 'sector',
          shape: {
            cx: params.coordSys.cx,
            cy: params.coordSys.cy,
            r: _outerRadius,
            r0: _innerRadius,
            startAngle: 0,
            endAngle: -polarEndRadian,
            transition: 'endAngle',
            enterFrom: { endAngle: 0 },
          }
        }
      },
      {
        type: 'image',
        style: imageStyle,
        clipPath: {
          type: 'polygon',
          shape: {
            points: makePionterPoints(params, polarEndRadian)
          },
          extra: {
            polarEndRadian: polarEndRadian,
            transition: 'polarEndRadian',
            enterFrom: { polarEndRadian: 0 }
          },
          during: function (apiDuring) {
            apiDuring.setShape(
              'points',
              makePionterPoints(params, apiDuring.getExtra('polarEndRadian'))
            );
          }
        }
      },
      {
        type: 'circle',
        shape: {
          cx: params.coordSys.cx,
          cy: params.coordSys.cy,
          r: _insidePanelRadius
        },
        style: {
          fill: '#2e2e2e',
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
        }
      },
      {
        type: 'text',
        extra: {
          valOnRadian: valOnRadian,
          transition: 'valOnRadian',
          enterFrom: { valOnRadian: 0 }
        },
        style: {
          text: makeText(valOnRadian),
          fontSize: 30,
          fontWeight: 600,
          x: params.coordSys.cx,
          y: params.coordSys.cy,
          fill: 'white',
          align: 'center',
          verticalAlign: 'middle',
          enterFrom: { opacity: 0 }
        },
        during: function (apiDuring) {
          apiDuring.setStyle(
            'text',
            makeText(apiDuring.getExtra('valOnRadian'))
          );
        }
      }
    ]
  };
}

function convertToPolarPoint(renderItemParams, radius, radian) {
  return [
    Math.cos(radian) * radius + renderItemParams.coordSys.cx,
    -Math.sin(radian) * radius + renderItemParams.coordSys.cy
  ];
}

function makePionterPoints(renderItemParams, polarEndRadian) {
  return [
    convertToPolarPoint(renderItemParams, _outerRadius, polarEndRadian),
    convertToPolarPoint(
      renderItemParams,
      _outerRadius,
      polarEndRadian + Math.PI * 0.03
    ),
    convertToPolarPoint(renderItemParams, _pointerInnerRadius, polarEndRadian)
  ];
}

function makeText(valOnRadian) {
  // Validate additive animation calc.
  if (valOnRadian < -10) {
    alert('illegal during val: ' + valOnRadian);
  }
  return '전력\n' + ((valOnRadian / _valOnRadianMax) * 100).toFixed(0) + ' kw';
}

var r2Chart2Option = {
  animationEasing: _animationEasingUpdate,
  animationDuration: _animationDuration,
  animationDurationUpdate: _animationDurationUpdate,
  animationEasingUpdate: _animationEasingUpdate,
  dataset: {
    source: [[1, 156]]
  },
  tooltip: {},
  angleAxis: {
    type: 'value',
    startAngle: 0,
    show: false,
    min: 0,
    max: _valOnRadianMax
  },
  radiusAxis: {
    type: 'value',
    show: false
  },
  polar: {},
  series: [
    {
      type: 'custom',
      coordinateSystem: 'polar',
      renderItem: renderItem
    }
  ]
};

r2Chart2.setOption(r2Chart2Option);



// -------------------------------- r2-chart3 -------------------------------------
var r2Chart3Option = {
  legend: {
    top: 'bottom', // 범례의 위치를 'bottom'으로 설정
    data: ['P#1', 'P#2', 'P#3'], // 범례에 표시될 데이터
    textStyle: {
      color: 'white', // 범례 글자색을 빨간색으로 설정
      fontSize: 14, // 폰트 크기를 14로 설정
    }
  },
  tooltip: {},
  grid: {
    top: '15%',
    bottom: '15%',
    left: '8%',
    right: '7%'
  },
  dataset: {
    dimensions: ['product', 'P#1', 'P#2', 'P#3'],
    source: [
      { product: '1월', 'P#1': 80000, 'P#2': 20000, 'P#3': 110000 },
      { product: '2월', 'P#1': 110000, 'P#2': 40000, 'P#3': 170000 },
      { product: '3월', 'P#1': 120000, 'P#2': 50000, 'P#3': 170000 },
      { product: '4월', 'P#1': 110000, 'P#2': 50000, 'P#3': 150000 }
    ]
  },
  xAxis: {
    type: 'category',
    axisLabel: {
      color: 'white', // 모든 라벨을 빨간색으로 변경
    },
  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: true // Y축 방향의 격자선을 제거
    },
    scale: true,
    name: 'kWh',
    max: 200000,
    min: 0,
    boundaryGap: [0.2, 0.2],
    axisLine: {
      show: false,
      lineStyle: {
        color: '#FFFFFF',
        width: 1
      }
    },
    axisLabel: {
      formatter: '{value}'
    },
  },
  series: [
    { type: 'bar', name: 'P#1', itemStyle: { color: '#17a2b8' } }, // 색상 변경
    { type: 'bar', name: 'P#2', itemStyle: { color: '#007bff' } },
    { type: 'bar', name: 'P#3', itemStyle: { color: '#dc3545' } },
  ]
};




// -------------------------------- r3-chart1 -------------------------------------
var app = {};

const categories = (function () {
  let now = new Date();
  let res = [];
  let len = 10;
  while (len--) {
    res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
    now = new Date(+now - 10000);
  }
  return res;
})();

const categories2 = (function () {
  let res = [];
  let len = 10;
  while (len--) {
    res.push(10 - len - 1);
  }
  return res;
})();

const r3Chart1Data = (function () {
  let res = [];
  let len = 10;
  while (len--) {
    res.push(Math.round(Math.random() * 1000));
  }
  return res;
})();

const r3Chart1Data2 = (function () {
  let res = [];
  let len = 0;
  while (len < 10) {
    res.push(+(Math.random() * 10 + 5).toFixed(1));
    len++;
  }
  return res;
})();


var r3Chart1Option = {
  title: {
    text: '실시간 I-SMART DATA',
    textStyle: {
      color: 'white', // 제목 색상을 흰색으로 설정
      fontSize: 18,
    },
    x: 'center', // 제목을 가운데에 배치
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#283b56'
      }
    }
  },
  grid: {
    top: '20%',
    bottom: '15%',
    left: '4%',
    right: '7%'
  },
  dataZoom: {
    show: false,
    start: 0,
    end: 100
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: true,
      data: categories,
      axisLine: {
        show: false,
        lineStyle: {
          color: '#FFFFFF',
          width: 1
        }
      },
    },
    {
      type: 'category',
      boundaryGap: true,
      data: categories2,
      show: false,
    }
    
  ],
  yAxis: [
    {
      type: 'value',
      scale: false,
      max: 30,
      min: 0,
      boundaryGap: [0.2, 0.2],
      axisLine: {
        show: false,
        lineStyle: {
          color: '#FFFFFF',
          width: 1
        }
      },
    },
    {
      type: 'value',
      scale: false,
      max: 1200,
      min: 0,
      boundaryGap: [0.2, 0.2]
    }
  ],
  series: [
    {
      name: 'Dynamic Bar',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: r3Chart1Data,
      itemStyle: {
        color: 'lightBlue'
      },
    },
    {
      name: 'Dynamic Line',
      type: 'line',
      data: r3Chart1Data2,
      itemStyle: {
        color: 'yellow'
      },
    }
  ]
};

// -------------------------------- r3-chart2 -------------------------------------

// 오늘 날짜를 가져옴
const today = new Date();

// 10일 전부터 오늘까지의 날짜 배열 생성
const dateRange = [];
for (let i = 10; i >= 0; i--) {
  const date = new Date(today);
  date.setDate(today.getDate() - i);
  // 날짜를 "YYYY-MM-DD" 형식으로 변환
  const formattedDate = date.toISOString().split('T')[0];
  dateRange.push(formattedDate);
}

var r3Chart2Option = {
  title: {
    text: '부하시간대별 I-SMART DATA (DAILY)',
    textStyle: {
      color: 'white', // 제목 색상을 흰색으로 설정
      fontSize: 18,
    },
    x: 'center', // 제목을 가운데에 배치
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: dateRange, // 10일 전부터 오늘까지의 날짜 배열
    axisLine: {
      show: false,
      lineStyle: {
        color: '#FFFFFF',
        width: 1
      }
    },
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false,
      lineStyle: {
        color: '#FFFFFF',
        width: 1
      }
    },
  },
  series: [
    {
      name: 'Direct',
      type: 'bar',
      stack: 'total',
      label: {
        show: false
      },
      emphasis: {
        focus: 'series'
      },
      data: [120, 302, 301, 334, 390, 330, 320, 100, 120, 150, 170],
      itemStyle: {
        color: '#FF3300'
      }
    },
    {
      name: 'Direct',
      type: 'bar',
      stack: 'total',
      label: {
        show: false
      },
      emphasis: {
        focus: 'series'
      },
      data: [132, 130, 130, 133, 139, 133, 132, 110, 112, 115, 117],
      itemStyle: {
        color: '#FF8339'
      }
    },
    {
      name: 'Direct',
      type: 'bar',
      stack: 'total',
      label: {
        show: false
      },
      emphasis: {
        focus: 'series'
      },
      data: [82, 80, 80, 83, 89, 83, 82, 60, 62, 65, 67],
      itemStyle: {
        color: '#ffc107'
      }
    },
  ]
};


// -------------------------------- r3-chart3 -------------------------------------
var r3Chart3Option = {
  polar: {
    radius: [20, '80%']
  },
  radiusAxis: {
    max: 4,
    axisLine: {
      show: false,
      lineStyle: {
        color: 'white',
        width: 1
      }
    },

  },
  angleAxis: {
    type: 'category',
    data: ['AM 00', 'AM 03', 'AM 06', 'AM 09', 'PM 12', 'PM 15', 'PM 18', 'PM 21'],
    startAngle: 90, // 수직 상단부에서 시작하게 설정
    show: true,
    axisLine: {
      show: false,
      lineStyle: {
        color: 'white',
        width: 1
      }
    },

  },
  tooltip: {},
  series: {
    type: 'bar',
    data: [1, 2, 1.5, 3],
    coordinateSystem: 'polar',
    itemStyle: {
      color: function(params) {
        const colors = ['#dc3545', '#ffc107', '#198754', '#0d6efd', '#0dcaf0', '#6c757d', '#f8f9fa', '#343a40']; // 색상 배열
        return colors[params.dataIndex]; // 데이터 인덱스에 따라 색상 선택
      }
    },
    label: {
      show: false,
      position: 'middle',
      formatter: '{b}: {c}'
    }
  },
  animation: false
};



















// ------------------------------- 인터벌 함수 영역 ---------------------------------------

setInterval(function() {
  setCurrentTime();
}, 1000)

// 수치 및 차트 인터벌
setInterval(function () {
  // x축에 실시간 데이터 생성
  var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

  var data0 = r1ChartOption.series[0].data; // 진동률 데이터

  // 새로운 데이터 추가 및 표시
  var resultDiv = document.getElementById('r1-chart-value');
  var chartValue = Math.floor(Math.random() * 100 + 400);
  resultDiv.textContent = chartValue;
  data0.push(chartValue);


  // 데이터 개수가 10개가 넘어가면 가장 왼쪽 데이터 제거
  if (data0.length > 10) {
    data0.shift();
    // x축에 시간 데이터도 함께 제거
    r1ChartOption.xAxis[0].data.shift();
  }

  // 새로운 시간 데이터 추가
  r1ChartOption.xAxis[0].data.push(axisData);

  // 차트에 반영
  r1Chart.setOption(r1ChartOption);

}, 5000);

setTimeout(function () {
  r2Chart1Run();
}, 0);

setInterval(function () {
  r2Chart1Run();
}, 3000);


setInterval(function () {
  var nextSource = [[1, Math.round(Math.random() * _valOnRadianMax)]];
  r2Chart2.setOption({
    dataset: {
      source: nextSource
    }
  });
}, 10000);


app.count = 11;
setInterval(function () {
  let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
  r3Chart1Data.shift();
  r3Chart1Data.push(Math.round(Math.random() * 1000));
  r3Chart1Data2.shift();
  r3Chart1Data2.push(+(Math.random() * 10 + 5).toFixed(1));
  categories.shift();
  categories.push(axisData);
  categories2.shift();
  categories2.push(app.count++);

  r3Chart1.setOption({
    xAxis: [
      {
        data: categories
      },
      {
        data: categories2
      }
    ],
    series: [
      {
        data: r3Chart1Data
      },
      {
        data: r3Chart1Data2
      }
    ]
  });
}, 10000);