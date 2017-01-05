//
//  DevalVR + QuickTime + PTviewer + Flash + Spi-v + HTML5  Javascript workaround
//	Author: fiero http://www.devalvr.com
//  Version: 1.3.9
//
//	To embed a panorama just include these lines in your HTML file (change filenames):
//
//	<SCRIPT type="text/javascript" src="detectvr.js"></SCRIPT>
//	<SCRIPT type="text/javascript">
//		writecode("fileForQT.mov","fileForDevalVR.mov","fileForJava.jpg","fileForFlash.swf","fileForSPIV.jpg","100%","94%");
//	</SCRIPT>
//  
//
//	NOTE: To use Spi-v viewer, place "SPi-V.dcr" file in same folder that HTML file, 
//        you can find it here: http://www.fieldofview.com
//
//  See this page for help: 
//		http://www.devalvr.com/paginas/soporte/htmlconfig.html#javascript
//	
// 	IMPORTANT: Use this file at your own risk
//

var minQTVersion = "5.0.0";			// minimal required version checked for QuickTime
var minDevalVRVersion = "0,5,0,0";  // minimal required version checked for DevalVR
var minFlashVersion = "9.0.0";		// minimal required version checked for Flash
var minShockwaveVersion = "10.1";	// minimal required version checked for Shockwave

var pluginPriority_QuickTime=2;		// Set the order of Priority to use in each plugin 
var pluginPriority_DevalVR=1;		// when Autodetect option is selected. Change 
var pluginPriority_Flash=4;			// the number or priority for each plugin
var pluginPriority_Java=5;
var pluginPriority_Spiv=6;
var pluginPriority_PangeaVR=3;

var enableSizeLimits=0;				// 0: disable  1: enable  (size limits for QT, DevalVR and Spi-v)
var enableSizeLimitsJava=0;			// 0: disable  1: enable  (size limits for Java)
var enableSizeLimitsFlash=0;		// 0: disable  1: enable  (size limits for Flash)
var maxViewerWidth="1280";
var maxViewerHeight="1024";
var maxViewerWidthJava="900";
var maxViewerHeightJava="700";
var maxViewerWidthFlash="900";
var maxViewerHeightFlash="700";

var enableSizeRatio=0;				// 0: disable size ratio    1: enable size ratio
var sizeRatio=6/3;					// maximum aspect ratio, horizontal/vertical proportions

var enableLineUnderPanorama=0;		//Enable an adviser line under panorama
var writeLineUnderQuickTime="";
var writeLineUnderDevalVR="";
var writeLineUnderJava="<font face='Verdana' size='1' color='#cdcdcd'> Install the DevalVR plugin for an optimal viewing experience <a href='http://www.devalvr.com/install/'>click here to install</a>, and <a href='javascript:reloadPage()'>click here after installing</a></font>";
var writeLineUnderFlash="<font face='Verdana' size='1' color='#cdcdcd'> Install the DevalVR plugin for an optimal viewing experience <a href='http://www.devalvr.com/install/'>click here to install</a>, and <a href='javascript:reloadPage()'>click here after installing</a></font>";
var writeLineUnderSpiV="";
var writeLineUnderPangeaVR="";

var installfont="<font face='Verdana' size='2' color='#FFFFFF'>";
var selectedlinkcolor="#333333";
var selectedlinkbgcolor="#AAAAFF";
var detectvr_script_folder="";

var usePurePlayer=0;						//0: PTViewer is used as Java player  1: PurePlayer is used (enter correct names below)
var archivePurePlayer='PurePlayer.jar';		//Copy this file in the same folder
var codePurePlayer='PurePlayer';

var detectvr_replacepage=0;		// 1 to use window.location.replace() function to open a new page for each viewer (if 1 then writecode parameters must be the name of HTML pages)
var detectvr_installfolder="";	// The url to the folder with DevalVR installers

/////////////////////////////////////////////////////////////////////////////////////////////////
var isOpera=(navigator.userAgent.indexOf('Opera')!=-1);
var isIE11=(navigator.userAgent.indexOf('.NET')!=-1 && navigator.userAgent.indexOf('Trident')!=-1);
var isIE=isIE11 || ((navigator.userAgent.indexOf("MSIE") != -1) && !isOpera);
var isWebKit=(navigator.userAgent.indexOf('AppleWebKit')!=-1);
var isDOM=document.getElementById?1:0;
var isNS4=navigator.appName=='Netscape'&&!isDOM?1:0;
var isIE4=isIE&&!isDOM?1:0;
var isWindows=(navigator.platform.indexOf('Win')!=-1);
var isWin64=(navigator.platform.indexOf('Win64')!=-1);
var isMac=(navigator.platform.indexOf('Mac')!=-1 || navigator.platform.indexOf('PowerPC')!=-1);
var isLinux=(!isWindows && !isMac);
var favoriteViewer=getQueryVariable("panorama_viewer");
if(favoriteViewer==-1) favoriteViewer=getCookie("panorama_viewer");
if(favoriteViewer==-1 || favoriteViewer==null) favoriteViewer="DETECT";  //DEVALVR , QT, FLASH, JAVA, SPIV, PANGEAVR, or DETECT
var detectableWithVB = false;
var usepercentagesizesonie=false;
var adviselineunderpano="";
var orgsizepluginx=new Array();
var orgsizepluginy=new Array();
var numberofplugins=0;
var sizepluginx;
var sizepluginy;
var writePluginVR=0;
var writeInstallPluginVR=0;
var reloadpagewhenchangeviewer=0;
var detectvr_playercontents=new Array();
var auxparameters=new Array();
auxparameters['devalvr']=new Array();
auxparameters['qt']=new Array();
auxparameters['java']=new Array();
auxparameters['flash']=new Array();
auxparameters['spiv']=new Array();
auxparameters['pangeavr']=new Array();

