function execute() {
    return Response.success([
        { title: "Bảng Xếp Hạng (Rankings)", input: "https://www.qidian.com/rank/", script: "homecontent.js" },
        { title: "Truyện Miễn Phí (Free)", input: "https://www.qidian.com/free/", script: "homecontent.js" }
    ]);
}