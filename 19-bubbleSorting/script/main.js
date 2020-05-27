var intervalID, timeoutID, step;
var arrayNum = new Array();

//Слушатель на кнопку Генерации массива
$('#randomGenerate').click(function(){
    $('#content').empty();
    $('#sorting').removeAttr('disabled').show();
    
    clearTimeout(timeoutID);
    clearInterval(intervalID);

    var isSuperheroes = $('input:checked').val() == 'superheroes';

    getRandomArray(isSuperheroes);
});

// Слушатель но кнопку генерации массива
$('#sorting').click(function(){
    step = 1; // внешний счетчик проходов
    sorting(true);
    
    $('#randomGenerate').attr( 'disabled','disabled').show();
    $('#sorting').attr( 'disabled','disabled').show();
    $('input').attr( 'disabled','disabled').show();
});

// Генерация случайного числа от -100 до 100 включительно
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Генерация массива десяти случайных чисел, добавление визуального отображения этих чисел
function getRandomArray(isSuperheroes) {
    for (var i = 0; i < 10; i++) {
        var randomNum = getRandomInteger(-100, 100);
        var rNum = getRandomInteger(1, 12);
        arrayNum[i] = randomNum;
        if (isSuperheroes) {
            $('#content').append('<div class="img-array"><img src="./img/' + rNum + '.png" alt="img-'+ rNum +'"><span class="number">' + randomNum + '</span></div>');
        } else {
            $('#content').append('<div class="img-array"><img src="https://robohash.org/' + rNum + '?set=set4" alt="img-'+ rNum +'"><span class="number">' + randomNum + '</span></div>');
        }
        
    }
}

// Сортировка чисел с timeout
function sorting(wasSwap) {
    if ( step < 11 && wasSwap) {
        wasSwap = false; // переменная для остановки цикла раньше, если нет перестановок
        step++;
        var i = 1; // внутренний счетчик проходов
        
        (function() {
            if (i < 10) {

                var obj1 = $('#content .img-array:eq('+ i +')');
                var obj2 = $('#content .img-array:eq('+ (i-1) +')');

                obj1.css({outline: "0 solid #845EC2"}).animate({outlineWidth: "4px"},"slow");
                obj2.css({outline: "0 solid #845EC2"}).animate({outlineWidth: "4px"},"slow");

                $('#comment').text(arrayNum[i-1]+' < '+arrayNum[i] + ' => Оставляем');

                if (arrayNum[i] < arrayNum[i-1]) {

                    $('#comment').text(arrayNum[i-1]+' > '+arrayNum[i] + ' => Меняем!');
                    
                    swap(obj1, obj2);

                    var temp = arrayNum[i];
                    arrayNum[i] = arrayNum[i-1];
                    arrayNum[i-1] = temp;
                    wasSwap = true;
                   
                    
                    timeoutID = setTimeout(arguments.callee, 2000);
                } else {
                    timeoutID = setTimeout(arguments.callee, 2000);
                }

                obj1.css({outline: "0 solid #845EC2"}).animate({outlineWidth: "0"},"slow");
                obj2.css({outline: "0 solid #845EC2"}).animate({outlineWidth: "0"},"slow");

                i++;	
            } else { 
                clearInterval(intervalID);
                sorting(wasSwap);
                intervalID = setInterval(sorting, 20000);
            }
        })();
    } else {
        clearTimeout(timeoutID);
        clearInterval(intervalID);
        $('input').removeAttr('disabled').show();
        $('#randomGenerate').removeAttr('disabled').show();
        $('#comment').text('Сортировка окончена. Можете сгенерировать новый массив');
    }
}

// Графическое перемещение объектов
function swap(a, b){
    var from = $(a),
        dest = $(b),
        fromPos = from.offset(),
        destPos = dest.offset(),
        fromClone = from.clone(),
        destClone = dest.clone(),

        totalRouteVertical = destPos.top + dest.height() - fromPos.top,
        routeFromVertical = 0,
        routeDestVertical = 0,
        totalRouteHorizontal = destPos.left + dest.width() - fromPos.left,
        routeFromHorizontal = 0,
        routeDestHorizontal = 0;

    from.css('opacity', 0);
    dest.css('opacity', 0);

    fromClone.insertAfter(from).css({position: 'absolute', width: from.outerWidth(), height: from.outerHeight()}).offset(fromPos).css('z-index', '999');
    destClone.insertAfter(dest).css({position: 'absolute', width: dest.outerWidth(), height: dest.outerHeight()}).offset(destPos).css('z-index', '999');

    if (fromPos.top != destPos.top) {
        routeFromVertical = totalRouteVertical - from.height();
        routeDestVertical = totalRouteVertical - dest.height();
    }
        
    if (fromPos.left != destPos.left) {
        routeFromHorizontal = totalRouteHorizontal - from.width();
        routeDestHorizontal = totalRouteHorizontal - dest.width();
    }
        
    fromClone.css({outline: '4px solid #845EC2'}).animate({
        top: "+=" + routeFromVertical + "px",
        left: "+=" + routeFromHorizontal + "px"
        },
        "slow",
        function(){
            dest.insertBefore(this).css("opacity", 1);
            $(this).remove();
        }
    );

    destClone.css({outline: '4px solid #845EC2'}).animate({
        top: "-=" + routeDestVertical + "px",
        left: "-=" + routeDestHorizontal + "px"
        },
        "slow",
        function(){
            from.insertBefore(this).css("opacity", 1);
            $(this).remove();
        }
    );
}