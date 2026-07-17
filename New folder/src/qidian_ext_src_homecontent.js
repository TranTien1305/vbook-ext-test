function execute(url, page) {
    // Phòng thủ: Nếu url không có giá trị (bị undefined hoặc trống khi test)
    if (!url) {
        return Response.error("Vui lòng điền thông tin vào ô THAM SỐ url ở cột bên phải để test.");
    }

    if (!page) page = "1";
    
    // Ghép link phân trang an toàn
    let requestUrl = url + (url.includes("?") ? "&" : "?") + "page=" + page;
    let response = fetch(requestUrl);
    
    if (response && response.ok) {
        let doc = response.html();
        if (!doc) return Response.error("Không thể lấy dữ liệu HTML từ trang web.");

        let listStory = [];
        let elements = doc.select(".book-img-text ul li");
        
        if (!elements || elements.isEmpty()) {
            elements = doc.select(".rank-body .book-list ul li");
        }
        
        // Kiểm tra chắc chắn nếu có danh sách phần tử mới chạy vòng lặp
        if (elements && !elements.isEmpty()) {
            elements.forEach(element => {
                let titleEl = element.select(".book-mid-info h2 a");
                let coverEl = element.select(".book-img-box a img");
                let descEl = element.select(".book-mid-info .intro");
                
                let title = titleEl ? titleEl.text().trim() : "";
                let link = titleEl ? titleEl.attr("href") : "";
                let coverUrl = coverEl ? coverEl.attr("src") : "";
                let description = descEl ? descEl.text().trim() : "";

                if (link && !link.startsWith("http")) {
                    link = "https:" + link;
                }
                
                if (coverUrl && coverUrl.startsWith("//")) {
                    coverUrl = "https:" + coverUrl;
                }
                
                if (title) {
                    listStory.push({
                        name: title,
                        link: link,
                        cover: coverUrl,
                        description: description
                    });
                }
            });
        }
        
        // Xử lý phân trang an toàn
        let nextPage = "";
        let nextBtn = doc.select(".lbf-pagination-next");
        if (nextBtn && !nextBtn.isEmpty()) {
            let btnClass = nextBtn.attr("class");
            if (btnClass && !btnClass.includes("disabled")) {
                nextPage = (parseInt(page) + 1).toString();
            }
        }
        
        return Response.success(listStory, nextPage);
    }
    return Response.error("Failed to load Qidian main directory");
}