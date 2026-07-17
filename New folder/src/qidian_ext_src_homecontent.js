function execute(url, page) {
    if (!page) page = "1";
    let requestUrl = url + (url.includes("?") ? "&" : "?") + "page=" + page;
    let response = fetch(requestUrl);
    
    if (response.ok) {
        let doc = response.html();
        let listStory = [];
        let elements = doc.select(".book-img-text ul li");
        
        if (elements.isEmpty()) {
            elements = doc.select(".rank-body .book-list ul li");
        }
        
        elements.forEach(element => {
            let titleEl = element.select(".book-mid-info h2 a");
            let coverEl = element.select(".book-img-box a img");
            let descEl = element.select(".book-mid-info .intro");
            
            let coverUrl = coverEl.attr("src");
            if (coverUrl && coverUrl.startsWith("//")) {
                coverUrl = "https:" + coverUrl;
            }
            
            listStory.push({
                name: titleEl.text().trim(),
                link: "https:" + titleEl.attr("href"),
                cover: coverUrl,
                description: descEl.text().trim()
            });
        });
        
        let nextPage = "";
        let nextBtn = doc.select(".lbf-pagination-next");
        if (!nextBtn.isEmpty() && !nextBtn.attr("class").includes("disabled")) {
            nextPage = (parseInt(page) + 1).toString();
        }
        
        return Response.success(listStory, nextPage);
    }
    return Response.error("Failed to load Qidian main directory");
}