function viewerparameters(viewer)
{
	auxparameters[viewer]=new Array();
	for(var i=1;i<arguments.length;i++) 
	{
		auxparameters[viewer][i-1]=arguments[i];
	}
}

function writecode(qtfile, devalvrfile, javafile, flashfile, spivfile, sizex, sizey, previewimage)
{
	writecode2(qtfile, qtfile, devalvrfile, javafile, flashfile, spivfile, sizex, sizey, previewimage);
}

function writecode2(qtfile, pangeafile, devalvrfile, javafile, flashfile, spivfile, sizex, sizey, previewimage)
{
	var priority=new Array();
	var existfile=new Array();
	writePluginVR=0;
	writeInstallPluginVR=0;
	
	if(sizex==undefined) sizex=800;
	if(sizey==undefined) sizey=500;
	document.body.style.width="100%"; 
	document.body.style.height="100%";
	if(typeof(document.documentElement)!=undefined)
	{
		document.documentElement.style.width="100%"; 
		document.documentElement.style.height="100%"; 
	}

	existfile[1]=(devalvrfile!=null && devalvrfile!="");
	existfile[2]=(qtfile!=null && qtfile!="" && qtfile.indexOf(".mov")!=-1);
	existfile[3]=(flashfile!=null && flashfile!="");
	existfile[4]=(javafile!=null && javafile!="");
	existfile[5]=(spivfile!=null && spivfile!="");
	existfile[6]=(pangeafile!=null && pangeafile!="");
	
	if((favoriteViewer=="DEVALVR" && (!existfile[1] || !isWindows))
	|| (favoriteViewer=="QT" && (!existfile[2] || isLinux))
	|| (favoriteViewer=="JAVA" && !existfile[4]) 
	|| (favoriteViewer=="FLASH" && !existfile[3]) 
	|| (favoriteViewer=="SPIV" && (!existfile[5] || isLinux))
	|| (favoriteViewer=="PANGEAVR" && (!existfile[6] || !isMac)))
		favoriteViewer="DETECT";
	
	priority[1]=pluginPriority_DevalVR;
	priority[2]=pluginPriority_QuickTime;
	priority[3]=pluginPriority_Flash;
	priority[4]=pluginPriority_Java;
	priority[5]=pluginPriority_Spiv;
	priority[6]=pluginPriority_PangeaVR;
	
	if(favoriteViewer=="DETECT")
	{
		for(order=1;order<=6 && writePluginVR==0;order++)
		{
			for(n=1;n<=6;n++)
			{
				if(priority[n]==order && existfile[n])
				{
					if(IsPluginInstalled(n))
					{
						writePluginVR=n;
						break;
					}
					else if(writeInstallPluginVR==0)
					{
						if((n==1 && isWindows) 
						|| (n==2 && !isLinux)
						||  n==3 || n==4
						|| (n==5 && !isLinux)
						|| (n==6 && isMac))
						writeInstallPluginVR=n;
					}
				}
			}
		}
	}
	else if(favoriteViewer=="DEVALVR" && isWindows)
	{
		if(IsPluginInstalled(1)) writePluginVR=1;
		else writeInstallPluginVR=1;
	}
	else if(favoriteViewer=="QT" && (isWindows || isMac))
	{
		if(IsPluginInstalled(2)) writePluginVR=2;
		else writeInstallPluginVR=2;
	}
	else if(favoriteViewer=="FLASH")
	{
		if(IsPluginInstalled(3)) writePluginVR=3;
		else writeInstallPluginVR=3;
	}
	else if(favoriteViewer=="JAVA") 
	{
		if(IsPluginInstalled(4)) writePluginVR=4;
		else writeInstallPluginVR=4;
	}
	else if(favoriteViewer=="SPIV" && (isWindows || isMac)) 
	{
		if(IsPluginInstalled(5)) writePluginVR=5;
		else writeInstallPluginVR=5;
	}
	else if(favoriteViewer=="PANGEAVR" && isMac) 
	{
		if(IsPluginInstalled(6)) writePluginVR=6;
		else writeInstallPluginVR=6;
	}
	if(writePluginVR>0) writeInstallPluginVR=0;
	
	adviselineunderpano="";
	if(enableLineUnderPanorama)
	{
		if(writePluginVR==1 && writeLineUnderDevalVR!="") adviselineunderpano=writeLineUnderDevalVR;
		else if(writePluginVR==2 && writeLineUnderQuickTime!="") adviselineunderpano=writeLineUnderQuickTime;
		else if(writePluginVR==3 && writeLineUnderFlash!="") adviselineunderpano=writeLineUnderFlash;
		else if(writePluginVR==4 && writeLineUnderJava!="") adviselineunderpano=writeLineUnderJava;
		else if(writePluginVR==5 && writeLineUnderSpiV!="") adviselineunderpano=writeLineUnderSpiV;
		else if(writePluginVR==6 && writeLineUnderPangeaVR!="") adviselineunderpano=writeLineUnderPangeaVR;
	}

	if(sizex=="") sizex="100%";
	if(sizey=="") sizey="94%";

	orgsizepluginx[numberofplugins]=sizex;
	orgsizepluginy[numberofplugins]=sizey;
	
	calcLimits(sizex,sizey);
	sizex=sizepluginx;
	sizey=sizepluginy;

	divcont='';
	idpano='PANORAMAID';
	if(numberofplugins>0) idpano+=numberofplugins;
	numberofplugins++;

	var backgroundimage='';
	if(previewimage!=undefined && previewimage.indexOf(".")!=-1)
		backgroundimage='background-image: url(\''+previewimage+'\'); background-repeat:no-repeat; background-position:center;';
	var strdiv='';
	strdiv='<div align="center"><div id="DIV'+idpano+'" align="center" style="'+backgroundimage+' WIDTH: '+sizex+'; HEIGHT: '+sizey+'" width="'+sizex+'" height="'+sizey+'">';
	strdiv+='</div>';
	if(adviselineunderpano!="") str+=adviselineunderpano;
	strdiv+='</div>';
	document.writeln(strdiv);
	
	if(writePluginVR==1)
	{
		if(detectvr_replacepage) window.location.replace(devalvrfile); 
		else divcont=detecvr_embedPlugin('devalvr',devalvrfile,idpano,'5D2CF9D0-113A-476B-986F-288B54571614','http://www.devalvr.com/instalacion/plugin/devalocx.cab#version='+minDevalVRVersion,'application/x-devalvrx','http://www.devalvr.com/installation/','filter','0');
	}
	else if(writePluginVR==2)
	{
		if(detectvr_replacepage) window.location.replace(qtfile); 
		else divcont=detecvr_embedPlugin('qt',qtfile,idpano,'02BF25D5-8C17-4B23-BC80-D3488ABDDC6B','http://www.apple.com/qtactivex/qtplugin.cab','video/quicktime','http://www.apple.com/quicktime/download/','scale','tofit','autostart','true','kioskmode','true','controller', 'true', 'enablejavascript', 'true');
	}
	else if(writePluginVR==3)
	{
		if(detectvr_replacepage) window.location.replace(flashfile); 
		else divcont=detecvr_embedPlugin('flash',flashfile,idpano,'D27CDB6E-AE6D-11cf-96B8-444553540000','http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab','application/x-shockwave-flash','http://www.macromedia.com/go/getflashplayer','bgcolor', '#f0f0f0', 'play', 'true', 'cache','true', 'autoplay','true','allowScriptAccess','always','allowFullScreen', 'true');
	}
	else if(writePluginVR==4)
	{
		if(detectvr_replacepage) window.location.replace(javafile); 
		else 
		{
			if(usePurePlayer==0) divcont=detecvr_embedPlugin('java','',idpano,'','','','','code','ptviewer.class','archive','ptviewer.jar','file',javafile,'fov','120','cursor','MOVE','showToolbar','true','imgLoadFeedback','false');
			else divcont=detecvr_embedPlugin('java','',idpano,'','','','','code',codePurePlayer,'archive',archivePurePlayer,'panorama',javafile,'optimizememory','true');
		}
	}
	else if(writePluginVR==5)
	{
		if(detectvr_replacepage) window.location.replace(spivfile); 
		else divcont=detecvr_embedPlugin('spiv','SPi-V.dcr',idpano,'166B1BCA-3F9C-11CF-8075-444553540000','http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version='+minShockwaveVersion,'application/x-director','http://www.macromedia.com/shockwave/download/','swURL',spivfile,'swStretchStyle','stage','swRemote','swContextMenu=\'TRUE\'','progress','true','logo','false');
	}
	else if(writePluginVR==6)
	{
		if(detectvr_replacepage) window.location.replace(pangeafile); 
		else divcont=detecvr_embedPlugin('pangeavr',pangeafile,idpano,'','','graphics/pangeavr2','http://www.pangeasoft.net/pano/plugin/downloads.html');
	}
	else if(writeInstallPluginVR==1)
	{
		divcont='<table bgcolor="#364351" border="0" cellpadding="0" cellspacing="0" style="WIDTH: 100%; HEIGHT: 100%" width="100%" height="100%"><tr><td align="center" valign="middle">'+installfont;
		divcont+='DevalVR plugin is required to see this content';
		divcont+='<br /><br /><a href="';
		divcont+='http://www.devalvr.com/install/';
		divcont+='" onclick="return true;" >'+installfont+'click here to install (300 KB, it only takes a few seconds)</font></a>';
		divcont+='</font></td></tr></table>';
		
		setTimeout("checkPluginInstallation()",10000);
	}
	else 
	{
		var pluginname,pluginurl;
		
		if(writeInstallPluginVR==2) 
		{
			pluginname="QuickTime Player"
			pluginurl="http://www.apple.com/quicktime/download/"
		}
		else if(writeInstallPluginVR==3) 
		{
			pluginname="Adobe Flash Player Version " + minFlashVersion + " or higher."
			pluginurl="http://www.adobe.com/go/getflash/"
		}
		else if(writeInstallPluginVR==4) 
		{
			pluginname="Java Software"
			pluginurl="http://java.com/en/download/"
		}
		else if(writeInstallPluginVR==5) 
		{
			pluginname="Shockwave Player"
			pluginurl="http://www.macromedia.com/shockwave/download"
		}
		else if(writeInstallPluginVR==6) 
		{
			pluginname="PangeaVR Player"
			pluginurl="http://www.pangeasoft.net/pano/plugin/downloads.html"
		}
		
		divcont='<table bgcolor="#364351" border="0" cellpadding="0" cellspacing="0" style="WIDTH: 100%; HEIGHT: 100%" width="100%"  height="100%"><tr><td align="center" valign="middle">'+installfont;
		if(writeInstallPluginVR>0)
		{
			divcont+='This content requires '+ pluginname +'.';
			divcont+='<br /><br /><a href="'+ pluginurl +'" target="_blank">'+installfont+'click here to install '+ pluginname +'</font></a>';
		}
		else divcont+="Sorry, this content can't be seen with your Operating System.";
		divcont+='</font></td></tr></table>';
	}
	var ref=getRef("DIV"+idpano);
	if(ref)	
	{
		if(previewimage!=undefined && previewimage!="")
		{
			var background='';
			if(previewimage.indexOf(".")==-1) background='background-color:#1f1f1f;';
			else background='background-image:url(\''+detectvr_script_folder+'detectvr_grid.gif\');';
			detectvr_playercontents[idpano]=divcont;
			divcont='<table border="0" cellpadding="0" cellspacing="0" onclick="javascript:PlayContent(\''+idpano+'\')" style="cursor:pointer; '+background+' WIDTH:100%; HEIGHT:100%" width="100%"  height="100%"><tr><td align="center" valign="middle">';
			divcont+='<img src="'+detectvr_script_folder+'detectvr_start.gif" border="0" />';
			divcont+='</font></td></tr></table>';
		}
		ref.innerHTML=divcont;
	}

	if(writeInstallPluginVR==0)
	{
		window.onresize=onResizeWindow;
		setTimeout("onResizeWindow()",500);
	}
}

