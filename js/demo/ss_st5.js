$(window).resize(function() {
  setHeight();
})

$(document).ready(function() {
  setHeight();
})

var setHeight = function() {
  var htmlHeight = window.innerHeight - 50;
  $('#contents_area').height(htmlHeight);
}

// 텍스트 애니메이션
const wrappers = document.querySelectorAll('.scrolling-wrapper');

wrappers.forEach(wrapper => {
  const text = wrapper.querySelector('.scrolling-text');
  const wrapperWidth = wrapper.clientWidth;
  const textWidth = text.clientWidth;

  // 텍스트가 요소 너비를 넘어가는 경우 애니메이션 적용
  if (textWidth > wrapperWidth) {
    const animationDuration = textWidth / 30; // 움직이는 속도 조절
    text.style.animation = `scroll-left ${animationDuration}s linear infinite`;
  }
  else {
    text.style.animation = 'none'; // 텍스트가 래퍼를 넘어가지 않으면 애니메이션 중지
  }
});


// 진척율 증가(녹색)
var increaseRate = function() {
  var bgGreens = $('td.bg-green');
  
  bgGreens.each(function() {
    var rate = parseInt($(this).find('.pro-rate').text());

    if(rate != null && rate < 100){
      rate += 1;
      if (rate == 100) {
        $(this).attr('class', 'bg-orange');
      }
      $(this).find('.pro-rate').text(rate);
    }
  });
}

// 랜덤으로 녹색 -> 빨강색 수정하기
var greenToRed = function() {
  var bgGreens = $('td.bg-green');
  // 요소들을 배열로 변환하고 섞습니다.(랜덤 효과)
  var shuffled = bgGreens.toArray().sort(() => 0.5 - Math.random());
  var selected = shuffled.slice(0, 2);

  // 선택된 요소의 클래스를 'bg-red'로 변경
  $(selected).each(function() {
    $(this).attr('class', 'bg-red');
  });
}

var redToGreen = function() {
  var bgReds = $('td.bg-red');
  var shuffled = bgReds.toArray().sort(() => 0.5 - Math.random());
  var selected = shuffled.slice(0, 2);

  $(selected).each(function() {
    $(this).attr('class', 'bg-green');
  });
}

setInterval(function() {
  increaseRate();
  greenToRed();
  redToGreen();
}, 5000);
