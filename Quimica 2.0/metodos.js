var n=0; //CANTIDAD DATOS
var x=0; //VALOR DE PRUEBA
var index=0;
var fullprocess=false;
var result=0;
var pre=7; // Precision en los datos
var option=0;//1:Lagrange;2:Newton Progresivo;

var stringRespuesta="";

function generar(){
	fullprocess =false;
	x=eval(document.getElementById("x").value);
	n=eval(document.getElementById("n").value);
	var tabla="<table border='0'>";
	tabla+="<tr>";
		tabla+="<td class='iletter2' style='font-size:30px;' align='center'>N</td>";
		tabla+="<td class='iletter2' style='font-size:30px;' align='center'>X</td>";
		tabla+="<td class='iletter2' style='font-size:30px;' align='center'>Y</td>";
		tabla+="<td class='iletter2' style='font-size:30px;' align='center'>L</td>";
		tabla+="</tr>";
	for(var i=0;i<n;i++){
		tabla+="<tr>";
		tabla+="<td class='iletter2' style='font-size:30px;'>"+i+"</td>";
		tabla+="<td><input type='text' class='input' onkeypress='next(event)' onclick='newIndex("+i+")' style='width:150px;' id='d"+i+"0'></td>";
		tabla+="<td><input type='text' class='input' style='width:150px;' id='d"+i+"1'></td>";
		tabla+="<td><input type='text' class='input' style='width:150px;' id='d"+i+"2'></td>";
		tabla+="</tr>";
	}
	tabla+="</table>";
	tabla+="<br><input type='button' value='calcular' onclick='calcular()'><br>";
	document.getElementById("tabla").innerHTML=tabla;
	document.getElementById("d00").focus();
	index=1;
}
function generar2(){
	fullprocess =false;
	x=eval(document.getElementById("x").value);
	n=eval(document.getElementById("n").value);
	var tabla="<table border='0'>";
	tabla+="<tr>";
		tabla+="<td class='iletter2' style='font-size:30px;' align='center'>N</td>";
		tabla+="<td class='iletter2' style='font-size:30px;' align='center'>X</td>";
		tabla+="<td class='iletter2' style='font-size:30px;' align='center'>Y</td>";
		tabla+="</tr>";
	for(var i=0;i<n;i++){
		tabla+="<tr>";
		tabla+="<td class='iletter2' style='font-size:30px;'>"+i+"</td>";
		tabla+="<td><input type='text' class='input' onkeypress='next(event)' onclick='newIndex("+i+")' style='width:150px;' id='d"+i+"0'></td>";
		tabla+="<td><input type='text' class='input' style='width:150px;' id='d"+i+"1'></td>";
		tabla+="</tr>";
	}
	tabla+="</table>";
	tabla+="<br><input type='button' style='width:200px;'value='calcular' onclick='calcular()'>";
	tabla+="<br><br><input type='button' style='width:200px;'value='Cambiar la Precision de Decimales' onclick='changePres()'>";
	tabla+="<br><br><input type='button' style='width:200px;'value='modificar las Y' onclick='modificarY()'><br>";
	document.getElementById("tabla").innerHTML=tabla;
	document.getElementById("d00").focus();
	index=1;
}
var y=function(){};
var ry=new Array();
var rx=new Array();

function setOption(i){
	option=i;
}

function modificarY(){
	for(var i=0;i<ry.length;i++){
		ry[i]=eval(prompt(" valor de y("+i+") : ",ry[i]));
		document.getElementById("d"+i+"1").value=ry[i];
	}
	switch(option){
		/*Interpolacion*/
		case 1:{sumLagrange();break;}
		case 2:{newtonProgresivo();break;}
		case 3:{newtonRegresivo();break;}
		case 4:{getDiferencias(1);break;}
		case 5:{getDiferencias(2);break;}
		case 6:{getDiferencias(3);break;}
		case 7:{getDiferencias(4);break;}
		/*Derivacion*/
		case 8:{getDiferencias(10);break;}
		case 9:{getDiferencias(11);break;}
		case 10:{getDiferencias(12);break;}
		default:{alert("no se selecciono ninguna funcion modifique setOption en el <body>");break;}
	}
	alert("Se ha calculado Nuevamente con los datos Proporcionado");
}
function setPrecision(p){
	pre=p;
}
function changePres(){
	var x=eval(prompt("Cantidad de Decimales de Presicion? ",pre));
	setPrecision(x);
	if(fullprocess){
		view();
	}
}
function calcular(){
	var res=0;
	ry=[];rx=[];
	y=eval("("+document.getElementById("y").value+")");
	for(var i=0;i<n;i++){
		res=y(eval(document.getElementById("d"+i+"0").value)).toPrecision(3);
		document.getElementById("d"+i+"1").value=res;
		ry.push(eval(res));
		rx.push(eval(document.getElementById("d"+i+"0").value));
	}
	switch(option){
		/*Interpolacion*/
		case 1:{sumLagrange();break;}
		case 2:{newtonProgresivo();break;}
		case 3:{newtonRegresivo();break;}
		case 4:{getDiferencias(1);break;}
		case 5:{getDiferencias(2);break;}
		case 6:{getDiferencias(3);break;}
		case 7:{getDiferencias(4);break;}
		/*Derivacion*/
		case 8:{getDiferencias(10);break;}
		case 9:{getDiferencias(11);break;}
		case 10:{getDiferencias(12);break;}
		default:alert("no se selecciono ninguna funcion modifique setOption en el <body>");break;
	}
}
function everett(matriz){
	var x0=rx[0];
	var pos =0;
	var posi=0;
	for(var i=0;i<n-1;i++){
		if(x>=rx[i] && x<=rx[i+1]){
			x0=rx[i];pos =i;break;
		}
	}
	posi=pos;
	pos = (2*pos);
	var vectorMedio = [].concat(matriz[pos]);
	var p=(x-x0)/(rx[1]-rx[0]);
	var q=1-p;
	var y=0;
	y+=q*ry[posi]+combo(q+1,3)*matriz[pos][1]+combo(q+2,5)*matriz[pos][3];
	y+=p*ry[posi+1]+combo(p+1,3)*matriz[pos+2][1]+combo(p+2,5)*matriz[pos+2][3];
	result=y;
	view();
}
function operadorCentral(matriz){
	var h=rx[1]-rx[0];
	var pos =0;
	var posi=0;
	for(var i=0;i<n-1;i++){
		if(x>=rx[i] && x<=rx[i+1]){
			x0=rx[i];pos =i+1;break;
		}
	}
	posi=pos;
	pos = (2*pos);
	var y=0;
	y+=ry[posi+1]-ry[posi-1]-(1/6)*(matriz[pos+1][1]-matriz[pos-1][1])+(1/30)*(matriz[pos+1][3]-matriz[pos-1][3]);
	y=y*(1/(2*h));	
	result = y;
	view();
}
function segundaDerivada(matriz){
	var h=rx[1]-rx[0];
	var pos =0;
	var posi=0;
	for(var i=0;i<n-1;i++){
		if(x>=rx[i] && x<=rx[i+1]){
			x0=rx[i];pos =i+1;break;
		}
	}
	posi=pos;
	pos = (2*pos);
	var y=0;
	var limite =Math.floor((n-1)/2);
	for(var i=1,j=1;i<=limite;i++,j=j+2){
			y+=((2*Math.pow(-1,i)*(Math.pow(factorial(i),2)))/(factorial(2*i+2)))*matriz[pos][j];
	}
	y=y*(1/(h*h));
	result = y;
	view();
}
function everettDer(matriz){
	return false;
}