function PlayContent(idpano)
{
	var ref=getRef("DIV"+idpano);
	if(ref) ref.innerHTML=detectvr_playercontents[idpano];
}

function ShowViewerSelection(options)
{
	var optionviewer=new Array("DETECT","DEVALVR","QT","FLASH","JAVA","SPIV","PANGEAVR");
	var textviewer=new Array("Autodetect","DevalVR","QuickTime","Flash","Java","Spi-V","PangeaVR");
	var osviewer=new Array(0,1,0,0,0,0,2);	//0:All  1:Windows  2:Mac

	options=options.toUpperCase();
	reloadpagewhenchangeviewer=(options.indexOf("RELOAD")!=-1);
	var vertical='';
	var str='';

	var combobox=(options.indexOf("COMBOBOX")!=-1);
	var links=(options.indexOf("LINKS")!=-1);

	if(options.indexOf("HORIZONTAL")==-1)
		vertical='<br />';
	
	viewer=getCookie("panorama_viewer");
	if(!viewer) viewer="DETECT";

	if(combobox)
	{
		str+='<select id="comboboxViewer" style="WIDTH: 130px" width=130 name="comboboxViewer" onchange="favoriteViewerChangedCombo()">';
	}
	for(n=0;n<7;n++)
	{
		if(options.indexOf(optionviewer[n])!=-1 && (osviewer[n]==0 || (osviewer[n]==1 && isWindows) || (osviewer[n]==2 && isMac)))
		{
			if(combobox) str+='<option value="'+optionviewer[n]+'" '+(viewer==optionviewer[n]?'selected="selected"':'')+'> '+textviewer[n]+'</option>';
			else if(links) str+='<a hRef="javascript:changeFavoriteViewer(\''+optionviewer[n]+'\');">'+(viewer==optionviewer[n]?('<font style="BACKGROUND-COLOR: '+selectedlinkbgcolor+'" color='+selectedlinkcolor+'>&nbsp;'):'')+textviewer[n]+(viewer==optionviewer[n]?'&nbsp;</font>':'')+'&nbsp;</a> '+vertical;
			else str+='<input id="radioViewer" value='+n+' type=radio name="radioViewer" OnClick="javascript:changeFavoriteViewer(\''+optionviewer[n]+'\');" '+(viewer==optionviewer[n]?'checked="checked"':'')+' />'+textviewer[n]+' '+vertical;
		}
	}
	if(combobox)
	{
		str+='</select><br />';
	}
	else if(vertical=='') str+='<br />';

	document.writeln('<font id="IDVIEWEROPTIONS'+numberofplugins+'">&nbsp;</font>');
	var ref=getRef("IDVIEWEROPTIONS"+numberofplugins);
	if(ref)	ref.innerHTML=str;
}

