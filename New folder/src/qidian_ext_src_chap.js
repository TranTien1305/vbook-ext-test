function execute(url) {
    // Sử dụng Engine Browser để bypass cơ chế anti-bot hoặc tải font mã hóa của Qidian nếu cần
    var browser = Engine.newBrowser();
    browser.setUserAgent(UserAgent.android());
    let doc = browser.launch(url, 15000);
    
    if (doc) {
        // Lấy box chứa nội dung chương truyện chữ
        let contentEl = doc.select(".read-content");
        if (contentEl.isEmpty()) {
            contentEl = doc.select(".main-text-wrap");
        }
        
        let contentHtml = contentEl.html();
        browser.close();
        
        if (!contentHtml) {
            return Response.error("Chương VIP hoặc cơ chế mã hóa chống sao chép kích hoạt.");
        }
        
        return Response.success(contentHtml);
    }
    browser.close();
    return Response.error("Failed to load chapter text Content");
}