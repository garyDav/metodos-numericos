// Programa de calculo de raices complejas por los metodos de Newton y Muller
#include <math.h>
#include <iomanip>
#include <iostream>
#include <complex>
using namespace std;
//prec:error en la raiz
// fprec:valor maximo de la funcion en el valor aceptado para la raiz
// numiter:numero maximo de iteraciones
const double prec = 1.e-12, fprec = 1.e-12;
const int nprec = 10, nwidth = 16;
const int numiter = 100;
const char *tab = "\t";
//f: funcion, fd:derivada.
complex < double >f(complex < double >);
complex < double >fd(complex < double >);
int muller(complex < double >, complex < double >);
int newton(complex < double >);
complex < double > f(complex < double >x) {
	return complex < double >(16, 0) * x * x * x * x -
		complex < double >(40, 0) * x * x * x +
		complex < double >(5, 0) * x * x +
		complex < double >(20, 0) * x +
		complex < double >(6, 0);
}
complex < double > fd(complex < double >x) {
	return complex < double >(64, 0) * x * x * x -
		complex < double >(120, 0) * x * x +
		complex < double >(10, 0) * x + complex < double >(20, 0);
}
int main() {
	/*
	* Programa para comparar diversos métodos de calculo de raices
	* complejas
	*/
	//x0, x1 puntos iniciales Muller; x1 punto inicial Newton
	complex < double > x0 = complex < double >(0.5, 0.5), x1 = complex < double >(-0.5, 0),
		raiz;
	//muller(x0, x1);
	newton(x1);
	return 0;
}

int newton(complex < double >x1) {
	int n = 1;
	complex < double >x2;
	complex < double >f1 = f(x1);
	cout << " Metodo de Newton" << endl;
	cout << " Punto inicial= " << x1 << endl;
	cout.precision(nprec);
	cout << " iteracion" << " x " << " f(x) " << endl;
	cout << setw(10) << 0 << " " << setw(10) << x1 << " " << f1 << endl;
	while ((abs(f1) >= fprec) || (abs(x2 - x1) > prec)) {
		if (n >= numiter) {
			cout << " numero maximo de iteraciones excedido en muller" << endl;
			return 1;
		}
		x2 = x1 - f1 / fd(x1);
		x1 = x2;
		f1 = f(x1);
		cout << setw(10) << n << " " << setw(10) << x1
			<< " " << f1 << endl;
		n++;
	}
	cout << "newton " << n - 1 << " iteraciones " << "raiz= "
		<< x1 << " funcion= " << f1 << endl;
	return 0;
}

int muller(complex < double >x0, complex < double >x1) {
	complex < double >f(complex < double >x);
	cout << " Metodo Muller" << endl;
	cout.precision(nprec);
	cout << " iteracion" << " x " << " f(x) " << endl;
	int n = 1;
	complex < double >x2 = (0, 0), x3 = (0, 0);
	complex < double >f0 = f(x0), f1 = f(x1), f2 = f1, a, b, c, d,
		h;
	x2 = x1 - f1 * (x1 - x0) / (f1 - f0);
	f2 = f(x2);
	cout << setw(10) << n << " " << setw(10) << x2 << " " << f(x2) << endl;
	n = 2;
	while ((abs(f2) >= fprec) || (abs(x2 - x1) >= prec)) {
		if (n >= numiter) {
			cout << " numero maximo de iteraciones excedido en muller" << endl;
			return 1;
		}
		a = (x1 - x0) * f2 + (x0 - x2) * f1 + (x2 - x1) * f0;
		a = a / ((x2 - x1) * (x1 - x0) * (x1 - x0));
		b = (x1 - x0) * (complex < double >(2, 0) * x2 - x1 - x0) *
			f2 - (x2 - x0) * (x2 - x0) * f1 + (x2 - x1) * (x2 - x1) * f0;
		b = b / ((x2 - x1) * (x1 - x0) * (x1 - x0));
		c = (x2 - x0) * f2 / (x1 - x0);
		d = sqrt(b * b - complex < double >(4, 0) * a * c);
		if (abs(b + d) > abs(b - d))
			h = -complex < double >(2, 0) * c / (b + d);
		else
			h = complex < double >(-2, 0) * c / (b - d);
		x3 = x2 + h;
		x0 = x1;
		f0 = f1;
		x1 = x2;
		f1 = f2;
		x2 = x3;
		f2 = f(x2);
		cout << setw(10) << n << " " << setw(10) << x2 << " " << f2 << endl;
		n++;
	}
	cout << "muller " << n - 1 << " iteraciones " <<
		"raiz= " << x2 << " funcion= " << f2 << endl;
	return 0;
}
