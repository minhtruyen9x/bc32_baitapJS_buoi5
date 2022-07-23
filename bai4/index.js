//Tính tiền dịch vụ

/**
 * Mô hình 3 khối
 * 
 * =======Đầu vào=======
 * - ID khách hàng, số kênh, số kết nối, loại dịch vụ
 * -
 * 
 * ========Xử lý==========
 * - xử lý sự kiện ẩn hiện ô kết nối khi chon dịch vụ doanh nghiệp
 * - Tao hàm in ra các message function throwMess(message, Element)
 * - Tạo hàm kiểm tra lỗi input đầu vào không hợp lệ function validInput(service, channels)
 * - Tạo hàm kiểm tra ID function validID(id) ít nhất có 9 ký tự
 * - Tạo hàm tính tiền function calcMoney(service, channels, connect = 0) mặc định connect = 0
 * 
 * - Sau khi button được click
 * - Tạo lần lượt các biến lưu giá trị user nhập vào input
 * 
 * - Gọi hàm validID để kiểm tra tính hợp lệ
 * - Gọi hàm validInput để kiểm tra tính hợp lệ
 * 
 * - Kiểm tra loại dịch vụ mà user chọn rồi tính toán tiền theo từng trường hợp
 * - Mỗi loại dịch vụ khác nhau ,gọi hàm calcMoney(value) giá trị trả về lưu vào sum
 * - xuất ra sum
 * =========Đầu ra===========
 * - Xuất ra text tiền phí yêu cầu.
 * 
 * 
 */

function throwMess(message, Element) {
    Element.innerText = message;
}

function validInput(service, channels) {
    if (service < 0 || isNaN(service) ||
        channels < 0 || isNaN(channels)) {
        return false;
    } else {
        return true;
    }
}

function validID(id) {
    if (id.length < 8 || id.length > 12) {
        return false;
    }
    return true;
}

function calcMoney(service, channels, connect) {
    //tính thu nhập chịu thuế
    let sum = 0;
    if (service === "0") {
        sum += 4.5 + 20.5 + 7.5 * channels
    }
    else {
        connect = connect > 10 ? connect - 10 : 0;
        sum += 15 + 75 + 5 * connect + 50 * channels;
    }
    return sum;
}

//xử lý khi chọn loại khác hàng
document.getElementById("select").onchange = function (e) {
    if (e.target.value === '1') {
        document.getElementById("connectNum")
            .parentElement.style.visibility = "visible"
    }
    else {
        document.getElementById("connectNum")
            .parentElement.style.visibility = "hidden"
    }
}

//Xử lý khi nhấn nút tính tiền
document.getElementById('button').onclick = function () {
    let id = document.getElementById('id').value;
    let select = document.getElementById('select').value;
    let channels = document.getElementById('channels').value * 1;
    let connects = document.getElementById("connectNum").value * 1;

    let output = document.getElementById('output');
    let text = '';
    //Kiểm tra ID phải có ít nhất 9 ký tự
    if (!validID(id)) {
        text = "ID không hợp lệ\nVui lòng nhập ID gồm 9 đến 12 ký tự trở lên";
        throwMess(text, output);
        return;
    }
    //Kiểm tra value input có hợp lệ không
    if(!validInput(channels, connects)) {
        text = "Số không hợp lệ\nVui lòng nhập số có ký tự 0-9";
        throwMess(text, output);
        return;
    }

    let sum;
    switch(select) {
        case "0": {
            sum = calcMoney("0", channels);
            break;
        }
        case "1": {
            sum = calcMoney("1", channels, connects);
            break;
        }
        //default để tránh việc bug do thay đổi value của select
        default : {
            text = "Chọn loại khách hàng không hợp lê\n"+
            "Vui lòng chọn đúng như ô select hiển thị";
            throwMess(text, output);
            return;
        }
    }
    text = "Mã khách hàng: " + id + "\n" +
    "Tiền cáp: " + sum.toLocaleString("en-US",{
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
        roundingIncrement: 5
      });
    throwMess(text, output);
}