//Quản lý tuyển sinh

/**
 * Mô hình 3 khối
 * 
 * =======Đầu vào=======
 * - điểm 3 môn, điểm chuẩn, các diện ưu tiên
 * -
 * 
 * ========Xử lý==========
 * - Tao hàm in ra các message function throwMess(message, Element)
 * - Tạo hàm kiểm tra lỗi input đầu vào không hợp lệ function validInput(score1, score2, score3, benchmark)
 * - Tạo hàm kiểm tra điểm số khác không function checkScore(score1, score2, score3)
 * 
 * - Sau khi button được click
 * 
 * - Tạo lần lượt các biến lưu giá trị user nhập vào input
 * 
 * - Gọi hàm validInput để kiểm tra tính hợp lệ
 * - Gọi hàm checkScore để xem có điểm không hay không, nếu có sẽ throwMessage lỗi
 * 
 * - tạo biến prio1 và prio2 lưu giá trị điểm ưu tiên tương ứng cho các lựa chọn của user
 * 
 * - tính tổng sum = score1 + score2 + score3 + prio1 + prio2
 * - kiểm tra các tường hợp khi so sánh sum với điểm chuẩn
 * - Xuất output
 * =========Đầu ra===========
 * - Xuất ra text có rớt hay thông qua kì thi
 * 
 * 
 */

function throwMess(message, Element) {
    Element.innerText = message;
}

function validInput(score1, score2, score3, benchmark) {
    if (score1 < 0 || score2 < 0 || score3 < 0 || benchmark < 0 ||
        score1 > 10 || score2 > 10 || score3 > 10 || benchmark > 34.5 ||
        isNaN(score1) || isNaN(score2) || isNaN(score3) || isNaN(benchmark)) {
        return false;
    } else {
        return true;
    }
}

function checkScore(score1, score2, score3) {
    if (!score1 || !score2 || !score3) {
        return false;
    }
    return true
}

document.getElementById('button').onclick = function () {
    let name = document.getElementById('name').value;
    name = name ? name : "\"bạn\"";
    let benchmark = document.getElementById('benchmark').value * 1;
    let area = document.getElementById('area').value;
    let object = document.getElementById('object').value;
    let score1 = document.getElementById('score1').value * 1;
    let score2 = document.getElementById('score2').value * 1;
    let score3 = document.getElementById('score3').value * 1;


    let output = document.getElementById('output');

    let text = '';

    //Kiểm tra tính hợp lệ của diểm số
    if (!validInput(score1, score2, score3, benchmark, score2)) {
        text = "Yêu cầu nhập điểm hợp lệ\n"+
        "Mỗi môn cao nhất 10 điểm, thấp nhất là 0\n"+
        "Điểm chuẩn không cao hơn 34.5";
        throwMess(text, output);
        return;
    }

    //nếu có một trong 3 môn bằng 0 sẽ trượt
    if (!checkScore(score1, score2, score3)) {
        text = name + " đã trượt kỳ thi\n"+
        "Do có điểm 0 ít nhất 1 môn";
        throwMess(text, output);
        return;
    }

    let prio1;
    switch (area) {
        case "A": {
            prio1 = 2;
            break;
        }
        case "B": {
            prio1 = 1;
            break;
        }
        case "C": {
            prio1 = 0.5;
            break;
        }
        case "X": {
            prio1 = 0;
            break;
        }
        default: {
            text = "Yêu cầu chọn các giá trị có sẵn ô select";
            throwMess(text, output);
            return;
        }
    }
    let prio2;
    switch (object) {
        case "1": {
            prio2 = 2.5;
            break;
        }
        case "2": {
            prio2 = 1.5;
            break;
        }
        case "3": {
            prio2 = 1;
            break;
        }
        case "0": {
            prio2 = 0;
            break;
        }
        default: {
            text = "Yêu cầu chọn các giá trị có sẵn ô select";
            throwMess(text, output);
            return;
        }
    }


    let sum = score1 + score2 + score3 + prio1 + prio2;
    if (sum > benchmark) {
        text = name + " đã vượt qua kì thi tuyển sinh\n" +
        "Tổng điểm đạt được: " + sum;
    }
    else if (sum === benchmark) {
        text = "May mắn " + name + " vừa đủ điểm vượt qua\n" +
        "Tổng điểm đạt được: " + sum;
    }
    else {
        text = "Hy vọng " + name + " thi tốt hơn lần sau\n" +
        "Tổng điểm đạt được: " + sum;
    }
    throwMess(text, output)
}