function favoriteViewerChangedCombo()
{
	var ref=getRef("comboboxViewer");
	if(ref) changeFavoriteViewer(ref.value);
}

function changeFavoriteViewer(viewer)
{
	if(favoriteViewer!=viewer)
	{
		setCookie("panorama_viewer",viewer);
		if(reloadpagewhenchangeviewer)
			window.location.reload();
	}
}

//Old version, it exist for compatibility with old pages
function writevrcode(movfile,javafile,flashfile,spivfile,width,height)
{
	var sizex=0,sizey=0;
	
	//Compatibility code, old versions of writevrcode only was 
	//qtfile and javafile parameters: writevrcode(movfile,javafile,width,height)
	
	var paramsize=2;
	for(var n=2;n<4;n++)
	{
		if(arguments[n]!=null)
		{
			var str=arguments[n].toString();
			str.toLowerCase();
			if(n==2)
			{
				if(str.indexOf(".swf")!=-1 || str=="") paramsize++;
				else flashfile="";
			}
			else if(n==3)
			{
				if(str.indexOf(".spv")!=-1 || str.indexOf(".xml")!=-1 || str.indexOf(".jpg")!=-1 || str=="")
				{
					if(paramsize==2) paramsize++;
					paramsize++;
				}
				else spivfile="";
			}
		}
	}
	if(arguments[paramsize]!=null)
		sizex=arguments[paramsize];
	if(arguments[paramsize+1]!=null)
		sizey=arguments[paramsize+1];
	
	var qtfile=movfile;	
	if(movfile.toLowerCase().indexOf(".mov")==-1)
		qtfile="";

	writecode(qtfile,movfile,javafile,flashfile,spivfile,sizex,sizey);
}

