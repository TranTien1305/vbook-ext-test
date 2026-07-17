function execute(url) {
    // Sử dụng Engine Browser để bypass cơ chế anti-bot hoặc tải font mã hóa của Qidian
    var browser = Engine.newBrowser();
    let doc = browser.launch(url, 15000);

    // Kiểm tra xem doc có lấy được dữ liệu hợp lệ không
    if (doc) {
        // Lấy box chứa nội dung chương truyện chữ
        let contentEl = doc.select(".read-content");
        if (!contentEl || contentEl.isEmpty()) {
            contentEl = doc.select(".main-text-wrap");
        }

        // Nếu tìm thấy box nội dung, lấy HTML và đóng browser an toàn
        if (contentEl && !contentEl.isEmpty()) {
            let contentHtml = contentEl.html();
            browser.close(); // Đóng browser ngay sau khi lấy xong dữ liệu

            if (!contentHtml) {
                return Response.error("Chương VIP hoặc cơ chế mã hóa chống sao chép kích hoạt.");
            }
            return Response.success(contentHtml);
        }
    }

    // Trường hợp doc bị null hoặc không tìm thấy class nội dung, đóng browser an toàn để tránh treo máy
    browser.close();
    return Response.error("Failed to load chapter text Content");
}