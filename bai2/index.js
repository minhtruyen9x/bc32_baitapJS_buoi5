//Tính tiền điện

/**
 * Mô hình 3 khối
 * 
 * =======Đầu vào=======
 * - Họ tên, số Điện
 * -
 * 
 * ========Xử lý==========
 * - Tao hàm in ra các message function throwMess(message, Element)
 * - Tạo hàm kiểm tra lỗi input đầu vào không hợp lệ function validInput(number)
 * - Tạo hàm tính tiền calcMoney(number, level1, level2, level3, level4, level5)
 * 
 * - Sau khi button được click
 * 
 * - Tạo lần lượt các biến lưu giá trị user nhập vào input
 * 
 * - Gọi hàm validInput để kiểm tra tính hợp lệ
 * - Gọi hàm calcMoney(value) giá trị trả về lưu vào sum
 * 
 * - Xuấ ra giá trị sum
 * =========Đầu ra===========
 * - Xuất ra text là giá tiền
 * 
 * 
 */

function throwMess(message, Element) {
    Element.innerText = message;
}

function validInput(number) {
    if (number < 0 || isNaN(number)) {
        return false;
    } else {
        return true;
    }
}

function calcMoney(number, level1, level2, level3, level4, level5) {
    let sum = 0;
    if(number <= 50) {
        sum += number*level1;
    }
    else if(number <= 100) {
        sum += 50*level1 + (number - 50)*level2;
    }
    else if(number <= 200) {
        sum += 50*level1 + 50*level2 + (number - 100)*level3;
    }
    else if(number <= 350) {
        sum += 50*level1 + 50*level2 + 100*level3 + (number - 200)*level4;
    }
    else {
        sum += 50*level1 + 50*level2 + 100*level3 + 150*level4 +
        (number - 350)*level5;

    }
    return sum; 
}

document.getElementById('button').onclick = function () {
    let name = document.getElementById('name').value;
    name = name ? name : "\"Không tên\"";
    let number = document.getElementById('number').value * 1;

    let output = document.getElementById('output');
    let text ='';
    if(!validInput(number)){
        text = "Số điện không hợp lệ";
        throwMess(text,output);
        return;
    }

    let sum = calcMoney(number,500,650,850,1100,1300);
    text = "Họ tên: " + name +"\n" +
            "Tổng tiền điện: " + sum.toLocaleString("vn-VN") + "VND"; 
    throwMess(text,output); 
}