function checkPluginInstallation()
{
	if(!isIE) navigator.plugins.refresh(0);

	if(IsPluginInstalled(1))
	{
		reloadPage();
	}
	else setTimeout("checkPluginInstallation()",3000);
}

function IsPluginInstalled(numplugin)
{
	var installed=0;
	
	if(isWindows && isIE)
	{
		if(numplugin==1)
		{
			if(detectableWithVB) installed=detectActiveXControlVB('DevalVRXCtrl.DevalVRXCtrl.1');
			else installed=existActiveXControl("DevalVRXCtrl.DevalVRXCtrl.1","DevalVR 3D Plugin");
		}
		else if(numplugin==2 && !isWin64)
		{
			if(detectableWithVB) installed=detectQuickTimeActiveXControl();
			else installed=existActiveXControl("QuickTimeCheckObject.QuickTimeCheck.1","QuickTime Plug-in");
		}
		else if(numplugin==3)
		{
			if(detectableWithVB) installed =detectFlashVer(); 
			else 
			{
				var strflashversion=minFlashVersion.split(".");
				installed=existActiveXControl("ShockwaveFlash.ShockwaveFlash."+strflashversion[0],"Shockwave Flash");
			}
		}
		else if(numplugin==4)
		{
			if(detectableWithVB) installed=(detectActiveXControlVB('JavaPlugin') && navigator.javaEnabled());
			else installed=(existActiveXControl("JavaPlugin","JavaPlugin") && navigator.javaEnabled());
		}
		else if(numplugin==5)
		{
			var strswversion=minShockwaveVersion.split(".");
			var strshockwave="";
			do{
				strshockwave="SWCtl.SWCtl."+strswversion[0]+"."+strswversion[1]+".1";
				strswversion[1]++;
				if(strswversion[1]>9)
				{
					strswversion[1]=0;
					strswversion[0]++;
				}
				if(detectableWithVB) installed=detectActiveXControlVB(strshockwave);
				else installed=existActiveXControl(strshockwave,"Shockwave for Director");
			}while(installed==0 && strswversion[0]<20);
		}
	}
	else
	{
		if(numplugin==1)
		{
			if(navigator.mimeTypes && navigator.mimeTypes["application/x-devalvrx"] && (isOpera || navigator.mimeTypes["application/x-devalvrx"].enabledPlugin))
			{
				var words = navigator.plugins["DevalVR 3D Plugin"].description.split(" ");
				var version = words[3].split(",");
				var min = minDevalVRVersion.split(",");
				installed=checkMinVersion(version,min,4);
			}	
		}
		else if(numplugin==2)
		{
			if(isMac) 
			{
				installed=1;
			}
			else if(!isWin64)
			{
				if(navigator.mimeTypes && navigator.mimeTypes["video/quicktime"] && (isOpera || navigator.mimeTypes["video/quicktime"].enabledPlugin))
				{
					for (var i = 0; i < navigator.plugins.length; i++)
					{
						if(navigator.plugins[i].name.indexOf("QuickTime Plug-in")!=-1)
						{
							var words = navigator.plugins[i].name.split(" ");
							if (words.length<3) installed=1;
							else
							{
								var version = words[2].split(".");
								var min = minQTVersion.split(".");
								installed=checkMinVersion(version,min,version.length);
							}
							break;
						}
					}
				}
			}
		}
		else if(numplugin==3)
		{
			installed = detectFlashVer(); 
		}
		else if(numplugin==4)
		{
			if (isOpera || (navigator.mimeTypes && navigator.mimeTypes['application/x-java-applet'] && navigator.mimeTypes["application/x-java-applet"].enabledPlugin))
			{
				installed=navigator.javaEnabled();
			}
		}
		else if(numplugin==5)
		{
			if(navigator.mimeTypes && navigator.mimeTypes["application/x-director"] && (isOpera || navigator.mimeTypes["application/x-director"].enabledPlugin))
			{
				var description=navigator.plugins["Shockwave for Director"].description;
				var pos=description.indexOf("version");
				if (pos!=-1)
				{
					var words=description.substr(pos+8);
					var version = words.split(".");
					var min = minShockwaveVersion.split(".");
					installed=checkMinVersion(version,min,2);
				}
			}
		}
		else if(numplugin==6)
		{
			if(navigator.mimeTypes && navigator.mimeTypes["graphics/pangeavr2"] && (isOpera || navigator.mimeTypes["graphics/pangeavr2"].enabledPlugin))
			{
				installed=1;
			}
		}
	}
	return installed;
}

