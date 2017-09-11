<html>
<header>

<style>
a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}

body{
	padding: 30px;
	background: black;
	color: white;
	font-family: arial;
}

h1{
	font-size: 30px;
	font-weight: bold;
	margin-bottom: 20px;
}

li{
	list-style:none;
	font-size: 20px;
	margin-bottom: 10px;
}
a{ text-decoration: none; color: white; padding: 5px;}
a:hover{ background: white; color: black; }

</style>
</header>
<body>


<h1>Proyectos processing</h1>
<?php
$ficheros = array_filter(glob('*'), 'is_dir');

$pos = array_search("addons", $ficheros);
unset($ficheros[$pos]);
foreach($ficheros as $url){ print("<li><a href='".$url."' >".$url."</a></li>"); }
?>	
	
</body>
</html>