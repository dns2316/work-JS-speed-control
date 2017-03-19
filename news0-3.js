var main = `
<span class="close" id="closeAbout" onclick="spanClose('newsModal');">&times;</span>
<p><span lang=EN-GB>
  <span class="titleNews">London lorem Transport</span><br>
lorem
</span></p>
`;
var printNews = document.getElementById("outNews");
var newsList = main;
printNews.innerHTML = newsList;