function existActiveXControl(ProgID, pluginmane)
{
	var exist=0;
	var plugin=null;
	if(pluginmane!=undefined) plugin=navigator.plugins[pluginmane];
	if(plugin) exist=1;
	else
	{
		if(typeof(window.ActiveXObject)!=undefined)
		{
			try
			{     
				var pluginobj = new window.ActiveXObject(ProgID);  
				if(pluginobj!=null) exist=1;
			}
			catch(e){}
		}
	}
	return exist;
}

function onResizeWindow()
{
	for(n=0;n<numberofplugins;n++)
	{
		calcLimits(orgsizepluginx[n],orgsizepluginy[n]);
		var name="DIVPANORAMAID";
		if(n>0) name+=n;
		var ref=getRef(name);
		if(ref!=null)
		{
			if(ref.style)
			{
				ref.style.width=sizepluginx;
				ref.style.height=sizepluginy;
			}
			else
			{	
				ref.width=sizepluginx;
				ref.height=sizepluginy;
			}
		}
	}
}

function checkMinVersion(version,min,num)
{
	var installed=0;
	for (var i = 0; i < num; i++)
	{
		if(parseInt(version[i])>parseInt(min[i])) 
		{
			installed=1;
			break;
		}
		else if(parseInt(version[i])<parseInt(min[i]))
		{
			break;
		}
		else if(parseInt(version[i])==parseInt(min[i]) && i==num-1)
			installed=1;
	}
	return installed;
}

function calcLimits(sizex, sizey)
{
	var pagew,pageh,percentagew="",percentageh="",limits;
	
	if(writePluginVR==4)
	{
		maxx=maxViewerWidthJava;
		maxy=maxViewerHeightJava;
		limits=enableSizeLimitsJava;
	}
	else if(writePluginVR==3)
	{
		maxx=maxViewerWidthFlash;
		maxy=maxViewerHeightFlash;
		limits=enableSizeLimitsFlash;
	}
	else
	{
		maxx=maxViewerWidth;
		maxy=maxViewerHeight;
		limits=enableSizeLimits;
	}

	if(sizex<0) sizex=getPageWidth()+parseInt(sizex);
	if(sizey<0) sizey=getPageHeight()+parseInt(sizey);

	sizex=sizex.toString();
	sizey=sizey.toString();

	pw=sizex.indexOf("px");
	if(pw!=-1) sizex=sizex.substring(0,pw);
	pw=sizey.indexOf("px");
	if(pw!=-1) sizey=sizey.substring(0,pw);

	pagew=getPageWidth();
	pageh=getPageHeight();

	pw=sizex.indexOf("%");
	if(pw!=-1)
	{
		percentagew=sizex.substring(0,pw);
		sizex=(pagew*percentagew)/100;
	}
	pw=sizey.indexOf("%");
	if(pw!=-1)
	{
		percentageh=sizey.substring(0,pw);
		sizey=(pageh*percentageh)/100;
	}

	sizex=parseInt(sizex);
	sizey=parseInt(sizey);
	if(limits)
	{
		if(sizex>maxx) sizex=maxx;
		if(sizey>maxy) sizey=maxy;
	}	
	if(enableSizeRatio)
	{
		x=sizey*sizeRatio;
		if(x<sizex)
		{
			sizex=x;
			if(limits && sizex>maxx) sizex=maxx;
		}
	}
	if(adviselineunderpano!="") sizey-=14;
	if(sizex<8) sizex=8;
	if(sizey<8) sizey=8;
	if(usepercentagesizesonie && isIE && percentagew!="")
	{
		sizex=(sizex*100.0)/pagew;
		sizex+="%";
	}
	else sizex+="px";
	if(usepercentagesizesonie && isIE && percentageh!="")
	{
		sizey=(sizey*100.0)/pageh;
		sizey+="%";
	}
	else sizey+="px";

	sizepluginx=sizex;
	sizepluginy=sizey;
}

