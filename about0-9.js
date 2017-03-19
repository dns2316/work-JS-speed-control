var main = `
<span class="close" id="closeAbout" onclick="spanClose('aboutModal');">&times;</span>
<!--img src="images/about1.png" style="width: 35%; height:auto;" /><img src="images/about2.png" style="width: 23%; height:auto; float: right;" /--!>
<p class="MsoNormal" id="aboutFirstP"><span lang=EN-GB>
  lorem
<br><br>

 </span></p>
`;
var part1 = `
<p class="MsoNormal"><span lang=EN-GB>
  lorem.
  <br><br>
  lorem
   <br><br>
</span></p>
`;
var part2 = `
<p class="MsoNormal"><span lang=EN-GB>
  lorem
      <br><br>
</span></p>
`;
var printAbout = document.getElementById("outAbout");
var listAbout = main + part1 + part2;
printAbout.innerHTML = listAbout;
