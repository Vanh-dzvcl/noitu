//đây là lệnh dán vào console để lấy từ file txt lưu trữ từ lỗi đã học và tải từ trước

const SCRIPT_ID = 'vipProBot_v3.3';
const STATE_KEY = SCRIPT_ID + '_state';

const myMessySổ = `

... DÁN .TXT CỦA BẠN VÀO ĐÂY ...
... (Xóa dòng này, và dán vào đây) ...

`;

let currentState = {};
const savedState = localStorage.getItem(STATE_KEY);
if (savedState) {
    try {
        currentState = JSON.parse(savedState);
    } catch (e) {
        console.error("Lỗi parse 'sổ' cũ!", e); 
        currentState = {};
    }
}

let currentCacheMap = new Map();
if (currentState.cache && Array.isArray(currentState.cache)) {
     currentCacheMap = new Map(currentState.cache);
}

let newWordsAdded = 0;
let duplicatesSkipped = 0;

const lines = myMessySổ.split('\n');

lines.forEach(line => {
    const parts = line.split('→');
    
    let key = parts[0]; 
    
    const cleanWord = key.replace(/"/g, '').trim().toLowerCase();

    if (cleanWord.length > 0) {
        if (cleanWord.startsWith('[bot') || cleanWord.startsWith('ngày xuất') || cleanWord.startsWith('tổng cộng') || cleanWord.startsWith('----')) {
            console.log(`[Bùa "Tự Dọn"] "Bỏ qua" rác header: ${cleanWord}`);
        } else {
            if (!currentCacheMap.has(cleanWord)) {
                currentCacheMap.set(cleanWord, "WIN_CONDITION"); 
                newWordsAdded++;
            } else {
                duplicatesSkipped++;
            }
        }
    }
});


const newCacheArray = Array.from(currentCacheMap.entries());

const newState = {
    totalTime: currentState.totalTime || 0,
    wins: currentState.wins || 0,
    losses: currentState.losses || 0,
    cache: newCacheArray
};
localStorage.setItem(STATE_KEY, JSON.stringify(newState));

console.log(`[Hacker "Ghi Sổ"] Xong! Đã "nhồi" ${newWordsAdded} "Từ Thắng" mới vào "sổ".`);
console.log(`[Hacker "Ghi Sổ"] Đã "bỏ qua" ${duplicatesSkipped} từ (do "trùng" "sổ" cũ).`);
console.log(`[Hacker "Ghi Sổ"] Tổng "sổ" hiện tại: ${currentCacheMap.size} từ.`);

alert(
    `[Hacker "Ghi Sổ"] "BÙA" v1.3 ("Tự Dọn") CHẠY THÀNH CÔNG!\n\n` +
    `Đã "nhồi": ${newWordsAdded} "Từ Thắng" mới.\n` +
    `Bỏ qua (trùng): ${duplicatesSkipped} từ.\n` +
    `Tổng "sổ" hiện tại: ${currentCacheMap.size} từ.\n\n` +
    `Tải lại trang (F5) để bot "nhận" sổ mới!`
);