function reloadPage()
{
	if(!isIE) navigator.plugins.refresh(0);
	window.location.reload();
}

function getCookie(nombre)
{
	var dcookie=document.cookie;
	var cname=nombre+"=";
	var longitud=dcookie.length;
	var inicio=0;

	while(inicio<longitud)
	{
		var vbegin=inicio+cname.length;
		if(dcookie.substring(inicio,vbegin)==cname)
		{
			var vend=dcookie.indexOf(";",vbegin);
			if(vend==-1) vend=longitud;
			return unescape(dcookie.substring(vbegin,vend));
		}
		inicio=dcookie.indexOf(" ",inicio)+1;
		if(inicio==0) break;
	}
	return null;
}

function setCookie(name, value, expires)
{
	if(!expires)
	{ 
		expires=new Date();
		expires.setTime(expires.getTime()+(24*3600*1000*365));
	}
	var str=name+"="+escape(value)+"; expires=" + expires.toGMTString();

	document.cookie=str;
}

function getPageHeight()
{
	var ret;
	if(isIE) ret=document.body.clientHeight;
	else 
	{
		if(document.body.clientHeight!=undefined) ret=document.body.clientHeight;
		else
		{
			var margintop=16,marginbottom=16;
			if(document.body.attributes.topmargin)
				margintop=document.body.attributes.topmargin.value;
			if(document.body.attributes.bottommargin)
				marginbottom=document.body.attributes.bottommargin.value;
			ret=window.innerHeight-margintop-marginbottom;
		}
	}
	return ret;
}

function getPageWidth()
{
	var ret;
	if(isIE) ret=document.body.clientWidth;
	else
	{
		if(document.body.clientWidth!=undefined) ret=document.body.clientWidth;
		else
		{
			var marginleft=16,marginright=16;
			if(document.body.attributes.leftmargin)
				marginleft=document.body.attributes.leftmargin.value;
			if(document.body.attributes.rightmargin)
				marginright=document.body.attributes.rightmargin.value;
			ret=window.innerWidth-marginleft-marginright;
		}
	}
	return ret;
}

function IEGetSwfVer()
{
	flashVer=0;
		
	for(i=25;i>0 && flashVer==0;i--)
	{
		flashVer=VBGetSwfVer(i);
	}
	return flashVer;
}

// JavaScript helper required to detect Flash Player PlugIn version information
function JSGetSwfVer()
{
	// NS/Opera version >= 3 check for Flash plugin in plugin array
	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
      		var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
			descArray = flashDescription.split(" ");
			tempArrayMajor = descArray[2].split(".");
			versionMajor = tempArrayMajor[0];
			versionMinor = tempArrayMajor[1];
			if ( descArray[3] != "" ) {
				tempArrayMinor = descArray[3].split("r");
			} else {
				tempArrayMinor = descArray[4].split("r");
			}
      		versionRevision = tempArrayMinor[1] > 0 ? tempArrayMinor[1] : 0;
            flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
      	} else {
			flashVer = -1;
		}
	}
	// MSN/WebTV 2.6 supports Flash 4
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	// WebTV 2.5 supports Flash 3
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	// older WebTV supports Flash 2
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	// Can't detect in all other cases
	else {
		
		flashVer = -1;
	}
	return flashVer;
}
 
function detectFlashVer() 
{
  	if (isIE && isWindows && !isOpera) {
		versionStr = IEGetSwfVer();
	} else {
		versionStr = JSGetSwfVer();		
	}
	if (versionStr != 0 && versionStr != -1) 
	{
		if(isIE && isWindows && !isOpera) {
			tempArray         = versionStr.split(" ");
			tempString        = tempArray[1];
			versionArray      = tempString .split(",");				
		} 
		else 
		{
			versionArray      = versionStr.split(".");
		}
		var min=minFlashVersion.split(".");
		return checkMinVersion(versionArray,min,3);
	}
	else return false;
}

