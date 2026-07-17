function execute(url) {
    // Chuyển đổi sang link trang mục lục di động để lấy danh sách chương dễ dàng hơn
    // Ví dụ từ https://book.qidian.com/info/1036325124/ sang api di động hoặc parse trực tiếp
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let listChapters = [];
        let elements = doc.select(".volume-wrap .volume ul li a");
        
        elements.forEach(element => {
            let chapName = element.text().trim();
            let chapUrl = "https:" + element.attr("href");
            
            // Nhận biết chương khóa VIP để ghi chú cho người dùng nếu cần
            if (element.select(".icon-isvip").isEmpty()) {
                listChapters.push({
                    name: chapName,
                    url: chapUrl,
                    host: "https://book.qidian.com"
                });
            } else {
                listChapters.push({
                    name: "🔒 " + chapName,
                    url: chapUrl,
                    host: "https://book.qidian.com"
                });
            }
        });
        return Response.success(listChapters);
    }
    return Response.error("Failed to get Table of Contents");
}