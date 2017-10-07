function mostrarM(matriz,clase,long) {
	for(var i=0;i<long;i++) {
		for(var j=0;j<long;j++) {
			$("."+clase).append("<input type='text' value='"+matriz[i][j]+"' readonly>");
		}
		$("."+clase).append("<div></div>");
	}
}
function mostrarV(vec,clase,long) {
	for(var i=0;i<long;i++) {
		$("."+clase).append("<input type='text' value='"+vec[i]+"' readonly>");
		$("."+clase).append("<div></div>");
	}

}

function agregarM() {
	var num=Number(document.getElementById('dimension').value);
	if(num) {
		if( $(".matriz").children('div').length > 0 ) {
			$(".matriz").empty();
		}

		//Llenar la class matriz con una matriz con dimesion num
		$( ".matriz" ).append("<h3>Matriz<h3>");
		for(var i=0;i<num;i++) {
			$( ".matriz" ).append("<div></div>");
			for(var j=0;j<num;j++) {
				$( ".matriz" ).append("<input type='number' class='datosM'>");
			}
		}
		$( ".matriz" ).append("<div></div>");

		$( ".matriz" ).append("<h3>Vector<h3>");
		//Llenar la class matriz con un vector con dimension num
		for(var i=0;i<num;i++) {
			$(".matriz").append("<div> <input type='text' class='datosV'> </div>");
		}
		$( ".matriz" ).append("<div><input type='button' class='btn' onclick='salvarDatos("+num+");' value='Calcular :D'></div>");
	}
}

function salvarDatos(long) {
	var matriz = new Array();
	var vector = new Array();
	var cont = 0;

	for(var i=0;i<long;i++) {
		matriz[i] = [];
		for(var j=0;j<long;j++) {
			matriz[i][j] = Number($(".datosM")[cont].value);
			cont++;
		}
	}

	for(var i=0;i<long;i++) {
		vector[i]=Number($(".datosV")[i].value);
	}
	operacion(matriz,vector,long);
}

function operacion(matriz,vector,long) {
	var mD,mC,mDI,mJ,mI,mM,rM,mL,mR,rMI,rMIM,rMID,rMIDV;

	mD = matrizD(matriz,long);
	mC = matrizC(matriz,long);
	mDI = matrizInversa(mD);
	mJ = mJacobi(mDI,mC);
	mI = nuevaMatriz(long);

	$('.paso1').append("<h4>Paso 1:</h4>");
	$('.paso1').append("<h5>Matriz \"D\":</h5>");
	mostrarM(mD,'paso1',long);
	$('.paso1').append("<h5>Matriz \"C\":</h5>");
	mostrarM(mC,'paso1',long);

	$('.paso2').append("<h4>Paso 2:</h4>");
	$('.paso2').append("<h5>Matriz \"D\" Inversa:</h5>");
	mostrarM(mDI,'paso2',long);

	for(var i=0;i<long;i++) {
		for(var j=0;j<long;j++) {
			if(i==j)
				mI[i][j]=1;
			else
				mI[i][j]=0;
		}
	}


	mL = matrizL(mJ);
	mR = matrizR(mJ);
	rM = restaM(mI,mL);
	rMI = matrizInversa(rM);
	rMIM = multiplicar(rMI,mR,long);
	
	$('.paso3').append("<h4>M=(I*L)^-1 *R:</h4>");
	mostrarM(rMIM,'paso3',long);

	rMID = multiplicar(rMI,mDI,long);
	rMID = multiplicar(rMI,mDI,long);
	rMIDV = multiplicarMV(rMID,vector);

	$('.paso4').append("<h4>N=(I*L)^-1 *D^-1* V:</h4>");
	mostrarV(rMIDV,'paso4',long);
}

function matrizL(mJ) {
	var res;
	res = nuevaMatriz(mJ.length);
	for(var i=0;i<mJ.length;i++) {
		for(var j=0;j<mJ.length;j++) {
			if(i > 0 && j<i)
				res[i][j] = mJ[i][j];
			else
				res[i][j] = 0;
		}
	}
	return res;
}

function matrizR(mJ) {
	var res;
	res = nuevaMatriz(mJ.length);
	for(var i=0;i<mJ.length;i++) {
		for(var j=0;j<mJ.length;j++) {
			if(i < mJ.length-1 && j>i)
				res[i][j] = mJ[i][j];
			else
				res[i][j] = 0;
		}
	}
	return res;
}

function restaM(matrizA,matrizB) {
	if(matrizA.length == matrizB.length) {
		var res;
		res = nuevaMatriz(matrizA.length);
		for(var i=0;i<matrizA.length;i++) {
			for(var j=0;j<matrizA.length;j++) {
				res[i][j] = matrizA[i][j] - matrizB[i][j];
			}
		}
		return res;
	}
}

function matrizD(matriz,long) {
	var matrizD = new Array();
	var cont = 0;

	for(var i=0;i<long;i++) {
		matrizD[i] = [];
		for(var j=0;j<long;j++) {
			if(i == j)
				matrizD[i][j] = matriz[i][j];
			else
				matrizD[i][j] = 0;
			cont++;
		}
	}

	return matrizD;
}