function writeParameters(parameters, auxparameters, IEparameters)
{
	str ='';
	for(i=0;i<auxparameters.length;i+=2) 
	{
		if(IEparameters)
			str+='  <param name="' + auxparameters[i] + '" value="' + auxparameters[i+1] + '" />';
		else
			str+=' ' + auxparameters[i] + '="' + auxparameters[i+1] + '"';
	}
	for(i=7;i<parameters.length;i+=2) 
	{
		var exists=0;
		for(j=0;j<auxparameters.length;j+=2) {
			if(auxparameters[j]==parameters[i]) exists=1;
		}
		if(exists==0)
		{
			if(IEparameters)
				str+='  <param name="' + parameters[i] + '" value="' + parameters[i+1] + '" />';
			else
				str+=' '+ parameters[i] + '="' + parameters[i+1] + '"';
		}
	}
	return str;
}

function detecvr_embedPlugin(plugin,sFile,id,classid,codebase,type,pluginspage)
{
	var str='';
	if(classid!='' || plugin=='java')
	{
		if(plugin=='java') str+='<applet ';
		else str+='<object classid="clsid:'+classid+'" codebase="'+codebase+'"';
		str+=' id="'+id+'" style="WIDTH: 100%; HEIGHT: 100%" width="100%" height="100%" >';
	
		if(plugin!='java') str+='  <param name="src" value="' + sFile + '" />';
	
		str+=writeParameters(arguments,auxparameters[plugin],1);
	}
	if(type!='')
	{
		str+='<embed id="'+id+'" name="'+id+'" width="100%" height="100%"';
		str+='	pluginspage="'+pluginspage+'"';
		str+='	type="'+type+'"';
		str+='	src="' + sFile + '"';
		str+=writeParameters(arguments,auxparameters[plugin],0);
		str+='	/>';
	}
	if(classid!='') str+='</object>';
	if(plugin=='java') str+='</applet>';
	return str;
}

// Here we write out the VBScript block for MSIE Windows
if (isWindows && isIE) 
{
    str='<script language="VBscript" type="text/vbscript">';
	
    str+='detectableWithVB = False \n';
    str+='If ScriptEngineMajorVersion >= 2 then \n';
    str+='  detectableWithVB = True \n';
    str+='End If \n';

    str+='Function detectActiveXControlVB(activeXControlName) \n';
    str+='  on error resume next \n';
    str+='  detectActiveXControlVB = False \n';
    str+='  If detectableWithVB Then \n';
    str+='		set pControl = CreateObject(activeXControlName) \n';
    str+='		If (IsObject(pControl)) then \n';
    str+='			detectActiveXControlVB = True \n';
    str+='		End If \n';
    str+='  End If \n';
    str+='End Function \n';

    str+='Function detectQuickTimeActiveXControl() \n';
    str+='  on error resume next \n';
    str+='  detectQuickTimeActiveXControl = False \n';
    str+='  If detectableWithVB Then \n';
    str+='    detectQuickTimeActiveXControl = False \n';
    str+='    hasQuickTimeChecker = false \n';
    str+='    Set hasQuickTimeChecker = CreateObject("QuickTimeCheckObject.QuickTimeCheck.1") \n';
    str+='    If IsObject(hasQuickTimeChecker) Then \n';
    str+='      If hasQuickTimeChecker.IsQuickTimeAvailable(0) Then  \n';
    str+='        detectQuickTimeActiveXControl = True \n';
    str+='      End If \n';
    str+='    End If \n';
    str+='  End If \n';
    str+='End Function \n';

    str+='Function VBGetSwfVer(i) \n';
    str+='  on error resume next \n';
    str+='  Dim swControl, swVersion \n';
    str+='  swVersion = 0 \n';
    str+='  If detectableWithVB Then \n';
    str+='		set swControl = CreateObject("ShockwaveFlash.ShockwaveFlash." + CStr(i)) \n';
    str+='		If (IsObject(swControl)) then \n';
    str+='			swVersion = swControl.GetVariable("$version") \n';
    str+='		End If \n';
    str+='  End If \n';
    str+='  VBGetSwfVer = swVersion \n';
    str+='End Function \n';
    str+='</scr' + 'ipt>';
    
    document.writeln(str);
}


//////////////// Special functions to create dynamic pages
function getQueryVariable(variable) 
{
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i< vars.length;i++) 
	{
		var pair = vars[i].split("=");
		if (pair[0] == variable) 
		{
			return pair[1];
		}
	} 
	return -1;
}	

function getRef(id) 
{
	return (isDOM ? document.getElementById(id) : (isIE4 ? document.all[id] : document.layers[id]));
}
function getStyle(id) 
{
	return (isNS4 ? getRef(id) : getRef(id).style);
}

var panoramadata=new Array();
var panoramanumdata=0;

function insertpanoramadata(name, movfile, title, description, date, jpgimage)
{
	var pano="pano"+panoramanumdata;
	panoramadata[pano]=name;
	panoramadata[name]=new Array();
	panoramadata[name]["movfile"]=movfile;
	panoramadata[name]["title"]=title;
	panoramadata[name]["description"]=description;
	panoramadata[name]["date"]=date;
	panoramadata[name]["jpgimage"]=jpgimage;
	
	panoramanumdata++;
}

///////////////////