function combo(p,n){
	var pro=1;
	for(var i=0;i<n;i++){
		pro*=(p-i);
	}
	return (pro/factorial(n)).toPrecision(3);
}

function comb(p,n){
	return factorial(p)/(factorial(n)*factorial(p-n));
}
function factorial(num){
	var p=1;
	for(var i=num;i>=1;i--){
		p*=i;
	}
	return p;

}

function view(){
	document.getElementById("resultado").innerHTML=""+stringRespuesta+"<font color='orange' class='iletter2' style='font-size:50px;'>"+result.toPrecision(pre).toString()+"</font><br><br><input type='button' value='Volver arriba' style='width:100px;height:50px;'id='secreto' onclick='document.getElementById(\"x\").focus()'>";
	document.getElementById("secreto").focus();
	fullprocess=true;
}
//Opciones

/* 
Interpolacion:
1. Gauss1, 2. Gauss2, 3.Everett, 4.Steffensen
Derivacion:
10.OperadorCentral, 11.SegundaDerivada, 12. EverettDer
*/
function getDiferencias(option){
	var matriz=new Array();
	var F=(2*n-3)+2; //Filas de la Matriz de Diferenciales
	var C=(n-1);//Columnas de la Matriz de Diferenciales
	for(var i=0;i<F;i++){
		matriz[i]=new Array();
		for(var j=0;j<C;j++){
			matriz[i][j]=0;
		}
	}

	var aux=0;
	for(var j=0;j<C;j++){
		aux=j;
		for(var i=j+1;i<F-(j+1);i+=2){
			if(j==0){
				matriz[i][j]=(ry[aux+1]-ry[aux]).toPrecision(pre);
				aux++;
			}
			else{
				matriz[i][j]=(matriz[aux+2][j-1]-matriz[aux][j-1]).toPrecision(1);
				aux=aux+2;
			}
		}
	}
	var flag=true;
	stringRespuesta = "<center> <h2>Esquema de Diferenciales Con Operador Central</h2><table border=1><tr>";
	for(var i=0;i<n-1;i++){
		if(i==0){
			stringRespuesta+="<td>n</td><td>x</td><td>y</td><td>&delta;^"+(i+1)+"</td>";
		}
		else{
			stringRespuesta+="<td>&delta;^"+(i+1)+"</td>";
		}
	}
	stringRespuesta+="</tr>"
	var c=0;
	for(var i=0;i<F;i++){

		if(flag){
			stringRespuesta+="<tr><td>"+c+"</td><td>"+rx[c]+"</td><td>"+ry[c]+"</td>";
			c++;
			flag=false;
		}
		else{
			stringRespuesta+="<tr><td></td><td></td><td></td>";
			flag=true;
		}
		for(var j=0;j<C;j++){
			stringRespuesta+="<td>"+matriz[i][j]+"</td>";
		}
		stringRespuesta+="</tr>";

	}
	stringRespuesta+="</table><br><br>";
	switch(option){
		case 1:{gauss1(matriz);break;}
		case 2:{gauss2(matriz);break;}
		case 3:{everett(matriz);break;}
		case 4:{steffensen(matriz);break;}
		case 10:{operadorCentral(matriz);break;}
		case 11:{segundaDerivada(matriz);break;}
		case 12:{everettDer(matriz);break;}
		default:{break;}

	}
}
function next(e){
	if(e.keyCode==13){
		if(index<n){
			document.getElementById("d"+index+"0").focus();
			document.getElementById("d"+index+"0").selectionStart = 0;
			index++;
		}
		else{
			calcular();
		}
	}
}
function newIndex(i){
	index=i+1;
}