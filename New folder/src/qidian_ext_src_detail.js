function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let name = doc.select(".book-info h1 em").text().trim();
        let author = doc.select(".book-info h1 span a").text().trim();
        let cover = "https:" + doc.select("#bookImg img").attr("src");
        let description = doc.select(".book-intro p").html().trim();
        let ongoingStatus = doc.select(".book-info .tag .blue").text();
        let isOngoing = ongoingStatus.includes("连载") || ongoingStatus.includes("Đang ra");
        
        return Response.success({
            name: name,
            cover: cover,
            author: author,
            description: description,
            ongoing: isOngoing,
            host: "https://www.qidian.com"
        });
    }
    return Response.error("Failed to get book details");
}