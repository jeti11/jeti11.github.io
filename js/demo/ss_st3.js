$(window).resize(function() {
  setHeight();
})

$(document).ready(function() {
  setHeight();
})

var setHeight = function() {
  var htmlHeight = $('html').outerHeight();
  var minusHeight = $('.container-fluid').outerHeight();
  $('#center-area').height(htmlHeight - minusHeight);
}

// DOM을 준비하고 echart 객체를 만듭니다.
var myChart = echarts.init(document.getElementById('p3-chart'));

// 초기 데이터
var min = -15; // 최소값
var max = 15;  // 최대값

var initData = {
  time: [(new Date()).toLocaleTimeString().replace(/^\D*/, '')],
  vibration: [Math.floor(Math.random() * (max - min + 1)) + min]
};

// 진동센서 초기값 설정
var maxValDiv = document.getElementById('chart-maxValue');
var minValDiv = document.getElementById('chart-minValue');

if (initData.vibration >= 0) {
  maxValDiv.textContent = initData.vibration;
}
else {
  minValDiv.textContent = initData.vibration;
}


// chart의 설정을 정합니다.
var option = {

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
    top: '10%',
    bottom: '10%'
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
      min: 0, // x축의 최소값을 0으로 설정합니다.
      max: 9 // x축의 최대값을 9로 설정하여 처음부터 최대 10개의 데이터만 보이도록 합니다.
    }
  ],
  yAxis: [
    {
      type: 'value',
      scale: true,
      name: '',
      max: 100,
      min: -100,
      boundaryGap: [0.2, 0.2],
      axisLine: {
        show: true,
        lineStyle: {
          color : '#FF0000',
          width: 2
        }
      },
      axisLabel: {
        formatter: '{value}'
      },
    }
  ],
  series: [
    {
      name: '진동률 데이터',
      type: 'line',
      lineStyle: {
        color: '#2A265C' // line차트 색상 변경
      },
      smooth: false, // 부드러운 line 표현
      yAxisIndex: 0, // yAxis 1번째 사용
      data: initData.vibration
    }
  ]
};


// 위에서 설정한 속성을 차트에 반영합니다.
myChart.setOption(option);

var currIdx = 0;

// 데이터를 생성하고 삭제합니다.
setInterval(function () {
  // x축에 실시간 데이터 생성
  var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

  var data0 = option.series[0].data; // 진동률 데이터

  // 새로운 데이터 추가 및 표시
  var maxValDiv = document.getElementById('chart-maxValue');
  var minValDiv = document.getElementById('chart-minValue');

  min = -15; // 최소값
  max = 15;  // 최대값

  var chartValue = Math.floor(Math.random() * (max - min + 1)) + min;
  data0.push(chartValue);

  if (chartValue >= 0) {
    maxValDiv.textContent = chartValue;
  }
  else if (chartValue < 0) {
    minValDiv.textContent = chartValue;
  }

  // 데이터 개수가 10개가 넘어가면 가장 왼쪽 데이터 제거
  if (data0.length > 10) {
    data0.shift();
    // x축에 시간 데이터도 함께 제거
    option.xAxis[0].data.shift();
  }

  // 새로운 시간 데이터 추가
  option.xAxis[0].data.push(axisData);

  // 차트에 반영
  myChart.setOption(option);

  // 좌상단 생산 데이터
  setLeftTopData();
  
  // 우상단 상태창 데이터
  setStatusMsg();
  
  // 우중단 데이터
  setRightCenterData();

  // 하단부 테이블 배경색 변경
  setLowTableBgColor();
}, 5000);


var setStatusMsg = function () {
  // 순번 생성
  var index = $('#process-status').children().length + 1;

  // 현재 시간 생성
  var currentTime = new Date().toLocaleTimeString();

  // 랜덤 상태 생성
  var status = Math.random() < 0.5 ? '경보발생' : '가동중지';

  // 랜덤 메시지 생성
  var messages = [
    'MAIN PANEL R0-RELEY SOCKET', 
    'MAIN IDLE Y1 ORIGIN SENSOR', 
    'MAIN IDLE Y1 DOWN LIMIT SENSOR', 
    'NO1 PRESS HI CAMLIMIT SWITCH2', 
    'NO1 PRESS LOW CAM LIMIT SWITCH2'
  ];
  var randomIndex = Math.floor(Math.random() * messages.length);
  var message = messages[randomIndex];

  // 새로운 데이터 요소 생성
  var newDataElement = $('<div class="row border">' +
    '<div class="col-2">' + index + '</div>' +
    '<div class="col-3">' + currentTime + '</div>' +
    '<div class="col-2">' + status + '</div>' +
    '<div class="col">' + message + '</div>' +
    '</div>');

  // 새로운 데이터 요소를 HTML 영역의 맨 위에 추가
  $('#process-status').prepend(newDataElement);  // append 대신 prepend 사용
}

var produceData = {
  production: 0,
  defection: 0,
  processRate: 0,
  goal: 800
};

  // 좌상단 데이터
var setLeftTopData = function() {

  var isDefective = Math.random() < 0.1;

  if (isDefective) {
    produceData.defection += 1;
  } 
  else {
    produceData.production += 1;
  }

  produceData.processRate = ((produceData.production / produceData.goal) * 100).toFixed(1);

  $('#production').text(produceData.production);
  $('#defect').text(produceData.defection);
  $('#process_rate').text(produceData.processRate);

  // 좌상단 온도, 습도, 분진 데이터
  var l1Temp = Math.floor(Math.random() * 10) + 10;
  $('#l1_temp').text(l1Temp);
  
  var l1HumidInt = (Math.random() * 16) + 25;
  var l1Humid = l1HumidInt.toFixed(1);
  $('#l1_humid').text(l1Humid);

  var l1Dust = Math.floor(Math.random() * 2000) + 4000;
  $('#l1_dust').text(new Intl.NumberFormat('ko-KR').format(l1Dust));
}

// 우중단 데이터
var setRightCenterData = function() {
  var voltage = Math.floor(Math.random() * 101) + 3700;
  $('#voltage').text(new Intl.NumberFormat('ko-KR').format(voltage));

  var current = Math.floor(Math.random() * 101) + 2200;
  $('#current').text(new Intl.NumberFormat('ko-KR').format(current));

  var pressureInt = (Math.random() * 2) + 6; // 6.0 ~ 8.0 사이의 숫자
  // 소수점 첫째자리까지 표현
  var pressure = pressureInt.toFixed(1);
  $('#pressure').text(pressure);

  var power1 = Math.floor(Math.random() * 201) + 2000;
  $('#power1').text(new Intl.NumberFormat('ko-KR').format(power1));

  var power2 = Math.floor(Math.random() * 201) + 2000;
  $('#power2').text(new Intl.NumberFormat('ko-KR').format(power2));

  var power3 = Math.floor(Math.random() * 501) + 13000;
  $('#power3').text(new Intl.NumberFormat('ko-KR').format(power3));
}

var setLowTableBgColor = function() {
  var greenClasses = ['green1', 'green2'];
  var redClasses = ['red1', 'red2'];

  for (var i = 0; i < greenClasses.length; i++) {
    $('.' + greenClasses[i]).css('background-color', '');
    $('.' + redClasses[i]).css('background-color', '');
  }

  $('.' + greenClasses[currIdx]).css('background-color', '#05b41c');
  $('.' + redClasses[currIdx]).css('background-color', '#dc3545');

  currIdx = (currIdx + 1) % greenClasses.length; 
}