function matrizC(matriz,long) {
	var matrizC = new Array();
	var cont = 0;

	for(var i=0;i<long;i++) {
		matrizC[i] = [];
		for(var j=0;j<long;j++) {
			if(i != j)
				matrizC[i][j] = matriz[i][j];
			else
				matrizC[i][j] = 0;
			cont++;
		}
	}

	return matrizC;
}

function mJacobi(matrizDI,matrizC) {
	var mMenosDI = nuevaMatriz(matrizDI.length);
	for(var i=0;i<matrizDI.length;i++) {
		for(var j=0;j<matrizDI.length;j++) {
			if(i==j)
				mMenosDI[i][j] = -matrizDI[i][j];
			else
				mMenosDI[i][j] = 0;
		}
	}
	return multiplicar(mMenosDI,matrizC,matrizDI.length);
}

function nJacobi(matrizDI,vector) {
	return multiplicarMV(matrizDI,vector);
}

function sumaV(vectorA,vectorB) {
	var lon = vectorA.length;
	var res = new Array(lon);
	if(vectorA.length == vectorB.length)
		for(var i=0;i<lon;i++) {
			res[i] = vectorA[i]+vectorB[i];
		}

	return res;
}

function iteractivaX(matrizJ,vecX,vector) {
	var multiMV,sumaVV;
	multiMV = multiplicarMV(matrizJ,vecX);
	sumaVV = sumaV(multiMV,vector);
	return sumaVV;
}

function multiplicarMV(matriz,vector) {
	var lon = matriz.length;
	var res = new Array(lon);
	for(var i=0;i<lon;i++) {
		res[i]=0;
	}

	for(var i=0; i < lon; i++){
		for(k=0; k < lon; k++){
			res[i] = res[i] + (matriz[i][k] * vector[k]);
		}
	}
	return res;
}

function multiplicar(a,ca,lon) {
	var res = new Array();
	for(var i=0;i<lon;i++) {
		res[i] = [];
		for(var j=0;j<lon;j++) {
			res[i][j]=0;
		}
	}
	for(var i=0; i < lon; i++){
		for(var j=0; j < lon; j++){
			for(k=0; k < lon; k++){
				res[i][j] = res[i][j] + (a[i][k] * ca[k][j]);
			}
		}
	}
	return res;
}






function matrizInversa(matriz){
	var det =1/determinante(matriz);
	var nmatriz=matrizAdjunta(matriz);
	var multi=multiplicarMatriz(det,nmatriz);
	return multi;
}
function determinante(matriz){
	var det = 0, aux = 0;
	var c;
	if(matriz.length==2){
		det=(matriz[0][0]*matriz[1][1])-(matriz[1][0]*matriz[0][1]);
		return det;
	}else{
		for(var j=0; j<matriz.length; j++){
			var menor = nuevaMatriz(matriz.length-1);
			for(var h=0; h<(matriz.length-1);h++){
				menor[h] = nuevaMatriz(matriz.length-1);
			}
			for(var k=1; k<matriz.length; k++){
				c=0;
				for(var l=0; l<matriz.length; l++){
					if(l!=j){
						menor[k-1][c] = matriz[k][l];
						c++;
					}
				}
			}
			aux = Math.pow(-1,2+j)*matriz[0][j]*determinante(menor);
			det += aux;
		}
			return det;
	}
}

function nuevaMatriz(n){
	var matriz = new Array(n);
	for(var a=0; a<n; a++) matriz[a] = new Array(n);
	return matriz;
}
 
//Matriz
function matrizTranspuesta(matriz){
    var nuevam = nuevaMatriz(matriz.length);
    for(var i=0; i<matriz.length; i++){
        for(var j=0; j<matriz.length; j++){
            nuevam[i][j]=matriz[j][i];
        }
    }
    return nuevam;
}
 
//En estas tres funciones se encuentra el error
function matrizAdjunta(matriz){
    return matrizTranspuesta(matrizCofactores(matriz));
}
 
function matrizCofactores(matriz){
    var nm = nuevaMatriz(matriz.length);
	var index1,index2;
    for(var i=0; i<matriz.length; i++){
        for(var j=0; j<matriz.length; j++){
            var det = nuevaMatriz(matriz.length-1);
            var detValor;
            for(var k=0; k<matriz.length;k++){
                if(k!=i){
                    for(var l=0; l<matriz.length;l++){
                        if(l!=j){
                            index1 = k<i ? k : k-1;
                            index2 = l<j ? l : l-1;
                            det[index1][index2]=matriz[k][l];
                        }
                    }
                }
            }
            detValor = determinante(det);
            nm[i][j] = detValor * Math.pow(-1, i+j+2);
        }
    } 
    return nm;
}
function multiplicarMatriz(n, matriz){
	var m = nuevaMatriz(matriz.length);
	for(var i=0;i<matriz.length;i++){
        for (var j=0;j<matriz.length;j++) {
            m[i][j] = matriz[i][j];
        }
    }

    for(var i=0;i<matriz.length;i++){
        for (var j=0;j<matriz.length;j++) {
            m[i][j] *= n;
        }
    }
    return m;
}

