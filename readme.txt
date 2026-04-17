NTT DATA PERFORMANCE TEST
=========================

TECNOLOGÍAS
-----------
k6   1.7.1

PRERREQUISITOS
--------------
- k6 instalado y disponible en el PATH
  Instalación: https://k6.io/docs/get-started/installation/
- Conexión a internet (el test apunta a https://fakestoreapi.com)

EJECUCIÓN
---------
Desde la raíz del proyecto:

    k6 run src/test/login-test.js

REPORTES
--------
HTML : summary.html
