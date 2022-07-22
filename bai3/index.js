//Tính thuế thu nhập cá nhân

/**
 * Mô hình 3 khối
 * 
 * =======Đầu vào=======
 * - Họ tên, số người phụ thuộc, số tiền thu nhập 1 năm
 * -
 * 
 * ========Xử lý==========
 * - Tao hàm in ra các message function throwMess(message, Element)
 * - Tạo hàm kiểm tra lỗi input đầu vào không hợp lệ function validInput(number)
 * - Tạo hàm tính tiền calcMoney(income, number)
 * 
 * - Sau khi button được click
 * 
 * - Tạo lần lượt các biến lưu giá trị user nhập vào input
 * 
 * - Gọi hàm validInput để kiểm tra tính hợp lệ
 * - Gọi hàm calcMoney(value) giá trị trả về lưu vào sum
 * 
 * - xuất ra sum
 * =========Đầu ra===========
 * - Xuất ra text tiền thuế yêu cầu.
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

function calcMoney(income, number) {
    //tính thu nhập chịu thuế
    let sum = income - 4000000 - number*1600000;

    //kiểm tra các khoảng income tương ứng sẽ nhân sum với tỉ lệ chịu thuế tương ứng
    if(income <= 60000000) {
        sum *= 0.05;
    }
    else if(number <= 1200000) {
        sum *= 0.1;
    }
    else if(number <= 210000000) {
        sum *= 0.15;
    }
    else if(number <= 384000000) {
        sum *= 0.2;
    }
    else if(number <= 624000000) {
        sum *= 0.25;
    }
    else if(number <= 960000000) {
        sum *= 0.3;
    }
    else {
        sum *= 0.35;
    }
    return sum; 
}

document.getElementById('button').onclick = function () {
    let name = document.getElementById('name').value;
    name = name ? name : "\"Không tên\"";
    let number = document.getElementById('number').value * 1;
    let income = document.getElementById('income').value * 1;

    let output = document.getElementById('output');
    let text = '';
    if(!validInput(income)) {
        text = "Số tiền nhập không hợp lệ"
        throwMess(text, output);
        return
    }
    if(!validInput(number)) {
        text = "Số người phụ thuộc không hợp lệ"
        throwMess(text, output);
        return
    }
    let sum = calcMoney(income,number);
    if(sum < 0) {
        sum = 0;
    }
    text = "Họ tên: " + name + "\n"+
        " Tổng thuế cần đóng: " + sum.toLocaleString("vn-VN") + "VND";
    throwMess(text,output);
}