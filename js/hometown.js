// ../index/js/hometown.js
window.onload = function() {
    var cards = document.querySelectorAll('.role-card');
    var btn = document.getElementById('showMoreBtn');
    var isExpanded = false;
    var VISIBLE_COUNT = 3; // 只控制前 3 个卡片
    var originalTexts = []; // 保存每个卡片完整文本
    var shortTexts = [];    // 前 3 个卡片的九分之一文本

    if (!cards.length || !btn) {
        return;
    }

    // 记录文本，并生成前 3 个卡片的“九分之一”预览
    for (var i = 0; i < cards.length; i++) {
        var p = cards[i].querySelector('.role-text p');
        if (!p) continue;

        var fullText = p.textContent.trim();
        originalTexts[i] = fullText;

        if (i < VISIBLE_COUNT) {
            // 截取大约九分之一的字符数
            var cutLen = Math.floor(fullText.length / 9);
            if (cutLen < fullText.length) {
                shortTexts[i] = fullText.slice(0, cutLen) + '...';
            } else {
                shortTexts[i] = fullText;
            }
        } else {
            // 后 3 个不截断，只占位
            shortTexts[i] = fullText;
        }
    }

    // 折叠：显示前 3 个卡片 + 各自九分之一文本，其余卡片隐藏
    function setCollapsed() {
        for (var i = 0; i < cards.length; i++) {
            var p = cards[i].querySelector('.role-text p');
            if (!p) continue;

            if (i < VISIBLE_COUNT) {
                p.textContent = shortTexts[i];
                cards[i].style.display = 'block';
            } else {
                p.textContent = originalTexts[i];
                cards[i].style.display = 'none';
            }
        }
        btn.innerText = 'Show More';
        isExpanded = false;
    }

    // 展开：所有卡片都显示，文本用完整内容
    function setExpanded() {
        for (var i = 0; i < cards.length; i++) {
            var p = cards[i].querySelector('.role-text p');
            if (!p) continue;

            p.textContent = originalTexts[i];
            cards[i].style.display = 'block';
        }
        btn.innerText = 'Show Less';
        isExpanded = true;
    }

    // 初始化：默认折叠状态
    setCollapsed();

    // 点击按钮切换
    btn.onclick = function() {
        if (isExpanded) {
            setCollapsed();
        } else {
            setExpanded();
        }
    };
};
