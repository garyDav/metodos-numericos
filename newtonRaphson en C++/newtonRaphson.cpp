#include <iostream>
#include <fstream>
#include <cmath>

using namespace std;
void evaluapoli(int n, double *f, double x, double &p);
void derivapoli(int n, double *f, double *fd);
void newtonraphson(int n, double *f, double *fd, double &x, int &contador);

int main(){
	ifstream label1 ("datos//datos.in");
	int n;
	cout << "El grado del polinomio y sus coeficientes están en datos/datos.in\n\n";
	//Introduce el grado del polinomio
	label1 >> n; cout << "grado = " << n << "\n\n";
	double *f, *fd; 
	f = new double [n+1];   // Arreglo para los coeficientes del polinomio
	fd = new double [n];    // Arreglo para los coeficientes de la derivada del polinomio
	// Se introducen desde datos.in y se imprimen en pantalla los coeficientes del polinomio
	cout << "Coeficientes del polinomio\n\n";
	for (int i = n; i > -1; i--) {  
		label1 >> f[i]; 
		cout << "F" << i << " = " << f[i] << "\n";
	}
	cout << "\n";
	derivapoli (n, f, fd);  // función que determina la primera derivada y
	// se imprimen sus coeficientes
	cout << "Coeficientes del polinomio primera derivada\n\n";
	for (int i = n - 1; i > -1; i--) {  
		cout << "Fd" << i << " = " << fd[i] << "\n";
	}
	cout << "\n";
	cout << "Introduzca el valor de inicio para la raiz: \n" << endl << "X = ";
	double x; 
	int contador = 0;
	// Se introduce el valor de x
	cin >> x;
	cout << endl;
	// Implementación del método de Newton-Raphson
	newtonraphson (n, f, fd, x, contador); 
	cout << "La raiz es x = " << x << " y se obtuvo en " << contador << " iteraciones\n";
	return 0;
}

void evaluapoli(int n, double *f, double x, double &p){
	int i; 
	double *a;
	a = new double [n];
	for (i = n; i > -1; i--) {  // Crea una copia de los elementos de f[i]
		// porque el ciclo for inferior los destruye
		a[i] = f[i];                   
	} 
	for (i = n; i > 0; i--) {
		p = a[i] * x + a[i - 1];
		a[i - 1] = p;
	}
	// P es el valor del polinomio en el punto x
}

void derivapoli(int n, double *f, double *fd){
	int i;
	for (i = n; i > 0; i--){
		fd[i-1] = i * f[i];
	}
}

void newtonraphson(int n, double *f, double *fd, double &x, int &contador){
	/* La función evaluapoli determina el valor del polinomio en el punto x.*/
	double p=0, y1, y2, verificador, z = 0;
	do {
		evaluapoli (n, f, x, p);  // Determina el valor del polinomio en el punto
		y1 = p;
		evaluapoli (n-1, fd, x, p);  //Valor de la primera derivada en el punto
		y2 = p;
		x = x - y1/y2;
		verificador = fabs(x - z);
		z = x;
		contador += 1;  
		cout<<"Raiz "<<verificador<<" X= "<<x<<endl;
	} while (verificador > 1e-10);
}
